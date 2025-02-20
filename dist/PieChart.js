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
var PieChart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? 300 : _c, _d = _a.height, height = _d === void 0 ? 300 : _d, _e = _a.colors, colors = _e === void 0 ? ["#f00", "#0f0", "#00f", "#ff0"] : _e;
    if (!data.length)
        return null;
    var total = data.reduce(function (sum, value) { return sum + value; }, 0);
    var radius = Math.min(width, height) / 2 - 20;
    var centerX = width / 2;
    var centerY = height / 2;
    var startAngle = 0;
    var arcs = data.map(function (value, index) {
        var angle = (value / total) * 2 * Math.PI;
        var endAngle = startAngle + angle;
        var largeArc = angle > Math.PI ? 1 : 0;
        var x1 = centerX + radius * Math.cos(startAngle);
        var y1 = centerY + radius * Math.sin(startAngle);
        var x2 = centerX + radius * Math.cos(endAngle);
        var y2 = centerY + radius * Math.sin(endAngle);
        var path = "M ".concat(centerX, " ").concat(centerY, " L ").concat(x1, " ").concat(y1, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc, " 1 ").concat(x2, " ").concat(y2, " Z");
        startAngle = endAngle;
        return { path: path, value: value, color: colors[index % colors.length] };
    });
    return (react_1.default.createElement(react_native_1.View, { style: { alignItems: "center" } },
        react_1.default.createElement(react_native_svg_1.default, { width: width, height: height },
            react_1.default.createElement(react_native_svg_1.Defs, null, arcs.map(function (arc, index) { return (react_1.default.createElement(react_native_svg_1.LinearGradient, { key: "gradient-".concat(index), id: "grad".concat(index), x1: "0", y1: "0", x2: "1", y2: "1" },
                react_1.default.createElement(react_native_svg_1.Stop, { offset: "0", stopColor: arc.color, stopOpacity: "1" }),
                react_1.default.createElement(react_native_svg_1.Stop, { offset: "1", stopColor: "#fff", stopOpacity: "0.7" }))); })),
            arcs.map(function (arc, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: "arc-".concat(index) },
                react_1.default.createElement(react_native_svg_1.Path, { d: arc.path, fill: "url(#grad".concat(index, ")"), strokeWidth: 1, stroke: "white" }))); })),
        react_1.default.createElement(react_native_1.View, { style: { marginTop: 10 } }, data.map(function (value, index) { return (react_1.default.createElement(react_native_1.Text, { key: "legend-".concat(index), style: { color: colors[index % colors.length] } },
            "Section ",
            index + 1,
            ": ",
            value)); }))));
};
exports.default = PieChart;
