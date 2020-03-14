const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const server = express();
const cors = require("cors");

server.use(
    express.urlencoded({
        extended: false
    })
);
server.use(express.json());
server.use(cors());

const database = {
    users: [{
            id: "123",
            name: "sam",
            email: "samjeffcoat@gmail.com",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "josh",
            email: "joshjeffcoat@gmail.com",
            entries: 0,
            joined: new Date()
        }
    ]
};

server.get("/", (req, res) => {
    res.send(database.users);
});

server.post("/signin", (req, res) => {
    bcrypt.compare(
        "lance",
        "$2a$10$.l/Va8TLyR9NkzYjtVrqy.zfCTlIc0YuSKby10LYl0BE7Uhl1vUde",
        function (err, res) {
            console.log("first guess", res);
        }
    );
    bcrypt.compare(
        "veggies",
        "$2a$10$.l/Va8TLyR9NkzYjtVrqy.zfCTlIc0YuSKby10LYl0BE7Uhl1vUde",
        function (err, res) {
            console.log("second guess", res);
        }
    );

    if (
        (req.body.email =
            database.users[0].email &&
            req.body.password === database.users[0].password)
    ) {
        res.json(database.users[0]);
    } else {
        res.status(400).json("error loggin in");
    }
});

server.post("/register", (req, res) => {
    const {
        email,
        name,
        password
    } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: "123",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

server.get("/profile/:id", (req, res) => {
    const {
        id
    } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json("not found!");
    }
});

server.put("/image", (req, res) => {
    const {
        id
    } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json("not found!");
    }
});
bcrypt.hash("bacon", null, null, function (err, hash) {
    // Store hash in your password DB.
});

// //Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

server.listen(3000, () => {
    console.log("App is running on port 3000!");
});