const express = require('express');


const server = express();

server.use(express.urlencoded({
    extended: false
}));
server.use(express.json());

const database = {
    users: [{
        id: '123',
        name: 'sam',
        email: 'samjeffcoat@gmail.com',
        password: 'Jake1234',
        entries: 0,
        joined: new Date()
    }, {
        id: '124',
        name: 'josh',
        email: 'joshjeffcoat@gmail.com',
        password: 'Brodie1234',
        entries: 0,
        joined: new Date()

    }]
}


server.get('/', (req, res) => {
    res.send(database.users)
})

server.post('/signin', (req, res) => {
    if (req.body.email = database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error loggin in')
    }
})

server.post('/register', (req, res) => {
    const {
        email,
        name,
        password
    } = req.body;
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

server.get('/profile/:id', (req, res) => {
    const {
        id
    } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found!')
    }
})

server.put('/image', (req, res) => {
    const {
        id
    } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found!')
    }
})



server.listen(3000, () => {
    console.log('App is running on port 3000!')
})