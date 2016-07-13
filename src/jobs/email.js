var email = require('emailjs');
var server  = email.server.connect({
    user:    "noreply.topup@gmail.com", 
    password:"topup123456", 
    host:    "smtp.gmail.com", 
    ssl:     true
    });


module.exports = function(agenda)
{        
    agenda.define('registration email',(job,done)=>{
        //find the user and if it existis send thank you for registering email
    });

    agenda.define('reset password',(job,done)=>{        
        server.send({
        text:    "i hope this works", 
        from:    "noreply.topup@gmail.com", 
        to:      job.attrs.data.email, 
        subject: "Topup Reset Password"
        }, function(err, message) {             
            if(err)            
            done(err);            
            else                
            done();                    
         });
        
        //check user that has set reset password to true and send email
    });
}




// send the message and get a callback with an error or details of the message that was sent
/*server.send({
   text:    "i hope this works", 
   from:    "no-reply@topup.com", 
   to:      "deresegetachew@gmail.com", 
   subject: "Topup Reset Password"
}, function(err, message) { console.log(err || message); });
*/