import DiningTable from '../models/DiningTable.js';

// POST creatediningtable =>
export const postDiningTable = async (req, res) => {
  try {
    const {
      tableNumber,
      capacity,
      numberOfTable,
      tableLocation,
      tableService,
    } = req.body;

    const existingTable = await DiningTable.findOne({ tableNumber });

    if (existingTable) {
      return res.json({
        success: false,
        message: 'Table already exists',
      });
    }
    const diningTable = new DiningTable({
      tableNumber,
      capacity,
      numberOfTable,
      tableLocation,
      tableService,
    });

    const savedDiningTable = await diningTable.save();

    res.json({
      success: true,
      message: 'DiningTable created successfully',
      data: savedDiningTable,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'err in the catch block',
    });
  }
};

// GET diningTable?id => get diningTable by id
export const getDiningTableByID = async (req, res) => {
  const { id } = req.params;
  const diningTable = await DiningTable.findById(id);

  if (!diningTable) {
    return res.send({
      success: false,
      message: 'DiningTable not Found',
    });
  }
  res.json({
    success: true,
    message: 'DiningTable fetched successfully',
    data: diningTable,
  });
};

// GET diningtables => get all diningtables
export const getallDiningTables = async (req, res) => {
  try {
    const diningtables = await DiningTable.find();

    res.json({
      success: true,
      message: 'DiningTable fetched successfully...',
      results: diningtables.length,
      data: diningtables,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// PUT diningTable/:id => update diningTable by id
export const putDiningTable = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tableNumber,
      capacity,
      numberOfTable,
      tableLocation,
      tableService,
    } = req.body;

    await DiningTable.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          tableNumber,
          capacity,
          numberOfTable,
          tableLocation,
          tableService,
        },
      }
    );

    const updatedDiningTable = await DiningTable.findById(id);

    res.json({
      success: true,
      message: 'DiningTable updated Successfully',
      data: updatedDiningTable,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE DiningTable/:id => delete DiningTable by id
export const deleteDiningTable = async (req, res) => {
  try {
    const { id } = req.params;

    const diningTable = await DiningTable.deleteOne({
      _id: id,
    });
    res.json({
      success: true,
      message: 'DiningTable Deleted Successfully',
      data: diningTable,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
