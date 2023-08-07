# Milestones
## Description
Welcome to "Milestones" - the platform that empowers individuals to share their unique stories by highlighting important moments in their lives. Whether it's a career achievement, an educational pursuit, a life-changing event like moving to a new place or getting married, "Milestones" provides a captivating and meaningful way for people to showcase and celebrate their journey and significant accomplishments.

Our platform allows users to create visually appealing presentations of their milestones, making it easy to share their experiences with friends, family, and the wider community. Not only can you share your own achievements, but you can also connect with others who have similar milestones or find inspiration from those with intriguing stories.

Join us on "Milestones" and become a part of a supportive and inspiring community where everyone's unique journey is celebrated and cherished. Start sharing your milestones today and forge connections with like-minded individuals who share your passions and experiences!

## Coming Soon
- Users can create "private milestones" which will only be shared with friends.
- User profiles can be viewed by non-logged in users, but only public milestones will be displayed.
- Users can customize their milestones page for when friends visit.
- Users can choose to view timelines in ascending or descending order.

## Installation
To view this project, please clone this repository locally. 
Navigate to it's directory and follow the below commands on your terminal: 

1. Clone this repository to your local machine and navigate to its directory.
2. `cd server` and then run `pipenv install` to install all the necessary backend package dependencies.
3. Run `pipenv shell` to enter the virtual environment.
4. Run `gunicorn -b 127.0.0.1:5000 --worker-class=geventwebsocket.gunicorn.workers.GeventWebSocketWorker app:app` to start the flask and websocket server. 
5. In a new terminal, from the root directory, navigate to the client folder by entering `cd client`
6. Run `npm install; npm start` to install your front end dependencies and begin your local React server. 

From here, you are able to visit: `http://localhost:4000/` and use Milestones on your browser!

For full access, please use the admin account. 

Username: admin
Password: cow 

## Usage Visuals
You can view a video walkthrough [here](https://youtu.be/23grUYcH2Qw) 

## Support
For any questions or support, please reach out to katzmansof@gmail.com.

