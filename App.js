/**
 * Challenge: build the basic structure of our game
 * 
 * 1. <h1> title at the top
 * 2. <textarea> for the box to type in 
 *      (tip: React normalizes <textarea /> to be more like <input />, 
 *      so it can be used as a self-closing element and uses the `value` property
 *      to set its contents)
 * 3. <h4> ti display the amount of time remaining
 * 4. <button> to start the game
 * 5. Another <h1> to display the word count
 * 
 */

 import React, {useState, useEffect, useRef} from 'react';
 import useGameLogic from './Hooks/useGameLogic'
 
 function App () {
   const {
     textAreaRef,
     handleTextInput,
     handleClick, 
     count, 
     timeRemaining,
     start,
     textInput
    } = useGameLogic()

  return (
    <div>
      <h1>Speed Typer</h1>

      <textarea ref={textAreaRef} disabled={!start} value={textInput} onChange={handleTextInput}/> 
      <h4>Time Remaining: {timeRemaining} </h4>
      <button disabled={start} onClick={handleClick}> Start </button>
      <h1>Word count: {count}</h1>

    </div>
  )
 }

 export default App;