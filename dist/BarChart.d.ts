import React from "react";
interface BarChartProps {
    data: number[];
    width?: number;
    height?: number;
    primaryColor?: string;
    secondaryColor?: string;
    labelColor?: string;
    axisColor?: string;
    backgroundColor?: string;
    title?: string;
    animate?: boolean;
    showGrid?: boolean;
    gridCount?: number;
    formatValue?: (value: number) => string;
    formatLabel?: (index: number) => string;
    getBarColor?: (value: number, index: number) => string;
    onBarPress?: (value: number, index: number) => void;
    showXAxisLabels?: boolean;
    showYAxisLabels?: boolean;
    style?: object;
}
declare const BarChart: React.FC<BarChartProps>;
export default BarChart;
