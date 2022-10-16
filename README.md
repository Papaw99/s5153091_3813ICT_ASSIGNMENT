# 3813ICT Assignment Phase 2 - s5153091 - Muhammad Usama Siddiqui

## Introduction

This assignment was focused on building a web-based chat application. This program was built using Angular for the front-end and made use of Express.js for the server-side communications. The data is being stored in JSON files
for the time being, however, by the second phase of this assignment, the app data will be stored on a mongoDB database.

## How to Run The Application

When in the main directory, run the command "ng serve" in the terminal to boot up the Angular application in a dev environment. Then CD to the server file and run the server using "noder server.js."

Alternatively, since the Angular app has already been built and linked to the server, you may only just run the server to start the application.

## Git Use

This app was built using the help of Git as a means for version control. Each time a new function was implemented on both the Angular application and the server-side functionality, a commit was made to highlight those changes.
Each commit was only made after determining that the function being committed is functional. Each time a commit was made, it was pushed onto this particular GitHub repo for online access. Node modules have been ignored for this git
to save on memory.

## Data Structures

![Entity Relationship Diagram](https://i.imgur.com/jqECXdx.png)

The applications data structure was built using MongodDB for this phase of the assignment. The data structure includes entities such as Users, Groups, Channels, GroupMemberships and ChannelMemberships

### Users

The users collection has has 6 objects within it. The userName object is used to store the users userName and it is stored as a string.

The email object stores the users email address and stores the users email. This is stored as a string.

The userID object is a unique ID assigned to a user and it is stored as a number.

The role object is used to define the users role on the application. This can either be a groupAdmin or a superAdmin. This is stored as a string.

The password stores the password of the user. The password is being stored as a string.

The valid object stores the login status of a user. This is stored as a boolean and it is set to false as default and set to true when the user logs in.

### Groups

The Groups collection has 2 objects that are stored. the groupID is a unique ID that is stored to identify a group which is stored as a number. 

The group name is the name of the group and is stored as a string.

### Channels

The Channels collection has three objects. The channelID is a unique ID that stores a channels ID nummber. This is stored as a number.

The groupID is the group ID number of a group that the channel is associated with. This is stored as a number.

The channelName object stores the name of a particular channel and it is stored as a string.

### GroupMemberships

The GroupMemberships collection is used as a join table to eliminate the many-to-many relationship between groups and users.

The userID object stores the ID of the user and it is stored as a number.

The groupID identifies which group the user is a part of and it is stored as a number.

The role stores the users role within a group and is stored as a string. This can either be a user or a assisAdmin.

### ChannelMemberships

The ChannelMemberships collection acts as a join table to eliminate the many-to-many relationship between channels and users.

The userID stores the userID of the user whereas the channelID stores the channelID of the channel that the user is a part of. Both objects are stored as a number.

## REST API

The application makes use of 12 15 REST API's to fetch data from the MongoDB database. The server makes use the MongoDB client service for Node.js. This was installed using NPM. This service is used to communicate with the MongoDB database on port 27017.

### auth

The auth API makes use of the post method and is used for user authentication. The auth API takes in the userName and password. The api then takes the body of data from the application and runs it through a for loop of and compares the input userName and passWord with the users on the server which is fetched from the MongoDB database. If the user is matched, it sends back the user data with the valid field set as true. Otherwise, if no data is found that matches the credentials, it sends a valid state of false.

### createUser

The createUser API makes use of the post method to create a user. The method takes in a body of data that follows the data structure of a user. The user data is then put into a query which is then run using the MongoDB insertOne() function that adds the user to the MongoDB database.

### getUsers

The getUsers API makes use of the get method to fetch users from the MongoDB database and send an aray of users to the requester.

### getGroups

The getGroups API makes use of the get method to fetch the groups from the MongoDB database and send an array of groups to the requester.

### getGroupMemberships

The getGroupMemberships API makes use of the get method to fetch the groupMembership data from the MongoDB database and send an array of groupMemberships to the requester.

### changeRole

The changeRole API makes use of the post method. It takes in a userName and the new role. The UpdateOne MongoDB function is then invoked. It takes in the userName as one argument to find a document with a similar name. Once it finds the right document, it changes the role of the user on the MongoDB database.

### deleteUser

The deleteUser API makes use of the post method. It takes in a userName. The deleteOne function is called where the userName is put in as an argument. This function will delete the user from the MongoDB database.

### deleteGroup

The deleteGroup api makes use of the post method. It takes in a groupID and then uses it as an argument for the MongoDB deleteOne function. This function will go through the groups collection and delete the group with the same groupID.

### createGroup

The createGroup API uses the post method. It takes in a groupName. The method then assigns a groupID based on the document length of groups. The group is then added to the collection in MongoDB by running a query using the MongoDB insertOne function.

### getChannels

The getChannels API makes use of the get method to send an array of channels to the requester that is fetched from the MongoDB database.

### getChannelMemberships

The getChannelMemberships API makes use of the get method to send an arrray of channelMemberships to the requester. The array is generated by collecting all the documents in the ChannelMemberships collection of the MongoDB database.

### deleteChannel

The deleteChannel API makes use of the post method. It takes in a channelID and runs the deleteOne MongoDB function. This function will find a channel with the matching channelID and delete it from the channels collection.

### createChnnel

The createChannel API makes use of the post method. It takes in a groupID and a channelName. The unique channelID is assigned based on how many documents are currently in the channels MongoDB collection. Once it determines the channelID, the InsertOne MongoDB function is invoked to add the channel to the MongoDB database.

### addToGroup

The addToGroup API makes use of the post method. It takes in a useID a groupID and by default, it assigns the user a role of member. The new group membership is then added to the groupMemberships collection using the insertOne MongoDB function..

### addToChannel

The addToCHannel API makes use of the post method. It takes in a userID and channelID. The new channel membership is written into the channelMemberships collection using the insertOne MongoDB function.

### socket.io

The application makes use of socket.io to create a web socket between the client computer and the server. This allows for multiple users to communicate with the server simultaneously and update information live for each machine to observe. Below is an explanation of how socket.io was implemented:

#### joinRoom

The joinRoom event is used to listen for when a user joins a room. The front end will invoke the joinRoom event when a new user joins the channel and send the username of the new user and the channelID. Once it receives this information, it using the socket.join function and the channelID to add the socket to a room.

#### newUser

newUser is a socket.io event that is triggered by the server. This event is only emitted to the clients of a targeted channel using .to. .to will take the channelID as an argument and only send it to those clients with the same channelID. The event sends the userName of the new user that has joined and this event is what sends the message out to all other users that a new user has joined the channel.

#### sendMessage

The sendMessage event is triggerted by the frontend and is being listned for on the server side. This event will send the userName of the client that is sending the message, the actual message text and the channelID for the intended message. Once this even is head, another event is triggered by the server called receiveMessage.

#### receiveMessage

receiveMessage is an event that is sent out by the server and is being heard for by the frontend. The receiveMessage event sends out the userName and message and only emits it to a specific channelID using .to. ALl the data being sent is being used from the sendMessage event that had been received by the server earlier.

## Angular Architecture

## Routes

The app has 12 routes within it. The default route leads to the login page.

account-management: Leads to the AccountManagement component, available to superAdmin to edit and create accounts.

groups: Leads to the GroupComponent, list of users groups.

create-user: CreateUserComponent, this component allows a superAdmin to create a user.

edit-perms: Leads to the EditPermsComponent, allows a superAdmin to edit the perms of a user.

delete-user: Leads to the DeleteUser component, allows a superAdmin to delete a user.

create-group: Leads to the CreateGroupComponent, allows admins to create a grou
channels/:groupID: Leads the the channels component, takes the user to the list of channels within a particular group.

create-channel: Leads to the CreateChannelComponent, allows an admin to create a channel within a certain group.

add-to-group/:groupID: Leads to the addToGroup component, allows an admin to add a user to a particular group

add-to-channel/:channelID: Leads to AddToChannelComponent, allows an admin to add a user to a particualr channel.

channel/:channelID: leads to a particular channel

### app

The app module contains the basic layout of the overall website. It contains the navbar with a few ngIf statements that control the display of the logout button and the account management button. These display controls are done using functions in the component file. the ngDoCheck function is called everytime a change is made to the website and if it detects that the role in the local storage is superAdmin, it displays the account management option in the navbar.

The logout function is triggered when the logout button is clicked. It clears the local storage and takes the user back to the login page, completely logging out the user.

### account-management

The account management does not have any functions in it. It has an HTML component that displays all the account management options. These options make use of bootstrap buttons and routerlinks that redirect the superAdmin user to the appropriate page allocated to the option.

### add-to-channel

The add-to-channel component is used to add users to channels. This comppnent makes use of HttpClient and ActivatedRoute. ActivatedRoute is used to capture the channelID from the url and it stores it in a variable called channelID. The HttpClient is used to communicate with the server.

When the component is initialised, a request is made to the server to get a list of users. The list of users is then stored in an array with only the userName and userIDs. The users array is used to produce a list of users that is displayed for the user to chose from

Once the user chooses a user to add to the channel, they click a button which triggers the addToChannel function. This function sends a body of data with the userID and channelID. A post request is then sent to the server with the body of data.

### add-to-group

The add-to-group makes use of the HttpClient module and the ActivatedRoute module. When the component is first initialized, a function is triggered using thee HttpClient module that sends out a get request to get a list of users. The users are then added to a users array with the userName and userID.

The addToGroup function is called when the the user clicks on the button. This function creates a bodyData with the userId and the groupId. The groupId comes from the ActivatedRoute module that picks up the groupID from the url. A post function is then called using the HttpClient module which sends the body data to the server.

### channel

The channel component makes use of the HttpClient module and the ActivatedRoute module. When the component is first initialized, it takes in the channelID from the url using the ActivatedRoute module and stores it the channelID variable. The userRole is collected from the localStorage and an if statement is called to see if the role is an admin role. If it is an admin role, the isAdmin boolean variable is changed to true which would display the "add to channel button."

### channels

The channels component is used to display the channels within a group. The channel component makes use of the ActivatedRoute module and the HttpClient module. When the component is first initialised, the ActivatedRoute module is called to get the groupID that is within the url.

Then, an HttpClient get function is called that asks the server to get a list of channels. The list of channels is then run through a for loop and put into a variable title response.

The response variable is then put through another for loop and it compares the groupIDs of every channel with the components stored groupID, and if the channel in the array matches the groupID, the channel is pushed into an array titled groupChannels.

A second HttpClient get function is called to get all the channelMemberships. The channelMemberships is then stored. 

An if statement then checks if the user that is logged in is an admin. If that is the case, then all the channels are pushed to an array titled usersChannels which is a list of channels that user has access too.

If the admin is not a user, a series of for loops are called to check the channelMemberships of the user and if the user is a member of the channel, it is pushed to the userChannels array.

Lastly, an if statement is triggered to check if the user is an admin or not. If the user is an admin, the isAdmin boolean value is changed to true which would allow access to the "Create a Channel" and "Delete channel" button.

### create-channel

The create-channel componentr is used to create a new channel within a group. The coomponent makes use of the HttpClient module and the ActivatedRoute module.

When the component is first intialised, the ActivateRoute module is used to get the groupID in which the channel is being created from the url.

When the user enters the channel name and hits the create channel button, the createChannel function is called. The function creates a body of data with a groupID and the channelName from the input. An HttpClient post function is called which sends the bodyData to the server where the channel is created.

### create-group

The create-group component makes use of the HttpClient module.

The createGroup function is called when the user clicks the Creat Group button. The creatGroup function takes in the user input of the group name and puts in a body data. The HttpClient post function is called to send the body data to the server that creates the group.

### create-user

The create=user component makes use of the HttpClient module.

The createUser function is called when the Create User button is pressed. Once the button is pressed, the user inputs are read and it is added to the bodyData variable.

Then the HttpClient post function is called which sends the bodyData to the server where the user is created.

### delete-user

The delete-user componet makes use of the HttpClient module. This component is used to delete a user from the chat service.

When the component is initialised, the HttpClient get function is called to get a list of users. The list of users is then stored in an array with onlt the userNames and roles being stored in the array.

The deleteUser function is triggered after a user selects a username they'd like to delete. The function then creates a bodyData that is used by a HttpClient post function. The functions sends the data over to a server function that deletes the user.

### edit-perms

The edit-perms component makes use of the HttpClient module. This module allows a superAdmin to edit the admin permissions of a user.

When the component is first intialised, an HttpClient get function is called to get a list of users from the server. The list is then run through a for loop which adds it to a list of users.

The changeRole function is called when the user selects a user and the desired role. The function creates a body data from the userName and role. An HttpClient post function is then used to send the bodyData to the server where the role is changed.

### groups

The groups component is used to display the groups that a user is a part of. It makes use of the HttpClient module.

When the component is initialised, an HttpClient get function is called to get a list of groups that is stored in a groups array.

A secon HttpClient get function is called to get a list of group memberships which is then run through another for loops which adds the list to a groupMemberships array.

An if statement then checks if the user is an admin, and if that is the case, all the groups are added to the usersGroups array which is an array of groups that the user has access to. If the user is not an admin, as eries of for loops are triggered to compare and get the list of groups a user is a member of.

The deleteGroup function is called when a group is selected and the user hits the Delete Group button. The function creates a bodyData with the groupID. The ID is then sent to the server using a post request which deletes the group from the server.

### login

The login function makes use of the HttpClient module and Router module.

The checkCredntials function is called when a user enters their credentials and clicks the login button. The userName and password is then stored in bodyData which is then sent to ther server as a post request. The response is then checked to see if the user account credentials are correct. If they are, all user account details would've been sent to the angular app which would be stored on the localStorage. The router module would then be called to navigate to the groups section.


