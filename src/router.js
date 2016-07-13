import {signin,signup,reset} from './controllers/authentication';
import {listActiveOffers,addOffer,ToggleOffer,removeOffer} from './controllers/offerController';

export default function Router(app,reqSignIn,reqAuth)
{            
    app.get('/',reqAuth,(req,res,next)=>{return res.send('working!')})
    app.post('/signin',reqSignIn,signin);    
    app.post('/signup',signup);
    app.post('/reset',reset);

    app.get('/offer/:status',listActiveOffers);
    app.post('/offer',addOffer);
    app.put('/offer/enable/:id',ToggleOffer);
    app.delete('/offer/:id',removeOffer);
}
