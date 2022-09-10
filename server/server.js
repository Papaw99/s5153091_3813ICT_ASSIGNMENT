const express = require('express');
const app = express()
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const path = require('path');
const http = require('http').Server(app)

app.use(express.static(path.join(__dirname, '../dist/s5153091-3813-ict-assignment')))

let usersRawData = fs.readFileSync("./data/users.json")
let groupsRawData = fs.readFileSync("./data/groups.json")
let channelsRawData = fs.readFileSync("./data/channels.json")
let groupMembershipsRawData = fs.readFileSync("./data/groupMemberships.json")
let channelMembershipsRawData = fs.readFileSync("./data/channelMemberships.json")

let users = JSON.parse(usersRawData)
let groups = JSON.parse(groupsRawData)
let channels = JSON.parse(channelsRawData)
let groupMemberships = JSON.parse(groupMembershipsRawData)
let channelMemberships = JSON.parse(channelMembershipsRawData)


app.post('/api/auth', function(req, res){

    result = ""
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    for (let i=0; i < users.length; i++){
        if(req.body.userName != users[i].userName || req.body.password != users[i].password){
            console.log(req.body)
            result = {"valid": false}
          continue; 
        }
        else {
            users[i].valid = true
            console.log(users[i])
            result = users[i]
            break;
        }
    }

    res.send(result)

})

app.post('/api/createUser', function(req, res){
    let newUser = {"userName": req.body.userName, "email": req.body.email, "userID": users.length, "role": req.body.role, "password": req.body.password, "valid": false}
    users.push(newUser)
    let newUserArray = JSON.stringify(users)
    fs.writeFileSync("./data/users.json", newUserArray)
    console.log(users)
})

app.listen(3000, '127.0.0.1', function(){
    console.log('server has been started')
})

app.get('/api/getUsers', function(req, res){
    res.send(users)
})

app.post('/api/changeRole', function(req, res){
    
    if(!req.body){
        console.log('Request data invalid')
        return res.sendStatus(400)
    }

    for (let i=0; i < users.length; i++){
        if(req.body.userName == users[i].userName){
          users[i].role = req.body.role
          console.log(users[i])
          let newUserArray = JSON.stringify(users)
          fs.writeFileSync("./data/users.json", newUserArray)
        }
        else{
            continue
        }
    }

})