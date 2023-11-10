from flask import Flask, request, current_app
import psycopg2
import bcrypt
from flask_cors import CORS

# TESTING DONE IN REQBIN

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# FOR TESTING
"""
@app.route("/hello", methods = ["POST"])
def hello_world():
    print ("Hello World!")
    return "<p>Hello, World!</p>"
"""

# PULL EMAILS TO CHECK FOR ACCOUNT DUPLICATES (FOR SIGNUP)
@app.route('/existingemail', methods=['POST'])
def existingemail():
    if request.method == 'POST':
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT email FROM Person")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns a single array of all emails
    return results

# SIGNUP STUDENT
@app.route('/api/signupstudent', methods=['POST', 'OPTIONS'])
def signupstudent():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        signup_info = request.json
        current_app.logger.info(f"Received data: {signup_info}")
        fname = signup_info['firstName']
        mname = signup_info.get('middleName', '')
        lname = signup_info['lastName']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        hashedpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal) VALUES (%s, %s, %s, %s, 'student', %s, false)", (email, fname, mname, lname, phonenum))
        conn.commit()
        cursor.execute("INSERT INTO Login (email, hashedpass) VALUES (%s, %s)", (email, hashedpass.decode('utf-8')))
        conn.commit()
    except Exception as e:
        current_app.logger.error(e, exc_info=True)
        # conn.close()
        return 'ERROR'
    return 'SUCCESS'

# SIGNUP TUTOR
@app.route('/signuptutor', methods=['POST'])
def signuptutor():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        # ADD MIDDLE NAME TO SIGN UP, MAKE IT OPTIONAL
        # TUTOR SIGN UP NEEDS MORE FIELDS
        signup_info = request.json
        fname = signup_info['firstName']
        mname = signup_info.get('middleName', '')
        lname = signup_info['lastName']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        criminal = signup_info['criminal'] # SHOULD BE TRUE/FALSE
        # MAKE SURE TO ADD HASHED PASS CONVERSION HERE PLEASE
        hashedpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal) VALUES (%s, %s, %s, %s, 'student', %s, false)", (email, fname, mname, lname, phonenum))
        conn.commit()
        cursor.execute("INSERT INTO Login (email, hashedpass) VALUES (%s, %s)", (email, hashedpass.decode('utf-8')))
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# LOGIN LOGIC
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        credentials = request.json
        username_input = credentials['email']
        password_input = credentials['password']
        
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

        try:
            cursor.execute(f"SELECT hashedpass FROM Login WHERE email = '{username_input}'")
            hashed_pass_from_db = cursor.fetchone()
            conn.close()
        except Exception as e:
            print(e)
            if conn is not None:
                conn.close()
            return 'ERROR'

        # Check if we got a result and verify the password
        if hashed_pass_from_db is not None:
            # Use bcrypt to check the hashed password
            if bcrypt.checkpw(password_input.encode('utf-8'), hashed_pass_from_db[0].encode('utf-8')):
                print("LOGIN SUCCESSFUL")
                return 'SUCCESS'
            else:
                print("LOGIN FAILED")
                return 'FAIL'
        else:
            print("LOGIN FAILED - User not found")
            return 'FAIL'

# PULL TUTOR INFO
@app.route('/tutorlist', methods=['POST'])
def tutorlist():
    if request.method == 'POST':
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT person.email, person.firstName, person.middleName, person.lastName, subject_list.classname FROM person JOIN subject_list ON person.email = subject_list.email")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns a double array of tutor information
    return results

