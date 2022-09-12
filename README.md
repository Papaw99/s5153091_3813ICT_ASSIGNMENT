# 3813ICT Assignment Phase 1 - s5153091 - Muhammad Usama Siddiqui

## Introduction

This assignment was focused on building a web-based chat application. This program was built using Angular for the front-end and made use of Express.js for the server-side communications. The data is being stored in JSON files
for the time being, however, by the second phase of this assignment, the app data will be stored on a mongoDB database.

## Git Use

This app was built using the help of Git as a means for version control. Each time a new function was implemented on both the Angular application and the server-side functionality, a commit was made to highlight those changes.
Each commit was only made after determining that the function being committed is functional. Each time a commit was made, it was pushed onto this particular GitHub repo for online access. Node modules have been ignored for this git
to save on memory.

## Data Structures

![Entity Relationship Diagram](https://i.imgur.com/jqECXdx.png)

The applications data structure was built using JSON serialisation for this phase of the assignment. The data structure includes entities such as Users, Groups, Channels, GroupMemberships and ChannelMemberships

### Users

The users entity has has 6 objects within it. The userName object is used to store the users userName and it is stored as a string.

The email object stores the users email address and stores the users email. This is stored as a string.

The userID object is a unique ID assigned to a user and it is stored as a number.

The role object is used to define the users role on the application. This can either be a groupAdmin or a superAdmin. This is stored as a string.

The password stores the password of the user. The password is being stored as a string.

The valid object stores the login status of a user. This is stored as a boolean and it is set to false as default and set to true when the user logs in.

### Groups

The Groups entity has 2 objects that are stored. the groupID is a unique ID that is stored to identify a group which is stored as a number. 

The group name is the name of the group and is stored as a string.

### Channels

The Channels entity has three objects. The channelID is a unique ID that stores a channels ID nummber. This is stored as a number.

The groupID is the group ID number of a group that the channel is associated with. This is stored as a number.

The channelName object stores the name of a particular channel and it is stored as a string.

### GroupMemberships

The GroupMemberships table is used as a join table to eliminate the many-to-many relationship between groups and users.

The userID object stores the ID of the user and it is stored as a number.

The groupID identifies which group the user is a part of and it is stored as a number.

The role stores the users role within a group and is stored as a string. This can either be a user or a assisAdmin.

### ChannelMemberships

The ChannelMemberships table acts as a join table to eliminate the many-to-many relationship between channels and users.

The userID stores the userID of the user whereas the channelID stores the channelID of the channel that the user is a part of. Both objects are stored as a number.

## REST API

### auth

### createUser

### getUsers

### getGroups

### getGroupMemberships

### changeRole

### deleteUser

### deleteGroup

### createGroup

### getChannels

### getChannelMemberships

### deleteChannel

### createChnnel

### addToGroup

## Angular Architecture


