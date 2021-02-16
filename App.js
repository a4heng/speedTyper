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

 const TIMER = 5
 
 function App () {
   const [start, setStart] = useState(false)
   const [textInput, setTextInput] = useState('');
   const [count, setCount] = useState(0)
   const [timeRemaining, setTimeRemaining] = useState(TIMER);
   const textAreaRef = useRef();
   let timeoutID;
   //handle updates to the input box
   const handleTextInput = (event) => {
     const {value} = event.target;
     setTextInput(value)
   }

   useEffect(()=>{
    if(timeRemaining > 0 && start){
      textAreaRef.current.focus()
      timeoutID = setTimeout(() => {
        setTimeRemaining(time => time -1)
      }, 1000)
    }else if(timeRemaining === 0){
      setStart(false)
    }
    else{
      return () => clearTimeout(timeoutID)
    }
   },[timeRemaining, start])
  //  useEffect to count words everything textarea updates
   useEffect(()=> {
     setCount(calculateCount())
   },[textInput])

  const calculateCount = () => {
    return textInput.trim()
      .split(' ')
      .filter(word => word !== '')
      .length 
  }

  const handleClick = () => {
    setCount(0);
    setTimeRemaining(TIMER);
    setTextInput('');
    setStart(true);
  }

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