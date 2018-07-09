## Meeting Room Booking Application
This is the API for the meeting room booking application

The project has been developed using **NodeJS**

The project also relies on MongoDB with Mongoose as the ODM. Errors are only logged during development. The errors are also configured to load in standard Apache format.

The project follows standard **MVC** architecture


## Installation
To get your the API started and running locally, do the following

```
* git clone https://github.com/rainbowcores/meeting-room-booking
* cd into the folder
* run npm install
* run nodemon index.js
```

## Develoment Environments

Now that you have set up the project and have it running, it is important to note that development and production environments have been configured differently.

To set the project up for a **production** environment, make sure to do the following

```
* EXPORT env = production
* set any other custom environment variables in `/meeting-room-booking/config/custom-environment-variables.json`
```

Refer to <https://codingsans.com/blog/node-config-best-practices> on instructions to properly configure environments for your **NodeJS** application

If you want to enable error logging in the console, add ``` export DEBUG=app:* ```

Check **index.js** for the debug implementation from the debug module. Change the asterisk(*) to the name of the debugger you want to eneable. For more on using the module visit [it's page](https://www.npmjs.com/package/debug)

## API Documentation
A postman collection has been provided along with the code for this project.

Please open the collection in postman for more context as to how to access the API

```
* open postman <https://www.getpostman.com/>
* click import
* choose import file from the tabs
* click open and locate the file
```

