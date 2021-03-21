# ACM Link
Built in React, Express.js, with Firebase and Firestore. ACM Link is a web application that allows you to search and find teammates for your group!



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements

1. Install the latest version of [Node.js](https://nodejs.org/en/ "Node.js")

### Installing

Get a development environment running. 

1. Clone the repository to your local machine ```git clone https://github.com/brilam8/ACM_Link.git```
2. Navigate to your project directory via terminal
3. Run `npm install` in two directories: `/app` and `/server` to install all dependencies for both the front-end and back-end server.
4. Rename the example environment file in `/server/config/` and edit its contents for a testing environment
   - `cp .env.example .env` to rename the example environment file
   - Edit the contents to reflect the `.env` configuration displayed below
5. Run `npm start` in the `/app` directory to start the front-end server.
6. Run `npm run server` in the `/server` directory to boot up the back-end server.

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

You can find all of the firebase keys after you create an account and app [here](https://firebase.google.com/)

### File Hierarchy

- `/app` - main folder for front-end infrastructure
- `/app/src` - folder containing all front-end components and functionality
- `/server` - main folder for back-end infrastructure
- `/server/config` - folder with all configuration files for databases/firebase
- `/server/functions` - contains all routes
