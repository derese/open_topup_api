let responseMessage = {
    hasError:false,
    message:[],
    data:{}    
}

export function formatResponse(hasError,message,data)
{   
    responseMessage.hasError = hasError;
    responseMessage.message = [];

    if(Array.isArray(message))
    message.map((val)=>responseMessage.message.push(val));
    else if(message){
    responseMessage.message.push(message);
    }
    

    responseMessage.data = data;

    return responseMessage;
}