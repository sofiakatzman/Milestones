from random import randint
from faker import Faker

from app import app
from models import db, User, Milestone, Aspect, user_aspects, Friend

def seed():
    fake = Faker()

    # Delete current data from tables
    db.session.query(user_aspects).delete()
    Friend.query.delete()
    Milestone.query.delete()
    Aspect.query.delete()
    User.query.delete()

    # Create mock user data
    for i in range(10):
        new_user = User(
            birthday=fake.date_of_birth(minimum_age=18, maximum_age=90),
            username=(fake.first_name() + fake.last_name()).lower(),
            _password_hash="temporary"
        )
        db.session.add(new_user)
        db.session.flush()  # Flush the session to obtain the generated user ID

        new_milestone = Milestone(
            date=fake.date_this_century(),
            header=fake.text(max_nb_chars=20),
            subheader=fake.text(max_nb_chars=30),
            description=fake.text(max_nb_chars=70),
            is_private=fake.pybool(),
            user_id=new_user.id,
            aspect_id=randint(1, 5)
        )
        db.session.add(new_milestone)

    # Add friends to users
    users = User.query.all()
    for user in users:
        num_friends = randint(1, 5)  # Randomly determine the number of friends for each user
        user_friends = []

        # Randomly select friends from all users
        while len(user_friends) < num_friends:
            friend = users[randint(0, len(users)-1)]
            if friend != user and friend not in user_friends:
                user_friends.append(friend)

        # Create friendship objects and add them to the session
        for friend in user_friends:
            friendship = Friend(user_id=user.id, friend_id=friend.id)
            db.session.add(friendship)

    # Add more milestones to users
    for i in range(300):
        new_milestone = Milestone(
            date=fake.date_this_century(),
            header=fake.text(max_nb_chars=20),
            subheader=fake.text(max_nb_chars=30),
            description=fake.text(max_nb_chars=70),
            is_private=fake.pybool(),
            user_id=randint(1, 10),
            aspect_id=randint(1, 4)
        )
        db.session.add(new_milestone)

    # Seed aspects
    aspects = [
        ["1", "education", "school and other educational pursuits and accomplishments", "✏️"],
        ["2", "self growth", "self-improvement pursuits and accomplishments", "🌱"],
        ["3", "achievements", "personal goal completion", "🏆"],
        ["4", "life change", "relocation or life changes", "✈️"],
        ["5", "professional", "career changes or promotions", "💼"]
    ]

    for aspect in aspects:
        new_aspect = Aspect(
            id=aspect[0],
            name=aspect[1],
            description=aspect[2],
            icon=aspect[3],
        )
        db.session.add(new_aspect)

    # Create instances of UserAspect
    for i in range(1, 50):
        new_instance = user_aspects.insert().values(user_id=i, aspect_id=2)
        db.session.execute(new_instance)

    # Commit changes to the session
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed()
        print("Seed complete!")