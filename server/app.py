from config import db, app, api, socketio
from flask import request, jsonify, make_response, abort, session, render_template
from flask_socketio import emit
from flask_restful import Resource
from models import User, Friend, Aspect, Milestone
from sqlalchemy.exc import IntegrityError
import ipdb 
import logging
from dotenv import load_dotenv

# @app.route('/')
# def index():
#     return '<h1>Milestone Database</h1>'

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

api.add_resource(Users, '/api/users/<int:user_id>', endpoint='users')

class Friends(Resource):
    def get(self, user_id):
        # Get the logged-in user
        user = User.query.get(user_id)
        if not user:
            abort(404, 'User not found')

        # Fetch the friends of the logged-in user
        friends = [{"friend_id": friend.friend.id, 
                    "username": friend.friend.username, 
                    "birthday": friend.friend.birthday} 
                    
                    for friend in user.friends]
        return jsonify(friends)
    
    def post(self, user_id):
        # Get the user trying to create a friendship
        user = User.query.get(user_id)
        if not user:
            abort(404, 'User not found')

        # Get the friend user ID from the request data
        form_data = request.get_json()
        friend_id = form_data.get('friend_id')

        # Get the friend user
        friend = User.query.get(friend_id)
        if not friend:
            abort(404, 'Friend user not found')

        # Check if the friendship already exists, if so => delete the friendship
        friendship_check = Friend.query.filter_by(user=user, friend=friend).first()
        if friendship_check:
            db.session.delete(friendship_check)
            db.session.commit()

            print('Friendship deleted')
            return {'message': 'Friendship deleted'}, 200

        # Otherwise, create the friendship
        else: 
            friendship = Friend(user=user, friend=friend)
            db.session.add(friendship)
            db.session.commit()

            print('Friendship created')
            return {'message': 'Friendship created'}, 201

    
    def delete(self, user_id):
        # Get the logged-in user
        user = User.query.get(user_id)
        if not user:
            abort(404, 'User not found')

        # Get the friend user ID from the request data
        form_data = request.get_json()
        friend_id = form_data.get('friend_id')

        # Get the friend user
        friend = User.query.get(friend_id)
        if not friend:
            abort(404, 'Friend user not found')

        # Check if the friendship exists
        friendship_check = Friend.query.filter_by(user=user, friend=friend).first()
        if friendship_check:
            # Delete the friendship
            db.session.delete(friendship_check)
            db.session.commit()

            return {'message': 'Friendship deleted'}, 200
        else:
            # If the friendship does not exist, return an error
            abort(404, 'Friendship not found')
    
api.add_resource(Friends, '/api/users/<int:user_id>/friends', endpoint='friends')    

class FriendsView(Resource):
    def get(self):
        return Friends().get()

    def post(self):
        return Friends().post()
    
api.add_resource(FriendsView, '/api/friends')

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

api.add_resource(AspectView, '/api/aspects')

class Milestones(Resource):
    def get(self):
        milestones = [milestone.to_dict() for milestone in Milestone.query.all()]
        return jsonify(milestones)

    def delete(self, milestone_id):
        milestone = Milestone.query.filter_by(id=milestone_id).first()
        if not milestone:
            abort(404, 'Milestone not found')

        db.session.delete(milestone)
        db.session.commit()
        return {'message': 'Milestone deleted successfully'}, 204

api.add_resource(Milestones, '/api/milestones/<int:milestone_id>', endpoint='milestones')

@socketio.on('new_milestone')
# this function is called when a new_milestone event is received -> from create_milestone
def handle_new_milestone(data):
    emit('new_milestone', data)

@app.route('/api/milestones', methods=['POST'])
def create_milestone():
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
        
        # Emit the 'new_milestone' event to WebSocket server
        socketio.emit('new_milestone', response_dict, namespace='/')     

        return response
    
    except IntegrityError:
        return {'error': '422 Unprocessable Entity'}, 422
    
@app.route('/api/milestone/<user_id>')
def user(user_id):
    milestones = Milestone.query.filter_by(user_id=user_id).all()
    if milestones:
        milestone_list = [milestone.to_dict() for milestone in milestones]
        return jsonify(milestone_list)
    else:
        return jsonify({'error': 'User not found'})
    
@app.route('/api/milestones', methods=['GET'])
def get_all_milestones():
    milestones = [milestone.to_dict() for milestone in Milestone.query.all()]
    return jsonify(milestones)

class MilestonesById(Resource):
    def patch(self, milestone_id):
        form_json = request.get_json()

        milestone = Milestone.query.get(milestone_id)
        if not milestone:
            return {'message': 'Milestone not found'}, 404

        # Update the milestone fields with the provided data
        fields_to_update = {
            'header': form_json.get('header', milestone.header),
            'subheader': form_json.get('subheader', milestone.subheader),
            'description': form_json.get('description', milestone.description),
            'date': form_json.get('date', milestone.date),
            'aspect_id': form_json.get('aspect_id', milestone.aspect_id)
        }

        for field, value in fields_to_update.items():
            setattr(milestone, field, value)

        db.session.commit()
        return {'message': 'Milestone updated successfully'}, 200

api.add_resource(MilestonesById, '/api/milestones/<int:milestone_id>') 
    
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

api.add_resource(Login, '/api/login')

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

api.add_resource(Signup, '/api/signup')

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

api.add_resource(AuthorizedSession, '/api/authorized')

class Logout(Resource):
    def delete(self):
        session['user_id']=None 
        response = make_response('', 204)
        return response     
    
api.add_resource(Logout, '/api/logout')

# react front end routes 
@app.route('/')
@app.route('/feed')
@app.route('/friends')
@app.route('/create')
@app.route('/aspects')
@app.route('/settings')
@app.route('/timelines')
@app.route('/edit/milestone/:milestoneId')
@app.route('/timelines/:user_id')
@app.route('/user/logout')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=False)
