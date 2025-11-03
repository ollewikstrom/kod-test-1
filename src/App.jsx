import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Card from './components/Card';

function App() {
  // Initial bucket list items
  const [items, setItems] = useState([
    { id: 1, text: 'Learn to play guitar' },
    { id: 2, text: 'Visit Japan' },
    { id: 3, text: 'Run a marathon' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [nextId, setNextId] = useState(4);

  // Function to add a new item to the bucket list
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: nextId, text: newItem.trim() }]);
      // Update nextId for unique identification
      setNextId(nextId + 1);
      setNewItem('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addItem();
  }

  const deleteItem = (idToDelete) => {
    setItems(items.filter((item) => item.id !== idToDelete));
  };

  const handleTestClick = async () => {
    // Example function from Azure Open AI integration
    const res = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "I am going to Paris, what should I see?" }
        ]
      })
    });

    const data = await res.json();
    console.log(data.choices[0].message.content);
  }

  return (
    <>
      <nav className="navbar">
        <h2 className="navbar-title">My Bucket List</h2>
        <button onClick={handleTestClick}>Test</button>
      </nav>
      <div className="app">
        <div className="container">
          <h1>Things I Want To Do</h1>
          <p className="subtitle">Your personal bucket list</p>

          <form onSubmit={handleFormSubmit} className="add-form">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add something you want to do..."
              className="input"
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
        {items.length > 0 ? (
          <div className="cards-container">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="card-wrapper"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 100 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <Card title={item.text} description="This is something I want to do!" />
                  <button
                    className="btn btn-danger delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="no-items">No items in your bucket list. Add some!</p>
        )}
      </div> </>
  );
}

export default App;