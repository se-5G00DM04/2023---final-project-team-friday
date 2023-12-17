const express = require('express');
const router = express.Router();

const ITEMS = [
		{ id: 1, itemName: 'item 1', quantity: 1, isSelected: false },
		{ id: 2, itemName: 'item 2', quantity: 3, isSelected: true },
		{ id: 3, itemName: 'item 3', quantity: 2, isSelected: false },
]


// GET /api/items - Get all items
router.get('/', (req, res) => {
    res.json(ITEMS);
    console.log("I am from backend");
  });

// GET /api/items/:id - Get an item by ID
router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = ITEMS.find((item) => item.id === itemId);
  if (item) {
      res.json(item);
  } else {
      res.status(404).json({ message: 'Item not found' });
  }
});


module.exports = router;
