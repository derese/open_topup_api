## topup_api
_Express Api Server for Topup (ES6)_

### Introduction

Topup_api is an express api server that is the backend of Topup mobile Application. The whole project wants to showcase the capabilities of ReactNative. Further informations including the Sketch files and the React Native project can be found _here_.

To run the mobile App you will need this backend, which is developed using Express, mongoose and mongo db with ES6.

### Install

```sh
$ git clone https://github.com/derese/topup_api.git
$ cd topup_api
$ npm install
```

### Up and Running 

- run mongo daemon in one terminal
To start with you must have mongo installed and configured on your machine; if you dont follow this link [mongodb installation](https://docs.mongodb.com/manual/installation/ "mongo").
once you have mongodb installed and configured next run 

```sh
$ mongod
```
- run babel transpiler
Since our code is written in ES6, we need to transpile it; and to do so we are using babel. We have hookedup babel in our package.json script section. The babel transpiler will watch for our **src** folder and when ever there is a change in there it will do the transpilling and create the respoective file in **build** folder

```sh
$ npm run build
```

- run our nodeserver in another terminal
our nodeserver is configured to run in either **development** mode or **porduction** mode. We use hte NODE_ENV variable to set and identify the enviroment. FYI based on the enviroment the database connection strings are also different/

```sh
$ npm run dev
```

###Warning
for the sake of convinence i have added config.secret.js. This file holds the secret key that is used by jwt to generate a token. in production and other enviroments this file should be added to .gitignore.


