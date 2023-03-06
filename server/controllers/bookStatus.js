import DiningTable from '../models/DiningTable.js';

export const postbookTable = async (req, res) => {
  try {
    const { tableNumber, userId } = req.body;

    const existingTable = await DiningTable.findOne({ tableNumber });
    if (existingTable && existingTable.occupied) {
      return res.json({
        success: false,
        message: 'Table already booked...',
      });
    }

    if (existingTable) {
      existingTable.occupied = true;
      existingTable.occupiedBy = userId;
      await existingTable.save();
    }

    return res.json({
      success: true,
      message: 'Table booked Successfully...',
      data: existingTable,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
