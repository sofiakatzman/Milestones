# Milestones
## Description
"Milestones" is a presents a timeline of personal events, offering various filters like "professional," "achievement," and "personal" to categorize different aspects of one's life. It serves as a platform for individuals to showcase their story through significant milestones such as career accomplishments, educational pursuits, life-changing experiences like relocations or marriages, and more. 

Users can: 
- Create an account
- Create milestones 
- Delete milestones 
- Create milestone aspects 
- Edit their username 
- Delete their account 
- View other's timelines * 

* Admin account features 'friends view'. Credentials can be found in "Installation"
New users will not have this ability until next update.



Coming Soon: 
- Users can selectively share specific filters, allowing friends, recruiters and others to gain insights into their unique journey and understand who they are on a deeper level.
- Users can add other users as friends.
- User updates for friends are displayed on home page. 
- Users can customize their milestones page for when friends visit.
- Users can choose to view timelines in ascending or descending order. 
- User profiles can be view by non-logged in users, but only public milestones will be displayed. 

## Installation
To view this project, please clone this repository locally. 
Nacivage to it's directory and follow the below commands on your terminal: 

1. Clone this repository to your local machine and navigate to its directory.
2. `cd server` and then run `pipenv install` to install all the necessary backend package dependencies.
3. Run `pipenv shell` to enter the virtual environment.
4. Run `gunicorn -b 127.0.0.1:5000 --worker-class=geventwebsocket.gunicorn.workers.GeventWebSocketWorker app:app` to start the flask and websocket server. 
5. In a new terminal, from the root directory, navigate to the client folder by entering `cd client`
6. Run `npm install; npm start` to install your front end dependencies and begin your local React server. 

From here, you are able to visit: local... and use Milestones on your browser!

For full access and preview of new features, please use the admin account. 

Username: admin
Password: cow 

## Usage Visuals
You can view a video walkthrough [here](https://youtu.be/iv43I4S-bUc) 

## Acknowledgement

## Support
For any questions or support, please reach out to katzmansof@gmail.com.

