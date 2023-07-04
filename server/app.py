from flask import request, jsonify, make_response, session, abort
from flask_restful import Resource, MethodView
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from config import db, app, api
from models import User, Milestone, Aspect

app.secret_key = b'@~xH\xf2\x10k\x07hp\x85\xa6N\xde\xd4\xcd'

@app.route('/')
def index():
    return '<h1>Milestone Database</h1>'

# this is for testing purposes
@app.route('/timeline/<username>')
def user(username):
    return f'<h1>Profile for {username}</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)
    
    def post(self):
        form_json = request.get_json()
        new_user = User(username=form_json['username'], birthday=form_json['birthday'])
        #Hashes our password and saves it to _password_hash
        new_user.password_hash = form_json['password']

        db.session.add(new_user)
        db.session.commit()
        
        response = make_response(
            new_user.to_dict(),
            201
        )
        session["user_id"] = new_user.username
        return response
 
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
        request_json = request.get_json()
        new = Milestone(
            header=request_json.get('header'),
            subheader=request_json.get('subheader'),
            description=request_json.get('description'),
            date=request_json.get('date'),
            aspect_id=request_json.get('aspect_id'),
            is_private=request_json.get('is_private'),
            user_id=request_json.get('user_id')
        )
        try:
            db.session.add(new)
            db.session.commit()
            
            response_dict = new.to_dict()
            response = make_response(
                jsonify(response_dict), 
                201
            )
            return response
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class MilestonesView(MethodView):
    def __init__(self):
        self.milestones_resource = Milestones()

    def get(self):
        return self.milestones_resource.get()

    def post(self):
        return self.milestones_resource.post()

class Logout(Resource):
    def delete(self):
        session["user_id"] = None 
        response = make_response('Logged Out',204)
        return response
api.add_resource(Logout, '/logout')    
class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(username=request.get_json()['username']).first()
            if user.authenticate(request.get_json()['password']):
                response = make_response(
                    user.to_dict(),
                    200
                )
                session["user_id"] = user.id
                return response
        except:
            abort(401, "Incorrect Username or Password")



api.add_resource(Milestones, '/milestones', endpoint='milestones')
api.add_resource(Users, '/users', endpoint='users')
app.add_url_rule('/aspects', view_func=AspectView.as_view('aspects'))

api.add_resource(Login, '/login')

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




# @app.errorhandler(NotFound)
# def handle_not_found(e):
#     response = make_response(
#         "Not Found: Sorry the resource you are looking for does not exist",
#         404
#     )

#     return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)
