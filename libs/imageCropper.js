//module.exports = Cropper;

/**
 * Cropper.
 * @param options
 * @returns {Cropper}
 * @constructor
 */
window.URL = window.URL || window.webkitURL;
function Cropper(options) {

  /*if (!options.imageUrl) {
    throw new Error('Cropper: No image url given.');
  }*/

  this.isReady = false;
  this.num = 0;
  this.originalUrl = options.imageUrl;

  // Default options.
  var defaults = {
    checkCrossOrigin: false,
    apiCallback: undefined,
    cropCallback: undefined,
    width: 400,
    height: 300,
    imageUrl: undefined,
    target: undefined,
    showControls: true,
    fitOnInit: false,
    centerOnInit: false,
	watermarked: false,
    zoomStep: 0.1,
    actionLabels: {
      rotateLeft: ' < ',
      rotateRight: ' > ',
      zoomIn: ' + ',
      zoomOut: ' - ',
      fit: '(fit)'
    }
  };

  // Setup options.
  this.options = this.extend(defaults, options);

  // Setup gesture events.
  this.gesture = {};
  this.gesture.events = {
    start: 'touchstart mousedown',
    move: 'touchmove mousemove',
    stop: 'touchend mouseup'
  };

  this.pointerPosition = undefined;

  // Setup basic elements.
  this.elements = {
    target: options.target,
    body: document.getElementsByTagName('body')[0]
  };

  this.buildDOM();
  this.useHardwareAccelerate(this.elements.image);

  // API Setup:
  var api = {
    fit: this.applyFit.bind(this),
    rotate: this.applyRotation.bind(this),
    zoomIn: this.applyZoomIn.bind(this),
    zoomOut: this.applyZoomOut.bind(this),
    remove: this.remove.bind(this)
  };

  /**
   * Initialization of the Cropper (dimensions, event binding...).
   */
  this.events.on('ImageReady', this.initialize.bind(this));

  /**
   * Execute callback function when cropped.
   */
  if (this.options.cropCallback) {
    this.events.on('Cropped', function(base64) {
      this.options.cropCallback(base64);
    }.bind(this));
  }

  /**
   * Send API when image is ready if readyCallback is true.
   */
  if (this.options.apiCallback) {
    this.events.on('ImageReady', function() {
      this.options.apiCallback(api);
    }.bind(this));
  }
}

Cropper.prototype.initialize = function() {
  this.setDimensions();
	
  if (this.imageHasToFit()) {
    this.fitImage();
    this.centerImage();
  }
  if(this.num == 0)
  this.initializeGesture();

  if (this.options.centerOnInit) {
    this.centerImage();
  }
	
  if(this.num == 0){
	  if (this.options.showControls) {
	    this.bindControls();
	  }
  }
  
  this.applyFit();
  
  this.num ++;
};

Cropper.prototype.bindControls = function() {
  var self = this;
  this.elements.controls.rotateLeft.addEventListener('click', function() {
    self.applyRotation(-90);
  });
  this.elements.controls.rotateRight.addEventListener('click', function() {
    self.applyRotation(90);
  });
  this.elements.controls.zoomIn.addEventListener('click', function() {
    self.applyZoomIn(self.zoomInFactor);
  });
  this.elements.controls.zoomOut.addEventListener('click', function() {
    self.applyZoomOut(self.zoomOutFactor);
  });
  this.elements.controls.fit.addEventListener('click', this.applyFit.bind(this));
};

Cropper.prototype.applyRotation = function(degree) {
  this.rotateImage(degree);
};

Cropper.prototype.applyZoomIn = function(zoom) {
  //this.zoomImage(1 + parseFloat(zoom));
  this.zoomImage(zoom);
};
Cropper.prototype.applyZoomOut = function(zoom) {
  //this.zoomImage(1 / ( 1 + parseFloat(zoom)));
  this.zoomImage(zoom);
};

