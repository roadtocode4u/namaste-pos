import Invoice from './../models/Invoice.js';

export const postInvoice = async (req, res) => {
  const {
    invoiceNumber,
    invoiceDate,
    invoiceTotal,
    discount,
    tax,
    user,
    order,
  } = req.body;

  const existingInvoice = await Invoice.findOne({
    invoiceNumber: invoiceNumber,
  });

  if (existingInvoice) {
    return res.json({
      success: false,
      message: `${invoiceNumber} invoice number already exists`,
    });
  }

  try {
    const newInvoice = new Invoice({
      invoiceNumber,
      invoiceDate,
      invoiceTotal,
      discount,
      tax,
      user,
      order,
    });

    const savedInvoice = await newInvoice.save();

    res.json({
      status: true,
      message: 'Invoice Created Successfully',
      data: savedInvoice,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getInvoice = async (req, res) => {
  const invoices = await Invoice.find();

  try {
    res.json({
      success: true,
      message: 'Invoices fetched Successfullty',
      data: invoices,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getInvoiceByInvoiceNumber = async (req, res) => {
  const { invoiceNumber } = req.query;
  const invoice = await Invoice.findOne({ invoiceNumber });

  if (!invoice) {
    return res.send({
      success: false,
      message: 'Invoice not Found',
    });
  }
  res.json({
    success: true,
    message: 'invoice fetched successfully',
    data: invoice,
  });
};

export const getInvoiceId = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findById(id);

  if (!invoice) {
    return res.send({
      success: false,
      message: 'Invoice not Found',
    });
  }
  res.json({
    success: true,
    message: 'invoice fetched successfully',
    data: invoice,
  });
};

export const putInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      invoiceNumber,
      invoiceDate,
      invoiceTotal,
      discount,
      tax,
      user,
      order,
    } = req.body;

    await Invoice.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          invoiceNumber,
          invoiceDate,
          invoiceTotal,
          discount,
          tax,
          user,
          order,
        },
      }
    );

    const updateInvoice = await Invoice.findById(id);

    res.json({
      success: true,
      message: 'Invoice updated successfully',
      data: updateInvoice,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
