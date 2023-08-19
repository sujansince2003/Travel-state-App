import React, { useState } from "react"

import "./App.css"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
]

const App = () => {
  return (
    <>
      <Logo />
      <Form />
      <Packinglist />
      <Stats />
    </>
  )
}

const Logo = () => {
  return (
    <>
      <h1>🏝️ Far Away 🚎</h1>
    </>
  )
}
const Form = () => {
  const [description, setDescription] = useState("")
  const [quantity, setquantity] = useState(1)

  const HandleSubmit = (e) => {
    e.preventDefault()
    //making a object when we receive data from input
    if (!description) return
    const newItem = { description, quantity, packed: true, id: 5 }
    console.log(newItem)

    //clearing input fields
    setDescription("")
    setquantity(1)
  }

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
            setDescription(() => e.target.value)
          }}
        />
        <button>Add</button>
      </form>
    </>
  )
}
const Packinglist = () => {
  return (
    <>
      <div className="list">
        <ul>
          {initialItems.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

const Item = ({ item }) => {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        ❌
      </li>
    </>
  )
}
const Stats = () => {
  return (
    <>
      <footer className="stats">
        You have 9 items in your list and you have packed 4 items
      </footer>
    </>
  )
}

export default App
