const logger = require('./winstonLogger');
const errorHandler = function(err,req,res,next){
    if (res.headersSent) {
        return next(err)
      }

      logger.error(err.name,{'path':req.path,'body':req.body,'params':req.params,'query':req.query});
    res.status(500).send(err.message? err.message : 'Internal Server Error');
}
module.exports = errorHandler;