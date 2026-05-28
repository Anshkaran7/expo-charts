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
var AreaChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? react_native_1.Dimensions.get("window").width - 40 : _c, _d = _a.height, height = _d === void 0 ? 250 : _d, _e = _a.color, color = _e === void 0 ? "#2563EB" : _e, _f = _a.accentColor, accentColor = _f === void 0 ? "#7C3AED" : _f, _g = _a.labelColor, labelColor = _g === void 0 ? "#334155" : _g, _h = _a.axisColor, axisColor = _h === void 0 ? "#E2E8F0" : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? "#FFFFFF" : _j, _k = _a.title, title = _k === void 0 ? "" : _k, _l = _a.subtitle, subtitle = _l === void 0 ? "" : _l, _m = _a.animate, animate = _m === void 0 ? true : _m, _o = _a.showGrid, showGrid = _o === void 0 ? true : _o, _p = _a.showDots, showDots = _p === void 0 ? true : _p, _q = _a.formatValue, formatValue = _q === void 0 ? function (value) { return value.toString(); } : _q, _r = _a.formatLabel, formatLabel = _r === void 0 ? function (index) { return (index + 1).toString(); } : _r, _s = _a.onPointPress, onPointPress = _s === void 0 ? function () { } : _s, _t = _a.style, style = _t === void 0 ? {} : _t, _u = _a.showXAxisLabels, showXAxisLabels = _u === void 0 ? true : _u, _v = _a.showYAxisLabels, showYAxisLabels = _v === void 0 ? true : _v;
    var _w = (0, react_1.useState)(null), selectedPoint = _w[0], setSelectedPoint = _w[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    var padding = { top: 24, right: 18, bottom: 34, left: 54 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
    var gradientId = "areaGradient-".concat(color.replace(/[^a-zA-Z0-9]/g, ""));
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
    var geometry = (0, react_1.useMemo)(function () {
        var maxValue = Math.max.apply(Math, data) * 1.08 || 1;
        var points = data.map(function (value, index) { return ({
            value: value,
            x: padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth,
            y: padding.top + chartHeight - (value / maxValue) * chartHeight,
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
        return { areaPath: areaPath, linePath: linePath, maxValue: maxValue, points: points };
    }, [chartHeight, chartWidth, data, height]);
    if (!data.length)
        return react_1.default.createElement(react_native_1.Text, { style: styles.noData }, "No data available");
    var selectPoint = function (index) {
        setSelectedPoint(index);
        onPointPress(data[index], index);
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }, style] },
        (title || subtitle) && (react_1.default.createElement(react_native_1.View, { style: styles.header },
            title ? react_1.default.createElement(react_native_1.Text, { style: [styles.title, { color: labelColor }] }, title) : null,
            subtitle ? react_1.default.createElement(react_native_1.Text, { style: [styles.subtitle, { color: labelColor }] }, subtitle) : null)),
        react_1.default.createElement(react_native_1.Animated.View, { style: { opacity: fadeAnim } },
            react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
                react_1.default.createElement(react_native_svg_1.Defs, null,
                    react_1.default.createElement(react_native_svg_1.LinearGradient, { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1" },
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: color, stopOpacity: "0.38" }),
                        react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: color, stopOpacity: "0.04" }))),
                showGrid &&
                    Array.from({ length: 5 }).map(function (_, index) {
                        var y = padding.top + (index / 4) * chartHeight;
                        var value = geometry.maxValue - (index / 4) * geometry.maxValue;
                        return (react_1.default.createElement(react_native_svg_1.G, { key: "grid-".concat(index) },
                            react_1.default.createElement(react_native_svg_1.Line, { x1: padding.left, x2: width - padding.right, y1: y, y2: y, stroke: axisColor, strokeDasharray: "4 6", strokeWidth: 1 }),
                            showYAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: padding.left - 10, y: y + 4, fill: labelColor, fontSize: 10, textAnchor: "end" }, formatValue(value))) : null));
                    }),
                react_1.default.createElement(react_native_svg_1.Path, { d: geometry.areaPath, fill: "url(#".concat(gradientId, ")") }),
                react_1.default.createElement(react_native_svg_1.Path, { d: geometry.linePath, fill: "none", stroke: color, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3 }),
                geometry.points.map(function (point, index) { return (react_1.default.createElement(react_native_svg_1.G, { key: "point-".concat(index) },
                    showDots ? (react_1.default.createElement(react_native_svg_1.Circle, { cx: point.x, cy: point.y, r: selectedPoint === index ? 6 : 4, fill: selectedPoint === index ? accentColor : backgroundColor, stroke: color, strokeWidth: 3, onPress: function () { return selectPoint(index); } })) : null,
                    react_1.default.createElement(react_native_svg_1.Rect, { x: point.x - chartWidth / Math.max(data.length - 1, 1) / 2, y: padding.top, width: chartWidth / Math.max(data.length - 1, 1), height: chartHeight, fill: "transparent", onPress: function () { return selectPoint(index); } }),
                    showXAxisLabels ? (react_1.default.createElement(react_native_svg_1.Text, { x: point.x, y: height - 12, fill: labelColor, fontSize: 11, textAnchor: "middle" }, formatLabel(index))) : null)); })))));
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = AreaChart;
