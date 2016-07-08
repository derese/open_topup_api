import  mongoose from 'mongoose';
import colors from 'colors';

export default function dbConfig()
{   
    //DB Setup
    if(process.env.NODE_ENV == 'development')
    mongoose.connect('mongodb://localhost/topupet_dev');

    else if(process.env.NODE_ENV == 'production')
    mongoose.connect('mongodb://localhost/topupet');

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'db conn:' .bold + 'Error' .red));
    db.once('open', function() {
    // we're connected!  
    console.log('DB_CONN:' .bold + 'Successful' .bold .bgGreen);
    });

}