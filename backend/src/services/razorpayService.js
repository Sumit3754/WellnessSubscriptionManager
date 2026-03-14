const Razorpay = require('razorpay');
const ApiResponse = require('../utils/apiResponse');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

class RazorpayService {
  static async createOrder(amount, currency = 'INR') {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt: `receipt_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      return ApiResponse.success(order, 'Order created successfully');
    } catch (error) {
      return ApiResponse.error('Failed to create order', 500, error);
    }
  }

  static async verifyPayment(paymentId, orderId, signature) {
    try {
      const text = `${orderId}|${paymentId}`;
      const generatedSignature = require('crypto')
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      if (generatedSignature === signature) {
        return ApiResponse.success({ verified: true }, 'Payment verified successfully');
      } else {
        return ApiResponse.error('Payment verification failed', 400);
      }
    } catch (error) {
      return ApiResponse.error('Failed to verify payment', 500, error);
    }
  }

  static async fetchPaymentDetails(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return ApiResponse.success(payment, 'Payment details fetched successfully');
    } catch (error) {
      return ApiResponse.error('Failed to fetch payment details', 500, error);
    }
  }
}

module.exports = RazorpayService; 