
const Menu = require('../models/Menu');
const Contact = require('../models/Contact');


exports.createContact = async (req, res, next) => {
      // console.log(name)
    try {
      const { nomPrenom, email, message } = req.body;
      const contact = new Contact({ nomPrenom, email, message });
      const newMenuItem = await contact.save();
      res.status(201).json(newMenuItem);
    } catch (error) {
      next(error);
    }




};

exports.getAllContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Menu.findById(id);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};



exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await Contact.deleteOne(id);
    res.status(200).json(deletedMenuItem);
  } catch (error) {
    next(error);
  }
};

