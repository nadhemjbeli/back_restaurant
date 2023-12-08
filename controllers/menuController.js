
const Menu = require('../models/Menu');


exports.createMenuItem = (name, price, image) => {
  return new Promise((resolve, reject) => {
      console.log(name)
      const menuItem = new Menu({name, price, image});
      console.log(menuItem)
        const newMenuItem = menuItem.save().then((item) => {
          resolve(item);
        }).catch((err) => {
          reject({message: "Failed to save item to database", error: err});
        });
    }
  )



};

exports.getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
};

exports.getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    next(error);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, { name, price }, { new: true });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const deletedMenuItem = await Menu.findByIdAndDelete(id);
    res.status(200).json(deletedMenuItem);
  } catch (error) {
    next(error);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erreur lors de l\'upload du fichier' });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'upload du fichier' });
      }
      
      const { id } = req.params;
      const imageUrl = req.file.path; // Chemin de l'image uploadée
      
      const menuItem = await Menu.findByIdAndUpdate(id, { imageUrl }, { new: true });
      res.status(200).json(menuItem);
    });
  } catch (error) {
    next(error);
  }
};
