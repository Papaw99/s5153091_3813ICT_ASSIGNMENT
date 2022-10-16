const express = require('express');
const app = express()
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient
var dbUrl = "mongodb://localhost:27017/"

// mongoDB connection
var client = new MongoClient(dbUrl)
var database = client.db("chat_db")

app.use(bodyParser.json())
app.use(cors()) //CORS


//Establishing server
const path = require('path');
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  })

app.use(express.static(path.join(__dirname, '../dist/s5153091-3813-ict-assignment')))

// Database collections
let users = database.collection("users")
let usersArray = users.find({}).toArray()
let usersLength = users.countDocuments()
let groups = database.collection("groups")
let groupsLength = groups.countDocuments()
let groupMemberships = database.collection("groupMemberships")
let channels = database.collection("channels")
let channelsLength = channels.countDocuments()
let channelMemberships = database.collection("channelMemberships")

// Server listens on port 3000
http.listen(3000, '127.0.0.1', function(){
    console.log('server has been started')
})

// User authentication API
app.post('/api/auth', function(req, res){

    var result = ""
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    // Users array derived from mongoDB is iterated through to ensure users names and passwords match an existing user
    usersArray.then( value=> {
        for (let i=0; i < value.length; i++){
            if(req.body.userName != value[i].userName || req.body.password != value[i].password){
            result = {"valid": false}
            continue; 
        }
        else {
            value[i].valid = true
            result = value[i]
            break;
        }
    }
    res.send(result)
    })
})

// Create user API
app.post('/api/createUser', function(req, res){
    var userID
    let newUser

    // Creating a new user in the MongoDB database
    usersLength.then(value=>{
        userID = value
        newUser = {"userName": req.body.userName, "email": req.body.email, "userID": userID, "role": req.body.role, "password": req.body.password, "valid": false}
        users.insertOne(newUser)
        usersLength = users.countDocuments()
    })
})

// Fetching users from MongoDB database
app.get('/api/getUsers', function(req, res){
    users.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

// Fetching groups from MongoDB database
app.get('/api/getGroups', function(req, res){
    groups.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

// Fetching group membership data from MongoDB database. This helps the app figure out which groups a user is assigned to
app.get('/api/getGroupMemberships', function(req, res){
    groupMemberships.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

// Updating a users role in the app
app.post('/api/changeRole', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }
    // Updating users collection
    users.updateOne({userName: req.body.userName}, { $set: {role: req.body.role } })

})

// Deleting a user from the MongoDB database
app.post('/api/deleteUser', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }
    // Deleting user from collection
    users.deleteOne({userName: req.body.userName})

})

// API to delete groups from the MongoDB database.
app.post('/api/deleteGroup', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }
    // Deleting group from MongoDB database
    groups.deleteOne({groupID: parseInt(req.body.groupID)})

})

// API to create a group
app.post('/api/createGroup', function(req, res){
    
    var groupID
    let newGroup
    groupsLength.then(value=>{
        groupID = value
        newGroup = {"groupID": groupID, "groupName": req.body.groupName}
        groups.insertOne(newGroup)
        groupsLength = groups.countDocuments()
    })
})

// API to get all channels
app.get('/api/getChannels', function(req, res){
    channels.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

// API to get channel membership data which shows users and the channels they are a part of
app.get('/api/getChannelMemberships', function(req, res){
    channelMemberships.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

// Delete channel API
app.post('/api/deleteChannel', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    channels.deleteOne({channelID: parseInt(req.body.channelID)})
})

// API to create a new channel
app.post('/api/createChannel', function(req, res){
    var channelID
    let newChannel
    channelsLength.then(value=>{
        channelID = value
        newChannel = {"channelID": channelID, "groupID": parseInt(req.body.groupID), "channelName": req.body.channelName}
        channels.insertOne(newChannel)
        channelsLength = channels.countDocuments()
    })
})

// API to add a user to a group in the MongoDB database
app.post('/api/addToGroup', function(req, res){
    let newGroupMemberships = {"userID":  parseInt(req.body.userID), "groupID": parseInt(req.body.groupID), "role": "member"}
    groupMemberships.insertOne(newGroupMemberships)
})

// API to add a user to a channel in the MognoDB database
app.post('/api/addToChannel', function(req, res){
    let newChannelMemberships = {"userID": parseInt(req.body.userID), "channelID": parseInt(req.body.channelID)}
    channelMemberships.insertOne(newChannelMemberships)
})

// Socket.io connection that allows the chat functionality to work
io.on('connection', function(socket){
    
    // Triggered when a user joins a room
    socket.on("joinRoom", (userName, channelID) =>{
        // Allocates a socket connection a room that is of 'channelID'
        socket.join(channelID.toString())
        // Emits a message to all clients in channel of 'channelID'
        io.in(channelID).emit("newUser", userName)
    })
    
    // Checks when a message is sent to the server
    socket.on("sendMessage", (username, message, channelID)=>{
        // Emits the message to all clients on the channel
        io.in(channelID).emit("receiveMessage", username, message)
    })

    // Checks when a user has disconnected
    socket.on("userDisconnect", (userName, channelID) => {
        // Emits to all clients on the channel
        io.in(channelID).emit("userDisconnected", userName)
    })
})