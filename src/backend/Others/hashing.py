import re
from flask import Flask, render_template, request, jsonify, redirect, session, url_for, send_from_directory
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS



app = Flask(__name__)
Session(app)
bcrypt = Bcrypt(app)
CORS(app)

"""
These are the lists that student signups and tutor signups get appended to. not sure what we are going to do with
these
"""
students = []
tutors = []


@app.route('/api/register-student', methods=['POST'])
def addStudent():
    if request.method == 'POST':
        data = request.json
        email = data['values'].get('email', '')
        password = data['values'].get('password', '')

        """
        I don't know what type of email and password validation we are doing here that wasn't already done in
        the front end, except maybe making sure a user doesn't sign up twice with the same email. If someone wants
        to go and implement it, be my guest. make sure you implement it for both students and tutors, whatever changes
        you make



        email_validation = validEmail(email)
        password_validation = strongPassword(password)

        if False: #email_validation != 'valid':
            return jsonify({'status': 'error', 'message': email_validation}), 400

        if False: #password_validation != 'valid':
            return jsonify({'status': 'error', 'message': password_validation}), 400
        """


        # Hash the password before storing
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        student = {
            'email': email,
            'password': hashed_password
        }
        students.append(student)

        return jsonify({'status': 'success', 'message': 'Student registered successfully!'}), 201
    
@app.route('/api/login-student', methods=['POST'])
def loginStudent():
    if request.method == 'POST':
        data = request.json
        email = data['values'].get('email', '')
        password = data['values'].get('password', '')

        # Find the student by email (this is a naive search for testing purpose)
        student = next((s for s in students if s['email'] == email), None)
        if not student:
            return jsonify({'status': 'error', 'message': 'No student found with this email'}), 404

        # Check password using bcrypt's check_password_hash method
        if bcrypt.check_password_hash(student['password'], password):
            # Log the student in or whatever you'd like to do next
            return jsonify({'status': 'success', 'message': 'Logged in successfully!'}), 201
        else:
            return jsonify({'status': 'error', 'message': 'Wrong password'}), 401


@app.route('/api/register-tutor', methods=['POST'])
def addTutor():
    if request.method == 'POST':
        data = request.json
        email = data['values'].get('email', '')
        password = data['values'].get('password', '')

        # Hash the password before storing
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        tutor = {
            'email': email,
            'password': hashed_password
        }
        tutors.append(tutor)

        return jsonify({'status': 'success', 'message': 'Tutor registered successfully!'}), 201


@app.route('/api/login-tutor', methods=['POST'])
def loginTutor():
    if request.method == 'POST':
        data = request.json
        email = data['values'].get('email', '')
        password = data['values'].get('password', '')

        # Find the tutor by email (this is a naive search for testing purpose)
        tutor = next((s for s in tutors if s['email'] == email), None)
        if not tutor:
            return jsonify({'status': 'error', 'message': 'No tutor found with this email'}), 404

        # Check password using bcrypt's check_password_hash method
        if bcrypt.check_password_hash(tutor['password'], password):
            # Log the student in or whatever you'd like to do next
            return jsonify({'status': 'success', 'message': 'Logged in successfully!'}), 201
        else:
            return jsonify({'status': 'error', 'message': 'Wrong password'}), 401


if __name__ == '__main__':
    app.run(debug=True)


