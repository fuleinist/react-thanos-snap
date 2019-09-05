"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCanvasFromImageData = exports.createBlankImageData = exports.animateTransform = exports.animateBlur = exports.createCanvas = void 0;

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _chance = _interopRequireDefault(require("chance"));

var _jquery = _interopRequireDefault(require("jquery"));

require("jquery-ui/ui/effects/effect-slide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageDataArray = [];
var canvasCount = 35;
var chance = new _chance.default();

var createCanvas = function createCanvas(element) {
  (0, _html2canvas.default)(element).then(function (canvas) {
    element.childNodes.forEach(function (node) {
      return node.style.visibility = "hidden";
    }); //capture all div data as image

    var ctx = canvas.getContext("2d");
    console.log([canvas.width, canvas.height]);
    console.log([element.offsetWidth, element.offsetHeight]);
    var imageData = ctx.getImageData(0, 0, element.offsetWidth, element.offsetHeight);
    var pixelArr = imageData.data;
    createBlankImageData(imageData); //put pixel info to imageDataArray (Weighted Distributed)

    for (var i = 0; i < pixelArr.length; i += 4) {
      //find the highest probability canvas the pixel should be in
      var p = Math.floor(i / pixelArr.length * canvasCount);
      var a = imageDataArray[weightedRandomDistrib(p)];
      a[i] = pixelArr[i];
      a[i + 1] = pixelArr[i + 1];
      a[i + 2] = pixelArr[i + 2];
      a[i + 3] = pixelArr[i + 3];
    } //create canvas for each imageData and append to target element


    var container = document.createElement('div');
    container.classList.add("canvas_container");
    container;

    for (var _i = 0; _i < canvasCount; _i++) {
      var c = newCanvasFromImageData(imageDataArray[_i], element.offsetWidth, element.offsetHeight);
      c.classList.add("dust");
      container.appendChild(c);
    }

    element.appendChild(container); //clear all children except the canvas

    (0, _jquery.default)(".content").children().not(".dust").fadeOut(3500); //apply animation

    (0, _jquery.default)(".dust").each(function (index) {
      var _this = this;

      animateBlur((0, _jquery.default)(this), 0.8, 800);
      setTimeout(function () {
        animateTransform((0, _jquery.default)(_this), 100, -100, chance.integer({
          min: -15,
          max: 15
        }), 800 + 110 * index);
      }, 70 * index); //remove the canvas from DOM tree when faded

      (0, _jquery.default)(this).delay(70 * index).fadeOut(110 * index + 800, "easeInQuint", function () {
        (0, _jquery.default)(_this).remove();
      });
    });
  });
};

exports.createCanvas = createCanvas;

var weightedRandomDistrib = function weightedRandomDistrib(peak) {
  var prob = [],
      seq = [];

  for (var i = 0; i < canvasCount; i++) {
    prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
    seq.push(i);
  }

  return chance.weighted(seq, prob);
};

var snapAnimation = function snapAnimation(element) {
  //clear all children except the canvas
  element.children().not(".dust").fadeOut(3500); //apply animation

  (0, _jquery.default)(".dust").each(function (index) {
    var _this2 = this;

    animateBlur((0, _jquery.default)(this), 0.8, 800);
    setTimeout(function () {
      animateTransform((0, _jquery.default)(_this2), 100, -100, chance.integer({
        min: -15,
        max: 15
      }), 800 + 110 * index);
    }, 70 * index); //remove the canvas from DOM tree when faded

    (0, _jquery.default)(this).delay(70 * index).fadeOut(110 * index + 800, "easeInQuint", function () {
      (0, _jquery.default)(_this2).remove();
    });
  });
};

var animateBlur = function animateBlur(elem, radius, duration) {
  var r = 0;
  (0, _jquery.default)({
    rad: 0
  }).animate({
    rad: radius
  }, {
    duration: duration,
    easing: "easeOutQuad",
    step: function step(now) {
      elem.css({
        filter: 'blur(' + now + 'px)'
      });
    }
  });
};

exports.animateBlur = animateBlur;

var animateTransform = function animateTransform(elem, sx, sy, angle, duration) {
  var td,
      tx,
      ty = 0;
  (0, _jquery.default)({
    x: 0,
    y: 0,
    deg: 0
  }).animate({
    x: sx,
    y: sy,
    deg: angle
  }, {
    duration: duration,
    easing: "easeInQuad",
    step: function step(now, fx) {
      if (fx.prop == "x") {
        tx = now;
      } else if (fx.prop == "y") {
        ty = now;
      } else if (fx.prop == "deg") {
        td = now;
      }

      elem.css({
        transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,' + ty + 'px)'
      });
    }
  });
};

exports.animateTransform = animateTransform;

var createBlankImageData = function createBlankImageData(imageData) {
  for (var i = 0; i < canvasCount; i++) {
    var arr = new Uint8ClampedArray(imageData.data);

    for (var j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }

    imageDataArray.push(arr);
  }
};

exports.createBlankImageData = createBlankImageData;

var newCanvasFromImageData = function newCanvasFromImageData(imageDataArray, w, h) {
  var canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  var tempCtx = canvas.getContext("2d");
  tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
  return canvas;
};

exports.newCanvasFromImageData = newCanvasFromImageData;