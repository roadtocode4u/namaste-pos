import DiningTable from '../models/DiningTable.js';
import responder from './../util/responder.js';

// POST creatediningtable =>
export const postDiningTable = async (req, res) => {
  try {
    const { tableNumber, capacity, tableLocation, tableService } = req.body;

    const existingTable = await DiningTable.findOne({ tableNumber });

    if (existingTable) {
      return responder(res, null, 'Table already exists', false);
    }
    const diningTable = new DiningTable({
      tableNumber,
      capacity,
      tableLocation,
      tableService,
    });

    const savedDiningTable = await diningTable.save();
    return responder(res, savedDiningTable, 'DiningTable created successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// GET diningTable?id => get diningTable by id
export const getDiningTableByID = async (req, res) => {
  const { id } = req.params;
  const diningTable = await DiningTable.findById(id).populate('occupiedBy');

  if (!diningTable) {
    responder(res, null, 'DiningTable not found', false);
  }
  responder(res, diningTable, 'DiningTable fetched successfully');
};

// GET diningtables => get all diningtables
export const getallDiningTables = async (req, res) => {
  try {
    const diningtables = await DiningTable.find().populate('occupiedBy');

    responder(res, diningtables, 'DiningTable fetched successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// PUT diningTable/:id => update diningTable by id
export const putDiningTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { tableNumber, capacity, tableLocation, tableService } = req.body;

    await DiningTable.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          tableNumber,
          capacity,
          tableLocation,
          tableService,
        },
      }
    );

    const updatedDiningTable = await DiningTable.findById(id);

    responder(res, updatedDiningTable, 'DiningTable updated successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

// DELETE DiningTable/:id => delete DiningTable by id
export const deleteDiningTable = async (req, res) => {
  try {
    const { id } = req.params;

    const diningTable = await DiningTable.deleteOne({
      _id: id,
    });
    responder(res, diningTable, 'DiningTable deleted successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};
