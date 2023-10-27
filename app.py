from flask import Flask, request
import psycopg2

# TESTING DONE IN REQBIN

app = Flask(__name__)

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
@app.route('/signupstudent', methods=['POST'])
def signupstudent():
    if request.method == 'POST':
        # PLEASE FORMAT FRONTEND DATA PACKETS INTO JSON SO IT FITS BELOW
        # ADD MIDDLE NAME TO SIGN UP, MAKE IT OPTIONAL
        signup_info = request.json
        fname = signup_info['first_name']
        mname = signup_info['middle_name']
        lname = signup_info['last_name']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        # MAKE SURE TO ADD HASHED PASS CONVERSION HERE PLEASE
        
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        # CHANGE PASSWORD TO HASHEDPASS AFTER ADDING
        cursor.execute(f"INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal) values ('{email}', '{fname}','{mname}', '{lname}', 'tutor', '{phonenum}', false)")
        conn.commit()
        cursor.execute(f"INSERT INTO Login (email, hashedpass) values ('{email}', '{password}')")
        conn.commit()
    except Exception as e:
        print(e)
        conn.close()
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
        fname = signup_info['first_name']
        mname = signup_info['middle_name']
        lname = signup_info['last_name']
        email = signup_info['email']
        phonenum = signup_info['phone']
        password = signup_info['password']
        criminal = signup_info['criminal'] # SHOULD BE TRUE/FALSE
        # MAKE SURE TO ADD HASHED PASS CONVERSION HERE PLEASE
        
        conn = psycopg2.connect(database = 'Tutoring', user = 'postgres', password = '1234', host = 'localhost', port = '5432')
        cursor = conn.cursor()

    try:
        # CHANGE PASSWORD TO HASHEDPASS AFTER ADDING
        cursor.execute(f"INSERT INTO Person (email, firstName, middleName, lastName, usertype, phonenum, criminal) values ('{email}', '{fname}','{mname}', '{lname}', 'tutor', '{phonenum}', '{criminal}')")
        conn.commit()
        cursor.execute(f"INSERT INTO Login (email, hashedpass) values ('{email}', '{password}')")
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
        # Right now, tests literal hashed pass, doesn't hash pass and checks
        cursor.execute(f"SELECT HASHEDPASS FROM LOGIN WHERE email = '{username_input}'")
        results = cursor.fetchone()
    except Exception as e:
        print(e)
        conn.close()
        return 'ERROR'
    if results is not None and password_input == results[0]:
        print("LOGIN SUCCESSFUL")
        return 'SUCCESS'
    else:
        print("LOGIN FAILED")
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
UPDATE DATABASE, POPULATE, CREATE AS NEEDED FOR NEW VALUES
"""

"""
ADD THE FOLLOWING
--------------------------
Tutors will be able to sign-up for a tutor account. 
Only tutors with non-criminal backgrounds will be accepted. 
They will enter their detailed information (subject list, about me, available hours) and upload profile picture.
"""


"""
ADD THE FOLLOWING
--------------------------
Users will be able to make appointments with a tutor of their choice. 
For making appointments, availability of the tutor should be checked (both working hours and previously booked appointments).
"""


"""
ADD THE FOLLOWING
--------------------------
For users, upcoming appointments should be listed along with tutor name, date and time information.
"""


"""
ADD THE FOLLOWING
--------------------------
For tutors, upcoming appointments should be listed along with student, name, date and time information.
"""


"""
ADD THE FOLLOWING
--------------------------
For both users and tutors, total tutoring hours completed should be shown.
"""