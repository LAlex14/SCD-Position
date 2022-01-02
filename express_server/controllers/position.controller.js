const db = require("../models");
const Position = db.position;

// Create and Save a new Position
exports.create = (req, res) => {
    // Validate request
    if (!req.body.latitude) {
        res.status(400).send({message: "Latitude can not be empty!"});
        return;
    }

    if (!req.body.longitude) {
        res.status(400).send({message: "Longitude can not be empty!"});
        return;
    }

    // Create a Position
    // const currDate = Date.now();
    const position = new Position({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        date: req.body.date ? new Date(req.body.date).getTime() : new Date().getTime()
        // date: req.body.date ? new Date(req.body.date) : new Date(),
    });

    // Save Position in the database
    position
        .save(position)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Position."
            });
        });
};

// Retrieve all Positions from the database.
exports.findAll = (req, res) => {
    let from = req.query.from;
    let to = req.query.to;
    if (from || to) {
        from = new Date(req.query.from).getTime() || 0;
        to = new Date(req.query.to).getTime() || new Date().getTime();
    }
    console.log(from, to);

    // let filterDate = {
    //     $function:
    //         {
    //             body: function (date) {
    //                 let posDate = new Date(date).getTime();
    //                 return posDate >= from && posDate<= to;
    //             },
    //             args: ["$date"],
    //             lang: "js"
    //         }
    // }
    // let condition = from && to ? { date: { $gte: from, $lte: to } } : {};
    // let condition = from || to ? { date: { $gte: from } } : {};
    // let condition = from || to ? { date: filterDate } : { };

    let condition = from || to ? {date: {$gte: from, $lte: to}} : {};

    Position.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving positions."
            });
        });
};

// Find a single Position with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Position.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Position with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Position with id=" + id});
        });
};

// Update a Position by the id in the request
exports.update = (req, res) => {
    if (req.body.date) {
        req.body.date = new Date(req.body.date).getTime();
    }

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Position.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Position with id=${id}. Maybe Position was not found!`
                });
            } else res.send({message: "Position was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Position with id=" + id
            });
        });
};

// Delete a Position with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Position.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Position with id=${id}. Maybe Position was not found!`
                });
            } else {
                res.send({
                    message: "Position was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Position with id=" + id
            });
        });
};

// Delete all Positions from the database.
exports.deleteAll = (req, res) => {
    Position.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Positions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all positions."
            });
        });
};