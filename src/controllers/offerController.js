import Offer from '../models/offer';
import {_error,mongooseErrorHelper} from '../helper/helpers';
import {formatResponse} from '../helper/messageFormat';




export function listActiveOffers(req,res,next)
{
    let status = req.params.status;
  if(status == 'enabled')
  {
   Offer.find()
   .where('enabled').equals(true)
   .sort({category:1})
   .exec()
   .then((val)=>{
       if(val)
       {
        res.status(200).send(formatResponse(false,null,val));
       }
   })
   .catch((err)=>{next(err);
       });
  }
  else
  {
    Offer.find()   
   .sort({category:-1,name:-1})
   .exec()
   .then((val)=>{
       if(val)
       {
           res.status(200).send(formatResponse(false,null,val));
           //console.log(val);
       }
   })
   .catch((err)=>{next(err);});
  }
}

export function addOffer(req,res,next)
{
    let name = req.body.name;
    let cost = req.body.cost;
    let category = req.body.category;

    Offer.findOne({name:name})
    .catch((err)=>{next(err);})
    .then((val)=>{
        if(val)
        return res.status(422).json(formatResponse(true,"Offer is already available",null));

        let offer = new Offer({
            name:name,
            cost:cost,
            category:category
        });

        offer.save()
        .catch((err)=>{
            mongooseErrorHelper(err);
            return res.status(422).json(formatResponse(truem_error,null));
        })
        .then((val)=>res.send(formatResponse(false,null,val)));
    });
}


export function ToggleOffer(req,res,next)
{
    let id = req.params.id;
    let enable = req.body.enable;

     Offer.findByIdAndUpdate(id,{enabled:enable},{new:true})
    .catch((err)=>{next(err);})
    .then((newVal)=>{
        if(!newVal)
        return res.status(422).send(formatResponse(true,"Couldn't enabled offer",null));

        return res.status(200).send(formatResponse(false,null,{val:newVal}));
    });
}

export function removeOffer(req,res,next) 
{
    let id = req.params.id;

    Offer.findByIdAndRemove(id)
    .catch((err)=>{next(err)})
    .then((val)=>{
        return res.status(200).send(formatResponse(false,null,val));
    });
}

