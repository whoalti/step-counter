import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { IoIosLink } from 'react-icons/io';
import { progressBarData } from '../../utils/stepsParses.ts';

import './index.scss'

const PADDING = 10;

function NewProgressBarChart({debug=true} : {debug: boolean}) {
  const { sumOfSteps: totalSteps, stepGoal } = progressBarData;
  const percent = Math.floor(Math.min((totalSteps / stepGoal) * 100, 100));
  const progress = percent;
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const helpRef = useRef<boolean>(false)
  useEffect(() => {
    // setIsRight1(Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100 < Number(labelRef.current?.offsetWidth) + PADDING);
    helpRef.current = (Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100 < Number(labelRef.current?.offsetWidth) + PADDING);
    console.log((Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100 < Number(labelRef.current?.offsetWidth) + PADDING));
    console.log(progressRef.current?.getBoundingClientRect())
    if (helpRef.current){

      labelRef.current!.style.right = '10px';
    }
    else {
      labelRef.current!.style.right = '-40px';
    }
  }, [])
  
  console.log('rerender1')
  console.log('first', progressRef.current?.getBoundingClientRect())
  console.log('status', helpRef.current)
  console.log(`progres width : ${progressRef.current?.clientWidth}, progress percent width ${Number(progressRef.current?.clientWidth) * progress} ofset width: ${labelRef.current?.offsetWidth}` )
  console.log(`${Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100} < ${Number(labelRef.current?.offsetWidth)}`)
  console.log(Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100 < Number(labelRef.current?.offsetWidth))
  return (
    <>
      {/* <p>Current progress is {progress} and isRight: {isRight1 ? "true" : "false"} debug {debug ? "true" : "false"}</p> */}
      {/* {debug && <> 
        <button onClick={() => setProgress(progress => progress + 1)} > Click me to increase progress</button>
      <button onClick={() => setProgress(progress => progress - 1)} > Click me to decrease progress</button>
      <br></br>
      
      </>} */}
      <div className='new-progress-bar' ref={progressRef}>
        <div  
        className={`new-progress-bar-completed`}
        style={{width: Math.min(progress, 100) + '%'}} 
        >
        <span ref={labelRef} className={`new-progress-label ${helpRef.current && 'right'}`}>
          {progress + '%'}
        </span>
        </div>


      </div>
      {debug && <input
        type='range'
        min={0}
        max={100}
        value={progress}
        onChange={({target}) => setProgress(Number(target.value))}
      ></input>}
      <div className="progressbar-links">
        <p>
          <IoIosLink />
          <a href="#">All steps</a> <a href="#">Now</a>
        </p>
      </div>


    </>
  )
}

export default NewProgressBarChart;





// import { useState, useRef } from 'react'
// import './App.css'

// function App() {
//   const [progress, setProgress] = useState(50);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const [isRight, setIsRight] = useState(false);

//   const isRight1 = Number(progressRef.current?.clientWidth)  - (Number(progressRef.current?.clientWidth) * progress) / 100 < 30;
//   return (
//     <>
//       <p>Current progress is {progress} and isRight: {isRight ? "true" : "false"}</p>
//       <button onClick={() => setProgress(progress => progress + 1)} > Click me to increase progress</button>
//       <button onClick={() => setProgress(progress => progress - 1)} > Click me to decrease progress</button>
//       <br></br>
//       <button onClick={() => setIsRight(!isRight)}>Change isRight</button>
//       <div className='progress-bar' ref={progressRef}>
//         <div  
//         className={`progress-bar-completed ${isRight1 && 'right'}`}
//         style={{width: Math.min(progress, 100) + '%'}} 
//         data-percent={progress + '%'}
//         >
//         </div>

//       </div>


//     </>
//   )
// }

// export default App
