import './App.css';
import Total from './Total';
import AddItem from './AddItem';
import ItemList from './ItemList';

import React, { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(6);

	useEffect(() => {
		// Fetch data from the backend when the component mounts
		fetchItems();
	  }, []);

	  // -------------fetchItems function sends a GET request to the /api/items endpoint------------------
	  const fetchItems = async () => {
		console.log("fethching items....");
		  try {
			//const response = await fetch('http://localhost:4000/api/items'); // fetch API to GET all items from backend server endpoint
			const response = await fetch(`${process.env.REACT_APP_BACKEND}/items`);
			if(!response.ok){
			  throw new Error("No Items found");
			}
			const data = await response.json();//convert to JSON . json() return a promise
  
			setItems(data);// set the items variable with received data
			//calculateTotal(data);
		  } catch (error) {
			console.error('Error fetching items:', error);
		  }
		};

	//--------------------handleAddButtonClick(Add a new item)---------------------------
	const handleAddButtonClick = async () => {
		try {
		  // Using the Fetch API to send a POST request to the '/api/items' endpoint of the server
		  //const response = await fetch('http://localhost:4000/api/items', {
			const response = await fetch(`${process.env.REACT_APP_BACKEND}/items`,{
			method: 'POST',  
			headers: {
			  'Content-Type': 'application/json',  // Setting the content type to JSON
			},
			body: JSON.stringify({  // Converting sending data to JSON format
			  itemName: inputValue,
			  quantity: 0,
			  isSelected: false,
			}),
		  });
		  // Checking if the response status is OK (status code 200-299)
		  if (response.ok) {
			// If the item was successfully added, fetch the updated items
			fetchItems();  // fetching the items from backend again including the new one
			setInputValue('');  // Resetting the input value to an empty string
		  } else {
			// If the response status is not OK, log an error message
			console.error('Failed to add item:', response.statusText);
		  }
		} catch (error) {
		  // Catching and logging any errors that occur during the asynchronous operation
		  console.error('Error adding item:', error);
		}
	  };
	  

	//--------------------handleQuantityIncrease---------------------------
	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal(newItems);
	};

	//--------------------handleQuantityDecrease---------------------------
	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		if (newItems[index].quantity > 0) {
			newItems[index].quantity--;
		setItems(newItems);
		calculateTotal(newItems);
    }
	};

//--------------------toggleComplete---------------------------
	const toggleComplete = (index) => {
		const newItems = [...items];
		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};


// --------------------deleteItem ---------------------------
const deleteItem = async (id, index) => {
	try {
	  const newItems = [...items];
	  // Check if the item is selected before deleting
	  if (!newItems[index].isSelected) {
		// Handle the case where the item is not selected 
		alert("To delete an Item, Check the Item as completed first");
	  } else {
		// Send a DELETE request to the backend API to delete the item with the specified ID
		// It doesn't explicitly fetch the item before sending the delete request. The assumption is that the backend API endpoint (http://localhost:5000/api/items/${id}) is designed to handle the deletion based on the provided ID.
		//const response = await fetch(`http://localhost:4000/api/items/${id}`, {
		const response = await fetch(`${process.env.REACT_APP_BACKEND}/items/${id}`,{
		  method: 'DELETE',
		});
  
		if (response.ok) {
		  newItems.splice(index, 1); // Remove the item at the specified index
		  setItems(newItems);
		  calculateTotal(newItems);
		} else {
		  // Handle the case where the deletion was not successful
		  console.error('Failed to delete item:', response.statusText);
		}
	  }
	} catch (error) {
	  // Handle network or other errors
	  console.error('Error deleting item:', error);
	}
  };
  
  
//--------------------calculateTotal---------------------------
	const calculateTotal = (items) => {
		const totalItemCount = items.reduce((total, item) => { // callback function for reduce. It takes two parameters (total and item)
      // and adds the quantity of each item to the running total.
			return total + item.quantity;
		}, 0); //0: The initial value of total before any iterations.

		setTotalItemCount(totalItemCount);
	};

  return (
    <div className='app-background'>
			<div className='main-container'>
			<h1>Shopping List:</h1>
			<AddItem
			  	// Prop: Pass the current value of inputValue to the AddItem component
				inputValue={inputValue} 
				// Prop: Pass the function to update the inputValue to the AddItem component
				setInputValue={setInputValue}
				handleAddButtonClick={handleAddButtonClick}
        		/>
			<ItemList
				// Prop: Pass the current state of items to the ItemList component,same for other function
				items={items}
				handleQuantityIncrease={handleQuantityIncrease}
				handleQuantityDecrease={handleQuantityDecrease}
				// Prop: Pass the toggleComplete function to the ItemList component
				toggleComplete={toggleComplete}
				// Prop: Pass the deleteItem function to the ItemList component
				deleteItem={deleteItem}
				/>
			<Total totalItemCount={totalItemCount} />
			</div>
		</div>
  );
}

export default App;
