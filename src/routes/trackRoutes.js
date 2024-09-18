const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth); // requires user to be logged in

router.get('/tracks', async (req, res) => {
  //const userId = req.user._id;
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

module.exports = router;
