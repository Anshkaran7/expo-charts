import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
} from "react-native";
import Svg, {
  Path,
  Line,
  Circle,
  Text as SvgText,
  G,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

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

const LineChart: React.FC<LineChartProps> = ({
  data = [],
  width = Dimensions.get("window").width - 40,
  height = 250,
  lineColor = "#6366F1",
  accentColor = "#818CF8",
  labelColor = "#1F2937",
  axisColor = "#E5E7EB",
  backgroundColor = "#FFFFFF",
  title = "",
  subtitle = "",
  animate = true,
  showGrid = true,
  gridCount = 5,
  showDots = true,
  showArea = true,
  formatValue = (value: number) => value.toString(),
  formatLabel = (index) => (index + 1).toString(),
  onPointPress = (value: number, index: number) => {},
  style = {},
  showXAxisLabels = true,
  showYAxisLabels = true,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    value: number;
    index: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathLength = useRef(new Animated.Value(0)).current;
  const dotAnims = useRef(data.map(() => new Animated.Value(0))).current;

  // Animation sequence
  useEffect(() => {
    if (animate) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(pathLength, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.stagger(
            50,
            dotAnims.map((anim) =>
              Animated.spring(anim, {
                toValue: 1,
                tension: 40,
                friction: 8,
                useNativeDriver: true,
              })
            )
          ),
        ]),
      ]).start();
    }
  }, [data, animate]);

  if (!data.length) return <Text style={styles.noData}>No data available</Text>;

  const padding = { top: 40, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data) * 1.1; // Add 10% padding to max
  const minValue = Math.min(...data) * 0.9; // Subtract 10% padding from min
  const range = maxValue - minValue;

  // Create points for the line
  const points = data.map((value, index) => ({
    x: padding.left + (index * chartWidth) / (data.length - 1),
    y: padding.top + chartHeight - ((value - minValue) * chartHeight) / range,
    value,
  }));

  // Generate smooth curve path using cubic bezier
  const linePath = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;

    const prev = points[i - 1];
    const controlPoint1X = prev.x + (point.x - prev.x) / 3;
    const controlPoint2X = prev.x + (2 * (point.x - prev.x)) / 3;

    return `${path} C ${controlPoint1X},${prev.y} ${controlPoint2X},${point.y} ${point.x},${point.y}`;
  }, "");

  // Generate area path
  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x},${height - padding.bottom}
    L ${points[0].x},${height - padding.bottom}
    Z
  `;

  const handlePointPress = (
    point: { x: number; y: number; value: number },
    index: number
  ) => {
    if (isDragging) return;

    setSelectedPoint(index);
    setTooltipData({ ...point, index });
    onPointPress(point.value, index);

    // Animate dot scale
    Animated.sequence([
      Animated.spring(dotAnims[index], {
        toValue: 1.5,
        tension: 40,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(dotAnims[index], {
        toValue: 1,
        tension: 40,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Pan gesture handler for chart interaction
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setIsDragging(true);
      const { locationX } = evt.nativeEvent;
      const closest = points.reduce((prev, curr) =>
        Math.abs(curr.x - locationX) < Math.abs(prev.x - locationX)
          ? curr
          : prev
      );
      handlePointPress(closest, points.indexOf(closest));
    },
    onPanResponderMove: (evt) => {
      const { locationX } = evt.nativeEvent;
      const closest = points.reduce((prev, curr) =>
        Math.abs(curr.x - locationX) < Math.abs(prev.x - locationX)
          ? curr
          : prev
      );
      handlePointPress(closest, points.indexOf(closest));
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      setSelectedPoint(null);
      setTooltipData(null);
    },
  });

  const GridLines = () => {
    if (!showGrid) return null;

    return Array.from({ length: gridCount + 1 }).map((_, i) => {
      const y = padding.top + (i * chartHeight) / gridCount;
      const value = maxValue - (i * range) / gridCount;

      return (
        <G key={i}>
          <Line
            x1={padding.left}
            y1={y}
            x2={width - padding.right}
            y2={y}
            stroke={axisColor}
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity={0.5}
          />
          {showYAxisLabels && (
            <SvgText
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fill={labelColor}
              fontSize="11"
              fontWeight="500"
            >
              {formatValue(Math.round(value))}
            </SvgText>
          )}
        </G>
      );
    });
  };

  const Tooltip = ({
    x,
    y,
    value,
    index,
  }: {
    x: number;
    y: number;
    value: number;
    index: number;
  }) => (
    <G>
      <Rect
        x={x - 45}
        y={y - 45}
        width={90}
        height={35}
        rx={8}
        fill={accentColor}
        opacity={0.95}
      />
      <SvgText
        x={x}
        y={y - 25}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="bold"
      >
        {formatValue(value)}
      </SvgText>
      <SvgText
        x={x}
        y={y - 12}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="10"
      >
        {formatLabel(index)}
      </SvgText>
      {/* Tooltip arrow */}
      <Path
        d={`M ${x - 5} ${y - 10} L ${x} ${y - 5} L ${x + 5} ${y - 10}`}
        fill={accentColor}
      />
    </G>
  );

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      <Animated.View
        style={{ opacity: fadeAnim, overflow: "visible" }}
        {...panResponder.panHandlers}
      >
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={lineColor} stopOpacity="0.2" />
              <Stop offset="1" stopColor={lineColor} stopOpacity="0.0" />
            </LinearGradient>
            <ClipPath id="chart-area">
              <Rect
                x={padding.left}
                y={padding.top}
                width={chartWidth}
                height={chartHeight}
              />
            </ClipPath>
          </Defs>

          <GridLines />

          {/* Chart Area */}
          <G clipPath="url(#chart-area)">
            {showArea && (
              <Path
                d={areaPath}
                fill="url(#areaGradient)"
                opacity={selectedPoint !== null ? 0.5 : 1}
              />
            )}

            <Path
              d={linePath}
              fill="none"
              stroke={lineColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={selectedPoint !== null ? 0.5 : 1}
            />

            {/* Data points */}
            {showDots &&
              points.map((point, index) => (
                <Animated.View
                  key={index}
                  style={{
                    transform: [{ scale: dotAnims[index] }],
                  }}
                >
                  <Circle
                    cx={point.x}
                    cy={point.y}
                    r={selectedPoint === index ? 8 : 5}
                    fill={selectedPoint === index ? accentColor : "#FFFFFF"}
                    stroke={lineColor}
                    strokeWidth="3"
                  />
                </Animated.View>
              ))}

            {/* Tooltip */}
            {tooltipData && <Tooltip {...tooltipData} />}
          </G>

          {/* Axes */}
          <Line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke={axisColor}
            strokeWidth="2"
          />

          {/* X-Axis Labels */}
          {showXAxisLabels &&
            points.map((point, index) => (
              <SvgText
                key={index}
                x={point.x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fill={labelColor}
                fontSize="11"
                opacity={
                  selectedPoint === null || selectedPoint === index ? 1 : 0.5
                }
              >
                {formatLabel(index)}
              </SvgText>
            ))}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 16,
    margin: 10,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
    marginVertical: 20,
  },
});

export default LineChart;
