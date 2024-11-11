import { steps, stepGoal } from '../data/steps4';



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
    const timeDifference = Math.ceil((latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60)+1);
    // console.log(earliestStart, latestEnd, timeDifference, (latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60)+1);

    const arrayLength = Math.max(timeDifference, 12);

    // const arr: ParsedData[] = new Array(arrayLength).fill({}).map(() => ({ steps: 0, realSteps: 0, color: "#A9A9A9" })); // not to do!
    const arr: ParsedData[] = Array.from({length: arrayLength}, () => ({ steps: 0, realSteps: 0, color: "#A9A9A9" }));
    const steps1 = new Array(arrayLength).fill(0).map(() => ({ steps: 0, color: "#A9A9A9" })); // rework 
    let maxHoursDifIndex = -1; 
    let totalSteps = 0;

    data.forEach((element) => {
        const entryStart = new Date(element.start_time);
        const hoursDiff = Math.floor((entryStart.getTime() - earliestStart.getTime()) / (1000 * 60 * 60));
        
        totalSteps += element.steps > 0 ? element.steps : 0;
        // console.log(hoursDiff, maxHoursDifIndex, element.steps); 

        // 100 -> 20
        // 100 -> 0

        if (hoursDiff >= 0 && maxHoursDifIndex < hoursDiff && element.steps > 0) {
            maxHoursDifIndex = hoursDiff;
        }
        // console.log("element steps", element.steps);
        if (hoursDiff >= 0 && hoursDiff <= arrayLength) { // use here Object.assign()
            arr[hoursDiff].steps += element.steps;
            arr[hoursDiff].realSteps += element.steps;
            arr[hoursDiff].color = "#0dcf6e";
            arr[hoursDiff].legend = "";
            steps1[hoursDiff].steps += element.steps;
        }
        
    });
    // console.log(maxHoursDifIndex)
    // console.log(arr);
    arr[maxHoursDifIndex].legend = 'Now';

    return { arr, totalSteps, steps1 };
}

interface Step {
    steps: number;
    start_time: string;
  }

const calcSteps = (stepsData: Step[]): number => {
    return stepsData.reduce((sum, element) => sum + (element.steps > 0 ? element.steps : 0), 0);
  };


  export const progressBarData = { sumOfSteps: calcSteps(steps), stepGoal: stepGoal};
  export const barsChartData = { ...parseData(steps), stepGoal: stepGoal};