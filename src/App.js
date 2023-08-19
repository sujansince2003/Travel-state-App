import React, { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);

  const HandleaddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const HandleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const HandlePackedItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);
  return (
    <>
      <Logo />
      <Form onAddItems={HandleaddItems} />
      {/* passing function as props to child can execute funtion in parent comp and also can change state ::this is how passing data from child to parent */}
      <Packinglist
        items={items}
        onDeleteitem={HandleDeleteItem}
        onpackeditem={HandlePackedItem}
      />
      <Stats />
    </>
  );
};

const Logo = () => {
  return (
    <>
      <h1>🏝️ Far Away 🚎</h1>
    </>
  );
};
const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  const HandleSubmit = (e) => {
    e.preventDefault();
    //making a object when we receive data from input
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    //adding new item to list
    onAddItems(newItem);

    //clearing input fields
    setDescription("");
    setquantity(1);
  };

  return (
    <>
      <form className="add-form" onSubmit={HandleSubmit}>
        <h3>what do you need for Trip?</h3>
        <select value={quantity} onChange={(e) => setquantity(+e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => {
            setDescription(() => e.target.value);
          }}
        />
        <button>Add</button>
      </form>
    </>
  );
};
const Packinglist = ({ items, onDeleteitem, onpackeditem }) => {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              onDeleteitem={onDeleteitem}
              onpackeditem={onpackeditem}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const Item = ({ item, onDeleteitem, onpackeditem }) => {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onpackeditem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button
          onClick={() => {
            onDeleteitem(item.id);
          }}
        >
          ❌
        </button>
      </li>
    </>
  );
};
const Stats = () => {
  return (
    <>
      <footer className="stats">
        You have 9 items in your list and you have packed 4 items
      </footer>
    </>
  );
};

export default App;
