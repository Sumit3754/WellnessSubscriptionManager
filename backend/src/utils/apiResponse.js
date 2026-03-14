class ApiResponse {
  constructor(success, message, data = null, statusCode = 200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static success(data = null, message = 'Success', statusCode = 200) {
    return new ApiResponse(true, message, data, statusCode);
  }

  static error(message = 'Error', statusCode = 500, error = null) {
    return new ApiResponse(false, message, error, statusCode);
  }
}

module.exports = ApiResponse; 