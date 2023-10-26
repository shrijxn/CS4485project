from flask import Flask, request
import bcrypt
from sqlalchemy.exc import IntegrityError
from models import User
from db import db

app = Flask(__name__)
#change this to absolute path of the db file in your local directory
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\Users\\shrij\\OneDrive\\Desktop\\Hashing\\user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


#routing for /studentsignup
@app.route('/studentsignup', methods=['POST'])
def studentsignup():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        
        if not email:
            return 'Missing email', 400
        if not password:
            return 'Missing password', 400
        
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        user = User(email=email, hash=hashed)
        db.session.add(user)
        db.session.commit()

        return f'Welcome! {email}', 200
    except IntegrityError:
        # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
        db.session.rollback()
        return 'User Already Exists', 400
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400

#routing decorator for /studentlogin
@app.route('/studentlogin', methods=['POST'])
def studentlogin():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        
        if not email:
            return 'Missing email', 400
        if not password:
            return 'Missing password', 400
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return 'User Not Found!', 404
        

        if bcrypt.checkpw(password.encode('utf-8'), user.hash):
            return f'Logged in, Welcome {email}!', 200
        else:
            return 'Invalid Login Info!', 400
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400

if __name__ == '__main__':
    app.debug = True
    app.run()