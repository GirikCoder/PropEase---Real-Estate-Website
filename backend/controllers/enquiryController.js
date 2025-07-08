const Enquiry = require('../models/Enquiry');
const Property = require('../models/Property');

exports.sendEnquiry = async (req, res) => {
  try {
    const { propertyId, message } = req.body;
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    const enquiry = await Enquiry.create({
      property: propertyId,
      sender: req.user.id,
      receiver: property.owner,
      message
    });
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send enquiry', error: err.message });
  }
};

exports.getReceivedEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ receiver: req.user.id })
      .populate('property')
      .populate('sender', 'name email');
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch received enquiries', error: err.message });
  }
};

exports.getSentEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ sender: req.user.id })
      .populate('property')
      .populate('receiver', 'name email');
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sent enquiries', error: err.message });
  }
}; 