import React, { useState } from 'react';
import './index.scss';
import ProgressBar from '@ramonak/react-progress-bar';
import { IoIosLink } from 'react-icons/io';
import { progressBarData } from '../../utils/stepsParses.js';

export const Progress: React.FC = () => {
  const { sumOfSteps: totalSteps, stepGoal } = progressBarData;
  const percent = Math.floor(Math.min((totalSteps / stepGoal) * 100, 100));

  console.log('render progressbar');

  const css3 =
    percent > 94
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
