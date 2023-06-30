from flask import Flask, request, make_response, session, jsonify, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource, MethodView
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import bcrypt, db, app, api
from models import User, Milestone, Aspect


@app.route('/')
def index():
    return '<h1>Milestone Database</h1>'

@app.route('/timeline/<username>')
def user(username):
    return f'<h1>Profile for {username}</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)
    
    def post(self):
        request_json = request.get_json()

        id = request_json.get('id')
        birthday = request_json.get('birthday')
        username = request_json.get('username')
        _password_hash = request_json.get('_password_hash')
        admin = request_json.get('admin')
        milestones = request_json.get('milestones')

        new_user = User(
            id = id,
            birthday = birthday,
            username = username,
            _password_hash = _password_hash,
            admin = admin,
            milestones = milestones
        )
      
        try:
            db.session.add(new_user)
            db.session.commit()

            return {'message': 'Your aspect has been saved to the database.'}, 201

        except IntegrityError:
            return {'error': '422 Unprocessable entity'}, 422

class Aspects(Resource):
    def get(self):
        aspects = [aspect.to_dict() for aspect in Aspect.query.all()]
        return jsonify(aspects)

    def post(self):
        request_json = request.get_json()

        id = request_json.get('id')
        name = request_json.get('name')
        description = request_json.get('description')
        icon = request_json.get('icon')

        new_aspect = Aspect(
            id=id,
            name=name,
            description=description,
            icon=icon
        )

        try:
            db.session.add(new_aspect)
            db.session.commit()

            return {'message': 'Your aspect has been saved to the database.'}, 201

        except IntegrityError:
            return {'error': '422 Unprocessable entity'}, 422

class AspectView(MethodView):
    def __init__(self):
        self.aspects_resource = Aspects()

    def get(self):
        return self.aspects_resource.get()

    def post(self):
        return self.aspects_resource.post()
    
class Milestones(Resource):
    def get(self):
        milestones = [milestone.to_dict() for milestone in Milestone.query.all()]
        return jsonify(milestones)

    def post(self):
        pass

class MilestonesView(MethodView):
    def __init__(self):
        self.milestones_resource = Milestones()

    def get(self):
        return self.milestones_resource.get()

    def post(self):
        return self.milestones_resource.post()


api.add_resource(Users, '/users', endpoint='users')
app.add_url_rule('/aspects', view_func=AspectView.as_view('aspects'))
api.add_resource(Milestones, '/milestones', endpoint='milestones')

# signup and login / logout resources below - not yet ready for these 


# class Signup(Resource):
#     def post(self):
#         form_json = request.get_json()
#         new_user = User(name=form_json['name'], email=form_json['email'])
#         #Hashes our password and saves it to _password_hash
#         new_user.password_hash = form_json['password']

#         db.session.add(new_user)
#         db.session.commit()

#         response = make_response(
#             new_user.to_dict(),
#             201
#         )
#         return response
# api.add_resource(Signup, '/signup')

# class Login(Resource):
#     def post(self):
#         try:
#             user = User.query.filter_by(name=request.get_json()['name']).first()
#             if user.authenticate(request.get_json()['password']):
#                 session['user_id'] = user.id
#                 response = make_response(
#                     user.to_dict(),
#                     200
#                 )
#                 return response
#         except:
#             abort(401, "Incorrect Username or Password")
# api.add_resource(Login, '/login')

# class AuthorizedSession(Resource):
#     def get(self):
#         try:
#             user = User.query.filter_by(id=session['user_id']).first()
#             response = make_response(
#                 user.to_dict(),
#                 200
#             )
#             return response
#         except:
#             abort(401, "Unauthorized")
# api.add_resource(AuthorizedSession, '/authorized')


# class Logout(Resource):
#     def delete(self):
#         session['user_id'] = None 
#         response = make_response('',204)
#         return response
# api.add_resource(Logout, '/logout')


# @app.errorhandler(NotFound)
# def handle_not_found(e):
#     response = make_response(
#         "Not Found: Sorry the resource you are looking for does not exist",
#         404
#     )

#     return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)
