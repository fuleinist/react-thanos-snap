import html2canvas from 'html2canvas';
import Chance from 'chance';
import $ from "jquery";

import "jquery-ui/ui/effects/effect-slide";

let imageDataArray = [];
let canvasCount = 35;
const chance = new Chance();

export const createCanvas = (element) => {
	html2canvas(element).then(canvas => {
		element.childNodes.forEach(node => node.style.visibility ="hidden")
		//capture all div data as image
		let ctx = canvas.getContext("2d");
		console.log([canvas.width, canvas.height]);
		console.log([element.offsetWidth, element.offsetHeight])
		let imageData = ctx.getImageData(0, 0, element.offsetWidth, element.offsetHeight);
		let pixelArr = imageData.data;
		createBlankImageData(imageData);
		//put pixel info to imageDataArray (Weighted Distributed)
		for (let i = 0; i < pixelArr.length; i+=4) {
			//find the highest probability canvas the pixel should be in
			let p = Math.floor((i/pixelArr.length) *canvasCount);
			let a = imageDataArray[weightedRandomDistrib(p)];
			a[i] = pixelArr[i];
			a[i+1] = pixelArr[i+1];
			a[i+2] = pixelArr[i+2];
			a[i+3] = pixelArr[i+3]; 
		}
		//create canvas for each imageData and append to target element
		let container = document.createElement('div');
		container.classList.add("canvas_container");
		container
		for (let i = 0; i < canvasCount; i++) {
			let c = newCanvasFromImageData(imageDataArray[i], element.offsetWidth, element.offsetHeight);
			c.classList.add("dust");
			container.appendChild(c);
		}
		element.appendChild(container);
		//clear all children except the canvas
		$(".content").children().not(".dust").fadeOut(3500);
		//apply animation
		$(".dust").each( function(index){
			animateBlur($(this),0.8,800);
			setTimeout(() => {
				animateTransform($(this),100,-100,chance.integer({ min: -15, max: 15 }),800+(110*index));
			}, 70*index); 
			//remove the canvas from DOM tree when faded
			$(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$( this ).remove();});
		});
	});
};

const weightedRandomDistrib = (peak) => {
  var prob = [], seq = [];
  for(let i=0;i<canvasCount;i++) {
    prob.push(Math.pow(canvasCount-Math.abs(peak-i),3));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}

const snapAnimation = (element) => {
	//clear all children except the canvas
	element.children().not(".dust").fadeOut(3500);
	//apply animation
	$(".dust").each( function(index){
	  animateBlur($(this),0.8,800);
	  setTimeout(() => {
		animateTransform($(this),100,-100,chance.integer({ min: -15, max: 15 }),800+(110*index));
	  }, 70*index); 
	  //remove the canvas from DOM tree when faded
	  $(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$( this ).remove();});
	});
}

export const animateBlur = (elem,radius,duration) => {
  let r =0;
  $({rad:0}).animate({rad:radius}, {
	  duration: duration,
	  easing: "easeOutQuad",
	  step: function(now) {
		elem.css({
			  filter: 'blur(' + now + 'px)'
		  });
	  }
  });
};

export const animateTransform = (elem,sx,sy,angle,duration) => {
  let td, tx, ty = 0;
  $({x: 0, y:0, deg:0}).animate({x: sx, y:sy, deg:angle}, {
	  duration: duration,
	  easing: "easeInQuad",
	  step: function(now, fx) {
		if (fx.prop == "x") 
		  {tx = now;}
		else if (fx.prop == "y") 
		  {ty = now;}
		else if (fx.prop == "deg") 
		  {td = now;}
		elem.css({
			  transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,'+ ty +'px)'
		  });
	  }
  });
}

export const createBlankImageData = (imageData) => {
  for(let i=0;i<canvasCount;i++)
  {
	let arr = new Uint8ClampedArray(imageData.data);
	for (let j = 0; j < arr.length; j++) {
		arr[j] = 0;
	}
	imageDataArray.push(arr);
  }
}

export const newCanvasFromImageData = (imageDataArray ,w , h) => {
	let canvas = document.createElement('canvas');
	  canvas.width = w;
	  canvas.height = h;
	  let tempCtx = canvas.getContext("2d");
	  tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);
  return canvas;
}