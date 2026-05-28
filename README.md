# 📊 Expo Charts

A modern, customizable charting library built specifically for Expo and React Native applications. Create beautiful, animated charts with minimal configuration.

![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Version](https://img.shields.io/badge/version-1.0.0_beta-orange)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Current Features

- 📊 Beautiful Bar, Line, Area, Pie, and Donut charts
- 📱 Built specifically for Expo and React Native
- 🎨 Fully customizable colors and styles
- ⚡ Smooth animations
- 📱 Responsive design
- 🔥 High performance
- 💪 TypeScript support
- 🔍 Interactive tooltips and press/drag callbacks
- 📦 Lightweight

## 🚀 Installation

```bash
# Using npm
npm install expo-charts react-native-svg

# Using yarn
yarn add expo-charts react-native-svg

# Using pnpm
pnpm add expo-charts react-native-svg
```

## 📋 Requirements

- Expo SDK 48 or later
- React Native 0.71.0 or later
- react-native-svg 13.0.0 or later

## 🎯 Quick Start

```jsx
import { AreaChart, BarChart, DonutChart, LineChart, PieChart } from "expo-charts";

export default function App() {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <>
      <LineChart
        data={[18, 24, 22, 31, 36, 42]}
        width={350}
        height={250}
        title="Revenue"
        subtitle="Drag or tap points"
        lineColor="#2563EB"
        accentColor="#7C3AED"
        formatValue={(value) => `$${value}K`}
        formatLabel={(index) => labels[index]}
        onPointPress={(value, index) => console.log(value, index)}
      />

      <BarChart
        data={[12, 19, 15, 28, 32, 41]}
        width={350}
        height={240}
        title="Users"
        primaryColor="#2563EB"
        secondaryColor="#10B981"
        formatLabel={(index) => labels[index]}
        onBarPress={(value, index) => console.log(value, index)}
      />

      <DonutChart
        data={[
          { label: "Organic", value: 42 },
          { label: "Paid", value: 28 },
          { label: "Referral", value: 18 },
          { label: "Direct", value: 12 },
        ]}
        centerValue="100%"
        centerLabel="Traffic"
        width={300}
        height={300}
      />
    </>
  );
}
```

## 📖 Available Charts

### Bar Chart

The Bar Chart component offers extensive customization and interactivity:

![Bar Chart Example](./assets/barchart.png)

```jsx
<BarChart
  data={[10, 20, 18, 32]}
  width={350}
  height={240}
  title="Sales Data"
  primaryColor="#2563EB"
  secondaryColor="#7C3AED"
  formatLabel={(index) => ["Q1", "Q2", "Q3", "Q4"][index]}
  onBarPress={(value, index) => console.log(value, index)}
/>
```

#### Props

| Prop           | Type                                     | Default             | Description           |
| -------------- | ---------------------------------------- | ------------------- | --------------------- |
| data           | Array<number>                            | []                  | Data to be displayed  |
| width          | number                                   | 300                 | Width of the chart    |
| height         | number                                   | 200                 | Height of the chart   |
| title          | string                                   | ''                  | Chart title           |
| primaryColor   | string                                   | '#4C51BF'           | Primary bar color     |
| secondaryColor | string                                   | '#48BB78'           | Secondary bar color   |
| animate        | boolean                                  | true                | Enable animations     |
| showGrid       | boolean                                  | true                | Show background grid  |
| formatValue    | (value: number) => string                | (v) => v.toString() | Format value labels   |
| formatLabel    | (index: number) => string                | (i) => i.toString() | Format x-axis labels  |
| onBarPress     | (value: number, index: number) => void   | undefined           | Bar press handler     |
| getBarColor    | (value: number, index: number) => string | undefined           | Custom color function |

### Line Chart

The Line Chart component supports curved lines, area fills, tooltips, and drag/tap selection:

![Line Chart Example](./assets/linechart.png)

```jsx
<LineChart
  data={linechartData}
  width={350}
  height={250}
  lineColor="#6366F1"
  accentColor="#818CF8"
  labelColor="#1F2937"
  axisColor="#E5E7EB"
  backgroundColor="#FFFFFF"
  title="Monthly Revenue"
  subtitle="Revenue growth over time"
  formatValue={(value) => `$${value}K`}
  formatLabel={(index) => months[index]}
  showGrid={true}
  animate={true}
  showDots={true}
  showArea={true}
  onPointPress={(value, index) => console.log(value, index)}
/>
```

#### Props

| Prop            | Type                      | Default             | Description               |
| --------------- | ------------------------- | ------------------- | ------------------------- |
| data            | Array<number>             | []                  | Data points               |
| width           | number                    | 300                 | Width of the chart        |
| height          | number                    | 200                 | Height of the chart       |
| title           | string                    | ''                  | Chart title               |
| subtitle        | string                    | ''                  | Chart subtitle            |
| lineColor       | string                    | '#6366F1'           | Line color                |
| accentColor     | string                    | '#818CF8'           | Dots and highlights color |
| labelColor      | string                    | '#1F2937'           | Label text color          |
| axisColor       | string                    | '#E5E7EB'           | Axis lines color          |
| backgroundColor | string                    | '#FFFFFF'           | Chart background color    |
| showDots        | boolean                   | true                | Show data points          |
| showArea        | boolean                   | false               | Show area under line      |
| showGrid        | boolean                   | true                | Show background grid      |
| animate         | boolean                   | true                | Enable animations         |
| formatValue     | (value: number) => string | (v) => v.toString() | Format y-axis labels      |
| formatLabel     | (index: number) => string | (i) => i.toString() | Format x-axis labels      |
| onPointPress    | (value, index) => void    | undefined           | Point select handler      |

### Area Chart

```jsx
<AreaChart
  data={[12, 18, 16, 27, 34, 39]}
  width={350}
  height={240}
  title="Engagement"
  color="#10B981"
  accentColor="#2563EB"
  formatLabel={(index) => labels[index]}
  onPointPress={(value, index) => console.log(value, index)}
/>
```

### Pie Chart

```jsx
<PieChart
  data={[
    { label: "Mobile", value: 42 },
    { label: "Web", value: 28 },
    { label: "Tablet", value: 18 },
    { label: "API", value: 12 },
  ]}
  width={300}
  height={300}
  onSegmentPress={(item, index) => console.log(item, index)}
/>
```

### Donut Chart

```jsx
<DonutChart
  data={[
    { label: "Organic", value: 42 },
    { label: "Paid", value: 28 },
    { label: "Referral", value: 18 },
    { label: "Direct", value: 12 },
  ]}
  centerValue="$12.4K"
  centerLabel="Total"
  width={300}
  height={300}
/>
```

## 🎨 Styling Guide

Both charts support extensive customization through props:

```jsx
// Example of advanced styling
<BarChart
  style={{
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
  // ... other props
/>
```

## ⚡ Performance Tips

1. Use `React.memo` for static charts
2. Disable animations for real-time data
3. Memoize callbacks and formatters
4. Use appropriate dimensions for your device
5. Avoid unnecessary re-renders

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewChart`)
3. Commit your changes (`git commit -m 'Add new chart type'`)
4. Push to the branch (`git push origin feature/NewChart`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Support

Need help? We're here for you:

- Open an [issue](https://github.com/anshkaran7/expo-charts/issues)
- Email: support@ansh.tsx@gmail.com

---

Made with ❤️ by [Karandev.in](https://karandev.in)
