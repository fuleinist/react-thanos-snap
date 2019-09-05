"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./thanossnap.css");

var _SnapButton = _interopRequireDefault(require("./SnapButton"));

var _SnapWrapper = _interopRequireDefault(require("./SnapWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  SnapButton: _SnapButton.default,
  SnapWrapper: _SnapWrapper.default
};
exports.default = _default;