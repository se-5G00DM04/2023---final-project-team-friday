import './App.css';
import Total from './Total';
import AddItem from './AddItem';
import ItemList from './ItemList';

import React, { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(6);

  return (
    <div className='app-background'>
			<div className='main-container'>
			<h1>Shopping List:</h1>
			<ItemList
				// Prop: Pass the current state of items to the ItemList component,same for other function
				items={items}
				/>
			<Total totalItemCount={totalItemCount} />
			</div>
		</div>
  );
}

export default App;
