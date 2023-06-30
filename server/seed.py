# Standard library imports
from random import randint, choice as rc
from models import User, Milestone, Aspect, user_aspects, milestone_aspects

# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db


def seed():
    # delete current db data
    db.session.query(user_aspects).delete()
    db.session.query(milestone_aspects).delete()
    User.query.delete()
    Milestone.query.delete()
    Aspect.query.delete()

    # create mock user data & milestone data
    for i in range(50):
        new_user = User(
            id=int(i + 1),
            birthday=fake.passport_dob(),
            username=fake.first_name() + fake.last_name(),
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
            aspect_id=random.randint(1, 5)
        )

        db.session.add(new_milestone)

    # seed aspects
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

    # seed data for user_aspects table based on current data
    for user_id in range(1, 51):
        milestones = Milestone.query.filter_by(user_id=user_id).all()
        for milestone in milestones:
            aspect = Aspect.query.get(random.randint(1, 4))
            user = User.query.get(user_id)
            user.aspects.append(aspect)
            db.session.add(user)
            milestone.aspects.append(aspect)
            db.session.add(milestone)

    # seed data for milestone_aspects table based on current data
    for user_id in range(1, 51):
        milestones = Milestone.query.filter_by(user_id=user_id).all()
        for milestone in milestones:
            aspect = Aspect.query.get(random.randint(1, 4))
            milestone.aspects.append(aspect)

    # commit to session
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        seed()
        print("...Seed complete!")