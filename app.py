from flask import Flask, request, current_app, jsonify
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
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
        signup_info = request.json
        current_app.logger.info(f"Received data: {signup_info}")
        fname = signup_info['firstName']
        mname = signup_info.get('middleName', '')
        lname = signup_info['lastName']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        photo = signup_info['photo']
        hashedpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal, photo) VALUES (%s, %s, %s, %s, 'student', %s, false, %s)", (email, fname, mname, lname, phonenum, photo))
        conn.commit()
        cursor.execute("INSERT INTO Login (email, hashedpass) VALUES (%s, %s)", (email, hashedpass.decode('utf-8')))
        conn.commit()
    except Exception as e:
        current_app.logger.error(e, exc_info=True)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# SIGNUP TUTOR
@app.route('/api/signuptutor', methods=['POST', 'OPTIONS'])
def signuptutor():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
        signup_info = request.json
        current_app.logger.info(f"Received data: {signup_info}")
        fname = signup_info['firstName']
        mname = signup_info.get('middleName', '')
        lname = signup_info['lastName']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        photo = signup_info['photo']
        # criminal = signup_info['criminal']
        hashedpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal, photo) VALUES (%s, %s, %s, %s, 'tutor', %s, false, %s)", (email, fname, mname, lname, phonenum, photo))
        conn.commit()
        cursor.execute("INSERT INTO Login (email, hashedpass) VALUES (%s, %s)", (email, hashedpass.decode('utf-8')))
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    return 'SUCCESS'

# LOGIN LOGIC
@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
        credentials = request.json
        username_input = credentials['email']
        password_input = credentials['password']
        
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

        try:
            cursor.execute("SELECT hashedpass FROM Login WHERE email = %s", (username_input,))
            result = cursor.fetchone()
            conn.close()

            if result is None:
                print("LOGIN FAILED - User not found")
                return 'FAIL'

            hashed_pass_from_db = result[0]
            
            if isinstance(hashed_pass_from_db, str):
                hashed_pass_from_db = hashed_pass_from_db.encode('utf-8')
                
            # Check if the password is correct
            if bcrypt.checkpw(password_input.encode('utf-8'), hashed_pass_from_db):
                print("LOGIN SUCCESSFUL")
                return 'SUCCESS'
            else:
                print("LOGIN FAILED - Incorrect password")
                return 'FAIL'

        except Exception as e:
            print(e)
            print("Error printed here")
            if conn is not None:
                conn.close()
            return 'ERROR'

# PULL TUTOR INFO
@app.route('/api/tutorlist', methods=['POST', 'OPTIONS'])
def tutorlist():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
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

@app.route('/api/favlist', methods=['POST', 'OPTIONS'])
def favlist():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
        student = request.json
        student_email = student['email']

        conn = psycopg2.connect(database='Tutoring', user='postgres', password='1234', host='localhost', port='5432')
        cursor = conn.cursor()

        try:
            # JOIN operation with Favorite_Tutor and Person tables
            cursor.execute("""
                SELECT f.tutor_email, p.firstName, p.lastName 
                FROM Favorite_Tutor AS f
                JOIN Person AS p ON f.tutor_email = p.email
                WHERE f.student_email = %s
            """, (student_email,))
            results = cursor.fetchall()
        except Exception as e:
            print(e)
            conn.close()
            return 'ERROR'

        # Format results into a more readable format (optional)
        formatted_results = [{'email': tutor_email, 'firstName': first_name, 'lastName': last_name} for tutor_email, first_name, last_name in results]

        return formatted_results

@app.route('/api/nonfavlist', methods=['POST', 'OPTIONS'])
def nonfavlist():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
        student = request.json
        student_email = student['email']

        conn = psycopg2.connect(database='Tutoring', user='postgres', password='1234', host='localhost', port='5432')
        cursor = conn.cursor()

        try:
            # LEFT JOIN operation with Person and Favorite_Tutor tables
            # This query selects all tutors who are not in the student's favorites
            cursor.execute("""
                SELECT p.email, p.firstName, p.lastName 
                FROM Person AS p
                LEFT JOIN Favorite_Tutor AS f ON p.email = f.tutor_email AND f.student_email = %s
                WHERE p.usertype = 'tutor' AND f.tutor_email IS NULL
            """, (student_email,))
            results = cursor.fetchall()
        except Exception as e:
            print(e)
            conn.close()
            return 'ERROR'

        # Format results into a more readable format (optional)
        formatted_results = [{'email': email, 'firstName': firstName, 'lastName': lastName} for email, firstName, lastName in results]

        return formatted_results

    # Handle non-POST requests if necessary



