import {signin,signup,reset} from './controllers/authentication';


export default function Router(app,reqSignIn,reqAuth)
{            
    app.get('/',reqAuth,(req,res,next)=>{return res.send('working!')})
    app.post('/signin',reqSignIn,signin);    
    app.post('/signup',signup);
    app.post('/reset',reset);
}
