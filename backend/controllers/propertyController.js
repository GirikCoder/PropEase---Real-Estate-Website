const Property = require('../models/Property');
const path = require('path');

exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, location, area, rooms, parking, floor } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const property = await Property.create({
      title,
      description,
      price,
      location,
      area,
      rooms,
      parking,
      floor,
      image,
      owner: req.user.id
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create property', error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: err.message });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your properties', error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch property', error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { title, description, price, location, area, rooms, parking, floor } = req.body;
    const update = { title, description, price, location, area, rooms, parking, floor };
    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    }
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      update,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Property not found or not authorized' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update property', error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!property) return res.status(404).json({ message: 'Property not found or not authorized' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property', error: err.message });
  }
}; 