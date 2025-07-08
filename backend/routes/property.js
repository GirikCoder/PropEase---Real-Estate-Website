const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwtAuth = require('../config/jwt');
const {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', getAllProperties);
router.get('/my', jwtAuth, getMyProperties);
router.get('/:id', getPropertyById);
router.post('/', jwtAuth, upload.single('image'), createProperty);
router.put('/:id', jwtAuth, upload.single('image'), updateProperty);
router.delete('/:id', jwtAuth, deleteProperty);

module.exports = router; 