import re
from flask import Flask, render_template, request, jsonify, redirect, session, url_for, send_from_directory
from flask_session import Session
from flask_bcrypt import Bcrypt

app = Flask(__name__)
Session(app)
bcrypt = Bcrypt(app)


students = []


@app.route('/api/register-student', methods=['POST'])
def addStudent():
    if request.method == 'POST':
        data = request.json
        email = data.get('email', '')
        password = data.get('password', '')

        email_validation = validEmail(email)
        password_validation = strongPassword(password)

        if email_validation != 'valid':
            return jsonify({'status': 'error', 'message': email_validation}), 400

        if password_validation != 'valid':
            return jsonify({'status': 'error', 'message': password_validation}), 400

        # Hash the password before storing
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        student = {
            'email': email,
            'password': hashed_password
        }
        students.append(student)

        return jsonify({'status': 'success', 'message': 'Student registered successfully!'}), 201
    




def loginStudent():
    if request.method == 'POST':
        data = request.json
        email = data.get('email', '')
        password = data.get('password', '')

        # Find the student by email (this is a naive search for demonstration purposes)
        student = next((s for s in students if s['email'] == email), None)
        if not student:
            return jsonify({'status': 'error', 'message': 'No student found with this email'}), 404

        # Check password using bcrypt's check_password_hash method
        if bcrypt.check_password_hash(student['password'], password):
            # Log the student in or whatever you'd like to do next
            return jsonify({'status': 'success', 'message': 'Logged in successfully!'})
        else:
            return jsonify({'status': 'error', 'message': 'Wrong password'}), 401

if __name__ == '__main__':
    app.run(debug=True)


