class ApiResponse {
    constructor(statusCode, data = null, message = "Success", password) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.password = password
        this.success = statusCode < 400;
    }
}
export default ApiResponse;
