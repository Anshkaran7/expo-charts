import React from "react";
import { View, Animated } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Text as SvgText,
} from "react-native-svg";
import { Text } from "react-native";

interface PieChartProps {
  data: Array<{ value: number; label: string }>;
  width?: number;
  height?: number;
  colors?: string[];
  strokeWidth?: number;
  animate?: boolean;
  showLabels?: boolean;
  showPercentages?: boolean;
}

interface ArcData {
  path: string;
  value: number;
  percentage: number;
  label: string;
  color: string;
  labelX: number;
  labelY: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data = [],
  width = 300,
  height = 300,
  colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"],
  strokeWidth = 2,
  animate = true,
  showLabels = true,
  showPercentages = true,
}) => {
  const [animation] = React.useState(new Animated.Value(0));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;

  React.useEffect(() => {
    if (animate) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, []);

  const getArcPath = (startAngle: number, endAngle: number) => {
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  let startAngle = 0;
  const arcs = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const path = getArcPath(startAngle, endAngle);

    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);

    startAngle = endAngle;
    return {
      path,
      value: item.value,
      percentage,
      label: item.label,
      color: colors[index % colors.length],
      labelX,
      labelY,
    };
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={width} height={height}>
        <Defs>
          {arcs.map((arc, index) => (
            <LinearGradient
              key={`gradient-${index}`}
              id={`grad${index}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={arc.color} stopOpacity="0.8" />
              <Stop offset="1" stopColor={arc.color} stopOpacity="0.5" />
            </LinearGradient>
          ))}
        </Defs>
        <G>
          {arcs.map((arc, index) => (
            <G key={`segment-${index}`}>
              <Path
                d={arc.path}
                fill={`url(#grad${index})`}
                strokeWidth={strokeWidth}
                stroke="#fff"
              />
              {showLabels && (
                <SvgText
                  x={arc.labelX}
                  y={arc.labelY}
                  fill="#fff"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {arc.label}
                  {showPercentages && ` (${arc.percentage.toFixed(1)}%)`}
                </SvgText>
              )}
            </G>
          ))}
        </G>
      </Svg>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
          justifyContent: "center",
          gap: 8,
        }}
      >
        {arcs.map((arc, index) => (
          <View
            key={`legend-${index}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: 8,
              borderRadius: 4,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: arc.color,
                borderRadius: 6,
                marginRight: 6,
              }}
            />
            <Text style={{ color: "#fff", fontSize: 12 }}>
              {arc.label}: {arc.value} ({arc.percentage.toFixed(1)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieChart;
