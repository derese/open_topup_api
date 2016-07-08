export let  _error = [];

export function mongooseErrorHelper(err)
{    _error = [];
    for (var errName in err.errors) {
      _error.push(err.errors[errName].message);                                                                                            
  } 

}

