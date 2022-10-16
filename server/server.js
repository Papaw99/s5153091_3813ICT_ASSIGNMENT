const express = require('express');
const app = express()
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient
var dbUrl = "mongodb://localhost:27017/"
var client = new MongoClient(dbUrl)
var database = client.db("chat_db")

app.use(bodyParser.json())
app.use(cors())

const path = require('path');
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  })

app.use(express.static(path.join(__dirname, '../dist/s5153091-3813-ict-assignment')))

let users = database.collection("users")
let usersArray = users.find({}).toArray()
let usersLength = users.countDocuments()
let groups = database.collection("groups")
let groupsLength = groups.countDocuments()
let groupMemberships = database.collection("groupMemberships")
let channels = database.collection("channels")
let channelsLength = channels.countDocuments()
let channelMemberships = database.collection("channelMemberships")


http.listen(3000, '127.0.0.1', function(){
    console.log('server has been started')
})

app.post('/api/auth', function(req, res){

    var result = ""
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }
    usersArray.then( value=> {
        for (let i=0; i < value.length; i++){
            if(req.body.userName != value[i].userName || req.body.password != value[i].password){
            result = {"valid": false}
            continue; 
        }
        else {
            value[i].valid = true
            result = value[i]
            res.send(result)
            break;
        }
    }

    })
})

app.post('/api/createUser', function(req, res){
    var userID
    let newUser
    usersLength.then(value=>{
        userID = value
        newUser = {"userName": req.body.userName, "email": req.body.email, "userID": userID, "role": req.body.role, "password": req.body.password, "valid": false}
        users.insertOne(newUser)
        usersLength = users.countDocuments()
    })
})

app.get('/api/getUsers', function(req, res){
    users.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

app.get('/api/getGroups', function(req, res){
    groups.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

app.get('/api/getGroupMemberships', function(req, res){
    groupMemberships.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

app.post('/api/changeRole', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    users.updateOne({userName: req.body.userName}, { $set: {role: req.body.role } })

})

app.post('/api/deleteUser', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    users.deleteOne({userName: req.body.userName})

})

app.post('/api/deleteGroup', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    groups.deleteOne({groupID: parseInt(req.body.groupID)})

})

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

app.get('/api/getChannels', function(req, res){
    channels.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

app.get('/api/getChannelMemberships', function(req, res){
    channelMemberships.find({}).toArray(
        function(err, result){
            res.send(result)
        }
    )
})

app.post('/api/deleteChannel', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    channels.deleteOne({channelID: parseInt(req.body.channelID)})
})

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

app.post('/api/addToGroup', function(req, res){
    let newGroupMemberships = {"userID":  parseInt(req.body.userID), "groupID": parseInt(req.body.groupID), "role": "member"}
    groupMemberships.insertOne(newGroupMemberships)
})

app.post('/api/addToChannel', function(req, res){
    let newChannelMemberships = {"userID": parseInt(req.body.userID), "channelID": parseInt(req.body.channelID)}
    channelMemberships.insertOne(newChannelMemberships)
})

io.on('connection', function(socket){
    
    socket.on("joinRoom", (userName, channelID) =>{
        socket.join(channelID.toString())
        io.in(channelID).emit("newUser", userName)
    })

    socket.on("sendMessage", (username, message, channelID)=>{
        io.in(channelID).emit("receiveMessage", username, message)
    })

    socket.on("userDisconnect", (userName, channelID) => {
        console.log(userName, "has left")
        io.in(channelID).emit("userDisconnected", userName)
    })
})