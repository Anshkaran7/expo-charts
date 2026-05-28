"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var BarChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? react_native_1.Dimensions.get("window").width - 40 : _c, _d = _a.height, height = _d === void 0 ? 220 : _d, _e = _a.primaryColor, primaryColor = _e === void 0 ? "#2563EB" : _e, _f = _a.secondaryColor, secondaryColor = _f === void 0 ? "#7C3AED" : _f, _g = _a.labelColor, labelColor = _g === void 0 ? "#334155" : _g, _h = _a.axisColor, axisColor = _h === void 0 ? "#E2E8F0" : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? "#FFFFFF" : _j, _k = _a.title, title = _k === void 0 ? "" : _k, _l = _a.animate, animate = _l === void 0 ? true : _l, _m = _a.showGrid, showGrid = _m === void 0 ? true : _m, _o = _a.gridCount, gridCount = _o === void 0 ? 4 : _o, _p = _a.formatValue, formatValue = _p === void 0 ? function (value) { return value.toString(); } : _p, _q = _a.formatLabel, formatLabel = _q === void 0 ? function (index) { return (index + 1).toString(); } : _q, getBarColor = _a.getBarColor, _r = _a.onBarPress, onBarPress = _r === void 0 ? function () { } : _r, _s = _a.showXAxisLabels, showXAxisLabels = _s === void 0 ? true : _s, _t = _a.showYAxisLabels, showYAxisLabels = _t === void 0 ? true : _t, _u = _a.style, style = _u === void 0 ? {} : _u, controlledSelectedIndex = _a.selectedIndex;
    var _v = (0, react_1.useState)(controlledSelectedIndex !== null && controlledSelectedIndex !== void 0 ? controlledSelectedIndex : null), selectedBar = _v[0], setSelectedBar = _v[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    (0, react_1.useEffect)(function () {
        if (!animate)
            return;
        fadeAnim.setValue(0);
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
        }).start();
    }, [animate, data, fadeAnim]);
    (0, react_1.useEffect)(function () {
        if (controlledSelectedIndex !== undefined) {
            setSelectedBar(controlledSelectedIndex);
        }
    }, [controlledSelectedIndex]);
    if (!data.length)
        return react_1.default.createElement(react_native_1.Text, { style: styles.noData }, "No data available");
    var maxValue = Math.max.apply(Math, data) || 1;
    var padding = { top: 24, right: 18, bottom: 34, left: 46 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
    var slotWidth = chartWidth / data.length;
    var barWidth = Math.max(16, slotWidth * 0.58);
    var gradientId = "barGradient-".concat(primaryColor.replace(/[^a-zA-Z0-9]/g, ""));
    var selectBar = function (value, index) {
        setSelectedBar(selectedBar === index ? null : index);
        onBarPress(value, index);
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }, style] },
        title ? react_1.default.createElement(react_native_1.Text, { style: [styles.title, { color: labelColor }] }, title) : null,
        react_1.default.createElement(react_native_1.Animated.View, { style: { opacity: fadeAnim } },
            react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
                react_1.default.createElement(react_native_svg_1.Defs, null,
                    react_1.default.createElement(react_native_svg_1.LinearGradient, { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: primaryColor, stopOpacity: "1" }),
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: secondaryColor, stopOpacity: "0.62" }))),
                showGrid &&
                    Array.from({ length: gridCount + 1 }).map(function (_, index) {
                        var y = padding.top + (index / gridCount) * chartHeight;
                        var value = maxValue - (index / gridCount) * maxValue;
                        return (react_1.default.createElement(react_native_svg_1.G, { key: "grid-".concat(index) },
                            react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, x2: width - padding.right, y1: y, y2: y, stroke: axisColor, strokeDasharray: "4 6", strokeWidth: 1 }),
                            showYAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: padding.left - 8, y: y + 4, fill: labelColor, fontSize: 10, textAnchor: "end" }, formatValue(value))) : null));
                    }),
                data.map(function (value, index) {
                    var _a;
                    var barHeight = (value / maxValue) * chartHeight;
                    var x = padding.left + index * slotWidth + (slotWidth - barWidth) / 2;
                    var y = padding.top + chartHeight - barHeight;
                    var isSelected = selectedBar === index;
                    var color = (_a = getBarColor === null || getBarColor === void 0 ? void 0 : getBarColor(value, index)) !== null && _a !== void 0 ? _a : "url(#".concat(gradientId, ")");
                    return (react_1.default.createElement(react_native_svg_1.G, { key: "bar-".concat(index) },
                        react_1.default.createElement(react_native_svg_1.Rect, { x: x, y: y, width: barWidth, height: barHeight, rx: 7, fill: color, opacity: selectedBar === null || isSelected ? 1 : 0.42, onPress: function () { return selectBar(value, index); } }),
                        react_1.default.createElement(react_native_svg_1.Rect, { x: padding.left + index * slotWidth, y: padding.top, width: slotWidth, height: chartHeight, fill: "transparent", onPress: function () { return selectBar(value, index); } }),
                        react_1.default.createElement(react_native_svg_1.Text, { x: x + barWidth / 2, y: y - 8, fill: labelColor, fontSize: 10, fontWeight: "700", textAnchor: "middle", opacity: selectedBar === null || isSelected ? 1 : 0.45 }, formatValue(value)),
                        showXAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: x + barWidth / 2, y: height - 12, fill: labelColor, fontSize: 11, textAnchor: "middle" }, formatLabel(index))) : null));
                })))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },
    noData: {
        color: "#64748B",
        marginVertical: 20,
        textAlign: "center",
    },
});
exports.default = BarChart;
