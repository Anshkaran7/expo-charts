export interface ChartData {
  labels: string[];
  datasets: number[];
}

export interface ChartProps {
  data: ChartData;
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export interface PieChartData {
  data: Array<{
    value: number;
    label: string;
    color?: string;
  }>;
}

export interface PieChartProps {
  data: PieChartData;
  width?: number;
  height?: number;
  style?: any;
}

export interface BarChartProps {
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

export interface LineChartProps {
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
