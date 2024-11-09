import React from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, Cell, Tooltip } from 'recharts';
import { steps, stepGoal } from '../../data/steps.js';
import './index.scss';

interface StepData {
    start_time: string;
    end_time: string;
    steps: number;
}

interface ParsedData {
    steps: number;
    realSteps: number;
    color: string;
    legend?: string;
}

function parseData(data: StepData[]) {
    const { earliestStart, latestEnd } = data.reduce((acc, entry) => {
        const start = new Date(entry.start_time);
        const end = new Date(entry.end_time);

        return {
            earliestStart: start < acc.earliestStart ? start : acc.earliestStart,
            latestEnd: end > acc.latestEnd ? end : acc.latestEnd
        };
    }, {
        earliestStart: new Date(data[0].start_time),
        latestEnd: new Date(data[0].end_time)
    });
    const timeDifference = Math.ceil((latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60));
    const arrayLength = timeDifference < 12 ? 12 : timeDifference;

    const arr: ParsedData[] = new Array(arrayLength).fill(0).map(() => ({ steps: 0, realSteps: 0, color: "#A9A9A9" }));
    const steps1 = new Array(arrayLength).fill(0).map(() => ({ steps: 0, color: "#A9A9A9" }));
    let maxHoursDifIndex = -1; 
    let totalSteps = 0;

    data.forEach((element) => {
        const entryStart = new Date(element.start_time);
        const hoursDiff = Math.floor((entryStart.getTime() - earliestStart.getTime()) / (1000 * 60 * 60));
        
        totalSteps += element.steps > 0 ? element.steps : 0;

        if (hoursDiff >= 0 && maxHoursDifIndex < hoursDiff && element.steps > 0) {
            maxHoursDifIndex = hoursDiff;
        }

        if (hoursDiff >= 0 && hoursDiff < arrayLength) {
            arr[hoursDiff].steps += element.steps;
            arr[hoursDiff].realSteps += element.steps;
            arr[hoursDiff].color = "#0dcf6e";
            arr[hoursDiff].legend = "";
            steps1[hoursDiff].steps += element.steps;
        }
    });

    arr[maxHoursDifIndex].legend = 'Now';

    return { arr, totalSteps, steps1 };
}

interface CustomTooltipProps {
    payload?: any;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
    if (payload && payload.length > 0) {
        const toShow = payload[0].payload.realSteps;
        return (
            <div className="custom-tooltip">
                <p>{`${toShow}`}</p>
            </div>
        );
    }
    return null;
};

const Bars: React.FC = () => {
    const { arr: data, totalSteps, steps1 } = parseData(steps);
    const data1 = data.map((el) => {
        return el.realSteps <= 100 ? { ...el, steps: 100 } : el;
    });
    return (
        <div className="steps-container">
            <div className="steps-info">
                <p className="steps-header">Steps</p>
                <p className="steps-count">{totalSteps} <span>/{stepGoal} steps</span></p>
            </div>
            
            <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data1} className="recharts-bar-chart">
                        <Tooltip 
                            content={<CustomTooltip steps1={steps1} />}
                            cursor={false}
                            offset={0}
                        />
                        <Bar dataKey="steps" label={false} radius={[15, 15, 15, 15]}>
                            <LabelList dataKey="legend" position="top" offset={1} />
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    className={`recharts-bar-rectangle ${entry.steps === 0 ? 'gray' : 'green'}`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Bars;
