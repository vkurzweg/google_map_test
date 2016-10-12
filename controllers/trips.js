var Trip = require('../models/trip');

module.exports = {
  index: index,
  show: show,
  create: create,
  delete: del
};

 //need to use populate('').exec(function(err, user)) req.body(json body parser)

function index(req, res) {
  Trip.findBy({userId: req.user.id}, function(err, trips) {
    if (err) return res.status(401).json({msg: 'Failed to retrieve Trips'});
    res.status(200).json(trips);
  });
}

function show(req, res) {
  Trip.findOne(req.user.id).sort({_id: -1}).exec(function(err, trip){
   if (err) return res.status(401).json({msg: 'Failed to retrieve Trips'});
    res.status(200).json(trip);
  });
}


function create(req, res) {
  var trip = new Trip(req.body);
  trip.stops = [];
  trip.userId = req.user.id;
  trip.save(function(err, trip){
    if (err) return res.status(401).json({msg: 'Failed to save Trip'});
    res.status(201).json(trip);
 });
}

function del(req, res) {
  Trip.findByIdAndRemove(req.params.tripId, function(err, trip){
    trip.pop();
    trip.save(function(err){
      res.json(trip);
    })
  })
}
