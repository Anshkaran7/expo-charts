import React from "react";
interface PieChartProps {
    data: Array<{
        value: number;
        label: string;
    }>;
    width?: number;
    height?: number;
    colors?: string[];
    strokeWidth?: number;
    animate?: boolean;
    showLabels?: boolean;
    showPercentages?: boolean;
}
declare const PieChart: React.FC<PieChartProps>;
export default PieChart;
