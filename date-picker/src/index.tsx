// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from './components/DatePicker'

function App() {
  return (
    <div className="app">
      <DatePicker />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))