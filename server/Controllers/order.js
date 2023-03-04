import Order from "../models/Order.js";

/*----- 1-create order API -----*/
export const postOrder = async (req, res) => {
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