Cropper.prototype.applyFit = function() {
  this.fitImage();
  this.centerImage();
};

Cropper.prototype.imageHasToFit = function() {
  return this.elements.image.naturalWidth < this.options.width ||
    this.elements.image.naturalHeight < this.options.height ||
    this.width < 1 || this.height < 1 || // 1 means 100%.
    this.options.fitOnInit;
};

/**
 * Build DOM element for the Cropper appended in the targeted element.
 */
Cropper.prototype.buildDOM = function() {
  var _elements;
  _elements = this.elements;

  // Wrapper.
  _elements.wrapper = document.createElement('div');
  _elements.wrapper.className = 'imgCropper-wrapper';

  // Container.
  _elements.container = document.createElement('div');
  _elements.container.className = 'imgCropper-container';

  // Image.
  _elements.image = document.createElement('img');
  _elements.image.className = 'imgCropper-image';
  _elements.image.style.display = 'none';

  // Target -> Wrapper -> Container -> Image
  _elements.container.appendChild(_elements.image);
  _elements.wrapper.appendChild(_elements.container);
  _elements.target.appendChild(_elements.wrapper);

  if (!this.options.showControls) {
    return this.loadImage();
  }

  // Controls.
  _elements.controls = {};
  _elements.controls.wrapper = document.createElement('div');
  _elements.controls.wrapper.className = 'imgCropper-controls';

  _elements.controls.rotateLeft = this._buildControl(this.options.actionLabels.rotateLeft);
  _elements.controls.rotateRight = this._buildControl(this.options.actionLabels.rotateRight);
  _elements.controls.zoomIn = this._buildControl(this.options.actionLabels.zoomIn);
  _elements.controls.zoomOut = this._buildControl(this.options.actionLabels.zoomOut);
  _elements.controls.fit = this._buildControl(this.options.actionLabels.fit);


  // Target -> Wrapper -> buttons
  _elements.controls.wrapper.appendChild(_elements.controls.rotateLeft);
  _elements.controls.wrapper.appendChild(_elements.controls.zoomOut);
  _elements.controls.wrapper.appendChild(_elements.controls.fit);
  _elements.controls.wrapper.appendChild(_elements.controls.zoomIn);
  _elements.controls.wrapper.appendChild(_elements.controls.rotateRight);
  _elements.target.parentNode.appendChild(_elements.controls.wrapper);

  this.loadImage();
};

/**
 * Build control element.
 * @param label
 * @returns {Element}
 */
Cropper.prototype._buildControl = function(label) {
  var control = document.createElement('button');
  control.setAttribute('type', 'button');
  control.innerHTML = label;

  return control;
};

/**
 * Remove all DOM element parts of the Cropper.
 */
Cropper.prototype.remove = function() {
  var elements = this.elements;
  elements.target.removeChild(elements.wrapper);
  if (this.options.showControls) elements.target.removeChild(elements.controls.wrapper);
};

Cropper.prototype.loadImage = function() {
  var self = this;
  var xhr;
  
  // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari.
  if (/^data\:/.test(this.originalUrl)) {
    this.originalBase64 = this.originalUrl;
    return this.setupImageSRC();
  }
  
  if(this.originalUrl != "" && this.originalUrl != "undefined"){
  	  xhr = new XMLHttpRequest();
	  xhr.onerror = xhr.onabort = function(response) {
	    self.originalBase64 = self.originalUrl;
	    self.setupImageSRC();
	  };
	
	  // Need to have proper sets of 'Access-Control-Allow-Origin' on the requested resource server.
	  xhr.onload = function() {
	    self.originalArrayBuffer = this.response;
	    self.originalBase64 = 'data:image/jpeg;base64,' + self.base64ArrayBuffer(this.response);
	    self.setupImageSRC();
	  };
	  xhr.open('get', this.originalUrl, true);
	  //xhr.setRequestHeader('Content-Type', 'image/jpg'); // TODO: Auto determine the image MIME's type.
	  xhr.responseType = 'arraybuffer';
	  xhr.send();
  }
  
};

