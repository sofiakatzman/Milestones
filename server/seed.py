from random import randint
from faker import Faker
import random

from app import app
from models import db, User, Milestone, Aspect, user_aspects

def seed():
    # Delete current data from tables
    db.session.query(user_aspects).delete()
    User.query.delete()
    Milestone.query.delete()
    Aspect.query.delete()

    fake = Faker()

    # Create mock user data
    for i in range(10):
        new_user = User(
            id=i + 1,
            birthday=fake.passport_dob(),
            username=(fake.first_name() + fake.last_name()).lower(),
            _password_hash="temporary"
        )
        db.session.add(new_user)

        new_milestone = Milestone(
            id=i + 1,
            date=fake.date_this_century(),
            header=fake.text(max_nb_chars=20),
            subheader=fake.text(max_nb_chars=30),
            description=fake.text(max_nb_chars=70),
            is_private=fake.pybool(),
            user_id=i + 1,
            aspect_id=random.randint(1, 4)
        )
        db.session.add(new_milestone)

    # Add more milestones to users
    for i in range(300):
        new_milestone = Milestone(
            id=i + 11,
            date=fake.date_this_century(),
            header=fake.text(max_nb_chars=20),
            subheader=fake.text(max_nb_chars=30),
            description=fake.text(max_nb_chars=70),
            is_private=fake.pybool(),
            user_id=random.randint(1, 10),
            aspect_id=random.randint(1, 4)
        )
        db.session.add(new_milestone)

    # Seed aspects
    aspects = [
        ["1", "education", "school and other educational pursuits and accomplishments", "✏️"],
        ["2", "self growth", "self-improvement pursuits and accomplishments", "🌱"],
        ["3", "achievements", "personal goal completion", "🏆"],
        ["4", "life change", "relocation or life changes", "✈️"]
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
