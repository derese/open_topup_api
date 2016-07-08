import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';

import router from './router';
import dbConfig from './config.db';
import serverConfig from './config.server';

// defines our  Jwtoptions , jwtStrargy and tells passport to use that strategy
import passportMiddleware from './middleware/passport';



let app = express();

let reqAuth = passport.authenticate('jwt',{session:false});// passport Authenticating middleware
let reqSignIn = passport.authenticate('local',{session:false}); // passport Signin middleware

app.use(cors());
app.use(morgan('combined')); //logging middle ware
app.use(bodyParser.json({type:'*/*'})); // parse incoming requests in to JSON.



dbConfig();
serverConfig(app);

router(app,reqSignIn,reqAuth);


