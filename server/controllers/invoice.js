import Invoice from './../models/Invoice.js';
import responder from './../util/responder.js';

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
    responder(
      res,
      null,
      `${invoiceNumber} invoice number already exists`,
      false
    );
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
    responder(res, savedInvoice, 'Invoice Created Successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

export const getInvoice = async (req, res) => {
  const invoices = await Invoice.find();

  try {
    responder(res, invoices, 'Invoices fetched Successfullty');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

export const getInvoiceByInvoiceNumber = async (req, res) => {
  const { invoiceNumber } = req.query;
  const invoice = await Invoice.findOne({ invoiceNumber });

  if (!invoice) {
    responder(res, null, 'Invoice not Found', false);
  }
  responder(res, invoice, 'invoice fetched successfully');
};

export const getInvoiceId = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findById(id);

  if (!invoice) {
    responder(res, null, 'Invoice not Found', false);
  }
  responder(res, invoice, 'invoice fetched successfully');
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
    responder(res, updateInvoice, 'Invoice updated successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.deleteOne({
      _id: id,
    });
    responder(res, invoice, 'Invoice deleted Successfully');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};
