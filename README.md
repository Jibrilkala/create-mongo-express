# Create Mongo Express

[![npm version](https://badge.fury.io/js/create-mongo-express.svg)](https://badge.fury.io/js/create-mongo-express)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A simple yet powerful CLI tool that automates the setup of an Express.js application with MongoDB connection. You can swiftly generate a fully configured Express.js project, complete with preconfigured routes and seamless integration with MongoDB.

## Installation

Install the package using npm:

```bash
npx create-mongo-express
```

## Choose project name

```bash
Enter the project name (e.g., express-server):
```

## Connect MongoDB

```bash
Enter the MongoDB URI:
```

Make sure your mongoDB URI is in the format below.

```basg
mongodb+srv://mongoDbUser:mongoDbUserPass@cluster0.s938843o0.mongodb.net/databaseName?retryWrites=true&w=majority
```

Next, you need to:

```basg
cd project-name
```

And run:

```basg
npm run dev
```

Your server will run on port 3500.
You can change the port in server.js at the root folder.