/**
 * Check crossOrigins and setup image src.
 */
Cropper.prototype.setupImageSRC = function() {
  var _image = this.elements.image;

  if (this.options.checkCrossOrigin && this.isCrossOrigin(this.originalUrl)) {
    this.crossOrigin = _image.crossOrigin;

    if (this.crossOrigin) {
      this.crossOrigin = this.originalUrl;
    } else {
      this.crossOrigin = 'anonymous';

      // Bust cache with a timestamp.
      this.crossOriginUrl = this.addTimestamp(this.originalUrl);
    }
  }

  if (this.crossOrigin) {
    this.elements.image.crossOrigin = this.crossOrigin;
  }

  if(this.options.watermarked){
  	  var canvas = document.createElement("canvas");
	  var img = document.createElement("img");
	  var self = this;
	  
	  img.src = this.crossOriginUrl || this.originalUrl;
	
	  img.onload = function(){
	  	
		var width = this.naturalWidth / self.options.width;
		var height = this.naturalHeight / self.options.height;
	
		  var relativeRatio = height / width;
		
		  if (relativeRatio > 1) {
		    width = 1;
		    height = relativeRatio;
		  } else {
		    width = 1 / relativeRatio;
		    height = 1;
		  }
	  	  
	  	  canvas.width = width * self.options.width;
	  	  canvas.height = height * self.options.height;
	  	  
	  	 var mpImg = new MegaPixImage(img);
	        EXIF.getData(img, function () {
	            mpImg.render(canvas, {
	                width: canvas.width,
	                height: canvas.height,
	                orientation: EXIF.getTag(this, "Orientation")
	            });
	
	            var ctx = canvas.getContext("2d");
				 ctx.drawImage(img,0,0,canvas.width,canvas.height);
				 ctx.font = "bold 36px Arial";
				 ctx.textBaseline = "middle";
				 ctx.fillStyle = "rgba(255,255,255,0.7)";
				 ctx.fillText("慧捷报",canvas.width - 130,canvas.height - 30);
				 
				 _image.src = canvas.toDataURL("image/png");
	       });
	  	}
  }else{
  	// Setup image src.
	  this.elements.image.src = this.crossOriginUrl || this.originalUrl; // Need to verify.
	  //this.elements.image.src = this.originalBase64; // Need to verify.
  }


  
  // Waiting the image as loaded to trigger event.
  this.elements.image.onload = function() {
    this.events.triggerHandler('ImageReady');
  }.bind(this);
};

/**
 * Set dimensions.
 */
Cropper.prototype.setDimensions = function() {
  this.zoomInFactor = 1 + parseFloat(this.options.zoomStep);
  this.zoomOutFactor = 1 / this.zoomInFactor;

  this.imageRatio = this.options.height / this.options.width;
  this.width = this.elements.image.naturalWidth / this.options.width;
  this.height = this.elements.image.naturalHeight / this.options.height;
  this.left = 0;
  this.top = 0;
  this.angle = 0;
  this.data = {
    scale: 1,
    degrees: 0,
    x: 0,
    y: 0,
    w: this.options.width,
    h: this.options.height
  };

  // Container.
  this.elements.container.style.width = this.width * 100 + '%';
  this.elements.container.style.height = this.height * 100 + '%';
  this.elements.container.style.top = 0;
  this.elements.container.style.left = 0;

  // Wrapper.
  this.elements.wrapper.style.height = 'auto';
  //this.elements.wrapper.style.width = '100%';
  this.elements.wrapper.style.width = this.options.width + "px";
  
  //this.elements.wrapper.style.paddingTop = (this.imageRatio * 100) + '%';
  this.elements.wrapper.style.paddingTop = this.options.height + 'px';
  this.isReady = true;
};

/**
 * Image should be already loaded.
 */
