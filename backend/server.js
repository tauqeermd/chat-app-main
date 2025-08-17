// import express from 'express';

// import dotenv from "dotenv";
// // const express = require('express');
// // const dotenv = require('dotenv');
// import authRoutes from "./routes/auth.routes.js";

// const app = express();

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) =>{
//     // root route: "http://localhost:5000/"
//     res.send("Hello world");
// });

// // // diff routes - later made better using express
// // app.get("/api/auth/signup", (req, res) => {
// //     console.log("sign up route"); // this is a controller
// //     // it controls what happens when we hit /api/auth/signup route
// // });

// // app.get("/api/auth/login", (req, res) => {
// //     console.log("log in route");
// // });
// // app.get("/api/auth/logout", (req, res) => {
// //     console.log("log out route"); 
// // });

// app.use("/api/auth", authRoutes) // use api.use for creating middlewares;
// app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

// package import
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// database import
import connectToMongoDB from './db/connectToMongoDB.js';
// import the app from socket.js file
import { app, server } from './socket/socket.js';
// routes
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import passwordRoutes from './routes/password.routes.js';

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;
// have to use express.json and cookieParser before using authRoute or messageRoute middleware or it will create headache for you

app.use(express.json()); // to parse incoming reqs with json payloads (from req.body) 
app.use(cookieParser()); // middleware to access cookies in protectRoute middleware;

app.use("/api/auth", authRoutes); // middleware for user authentication- signup, login, logout
app.use("/api/messages", messageRoutes); // middleware for messages
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes); // middleware for password reset functionality

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

// app.get("/", (req, res) => {
//     res.send("Hello world");
// });


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
