import './App.css';
import Total from './Total';
import AddItem from './AddItem';
import ItemList from './ItemList';

import React, { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(6);

	//--------------------handleAddButtonClick(Add a new item)---------------------------
	const handleAddButtonClick = async () => {
		console.log('Button clicked');
		try {
		  // Using the Fetch API to send a POST request to the '/api/items' endpoint of the server
		  const response = await fetch('http://localhost:5003/api/items', {
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
			// fetchItems();
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
