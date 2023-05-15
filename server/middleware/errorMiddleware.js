const ApiError = require("../error/ApiError");

module.exports = function(err, request, response, next){
  if(err instanceof ApiError){
    return response.status(err.status).json({message: err.message});
  }
  else{
    return response.status(500).json({message: 'Unexpected Error'});
  }
};
