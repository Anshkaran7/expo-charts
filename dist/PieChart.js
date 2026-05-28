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
var PieChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? 300 : _c, _d = _a.height, height = _d === void 0 ? 300 : _d, _e = _a.colors, colors = _e === void 0 ? ["#2563EB", "#7C3AED", "#10B981", "#F59E0B", "#EF4444"] : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 2 : _f, _g = _a.animate, animate = _g === void 0 ? true : _g, _h = _a.showLabels, showLabels = _h === void 0 ? true : _h, _j = _a.showLegend, showLegend = _j === void 0 ? true : _j, _k = _a.showPercentages, showPercentages = _k === void 0 ? true : _k, _l = _a.donutRadius, donutRadius = _l === void 0 ? 0 : _l, _m = _a.selectedOffset, selectedOffset = _m === void 0 ? 12 : _m, _o = _a.labelColor, labelColor = _o === void 0 ? "#FFFFFF" : _o, _p = _a.legendTextColor, legendTextColor = _p === void 0 ? "#334155" : _p, _q = _a.onSegmentPress, onSegmentPress = _q === void 0 ? function () { } : _q, _r = _a.style, style = _r === void 0 ? {} : _r;
    var _s = (0, react_1.useState)(null), selectedSegment = _s[0], setSelectedSegment = _s[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    var total = (0, react_1.useMemo)(function () { return data.reduce(function (sum, item) { return sum + item.value; }, 0); }, [data]);
    var radius = Math.min(width, height) / 2 - 34;
    var centerX = width / 2;
    var centerY = height / 2;
    var innerRadius = donutRadius > 0 ? radius * (donutRadius / 100) : 0;
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
    var arcPath = function (startAngle, endAngle, offset) {
        var midAngle = startAngle + (endAngle - startAngle) / 2;
        var offsetX = Math.cos(midAngle) * offset;
        var offsetY = Math.sin(midAngle) * offset;
        var largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        var outerStartX = centerX + offsetX + radius * Math.cos(startAngle);
        var outerStartY = centerY + offsetY + radius * Math.sin(startAngle);
        var outerEndX = centerX + offsetX + radius * Math.cos(endAngle);
        var outerEndY = centerY + offsetY + radius * Math.sin(endAngle);
        if (innerRadius > 0) {
            var innerEndX = centerX + offsetX + innerRadius * Math.cos(endAngle);
            var innerEndY = centerY + offsetY + innerRadius * Math.sin(endAngle);
            var innerStartX = centerX + offsetX + innerRadius * Math.cos(startAngle);
            var innerStartY = centerY + offsetY + innerRadius * Math.sin(startAngle);
            return "M ".concat(outerStartX, " ").concat(outerStartY, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc, " 1 ").concat(outerEndX, " ").concat(outerEndY, " L ").concat(innerEndX, " ").concat(innerEndY, " A ").concat(innerRadius, " ").concat(innerRadius, " 0 ").concat(largeArc, " 0 ").concat(innerStartX, " ").concat(innerStartY, " Z");
        }
        return "M ".concat(centerX + offsetX, " ").concat(centerY + offsetY, " L ").concat(outerStartX, " ").concat(outerStartY, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc, " 1 ").concat(outerEndX, " ").concat(outerEndY, " Z");
    };
    var arcs = (0, react_1.useMemo)(function () {
        var startAngle = -Math.PI / 2;
        return data.map(function (item, index) {
            var _a;
            var percentage = total ? (item.value / total) * 100 : 0;
            var angle = total ? (item.value / total) * Math.PI * 2 : 0;
            var endAngle = startAngle + angle;
            var midAngle = startAngle + angle / 2;
            var labelRadius = innerRadius > 0 ? (radius + innerRadius) / 2 : radius * 0.66;
            var labelX = centerX + labelRadius * Math.cos(midAngle);
            var labelY = centerY + labelRadius * Math.sin(midAngle);
            var arc = __assign({ color: (_a = item.color) !== null && _a !== void 0 ? _a : colors[index % colors.length], endAngle: endAngle, labelX: labelX, labelY: labelY, percentage: percentage, startAngle: startAngle }, item);
            startAngle = endAngle;
            return arc;
        });
    }, [colors, data, innerRadius, radius, total]);
    var selectSegment = function (index) {
        setSelectedSegment(selectedSegment === index ? null : index);
        onSegmentPress(data[index], index);
    };
    if (!data.length)
        return react_1.default.createElement(react_native_1.Text, { style: styles.noData }, "No data available");
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [styles.container, style, { opacity: fadeAnim }] },
        react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
            react_1.default.createElement(react_native_svg_1.G, null, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_svg_1.G, { key: "segment-".concat(index) },
                react_1.default.createElement(react_native_svg_1.Path, { d: arcPath(arc.startAngle, arc.endAngle, selectedSegment === index ? selectedOffset : 0), fill: arc.color, stroke: "#FFFFFF", strokeWidth: strokeWidth, onPress: function () { return selectSegment(index); } }),
                showLabels && arc.percentage >= 5 ? (react_1.default.createElement(react_native_svg_1.Text, { x: arc.labelX, y: arc.labelY + 4, fill: labelColor, fontSize: 11, fontWeight: "700", textAnchor: "middle" }, showPercentages ? "".concat(arc.percentage.toFixed(0), "%") : arc.label)) : null)); }))),
        showLegend ? (react_1.default.createElement(react_native_1.View, { style: styles.legend }, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: "legend-".concat(index), style: [
                styles.legendItem,
                selectedSegment === index && styles.legendItemSelected,
            ], onPress: function () { return selectSegment(index); } },
            react_1.default.createElement(react_native_1.View, { style: [styles.swatch, { backgroundColor: arc.color }] }),
            react_1.default.createElement(react_native_1.Text, { style: [styles.legendText, { color: legendTextColor }] }, showPercentages
                ? "".concat(arc.label, " (").concat(arc.percentage.toFixed(1), "%)")
                : arc.label))); }))) : null));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
    },
    legend: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        marginTop: 12,
    },
    legendItem: {
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    legendItemSelected: {
        backgroundColor: "rgba(148, 163, 184, 0.18)",
    },
    legendText: {
        fontSize: 12,
        fontWeight: "600",
    },
    noData: {
        color: "#64748B",
        marginVertical: 20,
        textAlign: "center",
    },
    swatch: {
        borderRadius: 5,
        height: 10,
        marginRight: 6,
        width: 10,
    },
});
exports.default = PieChart;
