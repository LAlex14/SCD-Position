module.exports = app => {
    const positions = require("../controllers/position.controller.js");

    var router = require("express").Router();

    // Create a new Position
    router.post("/", positions.create);

    // Retrieve all Positions
    router.get("/", positions.findAll);

    // Retrieve a single Position with id
    router.get("/:id", positions.findOne);

    // Update a Position with id
    router.put("/:id", positions.update);

    // Delete a Position with id
    router.delete("/:id", positions.delete);

    // Create a new Position
    router.delete("/", positions.deleteAll);

    app.use('/api/positions', router);
};