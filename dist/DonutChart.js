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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var PieChart_1 = __importDefault(require("./PieChart"));
var DonutChart = function (_a) {
    var _b;
    var centerValue = _a.centerValue, centerLabel = _a.centerLabel, _c = _a.centerTextColor, centerTextColor = _c === void 0 ? "#0F172A" : _c, _d = _a.centerLabelColor, centerLabelColor = _d === void 0 ? "#64748B" : _d, _e = _a.donutRadius, donutRadius = _e === void 0 ? 62 : _e, _f = _a.height, height = _f === void 0 ? 300 : _f, _g = _a.width, width = _g === void 0 ? 300 : _g, pieProps = __rest(_a, ["centerValue", "centerLabel", "centerTextColor", "centerLabelColor", "donutRadius", "height", "width"]);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { width: width }] },
        react_1.default.createElement(PieChart_1.default, __assign({}, pieProps, { donutRadius: donutRadius, height: height, showLabels: (_b = pieProps.showLabels) !== null && _b !== void 0 ? _b : false, width: width })),
        react_1.default.createElement(react_native_1.View, { pointerEvents: "none", style: [styles.center, { height: height, width: width }] },
            centerValue !== undefined ? (react_1.default.createElement(react_native_1.Text, { style: [styles.centerValue, { color: centerTextColor }] }, centerValue)) : null,
            centerLabel ? (react_1.default.createElement(react_native_1.Text, { style: [styles.centerLabel, { color: centerLabelColor }] }, centerLabel)) : null)));
};
var styles = react_native_1.StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: 0,
    },
    centerLabel: {
        fontSize: 13,
        fontWeight: "600",
        marginTop: 4,
    },
    centerValue: {
        fontSize: 28,
        fontWeight: "800",
    },
    container: {
        alignItems: "center",
    },
});
exports.default = DonutChart;
