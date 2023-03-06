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

export const postunbookTable = async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const existingTable = await DiningTable.findOne({ tableNumber });

    if (existingTable) {
      existingTable.occupied = false;
      existingTable.occupiedBy = null;
      await existingTable.save();
    }

    res.json({
      success: true,
      message: 'Table unbooked uccessfully...',
      data: existingTable,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getavailableTables = async (req, res) => {
  try {
    const availableTables = await DiningTable.find({ occupied: false });

    res.json({
      success: true,
      message: 'Available tables fetched successfully...',
      results: availableTables.length,
      data: availableTables,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
