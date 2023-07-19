from flask import request, jsonify, make_response, abort
from flask_restful import Resource
from config import db, app, session, api
from models import User, Friend, Aspect, Milestone
from sqlalchemy.exc import IntegrityError

app.secret_key = b'\xb2k|\xca"e\xc9\xc8\x98\xb3\x1d\x973u\xab\xf6'

@app.route('/')
def index():
    return '<h1>Milestone Database</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)
    
    def post(self):
        form_json = request.get_json()
        new_user = User(username=form_json['username'], birthday=form_json['birthday'])
        
        # Hashes our password and saves it to _password_hash
        new_user.password_hash = form_json['password']

        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
    
    def delete(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            abort(404, 'User not found')

        db.session.delete(user)
        db.session.commit()
        response = make_response(
            user.to_dict(), 
            204
        )
        return response
    
    def patch(self, user_id):
        form_json = request.get_json()
        user = User.query.filter_by(id=user_id).first()
        user.username = form_json['username']
        db.session.commit()
        response = make_response(
            user.to_dict(), 
            204
        )
        return response

api.add_resource(Users, '/users/<int:user_id>', endpoint='users')

class Friends(Resource):
    def get(self):
        friends = [friend.to_dict() for friend in Friend.query.all()]
        return jsonify(friends)
    
    def post(self, user_id):
        # Get the user trying to create a friendship
        user = User.query.get(user_id)
        if not user:
            abort(404, 'User not found')

        # Get the friend user ID from the request data
        data = request.get_json()
        friend_id = data.get('friend_id')

        # Get the friend user
        friend = User.query.get(friend_id)
        if not friend:
            abort(404, 'Friend user not found')

        # Check if the friendship already exists # if so => delete the friendship 
        friendship_check = Friend.query.filter_by(user=user, friend=friend).first()
        if friendship_check:
            db.session.remove(friendship)
            db.session.commit()

            return jsonify({'message': 'Friendship deleted'}), 201
            
        # Otherwise, create the friendship
        else: 
            friendship = Friend(user=user, friend=friend)
            db.session.add(friendship)
            db.session.commit()

        return jsonify({'message': 'Friendship created'}), 201

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

class AspectView(Resource):
    def get(self):
        return Aspects().get()

    def post(self):
        return Aspects().post()

class Milestones(Resource):
    def get(self):
        milestones = [milestone.to_dict() for milestone in Milestone.query.all()]
        return jsonify(milestones)

    def post(self):
        request_json = request.get_json()
        new_milestone = Milestone(
            header=request_json.get('header'),
            subheader=request_json.get('subheader'),
            description=request_json.get('description'),
            date=request_json.get('date'),
            aspect_id=request_json.get('aspect_id'),
            is_private=request_json.get('is_private'),
            user_id=request_json.get('user_id')
        )
        try:
            db.session.add(new_milestone)
            db.session.commit()
            
            response_dict = new_milestone.to_dict()
            response = make_response(
                jsonify(response_dict), 
                201
            )
            return response
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
    def delete(self, milestone_id):
        milestone = Milestone.query.filter_by(id=milestone_id).first()
        if not milestone:
            abort(404, 'Milestone not found')

        db.session.delete(milestone)
        db.session.commit()
        return {'message': 'Milestone deleted successfully'}, 204
    
@app.route('/milestone/<user_id>')
def user(user_id):
    milestones = Milestone.query.filter_by(user_id=user_id).all()
    if milestones:
        milestone_list = [milestone.to_dict() for milestone in milestones]
        return jsonify(milestone_list)
    else:
        return jsonify({'error': 'User not found'})
    
class MilestonesView(Resource):
    def get(self):
        return Milestones().get()

    def post(self):
        return Milestones().post()

class FriendsView(Resource):
    def get(self):
        return Friends().get()

    def post(self):
        return Friends().post()
    


class Login(Resource):
    def post(self):
        try:
            request_json = request.get_json()
            username = request_json['username']
            password = request_json['password']
            user = User.query.filter_by(username=username).first()
            
            if user and user.authenticate(password):
                session['user_id'] = user.id
                response = make_response(user.to_dict(), 200)
                return response
            else:
                abort(401, "Incorrect username or password")
        except:
            abort(401, "Incorrect username or password")


class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {'error': 'Username already exists'}, 409
        birthday = request_json.get('birthday')
        
        user = User(
            username=username,
            birthday=birthday
        )
        user.password_hash = request_json['password']

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except:
            return {'error': '422 Unprocessable Entity'}, 422

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
            
class Logout(Resource):
    def delete(self):
        session['user_id']=None 
        response = make_response('', 204)
        return response     
    

# Resource endpoints
api.add_resource(Milestones, '/milestones/<int:milestone_id>', endpoint='milestones')
api.add_resource(Users, '/users/<int:user_id>', endpoint='users')

api.add_resource(Friends, '/users/<int:user_id>/friends', endpoint='friends')


api.add_resource(AspectView, '/aspects')
api.add_resource(FriendsView, '/friends')

# Functional resource endpoints
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Signup, '/signup')



api.add_resource(AuthorizedSession, '/authorized')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
