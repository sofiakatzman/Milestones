from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    birthday = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    milestones = db.relationship('Milestone', backref=db.backref('user'), cascade='all, delete-orphan')


class Milestone(db.Model):
    __tablename__ = "milestones"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    header = db.Column(db.String)
    subheader = db.Column(db.String)
    description = db.Column(db.String)
    is_private = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    aspect_id = db.Column(db.Integer, db.ForeignKey('aspects.id'))


class Aspect(db.Model):
    __tablename__ = "aspects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    icon = db.Column(db.String)