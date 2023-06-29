from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

bcrypt = Bcrypt()
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    birthday = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)
    milestones = db.relationship('Milestone', backref=db.backref('user'), cascade='all, delete-orphan')
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'USER: ID: {self.id}, Name {self.name}, Email: {self.email}, Admin: {self.admin}'


class Milestone(db.Model):
    __tablename__ = "milestones"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    header = db.Column(db.String)
    subheader = db.Column(db.String)
    description = db.Column(db.String)
    is_private = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    aspect_id = db.Column(db.Integer, db.ForeignKey('aspects.id'))


class Aspect(db.Model):
    __tablename__ = "aspects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    icon = db.Column(db.String)