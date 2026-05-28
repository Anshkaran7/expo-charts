export interface ChartPoint {
    label: string;
    value: number;
    color?: string;
}
export interface CartesianChartProps {
    data: number[];
    width?: number;
    height?: number;
    labelColor?: string;
    axisColor?: string;
    backgroundColor?: string;
    title?: string;
    animate?: boolean;
    showGrid?: boolean;
    gridCount?: number;
    formatValue?: (value: number) => string;
    formatLabel?: (index: number) => string;
    showXAxisLabels?: boolean;
    showYAxisLabels?: boolean;
    style?: object;
}
export interface BarChartProps extends CartesianChartProps {
    primaryColor?: string;
    secondaryColor?: string;
    getBarColor?: (value: number, index: number) => string;
    onBarPress?: (value: number, index: number) => void;
    selectedIndex?: number | null;
}
export interface LineChartProps extends CartesianChartProps {
    lineColor?: string;
    accentColor?: string;
    subtitle?: string;
    showDots?: boolean;
    showArea?: boolean;
    onPointPress?: (value: number, index: number) => void;
    selectedIndex?: number | null;
    tooltipBackgroundColor?: string;
}
export interface AreaChartProps extends CartesianChartProps {
    color?: string;
    accentColor?: string;
    subtitle?: string;
    showDots?: boolean;
    onPointPress?: (value: number, index: number) => void;
}
export interface PieChartProps {
    data: ChartPoint[];
    width?: number;
    height?: number;
    colors?: string[];
    strokeWidth?: number;
    animate?: boolean;
    showLabels?: boolean;
    showLegend?: boolean;
    showPercentages?: boolean;
    donutRadius?: number;
    selectedOffset?: number;
    labelColor?: string;
    legendTextColor?: string;
    onSegmentPress?: (item: ChartPoint, index: number) => void;
    style?: object;
}
export interface DonutChartProps extends PieChartProps {
    centerValue?: string | number;
    centerLabel?: string;
    centerTextColor?: string;
    centerLabelColor?: string;
}
