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
var LineChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? react_native_1.Dimensions.get("window").width - 40 : _c, _d = _a.height, height = _d === void 0 ? 250 : _d, _e = _a.lineColor, lineColor = _e === void 0 ? "#6366F1" : _e, _f = _a.accentColor, accentColor = _f === void 0 ? "#818CF8" : _f, _g = _a.labelColor, labelColor = _g === void 0 ? "#1F2937" : _g, _h = _a.axisColor, axisColor = _h === void 0 ? "#E5E7EB" : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? "#FFFFFF" : _j, _k = _a.title, title = _k === void 0 ? "" : _k, _l = _a.subtitle, subtitle = _l === void 0 ? "" : _l, _m = _a.animate, animate = _m === void 0 ? true : _m, _o = _a.showGrid, showGrid = _o === void 0 ? true : _o, _p = _a.gridCount, gridCount = _p === void 0 ? 5 : _p, _q = _a.showDots, showDots = _q === void 0 ? true : _q, _r = _a.showArea, showArea = _r === void 0 ? true : _r, _s = _a.formatValue, formatValue = _s === void 0 ? function (value) { return value.toString(); } : _s, _t = _a.formatLabel, formatLabel = _t === void 0 ? function (index) { return (index + 1).toString(); } : _t, _u = _a.onPointPress, onPointPress = _u === void 0 ? function (value, index) { } : _u, _v = _a.style, style = _v === void 0 ? {} : _v, _w = _a.showXAxisLabels, showXAxisLabels = _w === void 0 ? true : _w, _x = _a.showYAxisLabels, showYAxisLabels = _x === void 0 ? true : _x;
    var _y = (0, react_1.useState)(null), selectedPoint = _y[0], setSelectedPoint = _y[1];
    var _z = (0, react_1.useState)(null), tooltipData = _z[0], setTooltipData = _z[1];
    var _0 = (0, react_1.useState)(false), isDragging = _0[0], setIsDragging = _0[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var pathLength = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var dotAnims = (0, react_1.useRef)(data.map(function () { return new react_native_1.Animated.Value(0); })).current;
    // Animation sequence
    (0, react_1.useEffect)(function () {
        if (animate) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.parallel([
                    react_native_1.Animated.timing(pathLength, {
                        toValue: 1,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                    react_native_1.Animated.stagger(50, dotAnims.map(function (anim) {
                        return react_native_1.Animated.spring(anim, {
                            toValue: 1,
                            tension: 40,
                            friction: 8,
                            useNativeDriver: true,
                        });
                    })),
                ]),
            ]).start();
        }
    }, [data, animate]);
    if (!data.length)
        return react_1.default.createElement(react_native_1.Text, { style: styles.noData }, "No data available");
    var padding = { top: 40, right: 30, bottom: 40, left: 50 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
    var maxValue = Math.max.apply(Math, data) * 1.1; // Add 10% padding to max
    var minValue = Math.min.apply(Math, data) * 0.9; // Subtract 10% padding from min
    var range = maxValue - minValue;
    // Create points for the line
    var points = data.map(function (value, index) { return ({
        x: padding.left + (index * chartWidth) / (data.length - 1),
        y: padding.top + chartHeight - ((value - minValue) * chartHeight) / range,
        value: value,
    }); });
    // Generate smooth curve path using cubic bezier
    var linePath = points.reduce(function (path, point, i) {
        if (i === 0)
            return "M ".concat(point.x, ",").concat(point.y);
        var prev = points[i - 1];
        var controlPoint1X = prev.x + (point.x - prev.x) / 3;
        var controlPoint2X = prev.x + (2 * (point.x - prev.x)) / 3;
        return "".concat(path, " C ").concat(controlPoint1X, ",").concat(prev.y, " ").concat(controlPoint2X, ",").concat(point.y, " ").concat(point.x, ",").concat(point.y);
    }, "");
    // Generate area path
    var areaPath = "\n    ".concat(linePath, "\n    L ").concat(points[points.length - 1].x, ",").concat(height - padding.bottom, "\n    L ").concat(points[0].x, ",").concat(height - padding.bottom, "\n    Z\n  ");
    var handlePointPress = function (point, index) {
        if (isDragging)
            return;
        setSelectedPoint(index);
        setTooltipData(__assign(__assign({}, point), { index: index }));
        onPointPress(point.value, index);
        // Animate dot scale
        react_native_1.Animated.sequence([
            react_native_1.Animated.spring(dotAnims[index], {
                toValue: 1.5,
                tension: 40,
                friction: 5,
                useNativeDriver: true,
            }),
            react_native_1.Animated.spring(dotAnims[index], {
                toValue: 1,
                tension: 40,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    };
    // Pan gesture handler for chart interaction
    var panResponder = react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: function () { return true; },
        onMoveShouldSetPanResponder: function () { return true; },
        onPanResponderGrant: function (evt) {
            setIsDragging(true);
            var locationX = evt.nativeEvent.locationX;
            var closest = points.reduce(function (prev, curr) {
                return Math.abs(curr.x - locationX) < Math.abs(prev.x - locationX)
                    ? curr
                    : prev;
            });
            handlePointPress(closest, points.indexOf(closest));
        },
        onPanResponderMove: function (evt) {
            var locationX = evt.nativeEvent.locationX;
            var closest = points.reduce(function (prev, curr) {
                return Math.abs(curr.x - locationX) < Math.abs(prev.x - locationX)
                    ? curr
                    : prev;
            });
            handlePointPress(closest, points.indexOf(closest));
        },
        onPanResponderRelease: function () {
            setIsDragging(false);
            setSelectedPoint(null);
            setTooltipData(null);
        },
    });
    var GridLines = function () {
        if (!showGrid)
            return null;
        return Array.from({ length: gridCount + 1 }).map(function (_, i) {
            var y = padding.top + (i * chartHeight) / gridCount;
            var value = maxValue - (i * range) / gridCount;
            return (react_1.default.createElement(react_native_svg_1.G, { key: i },
                react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, y1: y, x2: width - padding.right, y2: y, stroke: axisColor, strokeWidth: "1", strokeDasharray: "5,5", opacity: 0.5 }),
                showYAxisLabels && (react_1.default.createElement(react_native_svg_1.Text, { x: padding.left - 10, y: y + 4, textAnchor: "end", fill: labelColor, fontSize: "11", fontWeight: "500" }, formatValue(Math.round(value))))));
        });
    };
    var Tooltip = function (_a) {
        var x = _a.x, y = _a.y, value = _a.value, index = _a.index;
        return (react_1.default.createElement(react_native_svg_1.G, null,
            react_1.default.createElement(react_native_svg_1.Rect, { x: x - 45, y: y - 45, width: 90, height: 35, rx: 8, fill: accentColor, opacity: 0.95 }),
            react_1.default.createElement(react_native_svg_1.Text, { x: x, y: y - 25, textAnchor: "middle", fill: "#FFFFFF", fontSize: "12", fontWeight: "bold" }, formatValue(value)),
            react_1.default.createElement(react_native_svg_1.Text, { x: x, y: y - 12, textAnchor: "middle", fill: "#FFFFFF", fontSize: "10" }, formatLabel(index)),
            react_1.default.createElement(react_native_svg_1.Path, { d: "M ".concat(x - 5, " ").concat(y - 10, " L ").concat(x, " ").concat(y - 5, " L ").concat(x + 5, " ").concat(y - 10), fill: accentColor })));
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }, style] },
        (title || subtitle) && (react_1.default.createElement(react_native_1.View, { style: styles.header },
            title && react_1.default.createElement(react_native_1.Text, { style: styles.title }, title),
            subtitle && react_1.default.createElement(react_native_1.Text, { style: styles.subtitle }, subtitle))),
        react_1.default.createElement(react_native_1.Animated.View, __assign({ style: { opacity: fadeAnim, overflow: "visible" } }, panResponder.panHandlers),
            react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
                react_1.default.createElement(react_native_svg_1.Defs, null,
                    react_1.default.createElement(react_native_svg_1.LinearGradient, { id: "areaGradient", x1: "0", y1: "0", x2: "0", y2: "1" },
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: lineColor, stopOpacity: "0.2" }),
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: lineColor, stopOpacity: "0.0" })),
                    react_1.default.createElement(react_native_svg_1.ClipPath, { id: "chart-area" },
                        react_1.default.createElement(react_native_svg_1.Rect, { x: padding.left, y: padding.top, width: chartWidth, height: chartHeight }))),
                react_1.default.createElement(GridLines, null),
                react_1.default.createElement(react_native_svg_1.G, { clipPath: "url(#chart-area)" },
                    showArea && (react_1.default.createElement(react_native_svg_1.Path, { d: areaPath, fill: "url(#areaGradient)", opacity: selectedPoint !== null ? 0.5 : 1 })),
                    react_1.default.createElement(react_native_svg_1.Path, { d: linePath, fill: "none", stroke: lineColor, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", opacity: selectedPoint !== null ? 0.5 : 1 }),
                    showDots &&
                        points.map(function (point, index) { return (react_1.default.createElement(react_native_1.Animated.View, { key: index, style: {
                                transform: [{ scale: dotAnims[index] }],
                            } },
                            react_1.default.createElement(react_native_svg_1.Circle, { cx: point.x, cy: point.y, r: selectedPoint === index ? 8 : 5, fill: selectedPoint === index ? accentColor : "#FFFFFF", stroke: lineColor, strokeWidth: "3" }))); }),
                    tooltipData && react_1.default.createElement(Tooltip, __assign({}, tooltipData))),
                react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, y1: height - padding.bottom, x2: width - padding.right, y2: height - padding.bottom, stroke: axisColor, strokeWidth: "2" }),
                showXAxisLabels &&
                    points.map(function (point, index) { return (react_1.default.createElement(react_native_svg_1.Text, { key: index, x: point.x, y: height - padding.bottom + 20, textAnchor: "middle", fill: labelColor, fontSize: "11", opacity: selectedPoint === null || selectedPoint === index ? 1 : 0.5 }, formatLabel(index))); })))));
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = LineChart;
