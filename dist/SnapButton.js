"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SnapButton = function SnapButton(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement("input", {
    type: "button",
    id: "snap-btn",
    value: "Snap!",
    onClick: onClick
  });
};

var _default = SnapButton;
exports.default = _default;