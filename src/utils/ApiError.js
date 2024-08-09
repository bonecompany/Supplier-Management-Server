
class ApiError extends Error {

    constructor(statusCode, errors = [], message = "somting went wrong", stack = "",) {

        console.log(Error())


        super(message);
        this.statusCode = statusCode;
        this.data = null
        this.Errormessage = errors.errors 
        this.success = false
        this.errors = errors; 
        
        console.log(Array.isArray(),"array");
        


        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

module.exports = ApiError;