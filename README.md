# ServerList

An application that monitors and maintains servers usage.

## How to use

The application provides an editable table that allows the user to monitor and update the servers usage. Changes made to the table should be saved by clicking on the floating save button in the bottom right section of the application to prevent lost of changes. Additionally, to prevent accidental removal of server(s) and modification to the key fields such as hostname and IP addresses, the modification has been disabled by default, to modify these fields, add `?editable=true` to the URL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install the following application(s):

```
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
```

### Start application

Run `npm install` followed by `npm start` to start both the backend and application server. Once the servers are started, the application will be available at `http://localhost:8888/`.

## Development

The application is split into 2 main section, the backend server which act as a REST server that allows the application to communicate with MongoDB and the application server which serve the angular application.

### Backend server

Run `npm run start:server` to start the backend server. It is a nodejs server that served as a bridge between application and MongoDB. The app will automatically reload if you change any of the source files.

### Development server

Run `npm run start:dev` for a dev server. The application should automatically appear in your browser, if not, navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Linting

Run `npm run lint` to lint the project. You can also fix the fixable lint errors via the command `npm run lint:fix`.

## Build

Run `npm run build` to build the project, it is configured to run angular build with the production configuration. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
