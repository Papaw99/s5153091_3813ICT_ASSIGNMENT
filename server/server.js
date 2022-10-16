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

let usersRawData = fs.readFileSync("./data/users.json")
let groupsRawData = fs.readFileSync("./data/groups.json")
let channelsRawData = fs.readFileSync("./data/channels.json")
let groupMembershipsRawData = fs.readFileSync("./data/groupMemberships.json")
let channelMembershipsRawData = fs.readFileSync("./data/channelMemberships.json")

let usersJ = JSON.parse(usersRawData)
let groupsJ = JSON.parse(groupsRawData)
let channelsJ = JSON.parse(channelsRawData)
let groupMembershipsJ = JSON.parse(groupMembershipsRawData)
let channelMembershipsJ = JSON.parse(channelMembershipsRawData)

let users = database.collection("users")
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

    var userResult = ""
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    for (let i=0; i < usersJ.length; i++){
        if(req.body.userName != usersJ[i].userName || req.body.password != usersJ[i].password){
            result = {"valid": false}
          continue; 
        }
        else {
            usersJ[i].valid = true
            result = usersJ[i]
            break;
        }
    }

   /*  users.find({userName: req.body.userName}).toArray(
        function(err, result){
            if(result.password != req.body.password){
                console.log(result.password)
                userResult = {"valid": false}
                res.send(result)
            }
            else {
                console.log(result)
                res.send(result)
            }
        }
    ) */

    res.send(result)

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
        console.log(userName, "has joined channel", channelID)
    })

    socket.on("sendMessage", (username, message, channelID)=>{
        io.in(channelID).emit("receiveMessage", username, message)
    })
})