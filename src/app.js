const express = require('express');
const app = express();

const db = require('./utils/dataBase');
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const conversationsRouter = require('./conversations/conversations.router');
const messagesRouter = require('./messages/messages.router');
const initModels = require('./models/init.models');

const {port} = require('../config').api;

// Initial config
app.use(express.json());

// Database
db.authenticate()
    .then(() => {
        console.log('Databse authenticated')
    })
    .catch(err => {
        console.log(err)
    })
    
db.sync()
    .then(() => {
        console.log('Database synced')
    })
    .catch(err => {
        console.log(err)
    })
    
app.get('/' , (req , res) => {
    res.status(200).json({
            message: 'Ok!'
    })
})

initModels();

// Routes
app.use('/api/v1/users' , usersRouter);
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/conversations' , conversationsRouter);
app.use('/api/v1/conversations' , messagesRouter);

app.listen(port , () => {
    console.log(`Server started at port ${port}`)
})