# ADD FAVORITE TUTOR
@app.route('/api/addfavtutor', methods=['POST', 'OPTIONS'])
def addfavtutor():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
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
@app.route('/api/remfavtutor', methods=['POST', 'OPTIONS'])
def remfavtutor():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    if request.method == 'POST':
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
    return 'SUCCESS'

"""
--------------------------
Tutors will be able to sign-up for a tutor account. 
Only tutors with non-criminal backgrounds will be accepted. 
They will enter their detailed information (subject list, about me, available hours) and upload profile picture.
"""

# NEED UPDATES FOR ABOUT ME

# ADD ABOUT ME
@app.route('/api/addaboutme', methods=['POST', 'OPTIONS'])
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
@app.route('/updateaboutme', methods=['POST', 'OPTIONS'])
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
@app.route('/addsubject', methods=['POST', 'OPTIONS'])
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
@app.route('/remsubject', methods=['POST', 'OPTIONS'])
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
@app.route('/addavailabletimes', methods=['POST', 'OPTIONS'])
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
@app.route('/addpic', methods=['POST', 'OPTIONS'])
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
@app.route('/updatepic', methods=['POST', 'OPTIONS'])
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
@app.route('/api/addappointment', methods=['POST', 'OPTIONS'])
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
@app.route('/updateappointment', methods=['POST', 'OPTIONS'])
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

@app.route('/api/getTutorAppointments', methods=['POST', 'OPTIONS'])
def gettutorappointments():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    if request.method == 'POST':
        schedule = request.json
        email = schedule['email']

        # Database connection
        conn = psycopg2.connect(database='Tutoring', user='postgres', password='1234', host='localhost', port='5432')
        cursor = conn.cursor()

        try:
            # SQL query to join Schedules and Person tables
            query = """
            SELECT Schedules.date, Schedules.time, Schedules.subject, Person.firstName, Person.lastName 
            FROM Schedules 
            JOIN Person ON Schedules.s_email = Person.email 
            WHERE Schedules.t_email = %s
            """
            cursor.execute(query, (email,))
            results = cursor.fetchall()

            # Formatting the result into a dict
            appointments = [
                {
                    "date": result[0],
                    "time": result[1],
                    "subject": result[2],
                    "studentFirstName": result[3],
                    "studentLastName": result[4]
                } for result in results
            ]

            conn.close()
            return jsonify(appointments)  # jsonify to return JSON response

        except Exception as e:
            print(e)
            conn.close()
            return 'ERROR', 500


@app.route('/api/getStudentAppointments', methods=['POST', 'OPTIONS'])
def getstudentappointments():
    if request.method == 'OPTIONS':
        response = app.response_class()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    if request.method == 'POST':
        schedule = request.json
        email = schedule['email']

        # Database connection
        conn = psycopg2.connect(database='Tutoring', user='postgres', password='1234', host='localhost', port='5432')
        cursor = conn.cursor()

        try:
            query = """
            SELECT Schedules.date, Schedules.time, Schedules.subject, Person.firstName, Person.lastName 
            FROM Schedules 
            JOIN Person ON Schedules.t_email = Person.email 
            WHERE Schedules.s_email = %s
            """
            cursor.execute(query, (email,))
            results = cursor.fetchall()

            print("Fetched Results:", results)  # Debugging: Log the fetched results


            # Formatting the result into a dict
            appointments = [
                {
                    "date": result[0],
                    "time": result[1],
                    "subject": result[2],
                    "tutorFirstName": result[3],
                    "tutorLastName": result[4]
                } for result in results
            ]

            conn.close()
            return jsonify(appointments)  # jsonify to return JSON response

        except Exception as e:
            print(e)
            conn.close()
            return 'ERROR', 500


"""
For both users and tutors, total tutoring hours completed should be shown.
"""

# ADD TOTAL HOURS
@app.route('/addhours', methods=['POST', 'OPTIONS'])
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
@app.route('/updatehours', methods=['POST', 'OPTIONS'])
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
