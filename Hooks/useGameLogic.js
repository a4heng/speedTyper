import {useState, useRef, useEffect} from 'react';
const TIMER = 5
const useGameLogic = () => {
  
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
return {textAreaRef,handleTextInput,handleClick, count, timeRemaining, start, textInput }

}
export default useGameLogic;

/**
 *     <div>
      <h1>Speed Typer</h1>

      <textarea ref={textAreaRef} disabled={!start} value={textInput} onChange={handleTextInput}/> 
      <h4>Time Remaining: {timeRemaining} </h4>
      <button disabled={start} onClick={handleClick}> Start </button>
      <h1>Word count: {count}</h1>

    </div>
 * */
