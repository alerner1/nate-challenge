# NATE CHALLENGE SUBMISSION 

### Installation Instructions

* Fork and clone this repository
* Navigate to the api directory
  * Run `npm install` in the terminal
  * Run `sequelize db:create`
  * Run `sequelize db:migrate`
  * Run `npm start`
  <br />
  If you run into issues here, you may need to change the username and/or password in config.json.
  * NOTE: In auth.config.js, make sure to use an environment variable for the secret key if planning to host this api anywhere other than on your own machine.
* Navigate to the client directory
  * Run `npm install`
  * Run `npm start`
    If your browser doesn't open automatically, navigate to http://localhost:3000 in your browser