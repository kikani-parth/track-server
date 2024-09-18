const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth); // requires user to be logged in

router.get('/tracks', async (req, res) => {
  //const userId = req.user._id;
  const tracks = await Track.find({ userId: req.body._id });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide name and locations' });
  }

  try {
    const track = new Track({ name, locations, userId: req.body._id });
    await track.save();

    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
