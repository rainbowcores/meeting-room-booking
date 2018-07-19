## Meeting Room Booking Application
This is the API for the meeting room booking application

The project has been developed using **NodeJS**

The project also relies on MongoDB with Mongoose as the ODM.

The project follows standard **MVC** architecture


## Installation
To get your the API started and running locally, do the following

```
* git clone https://github.com/rainbowcores/meeting-room-booking
* cd into the folder
* run npm install
* export DEBUG = app:* # show all app errors
* export NODE_ENV=development
* export MBR_jwtPrivateKey= keyThatOnlyYouKnowAbout # JWT private key must be set
* run nodemon index.js
```

## Develoment Environments

* 
	Note that yor application will not run if you havent configured an environment variable with the name **MBR_jwtPrivateKey**. On mac, use the command ``` export MBR_jwtPrivateKey=keyThatOnlyYouKnowAbout```. That key is used to sign JWT tokens, you should not share this key with anyone. 

* To set the project up for a **production** environment, make sure to do the following

	```
	* EXPORT NODE_ENV=production
	* set any other custom environment variables in `/meeting-room-booking/config/custom-environment-variables.json`
	```
	This will among other things, disable error logging to the access.log file

Refer to <https://codingsans.com/blog/node-config-best-practices> on instructions to properly configure environments for your **NodeJS** application

If you want to enable error logging in the console, add ``` export DEBUG=app:* ```

Visit [Config module npm page](https://www.npmjs.com/package/debug) for more information about how to use the module


## API Documentation
A postman collection has been provided along with the code for this project.

Please open the collection in postman for more context as to how to access the API

```
* open postman <https://www.getpostman.com/>
* click import
* choose import file from the tabs
* click open and locate the file
```

