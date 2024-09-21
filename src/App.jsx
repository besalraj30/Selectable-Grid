import { useState } from 'react'
import './App.css'
import SelectableGrid from './components/SelectableGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SelectableGrid rows={10} cols={10} />
    </>
  )
}

export default App
