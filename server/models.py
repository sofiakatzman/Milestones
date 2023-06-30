from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Table, Column, Integer, ForeignKey
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

bcrypt = Bcrypt()
db = SQLAlchemy(metadata=metadata)

user_aspects = db.Table(
    'user_aspects',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('aspect_id', db.Integer, db.ForeignKey('aspects.id'), primary_key=True)
)

milestone_aspects = db.Table(
    'milestone_aspects',
    db.Column('milestone_id', db.Integer, db.ForeignKey('milestones.id'), primary_key=True),
    db.Column('aspect_id', db.Integer, db.ForeignKey('aspects.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    birthday = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)
    milestones = db.relationship('Milestone', backref=db.backref('user'), cascade='all, delete-orphan')
    aspects = db.relationship('Aspect', secondary=user_aspects, backref=db.backref('users'), cascade='all')
    serialize_rules = ('-_password_hash',)
    
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
        return f'USER: ID: {self.id}, Username: {self.username}, Admin: {self.admin}'


class Milestone(db.Model, SerializerMixin):
    __tablename__ = "milestones"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    header = db.Column(db.String)
    subheader = db.Column(db.String)
    description = db.Column(db.String)
    is_private = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    aspect_id = db.Column(db.Integer, db.ForeignKey('aspects.id'))
    
    aspects = db.relationship('Aspect', secondary=milestone_aspects, backref=db.backref('milestones'), cascade='all')

    serialize_rules = ('-user',)


class Aspect(db.Model, SerializerMixin):
    __tablename__ = "aspects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    icon = db.Column(db.String)

    def __repr__(self):
        return f'Aspect: ID: {self.id}, Name: {self.name}'