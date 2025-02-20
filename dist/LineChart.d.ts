import React from "react";
interface LineChartProps {
    data: number[];
    width?: number;
    height?: number;
    lineColor?: string;
    accentColor?: string;
    labelColor?: string;
    axisColor?: string;
    backgroundColor?: string;
    title?: string;
    subtitle?: string;
    animate?: boolean;
    showGrid?: boolean;
    gridCount?: number;
    showDots?: boolean;
    showArea?: boolean;
    formatValue?: (value: number) => string;
    formatLabel?: (index: number) => string;
    onPointPress?: (value: number, index: number) => void;
    style?: object;
    showXAxisLabels?: boolean;
    showYAxisLabels?: boolean;
}
declare const LineChart: React.FC<LineChartProps>;
export default LineChart;
