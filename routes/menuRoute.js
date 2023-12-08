const Menu = require('../models/Menu');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const menuController = require('../controllers/menuController');
const fs = require("fs");
// const { storage } = require('../controllers/menuController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // set the filename for uploaded files
    }
});

const fileFilter = function (req, file, cb) {
    // set the file filter for uploaded files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// router.post('/', menuController.createMenuItem);
router.post('/',upload.single('image'),(req,res,next)=>{
    const image = req.file.path;
    // console.log(req.body);
    menuController.createMenuItem(req.body.name,req.body.price,image)
        .then((item)=>res.status(200).json({
            item:item,
            msg:'Item created successfully'
        }))
        .catch((err)=>res.status(400).json({error:err}));
})
// router.post('/', upload.single('image'), menuController.createMenuItem);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
// router.put('/:id', menuController.updateMenuItem);
router.put('/put/:id', upload.single('image'), async (req, res) => {

    const itemId = req.params.id;
    const { name, price } = req.body;
    let imagePath = null;

    // Check if a new image was uploaded
    if (req.file) {
        imagePath = req.file.path; // Get the path of the uploaded image
    }
    // console.log(imagePath)

    try {
        const itemToUpdate = await Menu.findById(itemId);
        // console.log(itemToUpdate)
        if (!itemToUpdate) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update name and price if provided
        if (name) itemToUpdate.name = name;
        if (price) itemToUpdate.price = price;

        // Update the image path if a new image was uploaded
        if (imagePath) {
            if (itemToUpdate.image) {
                // Remove the previous image file if it exists
                fs.unlinkSync(itemToUpdate.image);
            }
            itemToUpdate.image = imagePath;
        }

        const updatedItem = await itemToUpdate.save();


        return res.json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating item', error: error.message });
    }
});
router.delete('/:id', menuController.deleteMenuItem);
router.post('/:id/upload', menuController.uploadImage);


module.exports = router;