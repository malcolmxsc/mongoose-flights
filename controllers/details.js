const Flight = require('../models/flight');

module.exports = {
    details
};

async function details(req, res) {
    try {
        // Find the flight to attach the new destination to
        const flight = await Flight.findById(req.params.id);

        // Create a new destination object based on the form data
        const newDestination = {
            airport: req.body.destinations[0].airport,
            arrival: req.body.destinations[0].arrival
        };

        // Push the new destination into the flight's destinations array
        flight.destinations.push(newDestination);

        // Save any changes made to the flight document
        await flight.save();

        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/'); // Modify this redirect URL as needed
    }
}