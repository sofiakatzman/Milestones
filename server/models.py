from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import bcrypt, db

user_aspects = db.Table(
    'user_aspects',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('aspect_id', db.Integer, db.ForeignKey('aspects.id'), primary_key=True)
)
    

class Friend(db.Model, SerializerMixin):
    __tablename__ = 'friends'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    friend = db.relationship('User', foreign_keys=[friend_id])

    serialize_rules = ('-friend.milestones', '-friend_id' )

    def __repr__(self):
        return f'FRIEND: User ID: {self.user_id}, Friend ID: {self.friend_id}'  
      
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    birthday = db.Column(db.String)
    username = db.Column(db.String)
    admin = db.Column(db.String, default=False)
    _password_hash = db.Column(db.String)

    milestones = db.relationship('Milestone', backref=db.backref('user'), cascade='all, delete-orphan')
    aspects = db.relationship('Aspect', secondary=user_aspects, backref=db.backref('users'), cascade='all')

    serialize_rules = ('-admin', '-aspects', '-_password_hash','-milestones.user')
    
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
    is_private = db.Column(db.Boolean, default=False)   

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    aspect_id = db.Column(db.Integer, db.ForeignKey('aspects.id'))
    
    serialize_rules = ('-user.milestones', '-user', )

    def __repr__(self):
        return f'MILESTONE ID: {self.id}, DATE: {self.date}, Header: {self.header}'


class Aspect(db.Model, SerializerMixin):
    __tablename__ = "aspects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    icon = db.Column(db.String)
    
    def __repr__(self):
        return f'Aspect: ID: {self.id}, Name: {self.name}'
