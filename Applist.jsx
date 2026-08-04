import  { useState } from 'react';


function App() {
  
  const [items, setItems] = useState(['Buy groceries', 'Clean the kitchen']);
  
  
  const [inputValue, setInputValue] = useState('');

  
  const handleAddItem = (e) => {
    e.preventDefault(); 
    if (inputValue.trim() === '') return;

    setItems([...items, inputValue]); 
    setInputValue('');   
  };

  
  const handleDeleteItem = (indexToDelete) => {
    const updatedList = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedList);
  };

  return (
    <div className="list-container">
      <h1>My List App</h1>

      
      <form onSubmit={handleAddItem} className="input-form">
        <input
          type="text"
          placeholder="Add a new item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">Add</button>
      </form>


      <ul className="item-list">
        {items.length === 0 ? (
          <p className="empty-msg">No items in your list!</p>
        ) : (
          items.map((item, index) => (
            <li key={index} className="item-card">
              <span>{item}</span>
              <button 
                onClick={() => handleDeleteItem(index)} 
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;