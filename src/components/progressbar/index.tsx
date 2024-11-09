import React, { useState, useEffect } from 'react';
import './index.scss';
import ProgressBar from '@ramonak/react-progress-bar';
import { stepGoal, steps } from '../../data/steps.js';
import { IoIosLink } from 'react-icons/io';

interface Step {
  steps: number;
  start_time: string;
}

const calcSteps = (stepsData: Step[]): number => {
  return stepsData.reduce((sum, element) => sum + (element.steps > 0 ? element.steps : 0), 0);
};

export const Progress: React.FC = () => {
  const [totalSteps, setTotalSteps] = useState<number>(calcSteps(steps));
  const [percent, setPercent] = useState<number>(Math.min((totalSteps / stepGoal) * 100, 100));

  useEffect(() => {
    const updatedTotalSteps = calcSteps(steps);
    setTotalSteps(updatedTotalSteps);
    setPercent(Math.round(Math.min((updatedTotalSteps / stepGoal) * 100, 100)));
  }, [steps]);

  const css3 = percent > 94
    ? `.progress-label { padding: 10px; }`
    : `.progress-label { padding: 10px; margin: 10px -50px 10px 20px; }`;

  return (
    <>
      <ProgressBar
        completed={percent}
        transitionDuration="0.1s"
        labelAlignment="right"
        labelClassName="progress-label"
        barContainerClassName="progress-bar"
        labelColor="#69699"
        bgColor="#0dcf6e"
        borderRadius="0px"
        height="40px"
      />
      <style>{css3}</style>
      <div className="progressbar-links">
        <p>
          <IoIosLink />
          <a href="#">All steps</a> <a href="#">Now</a>
        </p>
      </div>
    </>
  );
};

