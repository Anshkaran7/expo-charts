import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Line,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import type { AreaChartProps } from "./types";

const AreaChart: React.FC<AreaChartProps> = ({
  data = [],
  width = Dimensions.get("window").width - 40,
  height = 250,
  color = "#2563EB",
  accentColor = "#7C3AED",
  labelColor = "#334155",
  axisColor = "#E2E8F0",
  backgroundColor = "#FFFFFF",
  title = "",
  subtitle = "",
  animate = true,
  showGrid = true,
  showDots = true,
  formatValue = (value) => value.toString(),
  formatLabel = (index) => (index + 1).toString(),
  onPointPress = () => {},
  style = {},
  showXAxisLabels = true,
  showYAxisLabels = true,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const padding = { top: 24, right: 18, bottom: 34, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const gradientId = `areaGradient-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    if (!animate) return;
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [animate, data, fadeAnim]);

  const geometry = useMemo(() => {
    const maxValue = Math.max(...data) * 1.08 || 1;
    const points = data.map((value, index) => ({
      value,
      x: padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth,
      y: padding.top + chartHeight - (value / maxValue) * chartHeight,
    }));
    const linePath = points.reduce((path, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const previous = points[index - 1];
      const controlX = previous.x + (point.x - previous.x) / 2;
      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, "");
    const areaPath = points.length
      ? `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`
      : "";

    return { areaPath, linePath, maxValue, points };
  }, [chartHeight, chartWidth, data, height]);

  if (!data.length) return <Text style={styles.noData}>No data available</Text>;

  const selectPoint = (index: number) => {
    setSelectedPoint(index);
    onPointPress(data[index], index);
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title ? <Text style={[styles.title, { color: labelColor }]}>{title}</Text> : null}
          {subtitle ? <Text style={[styles.subtitle, { color: labelColor }]}>{subtitle}</Text> : null}
        </View>
      )}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity="0.38" />
              <Stop offset="1" stopColor={color} stopOpacity="0.04" />
            </LinearGradient>
          </Defs>
          {showGrid &&
            Array.from({ length: 5 }).map((_, index) => {
              const y = padding.top + (index / 4) * chartHeight;
              const value = geometry.maxValue - (index / 4) * geometry.maxValue;

              return (
                <G key={`grid-${index}`}>
                  <Line
                    x1={padding.left}
                    x2={width - padding.right}
                    y1={y}
                    y2={y}
                    stroke={axisColor}
                    strokeDasharray="4 6"
                    strokeWidth={1}
                  />
                  {showYAxisLabels ? (
                    <SvgText
                      x={padding.left - 10}
                      y={y + 4}
                      fill={labelColor}
                      fontSize={10}
                      textAnchor="end"
                    >
                      {formatValue(value)}
                    </SvgText>
                  ) : null}
                </G>
              );
            })}
          <Path d={geometry.areaPath} fill={`url(#${gradientId})`} />
          <Path
            d={geometry.linePath}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          />
          {geometry.points.map((point, index) => (
            <G key={`point-${index}`}>
              {showDots ? (
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={selectedPoint === index ? 6 : 4}
                  fill={selectedPoint === index ? accentColor : backgroundColor}
                  stroke={color}
                  strokeWidth={3}
                  onPress={() => selectPoint(index)}
                />
              ) : null}
              <Rect
                x={point.x - chartWidth / Math.max(data.length - 1, 1) / 2}
                y={padding.top}
                width={chartWidth / Math.max(data.length - 1, 1)}
                height={chartHeight}
                fill="transparent"
                onPress={() => selectPoint(index)}
              />
              {showXAxisLabels ? (
                <SvgText
                  x={point.x}
                  y={height - 12}
                  fill={labelColor}
                  fontSize={11}
                  textAnchor="middle"
                >
                  {formatLabel(index)}
                </SvgText>
              ) : null}
            </G>
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
  },
  header: {
    marginBottom: 12,
  },
  noData: {
    color: "#64748B",
    marginVertical: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.72,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default AreaChart;
