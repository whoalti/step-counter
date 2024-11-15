import React from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, Cell, Tooltip } from 'recharts';
import './index.scss';
import { barsChartData } from '../../utils/stepsParses.ts';



interface CustomTooltipProps {
    payload?: any;
}

const CustomTooltip: React.FC<any> = ({ payload }) => {
    
    if (payload && payload.length > 0) {
        // console.log(payload);
        const stepsToShow = payload[0].payload.realSteps;
        // const dataToShow = payload[0].payload.time;
        return (
            <div className="custom-tooltip">
                <p>{`${stepsToShow}`}</p>
                {/* <p>{`${new Date(dataToShow).toString()}`}</p> */}
            </div>
        );
    }
    return null;
};

const Bars: React.FC = () => {
    const { arr: data, totalSteps, stepGoal } = barsChartData;
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
                            content={<CustomTooltip  />}
                            cursor={false}
                            offset={0}
                        />
                        <Bar dataKey="steps" label={false} radius={[15, 15, 15, 15]}>
                            <LabelList dataKey="legend" position="top" offset={10} />
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
