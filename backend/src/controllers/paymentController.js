const RazorpayService = require('../services/razorpayService');

class PaymentController {
  static async createOrder(req, res) {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
        data: null
      });
    }

    const response = await RazorpayService.createOrder(amount);
    return res.status(response.statusCode).json(response);
  }

  static async verifyPayment(req, res) {
    const { paymentId, orderId, signature } = req.body;
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters',
        data: null
      });
    }

    const response = await RazorpayService.verifyPayment(paymentId, orderId, signature);
    return res.status(response.statusCode).json(response);
  }

  static async getPaymentDetails(req, res) {
    const { paymentId } = req.params;
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
        data: null
      });
    }

    const response = await RazorpayService.fetchPaymentDetails(paymentId);
    return res.status(response.statusCode).json(response);
  }
}

module.exports = PaymentController; 