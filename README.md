
This is a full web application stack (front end and back end) using MongoDB, Express, React and Node (MERN). The application fetches data from MongoDB and displays the results. The user can look at a list of player cards that shows the players profile image. Under shows the players name, team they play for, the players postion and a button link to view more information about the player and to edit or delete the player . The user can filter how the list of player cards appear, either by wether the player is male or female, by the players citizenship and by players surname names from a-z. The user can also search for a specfic player and view that players card. 

If a player card in the list is clicked where the link that says "view players information" then more details on the player will be displayed on a differnt page.

If a user is logged in then they can edit or delete players from the database.

To downlaod and use this application:

# Clone the repository
git clone https://github.com/letmon1994/mern-stack-app

# Go inside the directory
cd mern-stack-app

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# ABOVE is sufficient for development
# BELOW ONLY if preparing for production:

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)

The application was created using [MongoDB],(https://www.mongodb.com/) [Express],(https://expressjs.com/) [React],(https://reactjs.org/) [Node](https://nodejs.org/en/) and it was styled using [Bulma](https://bulma.io/).

My application is hosted on Heroku: [My Application](https://mern-full-stack-final.herokuapp.com/).
