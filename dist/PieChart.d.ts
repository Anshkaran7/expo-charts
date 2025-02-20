import React from "react";
interface PieChartProps {
    data: number[];
    width?: number;
    height?: number;
    colors?: string[];
}
declare const PieChart: React.FC<PieChartProps>;
export default PieChart;
