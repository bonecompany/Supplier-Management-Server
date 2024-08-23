class ApiResponse {
<<<<<<< HEAD
    constructor(statusCode, data = null, message = "Success", password) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.password = password
        this.success = statusCode < 400;
=======
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
>>>>>>> f5c1cdf8aec4f61595595905d8153bc680539c3c
    }
}
export default ApiResponse;
