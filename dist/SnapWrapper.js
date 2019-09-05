"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _effect = require("./effect");

var _SnapButton = _interopRequireDefault(require("./SnapButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function resolveAfterMs(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('resolved');
    }, delay);
  });
}

var SnapWrapper = function SnapWrapper(_ref) {
  var children = _ref.children,
      delay = _ref.delay,
      resume = _ref.resume;
  var eleRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      snap = _useState2[0],
      setSnap = _useState2[1];

  (0, _react.useEffect)(function () {
    var create =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(eleRef && snap)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 3;
                return resolveAfterMs(delay);

              case 3:
                console.log("SNAP!");
                (0, _effect.createCanvas)(eleRef.current);

                if (!(resume === "auto" || 1)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return resolveAfterMs(delay * 5);

              case 8:
                console.log(delay * 5);
                setSnap(false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function create() {
        return _ref2.apply(this, arguments);
      };
    }();

    create();
  }, [snap]);

  var transformedChildren = _react.default.createElement("div", {
    ref: eleRef,
    style: {
      position: 'relative'
    }
  }, children);

  return _react.default.createElement(_react.default.Fragment, null, snap ? transformedChildren : children, _react.default.createElement("div", null, _react.default.createElement(_SnapButton.default, {
    onClick: function onClick() {
      return setSnap(!snap);
    }
  })));
};

var _default = SnapWrapper;
exports.default = _default;