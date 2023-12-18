// ItemList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle,faMinus } from '@fortawesome/free-solid-svg-icons';

const ItemList = ({items, handleQuantityIncrease, handleQuantityDecrease, toggleComplete, deleteItem }) => {
  return (
    <div className='item-list'>
      {items.map((item, index) => (
        <div className='item-container' key={index}>
          <div className='delete-button' onClick={() => deleteItem(item.id, index)}>
            (<FontAwesomeIcon icon={faMinus} />)
          </div>
          <div className='item-name' onClick={() => toggleComplete(index)}>
        {/* {item.isSelected ? (...) : (...)}: This is a ternary operator that checks if item.isSelected is true or false. first part true and second part false */}

            {item.isSelected ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span className='completed'>{item.itemName}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircle} />
                <span>{item.itemName}</span>
              </>
            )}
          </div>

          <div className='quantity'>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
            </button>
            <span> {item.quantity} </span>
            <button>
              <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
