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
  const handleClear = () => {
    const confirmed = window.confirm("Are You Sure want to clear all Lists");
    if (confirmed) setItems(() => []);
  };
  useEffect(() => {}, [items]);
  return (
    <>
      <Logo />
      <Form onAddItems={HandleaddItems} />
      {/* passing function as props to child can execute funtion in parent comp and also can change state ::this is how passing data from child to parent */}
      <Packinglist
        items={items}
        onDeleteitem={HandleDeleteItem}
        onpackeditem={HandlePackedItem}
        onclearitem={handleClear}
      />
      <Stats items={items} />
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
const Packinglist = ({ items, onDeleteitem, onpackeditem, onclearitem }) => {
  const [sortby, setSortby] = useState("input");
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              onDeleteitem={onDeleteitem}
              onpackeditem={onpackeditem}
              key={item.id}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
            <option value="input">Sort by input</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onclearitem}>Clear List</button>
        </div>
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
const Stats = ({ items }) => {
  if (!items.length)
    return <p className="stats">Start adding items for your trip😍😉</p>;
  const numItems = items.length;
  const packedNum = items.filter((pk) => pk.packed).length;
  const percent = Math.round((packedNum / numItems) * 100);
  return (
    <>
      <footer className="stats">
        {percent !== 100
          ? ` You have ${numItems} items in your list and you have packed ${packedNum}
        items (${percent ? percent : 0}% items packed)
                 `
          : "You are Ready to go🤩🥳"}{" "}
        <p>
          {percent < 100 ? "Click on the checkboxes to marked as packed" : null}
        </p>
      </footer>
    </>
  );
};

export default App;