# PULL FAVORITE TUTORS
@app.route('/favlist', methods=['POST'])
def favlist():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        student = request.json
        student_email = student['email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT tutor_email from Favorite_Tutor where student_email = '{student_email}'")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns single array of all favorite tutors
    return results

# ADD FAVORITE TUTOR
@app.route('/addfavtutor', methods=['POST'])
def addfavtutor():
    # Make sure students can't select and add a duplicate favorite tutor
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        student_email = selected['s_email']
        tutor_email = selected['t_email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Favorite_Tutor (student_email, tutor_email) values ('{student_email}', '{tutor_email}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# REMOVE FAVORITE TUTOR
@app.route('/remfavtutor', methods=['POST'])
def remfavtutor():
    # Make sure students can't select and add a duplicate favorite tutor
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        student_email = selected['s_email']
        tutor_email = selected['t_email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"DELETE FROM Favorite_Tutor WHERE student_email = '{student_email}' AND tutor_email = '{tutor_email}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'ENTRY DELETED'

"""
--------------------------
Tutors will be able to sign-up for a tutor account. 
Only tutors with non-criminal backgrounds will be accepted. 
They will enter their detailed information (subject list, about me, available hours) and upload profile picture.
"""

# NEED UPDATES FOR ABOUT ME

# ADD ABOUT ME
@app.route('/addaboutme', methods=['POST'])
def addaboutme():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        email = selected['email']
        blurb = selected['blurb']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO About_Me (email, about_me) values ('{email}', '{blurb}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# UPDATE ABOUT ME
@app.route('/updateaboutme', methods=['POST'])
def updateaboutme():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        packet = request.json   
        email = packet['email']
        blurb = packet['blurb']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"UPDATE About_Me SET about_me = '{blurb}' WHERE email = '{email}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# ADD A SUBJECT
@app.route('/addsubject', methods=['POST'])
def addsubject():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        email = selected['email']
        subject = selected['subject']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Subject_List (email, classname) values ('{email}', '{subject}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# REMOVE SUBJECT
@app.route('/remsubject', methods=['POST'])
def remsubject():
    # Make sure students can't select and add a duplicate favorite tutor
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        email = selected['email']
        subject = selected['subject']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"DELETE FROM Subject_list WHERE email = '{email}' AND classname = '{subject}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'ENTRY DELETED'

# ADD AVAILABLE TIMES
@app.route('/addavailabletimes', methods=['POST'])
def addavailabletimes():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        email = selected['email']
        days = selected['days']
        times = selected['times']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Tutor_Availability (email, days, times) values ('{email}', '{days}', '{times}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# Not necessary, but nice to add
'''
UPDATE AVAILABLE TIMES
REMOVE AVAILABLE TIMES
'''

# ADD PICTURE NAME (For now, assuming we already have pictures in the app folder after upload, can select pictures by their name stored in db (i.e.) "mypic.png")
@app.route('/addpic', methods=['POST'])
def addpic():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        email = selected['email']
        picname = selected['picname']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Profile_Pic (email, picname) values ('{email}', '{picname}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# UPDATE PIC NAME
@app.route('/updatepic', methods=['POST'])
def updatepic():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        packet = request.json   
        email = packet['email']
        picname = packet['picname']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"UPDATE Profile_Pic SET picname = '{picname}' WHERE email = '{email}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

"""
Users will be able to make appointments with a tutor of their choice. 
For making appointments, availability of the tutor should be checked (both working hours and previously booked appointments).
"""

# ADD APPOINTMENT
# Don't let dupe add appointment in frontend, no db dupe protection atm
@app.route('/addappointment', methods=['POST'])
def addappointment():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        t_email = selected['t_email']
        s_email = selected['s_email']
        subject = selected['subject']
        day = selected['day']
        start_time = selected['start_time']
        end_time = selected['end_time']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Schedules (t_email, s_email, subject, day, start_time, end_time) values ('{t_email}', '{s_email}', '{subject}', '{day}', '{start_time}', '{end_time}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'


# UPDATE APPOINTMENT ONLY TEACHER SIDE THOUGH
@app.route('/updateappointment', methods=['POST'])
def updateappointment():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        selected = request.json
        t_email = selected['t_email']
        s_email = selected['s_email']
        subject = selected['subject']
        day = selected['day']
        start_time = selected['start_time']
        end_time = selected['end_time']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"UPDATE Schedules SET s_email = '{s_email}' WHERE t_email = '{t_email}'")
        conn.commit()
        cursor.execute(f"UPDATE Schedules SET subject = '{subject}' WHERE t_email = '{t_email}'")
        conn.commit()
        cursor.execute(f"UPDATE Schedules SET day = '{day}' WHERE t_email = '{t_email}'")
        conn.commit()
        cursor.execute(f"UPDATE Schedules SET start_time = '{start_time}' WHERE t_email = '{t_email}'")
        conn.commit()
        cursor.execute(f"UPDATE Schedules SET end_time = '{end_time}' WHERE t_email = '{t_email}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

'''
REMOVE APPOINTMENT
'''

"""
For users, upcoming appointments should be listed along with tutor name, date and time information.
For tutors, upcoming appointments should be listed along with student, name, date and time information.
"""

# PULL APPOINTMENTS AS STUDENT
@app.route('/studentappointments', methods=['POST'])
def studentappointments():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        schedule = request.json
        email = schedule['email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * from Schedules where s_email = '{email}'")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns array(s) of all appointment details
    return results

# PULL APPOINTMENTS AS TEACHER
@app.route('/tutorappointments', methods=['POST'])
def tutorappointments():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        schedule = request.json
        email = schedule['email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * from Schedules where t_email = '{email}'")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns array(s) of all appointment details
    return results

"""
For both users and tutors, total tutoring hours completed should be shown.
"""

# ADD TOTAL HOURS
@app.route('/addhours', methods=['POST'])
def addhours():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        packet = request.json   
        email = packet['email']
        hours = packet['time']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO Tutoring_Hours (email, hours) values ('{email}', '{hours}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# UPDATE TOTAL HOURS / CAN ADD AND REMOVE
@app.route('/updatehours', methods=['POST'])
def updatehours():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        packet = request.json   
        email = packet['email']
        hours = packet['time']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT hours from Tutoring_Hours where email = '{email}'")
        results = cursor.fetchall()

        newhour = int(hours) + int(results[0][0])

        cursor.execute(f"UPDATE Tutoring_Hours SET hours = '{newhour}' WHERE email = '{email}'")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'


# PULL TOTAL HOURS
@app.route('/totalhours', methods=['POST'])
def totalhours():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        hours = request.json
        email = hours['email']

        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT hours from Tutoring_Hours where email = '{email}'")
        results = cursor.fetchall()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    # Returns hours
    return results
