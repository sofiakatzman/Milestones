from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy 

from config import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)


