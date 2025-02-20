"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? react_native_1.Dimensions.get("window").width : _c, _d = _a.height, height = _d === void 0 ? 200 : _d, _e = _a.primaryColor, primaryColor = _e === void 0 ? "#4C51BF" : _e, _f = _a.secondaryColor, secondaryColor = _f === void 0 ? "#7F9CF5" : _f, _g = _a.labelColor, labelColor = _g === void 0 ? "#2D3748" : _g, _h = _a.axisColor, axisColor = _h === void 0 ? "#CBD5E0" : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? "#FFFFFF" : _j, _k = _a.title, title = _k === void 0 ? "" : _k, _l = _a.animate, animate = _l === void 0 ? true : _l, _m = _a.showGrid, showGrid = _m === void 0 ? true : _m, _o = _a.gridCount, gridCount = _o === void 0 ? 5 : _o, _p = _a.formatValue, formatValue = _p === void 0 ? function (value) { return value.toString(); } : _p, _q = _a.formatLabel, formatLabel = _q === void 0 ? function (index) { return (index + 1).toString(); } : _q, _r = _a.getBarColor, getBarColor = _r === void 0 ? function (value, index) {
        var percentage = (value / Math.max.apply(Math, data)) * 100;
        if (percentage >= 80)
            return "#48BB78";
        if (percentage >= 50)
            return "#4C51BF";
        return "#F56565";
    } : _r, _s = _a.onBarPress, onBarPress = _s === void 0 ? function () { } : _s, _t = _a.showXAxisLabels, showXAxisLabels = _t === void 0 ? false : _t, _u = _a.showYAxisLabels, showYAxisLabels = _u === void 0 ? false : _u, _v = _a.style, style = _v === void 0 ? {} : _v;
    var _w = (0, react_1.useState)(null), selectedBar = _w[0], setSelectedBar = _w[1];
    var _x = (0, react_1.useState)(false), tooltipVisible = _x[0], setTooltipVisible = _x[1];
    var _y = (0, react_1.useState)({ x: 0, y: 0, value: 0 }), tooltipData = _y[0], setTooltipData = _y[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var barAnims = (0, react_1.useRef)(data.map(function () { return new react_native_1.Animated.Value(0); })).current;
    (0, react_1.useEffect)(function () {
        if (animate) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.stagger(100, barAnims.map(function (anim) {
                    return react_native_1.Animated.spring(anim, {
                        toValue: 1,
                        tension: 50,
                        friction: 7,
                        useNativeDriver: true,
                    });
                })),
            ]).start();
        }
    }, [data, animate]);
    if (!data.length)
        return null;
    var maxValue = Math.max.apply(Math, data);
    var padding = { top: 40, right: 20, bottom: 40, left: 40 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
    var barWidth = chartWidth / data.length;
    var handleBarPress = function (value, index, x, y) {
        setSelectedBar(selectedBar === index ? null : index);
        setTooltipVisible(true);
        setTooltipData({ x: x + barWidth / 2, y: y, value: value });
        onBarPress(value, index);
        react_native_1.Animated.sequence([
            react_native_1.Animated.spring(barAnims[index], {
                toValue: 0.9,
                tension: 100,
                friction: 5,
                useNativeDriver: true,
            }),
            react_native_1.Animated.spring(barAnims[index], {
                toValue: 1,
                tension: 100,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    };
    var GridLines = function () {
        if (!showGrid)
            return null;
        return Array.from({ length: gridCount + 1 }).map(function (_, i) {
            var y = chartHeight - (i * chartHeight) / gridCount;
            var value = (maxValue * i) / gridCount;
            return (react_1.default.createElement(react_native_svg_1.G, { key: i },
                react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, y1: y + padding.top, x2: width - padding.right, y2: y + padding.top, stroke: axisColor, strokeWidth: "0.5", strokeDasharray: "5,5", opacity: 0.5 }),
                showYAxisLabels && (react_1.default.createElement(react_native_svg_1.Text, { x: padding.left - 5, y: y + padding.top + 4, textAnchor: "end", fill: labelColor, fontSize: "10" }, formatValue(Math.round(value))))));
        });
    };
    var Tooltip = function (_a) {
        var x = _a.x, y = _a.y, value = _a.value;
        return (react_1.default.createElement(react_native_svg_1.G, null,
            react_1.default.createElement(react_native_svg_1.Rect, { x: x - 40, y: y - 35, width: 80, height: 25, rx: 5, fill: "rgba(0,0,0,0.8)" }),
            react_1.default.createElement(react_native_svg_1.Text, { x: x, y: y - 18, textAnchor: "middle", fill: "#fff", fontSize: "12" }, formatValue(value))));
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }, style] },
        title && react_1.default.createElement(react_native_1.Text, { style: styles.title }, title),
        react_1.default.createElement(react_native_1.Animated.View, { style: { opacity: fadeAnim } },
            react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
                react_1.default.createElement(react_native_svg_1.Defs, null,
                    react_1.default.createElement(react_native_svg_1.LinearGradient, { id: "barGradient", x1: "0", y1: "0", x2: "0", y2: "1" },
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: primaryColor, stopOpacity: "0.8" }),
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: secondaryColor, stopOpacity: "0.3" }))),
                react_1.default.createElement(GridLines, null),
                react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, y1: height - padding.bottom, x2: width - padding.right, y2: height - padding.bottom, stroke: axisColor, strokeWidth: "2" }),
                react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, y1: padding.top, x2: padding.left, y2: height - padding.bottom, stroke: axisColor, strokeWidth: "2" }),
                data.map(function (value, index) {
                    var barHeight = (value / maxValue) * chartHeight;
                    var x = padding.left + index * barWidth;
                    var y = height - padding.bottom - barHeight;
                    return (react_1.default.createElement(react_native_svg_1.G, { key: index },
                        react_1.default.createElement(react_native_svg_1.Rect, { x: x + barWidth * 0.1, y: y, width: barWidth * 0.8, height: barHeight, fill: selectedBar === index
                                ? primaryColor
                                : getBarColor(value, index), rx: barWidth * 0.1, opacity: selectedBar === null || selectedBar === index ? 1 : 0.6, onPressIn: function () { return handleBarPress(value, index, x, y); } }),
                        react_1.default.createElement(react_native_svg_1.Text, { x: x + barWidth / 2, y: y - 5, textAnchor: "middle", fill: labelColor, fontSize: "10", fontWeight: "bold", opacity: selectedBar === null || selectedBar === index ? 1 : 0.6 }, formatValue(value)),
                        showXAxisLabels && (react_1.default.createElement(react_native_svg_1.Text, { x: x + barWidth / 2, y: height - padding.bottom + 20, textAnchor: "middle", fill: labelColor, fontSize: "10" }, formatLabel(index)))));
                }),
                tooltipVisible && selectedBar !== null && (react_1.default.createElement(Tooltip, __assign({}, tooltipData)))))));
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = BarChart;
