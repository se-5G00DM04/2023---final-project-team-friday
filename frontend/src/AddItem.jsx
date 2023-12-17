// AddItem.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddItem = ({ inputValue, setInputValue, handleAddButtonClick }) => {
    return (
      <div className='add-item-box'>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className='add-item-input'
          placeholder='Add an item...'
        />
        <FontAwesomeIcon icon={faPlus} onClick={handleAddButtonClick} />
      </div>
    );
  };
  
  export default AddItem;
