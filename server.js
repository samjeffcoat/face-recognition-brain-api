const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const server = express();
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "samjeffcoat",
        password: "",
        database: "smart-brain"
    }
});



server.use(
    express.urlencoded({
        extended: false
    })
);
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send(database.users);
});

server.post("/signin", (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
})
server.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

server.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db)
})

server.put("/image", (req, res) => {
    image.handleImage(req, res, db)
})


server.listen(3000, () => {
    console.log("App is running on port 3000!");
});