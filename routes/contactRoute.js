
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const {createContact} = require("../controllers/contactController");
const Contact = require("../models/Contact");
// const { storage } = require('../controllers/menuController');



// router.post('/', menuController.createMenuItem);
router.post('/create',async (req,res,next)=>{
    const { nomPrenom, email, message } = req.body;
    console.log(req.body)
    try {
        const newContact = new Contact({ nomPrenom, email, message });
        const savedContact = await newContact.save().then(c=>{
            console.log(c)
        });

        res.status(200).json(savedContact);
    } catch (error) {
        res.status(500).json({ error: 'Error saving contact' });
    }
})
router.post('/', contactController.createContact);
router.get('/', contactController.getAllContact);
// router.get('/:id', menuController.getMenuItemById);
// router.put('/:id', menuController.updateMenuItem);
// router.delete('/:id', menuController.deleteMenuItem);
// router.post('/:id/upload', menuController.uploadImage);


module.exports = router;