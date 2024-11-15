import {useState, useRef} from "react";
import "./index.scss";
import { barsChartData } from '../../utils/stepsParses.ts';

function findLastIndexWithValue(arr: Array[number]){
  for (let i = arr.length-1; i > 0; i--){
    if (arr[i] !== 0){
      return i;
    }
  }
  return -1;
}

function NewBarsChart() {
  // const data = [
  //   10, 20, 15, 35, 5, 50, 40, 25, 30, 70, 65, 90, 85, 55, 60, 45, 80, 95, 75,
  //   100, 10, 5, 20, 15, 35, 25, 40, 60, 45, 55, 70, 85, 90, 95, 50, 65, 30, 75,
  //   5, 100, 80, 20, 10, 15, 25, 40, 35, 10000,
  // ];
  // const data = [10, 20, 30, 40, 50, 60];
  const {arr, totalSteps, stepGoal} = barsChartData;
  const data = arr.map(el => el.steps)
  const chartRef = useRef<HTMLDivElement>(null);
  const barWidth = (5 * data.length) + 'px';
  const maxSteps = Math.max(...data);
  const ind = findLastIndexWithValue(data);
  console.log('data', data)
  return (
    <div className="new-steps-container">
            <div className="new-steps-info">
                <p className="new-steps-header">Steps</p>
                <p className="new-steps-count">{totalSteps} <span>/{stepGoal} steps</span></p>
            </div>

      <div className="chart" style={{gap: (10 / (10*data.length)) + 'px' }} ref={chartRef}>
        
        {data.map((val, i) => (
          <div
            key={i}
            className="chart--bar"
            data-width={barWidth}
            style={{
              backgroundColor: val ? "#00A651" : "#888",
              height: Math.min(80, Math.max((val / maxSteps) * 100, 10)) + "px",
               width: Number(chartRef.current?.offsetWidth) / (data.length*2) || (120 / (data.length)) + 'px'
            }}
          >
            <span className="bar-label">
              {ind === i ? <p>{`Now\n`}<span className="bar-value">{val}</span></p> : <p className="bar-value">{`\n${val}`}</p>}
              {/* <p className="bar-value">{val}</p> */}

            </span>
          </div>
        ))}
      </div>        
    </div>
    
  );
}

export default NewBarsChart;
