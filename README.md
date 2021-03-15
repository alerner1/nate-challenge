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

### Why I Chose This Tech Stack

This submission uses Node.js (with the Express framework) for the back end and React for the front end.

Since it's a relatively small API without too much complex logic, Express seemed like a good fit. On the front end side of things, since there's a lot of rendering to be done, React seemed like a good choice.

I also used Bootstrap to get some basic CSS in there quickly.

### Reasons for Chosen Unit Tests

* On the back end:
  <br />
  I chose to test the auth controller, since much of the app's functionality depends on those routes working properly, especially when it comes to validations, tokens, and permissions.
* On the front end:
  <br />
  I chose to test the `<Result />` component, which is responsible for rendering the table with the word frequencies on the page. This is arguably the most important part of the app, so it seemed worth testing. 