Cropper.prototype.initializeGesture = function() {
  var self = this;
  this.addEventListeners(this.elements.image, this.gesture.events.start, function(event) {
    if (self.isReady && self.isValidEvent(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      self.pointerPosition = self.getPointerPosition(event);
      bind();
    }
  });

  var bind = function() {
    self.elements.body.classList.add('imgCropper-dragging');
    self.addEventListeners(self.elements.body, self.gesture.events.move, drag);
    self.addEventListeners(self.elements.body, self.gesture.events.stop, unbind);
  };

  var unbind = function() {
    self.elements.body.classList.remove('imgCropper-dragging');
    self.removeEventListeners(self.elements.body, self.gesture.events.move, drag);
    self.removeEventListeners(self.elements.body, self.gesture.events.stop, unbind);
  };

  var drag = function(event) {
    self.dragging.call(self, event);
  };
};

/**
 * Dragging action.
 * @param event
 */
Cropper.prototype.dragging = function(event) {
  var dx, dy, left, p, top;
  event.preventDefault();
  event.stopImmediatePropagation();

  p = this.getPointerPosition(event); // Cursor position after moving.

  dx = p.x - this.pointerPosition.x; // Difference (cursor movement) on X axes.
  dy = p.y - this.pointerPosition.y; // Difference (cursor movement) on Y axes.

  this.pointerPosition = p; // Update cursor position.

  /**
   * dx > 0 if moving right.
   * dx / clientWidth is the percentage of the wrapper's width it moved over X.
   */
  left = (dx === 0)? null : this.left - dx / this.elements.wrapper.clientWidth;

  /**
   * dy > 0 if moving down.
   * dy / clientHeight is the percentage of the wrapper's width it moved over Y.
   */
  top = (dy === 0)? null : this.top - dy / this.elements.wrapper.clientHeight;

  // Move.
  this.setOffset(left, top);
};

/**
 * Set image offset manipulations.
 * @param left {number} is a relative number.
 * @param top {number} is a relative number.
 */
Cropper.prototype.setOffset = function(left, top) {
  /**
   * Offset left.
   */
  if (left || left === 0) {
    if (left < 0) { left = 0; }
    if (left > this.width - 1) { left = this.width - 1; }

    this.elements.container.style.left = (-left * 100).toFixed(2) + '%';
    this.left = left;
    this.data.x = Math.round(left * this.options.width);
  }

  /**
   * Offset top.
   */
  if (top || top === 0) {
    if (top < 0) { top = 0; }
    if (top > this.height - 1) { top = this.height - 1; }

    this.elements.container.style.top = (-top * 100).toFixed(2) + '%';
    this.top = top;
    this.data.y = Math.round(top * this.options.height);
  }
};

Cropper.prototype.fitImage = function() {
  var prevWidth, relativeRatio;

  prevWidth = this.width;
  relativeRatio = this.height / this.width;

  if (relativeRatio > 1) {
    this.width = 1;
    this.height = relativeRatio;
  } else {
    this.width = 1 / relativeRatio;
    this.height = 1;
  }


  this.elements.container.style.width = (this.width * 100).toFixed(2) + '%';
  this.elements.container.style.height = (this.height * 100).toFixed(2) + '%';

  this.data.scale *= this.width / prevWidth;
};

Cropper.prototype.centerImage = function() {
  this.setOffset((this.width - 1) / 2, (this.height - 1) / 2);
};

/**
 * Do a rotation on the image with degrees given.
 * @param degrees
 */
Cropper.prototype.rotateImage = function(degrees) {
  // Only rotate of 90°.
  if (!(degrees !== 0 && degrees % 90 === 0)) {
    throw new Error('Cropper: Support only multiple of 90° for rotation.');
  }

  // Smallest positive equivalent angle (total rotation).
  this.angle = (this.angle + degrees) % 360;
  if (this.angle < 0) {
    this.angle += 360;
  }

  // Dimensions are changed?
  if (degrees % 180 !== 0) {
    /**
     * Switch canvas dimensions (as percentages).
     * canvasWidth = @width * this.options.width; canvasHeight = @height * this.options.height
     * To make canvasWidth = canvasHeight (to switch dimensions):
     * => newWidth * this.options.width = @height * this.options.height
     * => newWidth = @height * this.options.height / this.options.width
     * => newWidth = @height * this.imageRatio
     */
    var tempW = this.height * this.imageRatio;
    var tempH = this.width / this.imageRatio;
    this.width = tempW;
    this.height = tempH;
    if (this.width >= 1 && this.height >= 1) {
      this.elements.container.style.width = this.width * 100 + '%';
      this.elements.container.style.height = this.height * 100 + '%';
    } else {
      this.fitImage();
    }
  }

  var newWidth = 1;
  var newHeight = 1;

  // Adjust element's (image) dimensions inside the container.
  if (this.angle % 180 !== 0) {
    var ratio = this.height / this.width * this.imageRatio;
    newWidth = ratio;
    newHeight = 1 / ratio;
  }

  this.elements.image.style.width = newWidth * 100 + '%';
  this.elements.image.style.height = newHeight * 100 + '%';
  this.elements.image.style.left = (1 - newWidth) / 2 * 100 + '%';
  this.elements.image.style.top = (1 - newHeight) / 2 * 100 + '%';


  this.elements.image.style.transform = 'rotate(' + this.angle + 'deg)';
  this.elements.image.style.webkitTransform = 'rotate(' + this.angle + 'deg)';
  this.elements.image.style.mozTransform = 'rotate(' + this.angle + 'deg)';
  this.elements.image.style.msTransform = 'rotate(' + this.angle + 'deg)';
  this.elements.image.style.oTransform = 'rotate(' + this.angle + 'deg)';

  this.centerImage();
  this.data.degrees = this.angle;
};

Cropper.prototype.zoomImage = function(factor) {
  if (factor <= 0 || factor == 1) {
    return;
  }

  var originalWidth = this.width;

  if (this.width * factor > 1 && this.height * factor > 1) {
    this.height *= factor;
    this.width *= factor;
    this.elements.container.style.height = (this.height * 100).toFixed(2) + '%';
    this.elements.container.style.width = (this.width * 100).toFixed(2) + '%';
    this.data.scale *= factor;
  } else {
    this.fitImage();
    factor = this.width / originalWidth;
  }

  /**
   * Keep window center.
   * The offsets are the distances between the image point in the center of the wrapper
   * and each edge of the image, less half the size of the window.
   * Percentage offsets are relative to the container (the wrapper), so half the wrapper
   * is 50% (0.5) and when zooming the distance between any two points in the image
   * grows by 'factor', so the new offsets are:
   *
   * offset = (prev-center-to-edge) * factor - half-window
   *
   */
  var left = (this.left + 0.5) * factor - 0.5;
  var top = (this.top + 0.5) * factor - 0.5;

  this.setOffset(left, top);
};

Cropper.prototype.useHardwareAccelerate = function(element) {
  element.style.perspective = '1000px';
  element.style.backfaceVisibility = 'hidden';
};

Cropper.prototype.extend = function(defaults, options) {
  var target = defaults;
  var defaultsKeys = Object.keys(defaults);

  defaultsKeys.forEach(function(key, index, keysArray) {
    if (options[key] !== undefined) {
      target[key] = options[key];
    }
  });

  return target;
};

/**
 * Helper for adding new event listener on element given.
 * @param element
 * @param eventNames
 * @param func
 * @param context
 */
Cropper.prototype.addEventListeners = function(element, eventNames, func, context) {
  eventNames.split(' ').forEach(function(eventName) {
    if (context) {
      element.addEventListener(eventName, func.bind(context), false);
    } else {
      element.addEventListener(eventName, func, false);
    }
  });
};

/**
 * Helper for removing event listener in element given.
 * @param element
 * @param eventNames
 * @param func
 * @param context
 */
Cropper.prototype.removeEventListeners = function(element, eventNames, func, context) {
  eventNames.split(' ').forEach(function(eventName) {
    if (context) {
      element.removeEventListener(eventName, func.bind(context), false);
    } else {
      element.removeEventListener(eventName, func, false);
    }
  });
};

/**
 * Helper for setting pointer position.
 * @param {object} event
 * @returns {{x: *, y: *}}
 */
Cropper.prototype.getPointerPosition = function(event) {
  if (this.isTouchEvent(event)) {
    event = event.touches[0];
  }
  return {
    x: event.pageX,
    y: event.pageY
  };
};
/**
 * Helper for testing if the event is valid.
 * TODO: Comment this magic thing.
 * @param event
 * @returns {boolean}
 */
Cropper.prototype.isValidEvent = function(event) {
  if (this.isTouchEvent(event)) {
    return event.changedTouches.length === 1;
  }
  return event.which === 1;
};

/**
 * Helper for testing if the event is touch.
 * @param event
 * @returns {boolean}
 */
Cropper.prototype.isTouchEvent = function(event) {
  return /touch/i.test(event.type);
};

/**
 * Helper for adding a timestamp at the end of an URL.
 * @param url
 * @returns {string}
 */
Cropper.prototype.addTimestamp = function(url) {
  var timestamp = 'timestamp=' + (new Date()).getTime();
  var sign = '?';

  if (url.indexOf('?') !== -1) {
    sign = '&';
  }

  return url.concat(sign, timestamp);
};
/**
 * Helper for checking if the given url is cross origin.
 * @param url
 * @returns {boolean}
 */
Cropper.prototype.isCrossOrigin = function(url) {
  var parts = url.match();

  return Boolean(parts && (
      parts[1] !== location.protocol ||
      parts[2] !== location.hostname ||
      parts[3] !== location.port
    ));
};

/**
 * Helper for converting arrayBuffer to base64.
 * @param arrayBuffer
 * @returns {string}
 */
Cropper.prototype.base64ArrayBuffer = function(arrayBuffer) {
  var base64 = '';
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;
  var a, b, c, d;
  var chunk;
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63;               // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1
    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  return base64;
};

/**
 * Helper for events handler.
 */
Cropper.prototype.events = new function() {
  var _triggers = {};

  this.on = function(event, callback) {
    if (!_triggers[event]) {
      _triggers[event] = [];
    }
    _triggers[event].push(callback);
  };

  this.triggerHandler = function(event, params) {
    if (_triggers[event]) {
      for (var i in _triggers[event]) {
        _triggers[event][i](params);
      }
    }
  };
};

































(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        return tags;
    }

    EXIF.getData = function(img, callback) {
        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(this));


/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */


  /**
   * Detect subsampling in loaded image.
   * In iOS, larger images than 2M pixels may be subsampled in rendering.
   */
  function detectSubsampling(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, -iw + 1, 0);
      // subsampled image becomes half smaller in rendering size.
      // check alpha channel value to confirm image is covering edge pixel or not.
      // if alpha value is 0 image is not covering, hence subsampled.
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
      return false;
    }
  }

  /**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   */
  function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
      var alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
  }

  /**
   * Rendering image element (with resizing) and get its data URL
   */
  function renderImageToDataURL(img, options, doSquash) {
    var canvas = document.createElement('canvas');
    renderImageToCanvas(img, canvas, options, doSquash);
    return canvas.toDataURL("image/jpeg", options.quality || 0.8);
  }

  /**
   * Rendering image element (with resizing) into the canvas element
   */
  function renderImageToCanvas(img, canvas, options, doSquash) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (!(iw+ih)) return;
    var width = options.width, height = options.height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    transformCoordinate(canvas, ctx, width, height, options.orientation);
    var subsampled = detectSubsampling(img);
    if (subsampled) {
      iw /= 2;
      ih /= 2;
    }
    var d = 1024; // size of tiling canvas
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = d;
    var tmpCtx = tmpCanvas.getContext('2d');
    var vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
    var dw = Math.ceil(d * width / iw);
    var dh = Math.ceil(d * height / ih / vertSquashRatio);
    var sy = 0;
    var dy = 0;
    while (sy < ih) {
      var sx = 0;
      var dx = 0;
      while (sx < iw) {
        tmpCtx.clearRect(0, 0, d, d);
        tmpCtx.drawImage(img, -sx, -sy);
        ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
        sx += d;
        dx += dw;
      }
      sy += d;
      dy += dh;
    }
    ctx.restore();
    tmpCanvas = tmpCtx = null;
  }

  /**
   * Transform canvas coordination according to specified frame size and orientation
   * Orientation value is from EXIF tag
   */
  function transformCoordinate(canvas, ctx, width, height, orientation) {
    switch (orientation) {
      case 5:
      case 6:
      case 7:
      case 8:
        canvas.width = height;
        canvas.height = width;
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        // 180 rotate left
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 4:
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        // 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        // 90 rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
      default:
        break;
    }
  }

  var URL = window.URL && window.URL.createObjectURL ? window.URL :
            window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
            null;

  /**
   * MegaPixImage class
   */
  function MegaPixImage(srcImage) {
    if (window.Blob && srcImage instanceof Blob) {
      if (!URL) { throw Error("No createObjectURL function found to create blob url"); }
      var img = new Image();
      img.src = URL.createObjectURL(srcImage);
      this.blob = srcImage;
      srcImage = img;
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
      var _this = this;
      srcImage.onload = srcImage.onerror = function() {
        var listeners = _this.imageLoadListeners;
        if (listeners) {
          _this.imageLoadListeners = null;
          for (var i=0, len=listeners.length; i<len; i++) {
            listeners[i]();
          }
        }
      };
      this.imageLoadListeners = [];
    }
    this.srcImage = srcImage;
  }

  /**
   * Rendering megapix image into specified target element
   */
  MegaPixImage.prototype.render = function(target, options, callback) {
    if (this.imageLoadListeners) {
      var _this = this;
      this.imageLoadListeners.push(function() { _this.render(target, options, callback); });
      return;
    }
    options = options || {};
    var imgWidth = this.srcImage.naturalWidth, imgHeight = this.srcImage.naturalHeight,
        width = options.width, height = options.height,
        maxWidth = options.maxWidth, maxHeight = options.maxHeight,
        doSquash = !this.blob || this.blob.type === 'image/jpeg';
    if (width && !height) {
      height = (imgHeight * width / imgWidth) << 0;
    } else if (height && !width) {
      width = (imgWidth * height / imgHeight) << 0;
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    if (maxWidth && width > maxWidth) {
      width = maxWidth;
      height = (imgHeight * width / imgWidth) << 0;
    }
    if (maxHeight && height > maxHeight) {
      height = maxHeight;
      width = (imgWidth * height / imgHeight) << 0;
    }
    var opt = { width : width, height : height };
    for (var k in options) opt[k] = options[k];

    var tagName = target.tagName.toLowerCase();
    if (tagName === 'img') {
      target.src = renderImageToDataURL(this.srcImage, opt, doSquash);
    } else if (tagName === 'canvas') {
      renderImageToCanvas(this.srcImage, target, opt, doSquash);
    }
    if (typeof this.onrender === 'function') {
      this.onrender(target);
    }
    if (callback) {
      callback();
    }
    if (this.blob) {
      this.blob = null;
      URL.revokeObjectURL(this.srcImage.src);
    }
  };

  /**
   * Export class to global
   */
  if (typeof define === 'function' && define.amd) {
    define([], function() { return MegaPixImage; }); // for AMD loader
  } else {
    this.MegaPixImage = MegaPixImage;
  }
