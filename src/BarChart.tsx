import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import Svg, {
  Rect,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";

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

const BarChart: React.FC<BarChartProps> = ({
  data = [],
  width = Dimensions.get("window").width,
  height = 200,
  primaryColor = "#4C51BF",
  secondaryColor = "#7F9CF5",
  labelColor = "#2D3748",
  axisColor = "#CBD5E0",
  backgroundColor = "#FFFFFF",
  title = "",
  animate = true,
  showGrid = true,
  gridCount = 5,
  formatValue = (value) => value.toString(),
  formatLabel = (index) => (index + 1).toString(),
  getBarColor = (value, index) => {
    const percentage = (value / Math.max(...data)) * 100;
    if (percentage >= 80) return "#48BB78";
    if (percentage >= 50) return "#4C51BF";
    return "#F56565";
  },
  onBarPress = () => {},
  showXAxisLabels = false,
  showYAxisLabels = false,
  style = {},
}) => {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, value: 0 });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const barAnims = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animate) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.stagger(
          100,
          barAnims.map((anim) =>
            Animated.spring(anim, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            })
          )
        ),
      ]).start();
    }
  }, [data, animate]);

  if (!data.length) return null;

  const maxValue = Math.max(...data);
  const padding = { top: 40, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barWidth = chartWidth / data.length;

  const handleBarPress = (
    value: number,
    index: number,
    x: number,
    y: number
  ) => {
    setSelectedBar(selectedBar === index ? null : index);
    setTooltipVisible(true);
    setTooltipData({ x: x + barWidth / 2, y, value });
    onBarPress(value, index);

    Animated.sequence([
      Animated.spring(barAnims[index], {
        toValue: 0.9,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(barAnims[index], {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const GridLines = () => {
    if (!showGrid) return null;

    return Array.from({ length: gridCount + 1 }).map((_, i) => {
      const y = chartHeight - (i * chartHeight) / gridCount;
      const value = (maxValue * i) / gridCount;

      return (
        <G key={i}>
          <Line
            x1={padding.left}
            y1={y + padding.top}
            x2={width - padding.right}
            y2={y + padding.top}
            stroke={axisColor}
            strokeWidth="0.5"
            strokeDasharray="5,5"
            opacity={0.5}
          />
          {showYAxisLabels && (
            <SvgText
              x={padding.left - 5}
              y={y + padding.top + 4}
              textAnchor="end"
              fill={labelColor}
              fontSize="10"
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
  }: {
    x: number;
    y: number;
    value: number;
  }) => (
    <G>
      <Rect
        x={x - 40}
        y={y - 35}
        width={80}
        height={25}
        rx={5}
        fill="rgba(0,0,0,0.8)"
      />
      <SvgText x={x} y={y - 18} textAnchor="middle" fill="#fff" fontSize="12">
        {formatValue(value)}
      </SvgText>
    </G>
  );

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={primaryColor} stopOpacity="0.8" />
              <Stop offset="1" stopColor={secondaryColor} stopOpacity="0.3" />
            </LinearGradient>
          </Defs>

          <GridLines />

          <Line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke={axisColor}
            strokeWidth="2"
          />
          <Line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke={axisColor}
            strokeWidth="2"
          />

          {data.map((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding.left + index * barWidth;
            const y = height - padding.bottom - barHeight;

            return (
              <G key={index}>
                <Rect
                  x={x + barWidth * 0.1}
                  y={y}
                  width={barWidth * 0.8}
                  height={barHeight}
                  fill={
                    selectedBar === index
                      ? primaryColor
                      : getBarColor(value, index)
                  }
                  rx={barWidth * 0.1}
                  opacity={
                    selectedBar === null || selectedBar === index ? 1 : 0.6
                  }
                  onPressIn={() => handleBarPress(value, index, x, y)}
                />

                <SvgText
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fill={labelColor}
                  fontSize="10"
                  fontWeight="bold"
                  opacity={
                    selectedBar === null || selectedBar === index ? 1 : 0.6
                  }
                >
                  {formatValue(value)}
                </SvgText>

                {showXAxisLabels && (
                  <SvgText
                    x={x + barWidth / 2}
                    y={height - padding.bottom + 20}
                    textAnchor="middle"
                    fill={labelColor}
                    fontSize="10"
                  >
                    {formatLabel(index)}
                  </SvgText>
                )}
              </G>
            );
          })}

          {tooltipVisible && selectedBar !== null && (
            <Tooltip {...tooltipData} />
          )}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2D3748",
  },
});

export default BarChart;
