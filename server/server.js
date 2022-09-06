const express = require('express');
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const path = require('path')
const http = require('http').Server(app)

app.use(express.static(path.join(__dirname, '../dist/s5153091-3813-ict-assignment')))

app.listen(3000, '127.0.0.1', function(){
    console.log('server has been started')
})