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


// POST /api/items route for adding a new item, accept the POST req from frontend with provided data,
// ad a id to it and add it to items array and then send the resposnse
router.post('/', (req, res) => {
  const newItem = {
    id: ITEMS.length + 1, // Assign a unique ID (incrementing integer)
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    isSelected: req.body.isSelected,
  };

  ITEMS.push(newItem);
  res.status(201).json(newItem); // 201 Created for successful creation
});

//   // POST /api/items - Add a new item
// router.post('/', (req, res) => {
//     const newItem = req.body;
//     ITEMS.push(newItem);
//     res.json(newItem);
//   });


// DELETE route for deleting an item by ID
router.delete('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = ITEMS.findIndex((item) => item.id === itemId);//find the index of the item which match the id

  if (index !== -1) {
      ITEMS.splice(index, 1);
      res.status(200).json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
