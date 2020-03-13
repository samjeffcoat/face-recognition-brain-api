const express = require('express');

const server = express();


server.get('/', (req, res) => {
    res.send('This is working!')
})

server.listen(3000, () => {
    console.log('App is running on port 3000!')
})