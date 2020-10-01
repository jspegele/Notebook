import React from 'react'
import AuthRouter from './components/AuthRouter'
import AuthContextProvider from './contexts/auth'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthRouter />
      </AuthContextProvider>
    </div>
  )
}

export default App
