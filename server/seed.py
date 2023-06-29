#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import User, Milestone, Aspect

# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db


def seed():
    aspects = []

    # delete current db data
    User.query.delete()
    Milestone.query.delete()
    Aspect.query.delete()


    # create mock user data & milestone data
    users = []
    for i in range(50):
        new_user = User(
            id = int(i + 1),
            birthday = fake.passport_dob(),
            email = fake.free_email(),
            _password_hash = "temporary",        
            milestones = [Milestone(
                id = i + 1, 
                date = fake.date_this_century(),
                header = fake.text(max_nb_chars=20),
                subheader = fake.text(max_nb_chars=30),
                description = fake.text(max_nb_chars=70),
                is_private = False,
                user_id = i+1,
                aspect_id = random.randint(1, 4)
            )]
        )
        db.session.add(new_user)





        # create aspect data :> 💼 - professional : work experience 
    # ✏️ - education : schooling 
    # 🌱 - self growth : self improvement 
    # 🏆 - achievement : personal goal achievments 
    # ✈️ - big move : relocation or big life changes



    # class Aspect(db.Model):
    #     __tablename__ = "aspects"
    #     id = db.Column(db.Integer, primary_key=True)
    #     name = db.Column(db.String)
    #     description = db.Column(db.String)
    #     icon = db.Column(db.String)



    aspects = [
        ["1","education", "school and other educational persuits and accomplishments", "✏️"], 
        ["2","self growth", "self improvement persuits and accomplishments", "🌱"], 
        ["3", "achievements", "personal goal completion", "🏆"], 
        ["4", "life change", "relocation or life changes", "✈️"]
    ]


    for aspect in aspects:
        new = Aspect( 
            id = aspect[0],
            name = aspect[1],
            description = aspect[2],
            icon = aspect[3],
        )
        db.session.add(new)




    #commit to session 
        db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        seed()
        print("...Seed complete!")

