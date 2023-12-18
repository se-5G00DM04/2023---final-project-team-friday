const request = require('supertest');
const app = require('../src/app');

// ----------Test case for fetching items /(3 case)-----------------------
describe('Test case for fetching items GET /api/items', () => {
    it('should return all items', async () => {
      const res = await request(app).get('/api/items');
      expect(res.statusCode).toEqual(200);
    });

    it('should return the item with the specified ID', async () => {
        const res = await request(app).get('/api/items/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1, itemName: 'item 1', quantity: 1, isSelected: false });
    });

    it('should return 404 if item with the specified ID is not found', async () => {
        const res = await request(app).get('/api/items/100'); // Assuming there is no item with ID 100
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Item not found' });
    });
  });



// -------Test case for adding a new item(1 case)-------------
describe('Test case for adding a new item POST /api/items', () => {
    it('should add a new item', async () => {
      const newItem = {
        itemName: 'New Item',
        quantity: 1,
        isSelected: false,
      };
      const res = await request(app).post('/api/items').send(newItem);
      expect(res.statusCode).toEqual(201);
      //expect(res.body.id).toBeTruthy();
      expect(res.body).toMatchObject({
            id: expect.anything(),
            itemName: newItem.itemName,
            quantity: expect.any(Number),
            isSelected: false,           
        });     
    });  
  });


// ------------ Test case for deleting an item (2 cases)---------------------------
describe('Test case for deleting, DELETE /api/items/:id', () => {
    it('should delete an item by ID', async () => {
      const res = await request(app).delete(`/api/items/1`);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual({ message: 'Item deleted successfully' });//response text is parsed as JSON before performing the comparison
    });
    //-------test for item not found to be deleted--------
    it('should return 404 if the item to delete is not found', async () => {
        const nonExistingItemId = 100;
        const res = await request(app).delete(`/api/items/${nonExistingItemId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Item not found' });//without parsing as JSON
    });

  });

