# ACM Link
Built in React, Express.js, with Firebase and Firestore integration. ACM Link is a web application that allows you to search and find teammates for your group!



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements

1. Install the latest version of [Node.js](https://nodejs.org/en/ "Node.js")

### Installing

Get a development environment running. 

1. Clone the repository to your local machine ```git clone https://github.com/brilam8/ACM_Link.git```
2. Navigate to your project directory via terminal
3. Run `npm install` in two directories: `/app` and `server` to install all dependencies for both the front-end and back-end server.
4. Rename the example environment file in `/server/config/` and edit its contents for a testing environment
   - `cp .env.example .env` to rename the example environment file
   - Edit the contents to reflect the `.env` configuration displayed below
5. Run `npm run dev` to boot up your backend server in development mode.
   - Use `npm start` to regularly launch your backend server.
   - Use `npm run test` to run unit tests on your routes

#### Example .env configuration

```
FIREBASE_APIKEY=example
FIREBASE_AUTHDOMAIN=example
FIREBASE_DATABASEURL=example
FIREBASE_PROJECTID=example
FIREBASE_STORAGEBUCKET=example
FIREBASE_MESSAGINGID=example
FIREBASE_APPID=example
FIREBASE_MEASUREMENTID=example
```

You can find all of the firebase keys 

### File Hierarchy

- `/src` - main folder of the project
- `/src/database` - folder containing everything about the mongoDB database
- `/src/database/models` - folder with all database models
- `/src/routes` - contains all routes

### NOTES

- When running tests, mongod will be spun up in memory for easy tests ([mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)).
  - Otherwise, the app will attempt to connect to the MongoDB database referred to in the .env connection string variable.

