const express = require('express');
const app = express()
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const path = require('path')
const http = require('http').Server(app)

app.use(express.static(path.join(__dirname, '../dist/s5153091-3813-ict-assignment')))

let usersRawData = fs.readFileSync("./data/users.json")
let groupsRawData = fs.readFileSync("./data/groups.json")
let channelsRawData = fs.readFileSync("./data/channels.json")
let groupMembershipsRawData = fs.readFileSync("./data/groupMemberships.json")
let channelMembershipsRawData = fs.readFileSync("./data/channelMembership.json")

let users = JSON.parse(usersRawData)
let groups = JSON.parse(groupsRawData)
let channels = JSON.parse(channelsRawData)
let groupMemberships = JSON.parse(groupMembershipsRawData)
let channelMemberships = JSON.parse(channelMembershipsRawData)


app.listen(3000, '127.0.0.1', function(){
    console.log('server has been started')
})