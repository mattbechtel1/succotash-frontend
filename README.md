This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Welcome to the Succotash Website

Succotash is a farm management application built to track crop cycles and other farming activities.

## [Live Application of v1.2.0](https://succotash-app.herokuapp.com)

## Setup

### NVM Version
Succotash is built with React, which depends on Node and NPM. In order to
install Node, it is required that you install NodeJS on your system. We
recommend that you install NVM. Once sourced into your profile,
run `nvm install 18.15.0` and/or `nvm use 18.15.0`. 

Global Dependencies:

* Node, NPM, ReactJs

### Technology and Frameworks

Succotash presently utilizes the following frontend technologies:

* JavaScript ES7
* HTML5
* CSS3
* ReactJS
* React Router (DOM)
* Redux
* Thunk
* Material-UI
* clsx
* date-fns
* react-socks


## Contributing

We invite other developers to contribute towards the growth and features of the Succotash application. This application can be forked and cloned from [Github](https://github.com/mattbechtel1/succotash-frontend). You must run `npm install` to install the required dependencies.

It is advised that you also fork and clone the [backend API](https://github.com/mattbechtel1/succotash-backend). Otherwise, frontend builds will stall in a perpetual loading phase. The backend should run on localhost:2020 for the development server to correctly fetch data.

Pull requests will be reviewed in a timely manner. Editing the versions.js file is not recommended. The Github repository owners will review your request and update the versions.js
file if necessary.

## Connecting to the API

In order to connect to the API, you will need to run the API on a separate port.
Instructions for building and developing the API can be found on the 
[Succotash Backend Repo](https://github.com/mattbechtel1/succotash-backend).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

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

## Learn More

Succotash is built with React. To learn React, check out the [React documentation](https://reactjs.org/).
