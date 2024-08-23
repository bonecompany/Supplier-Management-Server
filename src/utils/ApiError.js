
class ApiError extends Error {
    constructor(statusCode, errors = [], message = "somting went wrong", stack = "",) {
<<<<<<< HEAD

=======
        console.log(Error())
>>>>>>> f5c1cdf8aec4f61595595905d8153bc680539c3c
        super(message);
        this.errors = Array.isArray(errors) ? errors : [errors];
        this.statusCode = statusCode;
<<<<<<< HEAD
        this.success = false

=======
        this.data = null
        this.Errormessage = errors.errors
        this.success = false
        this.errors = errors;
        console.log(Array.isArray(), "array");
>>>>>>> f5c1cdf8aec4f61595595905d8153bc680539c3c
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError