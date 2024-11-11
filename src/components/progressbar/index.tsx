import React, { useEffect, useRef } from 'react';
import './index.scss';
import ProgressBar from '@ramonak/react-progress-bar';
import { IoIosLink } from 'react-icons/io';
import { progressBarData } from '../../utils/stepsParses.js';

export const Progress: React.FC = () => {
  const { sumOfSteps: totalSteps, stepGoal } = progressBarData;
  const percent = Math.floor(Math.min((totalSteps / stepGoal) * 100, 100));

  const progressWrapperRef = useRef<HTMLDivElement>(null);

  console.log('render');

  useEffect(() => {
    const updateLabelPosition = () => {
      if (!progressWrapperRef.current) return;

      const wrapperWidth = progressWrapperRef.current.clientWidth;
      const labelElement = progressWrapperRef.current.querySelector('.progress-label') as HTMLElement;
      
      if (!labelElement) return;

      const labelWidth = labelElement.offsetWidth;
      const progressWidth = (percent / 100) * wrapperWidth;

      const wouldOverflow = (progressWidth + labelWidth + 10) > wrapperWidth;

      if (wouldOverflow) {
        labelElement.style.padding = '5px';
        labelElement.style.margin = '10px 0 10px auto';
      } else {
        labelElement.style.padding = '10px';
        labelElement.style.margin = `10px -${labelWidth}px 10px 20px`;
      }

      labelElement.style.transition = 'margin 0.3s ease';
    };

    updateLabelPosition();

    const resizeObserver = new ResizeObserver(updateLabelPosition);
    if (progressWrapperRef.current) {
      resizeObserver.observe(progressWrapperRef.current);
    }

    // Clean up
    return () => {
      resizeObserver.disconnect();
    };
  }, [percent]);

  return (
    <>
      <div ref={progressWrapperRef}>
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
      </div>
      <div className="progressbar-links">
        <p>
          <IoIosLink />
          <a href="#">All steps</a> <a href="#">Now</a>
        </p>
      </div>
    </>
  );
};
