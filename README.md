# HouseApp

This project was developed using Angular 19 and styled with Tailwind CSS to help household members keep track of tasks and necessities at home. It is managed through a web application deployed on Firebase Hosting, with data stored and synced using Firebase Realtime Database.

## 🚀 Live Demo

Check out the live app here:  
[https://groceriesangular.web.app]

## Install dependencies

To install dependencies, run:
npm install

## Development server

To start a local development server, run:
ng serve


## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

🔥 Firebase Setup

This app uses Firebase Realtime Database with the following security rules for demo purposes only:

{
  "rules": {
    ".read": true,
    ".write": true
  }
}


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
