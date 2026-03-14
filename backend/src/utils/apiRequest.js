const axios = require('axios');
const ApiError = require('./apiError');

class ApiRequest {
  constructor(baseURL, headers = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async get(url, params = {}) {
    try {
      const response = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(url, data = {}) {
    try {
      const response = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(url) {
    try {
      const response = await this.client.delete(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return new ApiError(
        error.response.data.message || 'An error occurred',
        error.response.status
      );
    } else if (error.request) {
      // The request was made but no response was received
      return new ApiError('No response received from server', 503);
    } else {
      // Something happened in setting up the request that triggered an Error
      return new ApiError('Error setting up the request', 500);
    }
  }
}

module.exports = ApiRequest; 