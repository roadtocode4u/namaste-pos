import Order from './../models/Order.js';
import responder from '../util/responder.js';

/*----- 1-create order API -----*/
export const postOrder = async (req, res) => {
  const { userId, tableNumber, orderType, items, orderComments } = req.body;

  const totalOrders = await Order.countDocuments();
  const orderId = totalOrders + 1;

  // validations to check if all the required fields are filled or not
  const requiredFields = ['tableNumber', 'items'];
  const emptyFields = requiredFields.filter((field) => !req.body[field]);

  if (emptyFields.length > 0) {
    responder(res, null, `${emptyFields.join(', ')} cannot be empty`, false);
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

    responder(res, savedOrder, 'Order placed successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

/*----- 2-Get orders API -----*/

// 2.1-Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    responder(res, orders, 'Orders fetched successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// 2.2-GET order/:id => get order by id
export const getOrderId = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    responder(res, order, 'Order fetched successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// 2.3-GET order/:tableNumber => get order by tableNumber
export const getOrderTableNumber = async (req, res) => {
  const { tableNumber } = req.query;

  try {
    const order = await Order.find({ tableNumber });

    if (order.length <= 0) {
      return res.json({
        success: false,
        message: 'No orders found',
      });
    }

    responder(res, order, 'Order fetched successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// 2.2-GET orders/:userId => get orders by userId
export const getOrdersUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const order = await Order.find({ userId: userId });
    responder(res, order, 'Orders fetched successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

/*----- 3-update orders API -----*/
// UPDATE order/:id => update order by id
export const putOrder = async (req, res) => {
  const { id } = req.params;
  const { items, orderType, status } = req.body;

  try {
    await Order.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          items,
          orderType,
          status,
        },
      }
    );

    const updatedOrder = await Order.findById(id);

    responder(res, updatedOrder, 'Order updated successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// 3.1-Update order status API
export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return responder(res, null, 'Order not found', false);
    }

    order.status = status;
    const updatedOrder = await order.save();

    responder(res, updatedOrder, 'Order status updated successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

/*----- 4-delete order API -----*/
// DELETE order/:id => delete order by id
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.deleteOne({
      _id: id,
    });

    responder(res, order, 'Order deleted successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};
