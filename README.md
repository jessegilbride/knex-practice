# Express Boilerplate

This boilerplate is used for starting new projects that use [Express](https://expressjs.com/). It assumes you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.

<br>

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine:

   `git clone THIS-BOILERPLATE-URL NEW-PROJECT-NAME`

2. `cd` into the cloned repository.

3. Make a fresh start of the git history for the project:

   `rm -rf .git && git init`

4. Install the node dependencies:

   `npm install`

5. Rename (via move operation) the example Environment file to `.env` that will be ignored by git and read by the express server:

   `mv example.env .env`

6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME:

   `"name": "NEW-PROJECT-NAME",`

<br>

## Scripts

- Run the application locally:

  `npm start`

- Run the application locally with `nodemon` (for auto-restart after saving):

  `npm run dev`

- Run tests:

  `npm test`

<br>

## Deploying

When your new project is ready for deployment, add a new Heroku application with:

`heroku create`

> This will make a new git remote called "heroku"

<br>

Then push to this remote's main branch:

`npm run deploy`
