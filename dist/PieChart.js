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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var react_native_2 = require("react-native");
var PieChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? 300 : _c, _d = _a.height, height = _d === void 0 ? 300 : _d, _e = _a.colors, colors = _e === void 0 ? ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"] : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 2 : _f, _g = _a.animate, animate = _g === void 0 ? true : _g, _h = _a.showLabels, showLabels = _h === void 0 ? true : _h, _j = _a.showPercentages, showPercentages = _j === void 0 ? true : _j;
    var animation = react_1.default.useState(new react_native_1.Animated.Value(0))[0];
    var total = data.reduce(function (sum, item) { return sum + item.value; }, 0);
    var radius = Math.min(width, height) / 2 - 40;
    var centerX = width / 2;
    var centerY = height / 2;
    react_1.default.useEffect(function () {
        if (animate) {
            react_native_1.Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        }
    }, []);
    var getArcPath = function (startAngle, endAngle) {
        var largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        var x1 = centerX + radius * Math.cos(startAngle);
        var y1 = centerY + radius * Math.sin(startAngle);
        var x2 = centerX + radius * Math.cos(endAngle);
        var y2 = centerY + radius * Math.sin(endAngle);
        return "M ".concat(centerX, " ").concat(centerY, " L ").concat(x1, " ").concat(y1, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc, " 1 ").concat(x2, " ").concat(y2, " Z");
    };
    var startAngle = 0;
    var arcs = data.map(function (item, index) {
        var percentage = (item.value / total) * 100;
        var angle = (item.value / total) * 2 * Math.PI;
        var endAngle = startAngle + angle;
        var path = getArcPath(startAngle, endAngle);
        var labelAngle = startAngle + angle / 2;
        var labelRadius = radius * 0.7;
        var labelX = centerX + labelRadius * Math.cos(labelAngle);
        var labelY = centerY + labelRadius * Math.sin(labelAngle);
        startAngle = endAngle;
        return {
            path: path,
            value: item.value,
            percentage: percentage,
            label: item.label,
            color: colors[index % colors.length],
            labelX: labelX,
            labelY: labelY,
        };
    });
    return (react_1.default.createElement(react_native_1.View, { style: { alignItems: "center" } },
        react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
            react_1.default.createElement(react_native_svg_1.Defs, null, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_svg_1.LinearGradient, { key: "gradient-".concat(index), id: "grad".concat(index), x1: "0", y1: "0", x2: "1", y2: "1" },
                react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: arc.color, stopOpacity: "0.8" }),
                react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: arc.color, stopOpacity: "0.5" }))); })),
            react_1.default.createElement(react_native_svg_1.G, null, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_svg_1.G, { key: "segment-".concat(index) },
                react_1.default.createElement(react_native_svg_1.Path, { d: arc.path, fill: "url(#grad".concat(index, ")"), strokeWidth: strokeWidth, stroke: "#fff" }),
                showLabels && (react_1.default.createElement(react_native_svg_1.Text, { x: arc.labelX, y: arc.labelY, fill: "#fff", fontSize: "12", textAnchor: "middle" },
                    arc.label,
                    showPercentages && " (".concat(arc.percentage.toFixed(1), "%)"))))); }))),
        react_1.default.createElement(react_native_1.View, { style: {
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
                justifyContent: "center",
                gap: 8,
            } }, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_1.View, { key: "legend-".concat(index), style: {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: 8,
                borderRadius: 4,
            } },
            react_1.default.createElement(react_native_1.View, { style: {
                    width: 12,
                    height: 12,
                    backgroundColor: arc.color,
                    borderRadius: 6,
                    marginRight: 6,
                } }),
            react_1.default.createElement(react_native_2.Text, { style: { color: "#fff", fontSize: 12 } },
                arc.label,
                ": ",
                arc.value,
                " (",
                arc.percentage.toFixed(1),
                "%)"))); }))));
};
exports.default = PieChart;
