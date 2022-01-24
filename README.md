This project uses node version 16 to run.

## Description

In this project in the index route '/' you can get a drag n drop dashboard of post it notes with the following requirements:

- [x] Notes are draggable and persisted in the backend.
- [x] Notes support markdown.
- [x] You can create notes by pressing the bottom right corner button.
- [x] Each note has a button to delete itself.
- [x] Notes are editable.
- [x] All changes are saved automatically.
- [x] Date creation date of each note is displayed in its top left corner.

You can run the frontend by positioning your command line in sticky-web-notes and execute:

    {
        npm install /or/ yarn && npm/yarn start
    }

You can run the backend by positioning your command line in sticky-notes-backend and execute:

    {
        npm install /or/ yarn && npm/yarn start
    }

## Frontend environment variables

You can change the api it is pointing to, with the enviroment variable API_URL. By default it will run on port 3000 and make api request to localhost:8080.

## Backend environment variables

The backend uses env variables to access a pg database. Which are the following:

POSTGRES_USER database use
POSTGRES_PASSWORD database password
POSTGRES_DB database name
PORT The port in which the backend server will listen to requests

It is adviced to run the backend app in docker by executing after you have positioned the command line in the subfolder sticky-notes-backend:

    {
        docker-compose build
        docker-compose up
    }

You can also run the db in docker and run the backend manually like so:

    {
        docker-compose build db
        docker-compose up db
        npm install / yarn
        npm/yarn start
    }

There are 2 services: 'db' and 'backend' which are self explanatory.
There is one problem and it is that even though the backend service depends on the db service running the instance for the first might take more time than our backend and it might fail to establish a connection the first time.

You will find a .env file in the sticky-notes-backend subfoler so you can initialize your environment.

## Documentation

When running the backend it will seed the database with 5 notes from the start. The backend uses knex.js as its ORM and has these routes:

- [x] '/' which is useful for a health check.
- [x] '/api/notes' GET/PUT/DELETE/POST which are the endpoints we use for the different operations we need.

You can run 'npm test' in the backend to execute the test suite with Jest.

Notes have the following attributes:

-   "x" used for drag n drop position on the canvas
-   "y" used for drag n drop position on the canvas
-   "position" used for position order in the list. Alphanumeric order. If it is empty it means it is not in the list.
-   "text" content of the note
-   "created_at" timestamp value of creation
-   "updated_at" timestamp value of update

In frontend you can find I use dnd-react for the drag n drop functionality. I use two drop targets. One in which I set position absolute coordinates called the 'canvas' and the other one in which I list the notes collection in a flexbox container called the 'stack'. Notes are draggable elements.

The text input has a debounce of 0.5 senconds.

## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

Thanks for reading :)

> Developed by Armando Saenz