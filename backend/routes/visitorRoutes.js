const express = require('express');
const Visitor = require('../models/Visitor');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitDateTime: -1 });
    res.json(visitors);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch visitors' }); }
});

router.get('/search', async (req, res) => {
  try {
    const query = (req.query.query || '').trim();
    if (!query) return res.json(await Visitor.find().sort({ visitDateTime: -1 }));
    const visitors = await Visitor.find({
      $or: [
        { visitorName: { $regex: query, $options: 'i' } },
        { mobileNumber: { $regex: query, $options: 'i' } }
      ]
    }).sort({ visitDateTime: -1 });
    res.json(visitors);
  } catch (err) { res.status(500).json({ message: 'Search failed' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) { res.status(400).json({ message: 'Invalid visitor ID' }); }
});

router.post('/', async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json({ message: 'Visitor deleted successfully' });
  } catch (err) { res.status(400).json({ message: 'Invalid visitor ID' }); }
});

module.exports = router;
