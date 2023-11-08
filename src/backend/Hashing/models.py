from db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first = db.Column(db.Text, nullable=False)
    last = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    hash = db.Column(db.Text, nullable=False)
    usertype = db.Column(db.Text, nullable=False)