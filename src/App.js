import React, { useState } from "react"

import "./App.css"

const App = () => {
  return <h1>🏝️ Far Away 🚎</h1>
}
const Logo = () => {
  return (
    <>
      <div className="add-form">
        <h3>what do you need for Trip?</h3>
      </div>
    </>
  )
}
const Packinglist = () => {
  return (
    <>
      <div className="list">list</div>
    </>
  )
}
const stats = () => {
  return (
    <>
      <footer>You have 9 items in your list and you have packed 4 items</footer>
    </>
  )
}

export default App
