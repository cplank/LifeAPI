# In Their Shoes API

This is the API to support the [In Their Shoes](https://github.com/aprilleperez/realgameoflife_client) project. It uses Node.js with Express.js and a MongoDB database with Mongoose.

## Routes

Anyone can play **In Their Shoes**, but in order to create your own game, you'll need to be logged in. Once users are logged in, they can:
* Create a new game
* Edit or delete an existing game
* Launch their custom game for play
----

# [In Their Shoes](https://github.com/aprilleperez/realgameoflife_client)

**In Their Shoes** is a Jackbox style game designed as a training tool for nonprofits to lead discussions on privilege and equity. It's a question and answer style game and hosts can either launch the default game or log in and create their own custom game to play.

The game is launched through a *host* device (ideally a device that can be connected to a large monitor or screen) and players join on their mobile devices to play.The *host* device displays the lobby where players wait until everyone has joined, the questions during the game, and the results at the end of the game. Players can choose their avatar, answer the questions, and see their personal results at the end of the game. 

The default game is a basic intro to the idea of privilege and follows five avatars as they encounter typical life events such as graduating high school or starting a new job. Each avatar has stats that affect which responses are available to them. For example, a question might be: 

<i>Q: You've graduated high school! What's next?</i>

And there might be four responses: 

- <i>Get your GED and start a job</i>
- <i>Begin trade school or community college</i>
- <i>Go to a public university for college</i>
- <i>Attend a private college</i>

Every player can see all four responses, however, depending on a player's avatar, it's possible not all responses will be available to them. If a player doesn't have a high enough wealth stat, for example, private college might be unavailable to them. 

Once player's pick their responses, they then see the outcome of their choice. A player who is able to attend public college for example, might see their wealth stat go down but their education stat go up. 

At the end of the game, player's can see how well their avatars did over the course of the game. 

## Playing Real Game of Life
[You can launch a game here!](https://aprilleperez.github.io/realgameoflife_client/)

## Game Breakdown
The game is broken into three sections: 

* Backend - stores user information and all created games. **You are currently in the repo for the backend of In Their Shoes**

* Admin - This is where users can log in to make their own version of the game, and the primary purpose of this project. Here, an admin can make a completely new version of the game based on the experiences and decisions available or unavailable to the communities they serve. [You can find the repo here!](https://github.com/aprilleperez/realgameoflife_admin)

* Player - The main landing page for the project and where a host can begin either a default game, or log in to create their own game. Once a host has started a game (either default or their own), one device serves as the "host" - where players see the lobby, the questions, and the end results of the game. [You can find the repo here!](https://github.com/aprilleperez/realgameoflife_client)

## Built with
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose)

## Other Dependencies 
- [Axios](https://www.npmjs.com/package/axios)
- [CORS](https://www.npmjs.com/package/cors)

## Authors
* [James Dizon](https://github.com/jamesssd)
* [Aprille Perez](https://github.com/aprilleperez)
* [Carrie Plank](https://github.com/cplank)
* [Abram Thau](https://github.com/Glacian22) 