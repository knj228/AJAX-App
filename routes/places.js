const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Bring in mongoose model, Place, to represent a restaurant
const Place = mongoose.model('Place');

// TODO: create two routes that return json
// GET /api/places
// POST /api/places/create
// You do not have to specify api in your urls
// since that's taken care of in app.js when
// this routes file is loaded as middleware
router.get('/places', (req, res) => {
  const c = req.query.cuisine;
  const l = req.query.location;

  if(req.query.cuisine == undefined && req.query.location === undefined || req.query.cuisine == "" && req.query.location === ""){
    Place.find(function(err, rs, count) {
      if(err) {
        res.send(err);
      }
      res.json(rs);
  });
 }
  else{
  var Cquery = req.query.cuisine;
  var Lquery = req.query.location;
  Place.find({ cuisine: req.query.cuisine, location: req.query.location},function(err, rs, count) {
  if(err) {
    res.send(err);
  }
    res.json(rs);
  });
 }
});

router.post('/places/create', (req, res) => {
  new Place({
    name: req.body.addname,
    cuisine: req.body.addcuisine,
    location: req.body.addlocation
  }).save(function(err, places, count){res.redirect("/api/places")});
 });
module.exports = router;
