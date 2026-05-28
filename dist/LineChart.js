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
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? react_native_1.Dimensions.get("window").width - 40 : _c, _d = _a.height, height = _d === void 0 ? 250 : _d, _e = _a.lineColor, lineColor = _e === void 0 ? "#2563EB" : _e, _f = _a.accentColor, accentColor = _f === void 0 ? "#7C3AED" : _f, _g = _a.labelColor, labelColor = _g === void 0 ? "#334155" : _g, _h = _a.axisColor, axisColor = _h === void 0 ? "#E2E8F0" : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? "#FFFFFF" : _j, _k = _a.title, title = _k === void 0 ? "" : _k, _l = _a.subtitle, subtitle = _l === void 0 ? "" : _l, _m = _a.animate, animate = _m === void 0 ? true : _m, _o = _a.showGrid, showGrid = _o === void 0 ? true : _o, _p = _a.gridCount, gridCount = _p === void 0 ? 4 : _p, _q = _a.showDots, showDots = _q === void 0 ? true : _q, _r = _a.showArea, showArea = _r === void 0 ? true : _r, _s = _a.formatValue, formatValue = _s === void 0 ? function (value) { return value.toString(); } : _s, _t = _a.formatLabel, formatLabel = _t === void 0 ? function (index) { return (index + 1).toString(); } : _t, _u = _a.onPointPress, onPointPress = _u === void 0 ? function () { } : _u, _v = _a.style, style = _v === void 0 ? {} : _v, _w = _a.showXAxisLabels, showXAxisLabels = _w === void 0 ? true : _w, _x = _a.showYAxisLabels, showYAxisLabels = _x === void 0 ? true : _x, _y = _a.tooltipBackgroundColor, tooltipBackgroundColor = _y === void 0 ? accentColor : _y, controlledSelectedIndex = _a.selectedIndex;
    var _z = (0, react_1.useState)(controlledSelectedIndex !== null && controlledSelectedIndex !== void 0 ? controlledSelectedIndex : null), selectedPoint = _z[0], setSelectedPoint = _z[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    var padding = { top: 24, right: 18, bottom: 34, left: 54 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
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
            setSelectedPoint(controlledSelectedIndex);
        }
    }, [controlledSelectedIndex]);
    var geometry = (0, react_1.useMemo)(function () {
        var maxValue = Math.max.apply(Math, data) * 1.08;
        var minValue = Math.min.apply(Math, data) * 0.92;
        var range = maxValue - minValue || 1;
        var points = data.map(function (value, index) { return ({
            value: value,
            x: padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth,
            y: padding.top + chartHeight - ((value - minValue) / range) * chartHeight,
        }); });
        var linePath = points.reduce(function (path, point, index) {
            if (index === 0)
                return "M ".concat(point.x, " ").concat(point.y);
            var previous = points[index - 1];
            var controlX = previous.x + (point.x - previous.x) / 2;
            return "".concat(path, " C ").concat(controlX, " ").concat(previous.y, ", ").concat(controlX, " ").concat(point.y, ", ").concat(point.x, " ").concat(point.y);
        }, "");
        var areaPath = points.length
            ? "".concat(linePath, " L ").concat(points[points.length - 1].x, " ").concat(height - padding.bottom, " L ").concat(points[0].x, " ").concat(height - padding.bottom, " Z")
            : "";
        return { areaPath: areaPath, linePath: linePath, maxValue: maxValue, minValue: minValue, points: points, range: range };
    }, [chartHeight, chartWidth, data, height]);
    var selectPoint = function (index) {
        setSelectedPoint(index);
        onPointPress(data[index], index);
    };
    var panResponder = (0, react_1.useMemo)(function () {
        return react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (event) {
                var locationX = event.nativeEvent.locationX;
                var closest = geometry.points.reduce(function (previous, current) {
                    return Math.abs(current.x - locationX) < Math.abs(previous.x - locationX)
                        ? current
                        : previous;
                });
                selectPoint(geometry.points.indexOf(closest));
            },
            onPanResponderMove: function (event) {
                var locationX = event.nativeEvent.locationX;
                var closest = geometry.points.reduce(function (previous, current) {
                    return Math.abs(current.x - locationX) < Math.abs(previous.x - locationX)
                        ? current
                        : previous;
                });
                selectPoint(geometry.points.indexOf(closest));
            },
        });
    }, [geometry.points]);
    if (!data.length)
        return react_1.default.createElement(react_native_1.Text, { style: styles.noData }, "No data available");
    var selected = selectedPoint !== null && geometry.points[selectedPoint]
        ? geometry.points[selectedPoint]
        : null;
    var gradientId = "lineAreaGradient-".concat(lineColor.replace(/[^a-zA-Z0-9]/g, ""));
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }, style] },
        (title || subtitle) && (react_1.default.createElement(react_native_1.View, { style: styles.header },
            title ? react_1.default.createElement(react_native_1.Text, { style: [styles.title, { color: labelColor }] }, title) : null,
            subtitle ? react_1.default.createElement(react_native_1.Text, { style: [styles.subtitle, { color: labelColor }] }, subtitle) : null)),
        react_1.default.createElement(react_native_1.Animated.View, __assign({ style: { opacity: fadeAnim } }, panResponder.panHandlers),
            react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
                react_1.default.createElement(react_native_svg_1.Defs, null,
                    react_1.default.createElement(react_native_svg_1.LinearGradient, { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: lineColor, stopOpacity: "0.26" }),
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: lineColor, stopOpacity: "0.02" }))),
                showGrid &&
                    Array.from({ length: gridCount + 1 }).map(function (_, index) {
                        var y = padding.top + (index / gridCount) * chartHeight;
                        var value = geometry.maxValue - (index / gridCount) * geometry.range;
                        return (react_1.default.createElement(react_native_svg_1.G, { key: "grid-".concat(index) },
                            react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, x2: width - padding.right, y1: y, y2: y, stroke: axisColor, strokeDasharray: "4 6", strokeWidth: 1 }),
                            showYAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: padding.left - 10, y: y + 4, fill: labelColor, fontSize: 10, textAnchor: "end" }, formatValue(value))) : null));
                    }),
                showArea ? react_1.default.createElement(react_native_svg_1.Path, { d: geometry.areaPath, fill: "url(#".concat(gradientId, ")") }) : null,
                react_1.default.createElement(react_native_svg_1.Path, { d: geometry.linePath, fill: "none", stroke: lineColor, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3 }),
                geometry.points.map(function (point, index) { return (react_1.default.createElement(react_native_svg_1.G, { key: "point-".concat(index) },
                    showDots ? (react_1.default.createElement(react_native_svg_1.Circle, { cx: point.x, cy: point.y, r: selectedPoint === index ? 6 : 4, fill: selectedPoint === index ? accentColor : backgroundColor, stroke: lineColor, strokeWidth: 3, onPress: function () { return selectPoint(index); } })) : null,
                    react_1.default.createElement(react_native_svg_1.Rect, { x: point.x - chartWidth / Math.max(data.length - 1, 1) / 2, y: padding.top, width: chartWidth / Math.max(data.length - 1, 1), height: chartHeight, fill: "transparent", onPress: function () { return selectPoint(index); } }),
                    showXAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: point.x, y: height - 12, fill: labelColor, fontSize: 11, textAnchor: "middle" }, formatLabel(index))) : null)); }),
                selected ? (react_1.default.createElement(react_native_svg_1.G, null,
                    react_1.default.createElement(react_native_svg_1.Line, { x1: selected.x, x2: selected.x, y1: padding.top, y2: height - padding.bottom, stroke: accentColor, strokeDasharray: "4 5", strokeWidth: 1.5 }),
                    react_1.default.createElement(react_native_svg_1.Rect, { x: Math.min(Math.max(selected.x - 46, padding.left), width - 104), y: Math.max(selected.y - 48, 8), width: 92, height: 30, rx: 8, fill: tooltipBackgroundColor }),
                    react_1.default.createElement(react_native_svg_1.Text, { x: Math.min(Math.max(selected.x, padding.left + 46), width - 58), y: Math.max(selected.y - 29, 27), fill: "#FFFFFF", fontSize: 12, fontWeight: "700", textAnchor: "middle" }, formatValue(selected.value)))) : null))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 13,
        marginTop: 4,
        opacity: 0.72,
    },
    noData: {
        color: "#64748B",
        marginVertical: 20,
        textAlign: "center",
    },
});
exports.default = LineChart;
