import { useState } from 'react'
import ADT1Form from './components/ADT1-Form.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ADT1Form />
    </div>
  )
}

export default App
