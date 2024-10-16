import React from 'react'
import CreateRule from "./components/CreateRule"
import EvaluateRule from "./components/EvaluateRule"
import CombineRules from "./components/CombineRules"

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>Rule Engine with AST</h1>
      <div className='max-w-4xl mx-auto space-y-8'>
        <CreateRule/>
        <CombineRules/>
        <EvaluateRule/>

      </div>
      
    </div>
  )
}

export default App
