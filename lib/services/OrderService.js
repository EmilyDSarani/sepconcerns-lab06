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
  // static async getOrders(){
  //   await sendSms(
  //     process.env.ORDER_HANDLER_NUMBER,
  //     'All Orders received for'
  //   );
  //   const order = await Order.insert();
  //   return order;
  // }
  static async getId(id, quantity){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Specific Orders received for ${id} with ${quantity}`
    );
    const order = await Order.update(id, quantity);
    return order;
  }
};
