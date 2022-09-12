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

The application makes use of 12 15 REST API's to fetch data from the JSON data files. The server makes use of fileSync to fetch and write data from and to the JSON files. The server also makes use of a JSON parser to convert the raw FS data into readable JSON.

### auth

The auth API makes use of the post method and is used for user authentication. The auth API takes in the userName and password. The api then takes the body of data from the application and runs it through a for loop of and compares the input userName and passWord with the users on the server. If the user is matched, it sends back the user data with the valid field set as true. Otherwise, if no data is found that matches the credentials, it sends a valid state of false.

### createUser

The createUser API makes use of the post method to create a user. The method takes in a body of data that follows the data structure of a user. The user data is then pushed into the array of users. The user array is then converted into rawdata using the JSON.stringify method and then it is written into the users JSON file.

### getUsers

The getUsers API makes use of the get method to send an aray of users to the requester.

### getGroups

The getGroups API makes use of the get method to send an array of groups to the requester.

### getGroupMemberships

The getGroupMemberships API makes use of the get method to send an array of groupMemberships to the requester.

### changeRole

The changeRole API makes use of the post method. It takes in a userName and the new role. A for loop is then used to loop through the list of users and compares it the userNames in the list with the input userName. Once the right userName is found, it changes the roles in the array and the writes the new list of users to the users JSON file.

### deleteUser

The deleteUser API makes use of the post method. It takes in a userName. A for loop is used to loop through the list of users and compares it with the userNames in the list with the input userName. Once the right user is found, the splice function is used to remove the user and a new array is written into the users JSON file.

### deleteGroup

The deleteGroup api makes use of the post method. It takes in a groupID and then runs it through a for loop of groups. It compares the input groupID with the list of groupIDs and once it finds the right one, it uses the splce function to delete the group and re-writes the new group of arrays nto the groups JSON file.

### createGroup

The createGroup API uses the post method. It takes in a groupName. The method then assigns a groupID based on the array length of groups. The group is then added to the array of groups using the push function. The new array is then written into the groups JSON file.

### getChannels

The getChannels API makes use of the get method to send an array of channels to the requester.

### getChannelMemberships

The getChannelMemberships API makes use of the get method to send an arrray of channelMemberships to the requester.

### deleteChannel

The deleteChannel API makes use of the post method. It takes in a channelID and runs a for loop with the length of channels array. The for loop compares the input channelID with the channelIDs in the array and once the right channel is found, the splice function is used to delete the channel. The new array is then written into the channels JSON file.

### createChnnel

The createChannel API makes use of the post method. It takes in a groupID and a channelName. The unique channelID is assigned using the array length of channels. The push function is used to add the new channel into the channels array and then the new array is written into the channels JSON file.

### addToGroup

The addToGroup API makes use of the post method. It takes in a useID a groupID and by default, it assigns the user a role of member. The new group membership is then added to the groupMemberships array and the array is written into the groupMemberships JSON file.

### addToChannel

The addToCHannel API makes use of the post method. It takes in a userID and channelID. The new channel membership is written into the channelMemberships array using the push function. The array is then written into the channelMemberships JSON file.

## Angular Architecture


