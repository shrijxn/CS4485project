import pyotp
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)  # Store a hashed password, not plaintext!
    totp_secret = db.Column(db.String(16))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # ... save user's password and other info ...
        
        user = User(
            username=request.form.get('username'),
            password=request.form.get('password')  # Store a hashed password, not plaintext!
        )
        
        # Generate a random TOTP secret for this user
        totp_secret = pyotp.random_base32()
        user.totp_secret = totp_secret
        db.session.add(user)
        db.session.commit()

        # Generate a QR code for the user to scan
        totp_uri = pyotp.totp.TOTP(totp_secret).provisioning_uri(name=user.username, issuer_name="OnlineTuturingApp")
        # Redirect user to a page to show this QR code
        session['totp_uri'] = totp_uri
        return redirect(url_for('display_qr'))

    return render_template('register.html')

@app.route('/display_qr')
def display_qr():
    # Display the QR code for the user to scan
    return render_template('display_qr.html', totp_uri=session.get('totp_uri'))

# ... other routes ...

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
