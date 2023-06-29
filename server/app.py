from flask import Flask, request, make_response, session, jsonify, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound, Unauthorized
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import User, Milestone, Aspect, db

app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = b'@~xH\xf2\x10k\x07hp\x85\xa6N\xde\xd4\xcd'

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

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

api.add_resource(Users, '/users', endpoint='users')

#api classes go here 

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

class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(name=request.get_json()['name']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except:
            abort(401, "Incorrect Username or Password")
api.add_resource(Login, '/login')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")
api.add_resource(AuthorizedSession, '/authorized')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
api.add_resource(Logout, '/logout')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)
