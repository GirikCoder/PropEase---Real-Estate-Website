const express = require('express');
const router = express.Router();
const jwtAuth = require('../config/jwt');
const {
  sendEnquiry,
  getReceivedEnquiries,
  getSentEnquiries
} = require('../controllers/enquiryController');

router.post('/', jwtAuth, sendEnquiry);
router.get('/received', jwtAuth, getReceivedEnquiries);
router.get('/sent', jwtAuth, getSentEnquiries);

module.exports = router; 