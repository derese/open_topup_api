import http from 'http';
import colors from 'colors';



export default function serverConfig(app)
{
    //Server Setup
    let port = process.env.PORT || 3000;
    let server = http.createServer(app); 

    server.listen(port,function(){
    if(process.env.NODE_ENV == 'development')
    {
    console.log('ENV:' .bold, process.env.NODE_ENV .bold .bgGreen);
    console.log('PORT:' .bold, port.toString() .bold .bgGreen);
    }
    else if(process.env.NODE_ENV == 'production')
    {        
    console.log('ENV:' .bold, process.env.NODE_ENV .bold .bgMagenta);
    console.log('PORT:' .bold, port.toString() .bold .bgMagenta);
    }
});

}