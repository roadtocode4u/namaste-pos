import Order from "./../models/Order.js";

/*----- 1-create order API -----*/
export const postOrder =  async (req, res) => {
    const { userId, tableNumber, orderType, items, orderComments } = req.body;
  
    const totalOrders = await Order.countDocuments();
    const orderId = totalOrders + 1;
  
    // validations to check if all the required fields are filled or not
    const requiredFields = ['tableNumber', 'items', 'orderType'];
    const emptyFields = requiredFields.filter((field) => !req.body[field]);
  
    if (emptyFields.length > 0) {
      return res.json({
        success: false,
        message: `${emptyFields.join(', ')} cannot be empty`,
      });
    }
  
    try {
      const order = new Order({
        orderId,
        userId,
        tableNumber,
        orderType,
        items,
        orderComments,
      });
  
      const savedOrder = await order.save();
  
      res.json({
        success: true,
        message: 'Order placed successfully',
        data: savedOrder,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  }

  /*----- 2-Get orders API -----*/

  // 2.1-Get all orders
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
  
      res.json({
        success: true,
        message: 'Orders fetched successfully',
        results: orders.length,
        data: orders,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  }

  // 2.2-GET order/:id => get order by id
  export const getOrderId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id);
  
      res.json({
        success: true,
        message: 'Order fetched successfully',
        data: order,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  }