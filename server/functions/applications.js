const express = require('express');
const router = express.Router()
const { json } = require('express');
const db = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

module.exports = router