This project uses node version 16 to run. You can run it by executing

    {
        npm install /or/ yarn && npm start
    }

You can change the api it is pointing to, with the enviroment variable API_URL. By default it will run on port 3000 and make api request to localhost:8080.

In this project in the index route '/' you can get a drag n drop dashboard of post it notes with the following requirements:

- [x] Notes are draggable and persisted in the backend.
- [x] Notes support markdown.
- [x] You can create notes by pressing the bottom right corner button.
- [x] Each note has a button to delete itself.
- [x] Notes are editable.
- [x] All changes are saved automatically.
- [x] Date creation date of each note is displayed in its top left corner.

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

> Developed by Armando Saenz