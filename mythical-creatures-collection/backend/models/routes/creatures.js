const express = require('express');
const Creature = require('../creature.model'); // adjust the path as needed

const router = express.Router();

// Endpoint to get all creatures
router.route('/').get((req, res) => {
  debugger;
  Creature.find()
    .then(creatures => {
      console.log('Retrieved creatures from the database:', creatures);
      res.json(creatures);
    })
    .catch(err => {
      console.error('Error while fetching creatures:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.post('/add', async (req, res) => {
  try {
    const { name, description, habitat } = req.body;
    const newCreature = new Creature({ name, description, habitat });
    const savedCreature = await newCreature.save();
    res.json(savedCreature); // This will include the auto-generated _id from MongoDB
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Creature.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Creature not found.' });
    }
    res.json({ message: 'Creature deleted.', creature: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Endpoint to get a single creature by id
router.route('/:id').get((req, res) => {
  Creature.findById(req.params.id)
    .then(creature => {
      if (!creature) {
        return res.status(404).json({ message: 'Creature not found.' });
      }
      res.json(creature);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving creature', error: err });
    });
});

router.route('/:id').put((req, res) => {
  Creature.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(creature => {
      if (!creature) {
        return res.status(404).json({ message: 'Creature not found.' });
      }
      res.json(creature);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating creature', error: err });
    });
});


module.exports = router;
