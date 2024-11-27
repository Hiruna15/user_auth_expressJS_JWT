User Authentication REST API

This project provides a secure user authentication system built with Express.js, JWT, and MongoDB. It includes:
 - User Registration and Login
 - Access and Refresh Tokens
 - Password Security: Uses the Node.js crypto library to hash passwords

Project Setup Guide
  - Clone the Repository
  - navigate to the project folder
  - Install Dependencies (run npm install)
  - Create a .env file in the root of your project with the following contents:
        PORT=<PORT_NUMBER>
        MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
  - Generate Public and Private Key Pair
        Before running the project, you need to generate the public and private key pair for JWT signing.
        Run the following command to generate the keys:
            node generateKeyPair.js (This will create 4 files)
  - Set Up MongoDB
        Make sure you have a MongoDB database running. If you're using MongoDB Atlas, ensure the connection string in the .env file is correct and the cluster is accessible.
        If you're using a local MongoDB setup, replace the MONGO_URI value with your local MongoDB URI.
  - Run the Project
        npm start

API Endpoints
  POST - /api/v1/users/register
  POST - /api/v1/users/login
  POST - /api/v1/users/logout
  GET  - /api/v1/test/protected

Additional Notes
  Ensure that generateKeyPair.js is executed before running the project to generate the necessary keys for JWT signing and verification.

  
