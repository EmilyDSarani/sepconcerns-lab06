const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert(quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }

  static async getId(id){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Specific Orders received for ${id}`
    );
    const order = await Order.getId(id);
    return order;
  }

  static async updateId(id, quantity){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Specific Orders received for ${id} with ${quantity}`
    );
    const order = await Order.updateId(id, quantity);
    return order;
  }
  static async deleteId(id){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Specific Orders deleted for ${id}`
    );
    const order = await Order.deleteId(id);
    return order;
  }
};

