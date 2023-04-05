import DiningTable from '../models/DiningTable.js';
import responder from '../util/responder.js';

export const bookTablePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { tableNumber } = req.params;
    const existingTable = await DiningTable.findOne({
      tableNumber: tableNumber,
    });
    if (existingTable && existingTable.occupied) {
      return responder(res, existingTable, 'Table already booked...');
    }

    if (existingTable) {
      existingTable.occupied = true;
      existingTable.occupiedBy = userId;
      await existingTable.save();
    }

    return responder(res, existingTable, 'Table booked successfully...');
  } catch (err) {
    return responder(res, null, err.message, false);
  }
};

export const postunbookTable = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const existingTable = await DiningTable.findOne({ tableNumber });

    if (existingTable) {
      existingTable.occupied = false;
      existingTable.occupiedBy = null;
      await existingTable.save();
    }

    responder(res, existingTable, 'Table unbooked successfully...');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

export const getavailableTables = async (req, res) => {
  try {
    const availableTables = await DiningTable.find({ occupied: false });

    responder(res, availableTables, 'Available tables fetched successfully...');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};
