import User from '../models/user';
import {_error,mongooseErrorHelper} from '../helper/helpers';
import {formatResponse} from '../helper/messageFormat';

export function addContact(req,res,next)
{
    let contact = req.body.contact;
    let user_id = req.params.id;

    User.findById(user_id)
    .select('userContacts')
    .catch((err)=>{
        mongooseErrorHelper(err)
        return res.status(500).send(formatResponse(true,_error,null));
    })
    .then((val)=>{
        if(!val)
        return res.status(422).send(formatResponse(true,"User not found",null))
        //val is Selected User therefore acess the users Contacts sub document 
        //and modify.        
        val.userContacts.push(contact);        
        val.save().catch(err => {
            mongooseErrorHelper(err); 
            return res.status(422).json(formatResponse(true,_error,null)); 
        })
        .then((val)=>{            
            return res.status(200).send(formatResponse(false,null,val.userContacts[val.userContacts.length-1])); 
        });
    });
}

export function editContact(req,res,next)
{
    let contactId = req.params.contactId;
    let userID = req.params.userId;

    let contactInfo = req.body.contact;

    User.findById(userID)
    .catch((err) => {
        mongooseErrorHelper(err); 
        return res.status(422).json(formatResponse(true,_error,null)); 
    } )
    .then((val)=>{
        let contact = val.userContacts.id(contactId);        
        if(contact)
        {
            contact.firstName = contactInfo.firstName;
            contact.lastName = contactInfo.lastName;
            contact.phoneNumber = contactInfo.phoneNumber;
            contact.contactGroup = contactInfo.contactGroup;
            val.save()
            .catch((err) => {
                mongooseErrorHelper(err); 
                return res.status(422).json(formatResponse(true,_error,null)); 
            })
            .then((val) => {
                res.status(200).send(formatResponse(false,null,val.userContacts.id(contactId)));
            });
        }
        else
        res.status(404).send(formatResponse(true,"contact not found"),null);
    });
}

