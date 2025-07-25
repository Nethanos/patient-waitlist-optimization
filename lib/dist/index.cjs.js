"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/geolib/es/constants.js
var require_constants = __commonJS({
  "node_modules/geolib/es/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.areaConversion = exports2.timeConversion = exports2.distanceConversion = exports2.altitudeKeys = exports2.latitudeKeys = exports2.longitudeKeys = exports2.MAXLON = exports2.MINLON = exports2.MAXLAT = exports2.MINLAT = exports2.earthRadius = exports2.sexagesimalPattern = void 0;
    var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
    exports2.sexagesimalPattern = sexagesimalPattern;
    var earthRadius = 6378137;
    exports2.earthRadius = earthRadius;
    var MINLAT = -90;
    exports2.MINLAT = MINLAT;
    var MAXLAT = 90;
    exports2.MAXLAT = MAXLAT;
    var MINLON = -180;
    exports2.MINLON = MINLON;
    var MAXLON = 180;
    exports2.MAXLON = MAXLON;
    var longitudeKeys = ["lng", "lon", "longitude", 0];
    exports2.longitudeKeys = longitudeKeys;
    var latitudeKeys = ["lat", "latitude", 1];
    exports2.latitudeKeys = latitudeKeys;
    var altitudeKeys = ["alt", "altitude", "elevation", "elev", 2];
    exports2.altitudeKeys = altitudeKeys;
    var distanceConversion = { m: 1, km: 1e-3, cm: 100, mm: 1e3, mi: 1 / 1609.344, sm: 1 / 1852.216, ft: 100 / 30.48, in: 100 / 2.54, yd: 1 / 0.9144 };
    exports2.distanceConversion = distanceConversion;
    var timeConversion = { m: 60, h: 3600, d: 86400 };
    exports2.timeConversion = timeConversion;
    var areaConversion = { m2: 1, km2: 1e-6, ha: 1e-4, a: 0.01, ft2: 10.763911, yd2: 1.19599, in2: 1550.0031 };
    exports2.areaConversion = areaConversion;
    areaConversion.sqm = areaConversion.m2;
    areaConversion.sqkm = areaConversion.km2;
    areaConversion.sqft = areaConversion.ft2;
    areaConversion.sqyd = areaConversion.yd2;
    areaConversion.sqin = areaConversion.in2;
  }
});

// node_modules/geolib/es/getCoordinateKey.js
var require_getCoordinateKey = __commonJS({
  "node_modules/geolib/es/getCoordinateKey.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var getCoordinateKey = function getCoordinateKey2(point, keysToLookup) {
      return keysToLookup.reduce(function(foundKey, key) {
        if (typeof point === "undefined" || point === null) {
          throw new Error("'".concat(point, "' is no valid coordinate."));
        }
        if (Object.prototype.hasOwnProperty.call(point, key) && typeof key !== "undefined" && typeof foundKey === "undefined") {
          foundKey = key;
          return key;
        }
        return foundKey;
      }, void 0);
    };
    var _default = getCoordinateKey;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isDecimal.js
var require_isDecimal = __commonJS({
  "node_modules/geolib/es/isDecimal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var isDecimal = function isDecimal2(value) {
      var checkedValue = value.toString().trim();
      if (isNaN(parseFloat(checkedValue))) {
        return false;
      }
      return parseFloat(checkedValue) === Number(checkedValue);
    };
    var _default = isDecimal;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isSexagesimal.js
var require_isSexagesimal = __commonJS({
  "node_modules/geolib/es/isSexagesimal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var isSexagesimal = function isSexagesimal2(value) {
      return _constants.sexagesimalPattern.test(value.toString().trim());
    };
    var _default = isSexagesimal;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/sexagesimalToDecimal.js
var require_sexagesimalToDecimal = __commonJS({
  "node_modules/geolib/es/sexagesimalToDecimal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var sexagesimalToDecimal = function sexagesimalToDecimal2(sexagesimal) {
      var data = new RegExp(_constants.sexagesimalPattern).exec(sexagesimal.toString().trim());
      if (typeof data === "undefined" || data === null) {
        throw new Error("Given value is not in sexagesimal format");
      }
      var min = Number(data[2]) / 60 || 0;
      var sec = Number(data[4]) / 3600 || 0;
      var decimal = parseFloat(data[1]) + min + sec;
      return ["S", "W"].includes(data[7]) ? -decimal : decimal;
    };
    var _default = sexagesimalToDecimal;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getCoordinateKeys.js
var require_getCoordinateKeys = __commonJS({
  "node_modules/geolib/es/getCoordinateKeys.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var getCoordinateKeys = function getCoordinateKeys2(point) {
      var keysToLookup = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { longitude: _constants.longitudeKeys, latitude: _constants.latitudeKeys, altitude: _constants.altitudeKeys };
      var longitude = (0, _getCoordinateKey.default)(point, keysToLookup.longitude);
      var latitude = (0, _getCoordinateKey.default)(point, keysToLookup.latitude);
      var altitude = (0, _getCoordinateKey.default)(point, keysToLookup.altitude);
      return _objectSpread({ latitude, longitude }, altitude ? { altitude } : {});
    };
    var _default = getCoordinateKeys;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isValidLatitude.js
var require_isValidLatitude = __commonJS({
  "node_modules/geolib/es/isValidLatitude.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isValidLatitude = function isValidLatitude2(value) {
      if ((0, _isDecimal.default)(value)) {
        if (parseFloat(value) > _constants.MAXLAT || value < _constants.MINLAT) {
          return false;
        }
        return true;
      }
      if ((0, _isSexagesimal.default)(value)) {
        return isValidLatitude2((0, _sexagesimalToDecimal.default)(value));
      }
      return false;
    };
    var _default = isValidLatitude;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isValidLongitude.js
var require_isValidLongitude = __commonJS({
  "node_modules/geolib/es/isValidLongitude.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isValidLongitude = function isValidLongitude2(value) {
      if ((0, _isDecimal.default)(value)) {
        if (parseFloat(value) > _constants.MAXLON || value < _constants.MINLON) {
          return false;
        }
        return true;
      }
      if ((0, _isSexagesimal.default)(value)) {
        return isValidLongitude2((0, _sexagesimalToDecimal.default)(value));
      }
      return false;
    };
    var _default = isValidLongitude;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isValidCoordinate.js
var require_isValidCoordinate = __commonJS({
  "node_modules/geolib/es/isValidCoordinate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getCoordinateKeys2 = _interopRequireDefault(require_getCoordinateKeys());
    var _isValidLatitude = _interopRequireDefault(require_isValidLatitude());
    var _isValidLongitude = _interopRequireDefault(require_isValidLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isValidCoordinate = function isValidCoordinate2(point) {
      var _getCoordinateKeys = (0, _getCoordinateKeys2.default)(point), latitude = _getCoordinateKeys.latitude, longitude = _getCoordinateKeys.longitude;
      if (Array.isArray(point) && point.length >= 2) {
        return (0, _isValidLongitude.default)(point[0]) && (0, _isValidLatitude.default)(point[1]);
      }
      if (typeof latitude === "undefined" || typeof longitude === "undefined") {
        return false;
      }
      var lon = point[longitude];
      var lat = point[latitude];
      if (typeof lat === "undefined" || typeof lon === "undefined") {
        return false;
      }
      if ((0, _isValidLatitude.default)(lat) === false || (0, _isValidLongitude.default)(lon) === false) {
        return false;
      }
      return true;
    };
    var _default = isValidCoordinate;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/toDecimal.js
var require_toDecimal = __commonJS({
  "node_modules/geolib/es/toDecimal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _isValidCoordinate = _interopRequireDefault(require_isValidCoordinate());
    var _getCoordinateKeys = _interopRequireDefault(require_getCoordinateKeys());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var toDecimal = function toDecimal2(value) {
      if ((0, _isDecimal.default)(value)) {
        return Number(value);
      }
      if ((0, _isSexagesimal.default)(value)) {
        return (0, _sexagesimalToDecimal.default)(value);
      }
      if ((0, _isValidCoordinate.default)(value)) {
        var keys = (0, _getCoordinateKeys.default)(value);
        if (Array.isArray(value)) {
          return value.map(function(v, index) {
            return [0, 1].includes(index) ? toDecimal2(v) : v;
          });
        }
        return _objectSpread(_objectSpread(_objectSpread({}, value), keys.latitude && _defineProperty({}, keys.latitude, toDecimal2(value[keys.latitude]))), keys.longitude && _defineProperty({}, keys.longitude, toDecimal2(value[keys.longitude])));
      }
      if (Array.isArray(value)) {
        return value.map(function(point) {
          return (0, _isValidCoordinate.default)(point) ? toDecimal2(point) : point;
        });
      }
      return value;
    };
    var _default = toDecimal;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getLatitude.js
var require_getLatitude = __commonJS({
  "node_modules/geolib/es/getLatitude.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getLatitude = function getLatitude2(point, raw) {
      var latKey = (0, _getCoordinateKey.default)(point, _constants.latitudeKeys);
      if (typeof latKey === "undefined" || latKey === null) {
        return;
      }
      var value = point[latKey];
      return raw === true ? value : (0, _toDecimal.default)(value);
    };
    var _default = getLatitude;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getLongitude.js
var require_getLongitude = __commonJS({
  "node_modules/geolib/es/getLongitude.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getLongitude = function getLongitude2(point, raw) {
      var latKey = (0, _getCoordinateKey.default)(point, _constants.longitudeKeys);
      if (typeof latKey === "undefined" || latKey === null) {
        return;
      }
      var value = point[latKey];
      return raw === true ? value : (0, _toDecimal.default)(value);
    };
    var _default = getLongitude;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/toRad.js
var require_toRad = __commonJS({
  "node_modules/geolib/es/toRad.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var toRad = function toRad2(value) {
      return value * Math.PI / 180;
    };
    var _default = toRad;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/toDeg.js
var require_toDeg = __commonJS({
  "node_modules/geolib/es/toDeg.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var toDeg = function toDeg2(value) {
      return value * 180 / Math.PI;
    };
    var _default = toDeg;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/computeDestinationPoint.js
var require_computeDestinationPoint = __commonJS({
  "node_modules/geolib/es/computeDestinationPoint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var computeDestinationPoint = function computeDestinationPoint2(start, distance, bearing) {
      var radius = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 6371e3;
      var lat = (0, _getLatitude.default)(start);
      var lng = (0, _getLongitude.default)(start);
      var delta = distance / radius;
      var theta = (0, _toRad.default)(bearing);
      var phi1 = (0, _toRad.default)(lat);
      var lambda1 = (0, _toRad.default)(lng);
      var phi2 = Math.asin(Math.sin(phi1) * Math.cos(delta) + Math.cos(phi1) * Math.sin(delta) * Math.cos(theta));
      var lambda2 = lambda1 + Math.atan2(Math.sin(theta) * Math.sin(delta) * Math.cos(phi1), Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2));
      var longitude = (0, _toDeg.default)(lambda2);
      if (longitude < _constants.MINLON || longitude > _constants.MAXLON) {
        lambda2 = (lambda2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        longitude = (0, _toDeg.default)(lambda2);
      }
      return { latitude: (0, _toDeg.default)(phi2), longitude };
    };
    var _default = computeDestinationPoint;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/convertArea.js
var require_convertArea = __commonJS({
  "node_modules/geolib/es/convertArea.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var convertArea = function convertArea2(squareMeters) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "m";
      var factor = _constants.areaConversion[targetUnit];
      if (factor) {
        return squareMeters * factor;
      }
      throw new Error("Invalid unit used for area conversion.");
    };
    var _default = convertArea;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/convertDistance.js
var require_convertDistance = __commonJS({
  "node_modules/geolib/es/convertDistance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var convertDistance = function convertDistance2(meters) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "m";
      var factor = _constants.distanceConversion[targetUnit];
      if (factor) {
        return meters * factor;
      }
      throw new Error("Invalid unit used for distance conversion.");
    };
    var _default = convertDistance;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/convertSpeed.js
var require_convertSpeed = __commonJS({
  "node_modules/geolib/es/convertSpeed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _constants = require_constants();
    var convertSpeed = function convertSpeed2(metersPerSecond) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "kmh";
      switch (targetUnit) {
        case "kmh":
          return metersPerSecond * _constants.timeConversion.h * _constants.distanceConversion.km;
        case "mph":
          return metersPerSecond * _constants.timeConversion.h * _constants.distanceConversion.mi;
        default:
          return metersPerSecond;
      }
    };
    var _default = convertSpeed;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/decimalToSexagesimal.js
var require_decimalToSexagesimal = __commonJS({
  "node_modules/geolib/es/decimalToSexagesimal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    var imprecise = function imprecise2(number) {
      var decimals = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
      var factor = Math.pow(10, decimals);
      return Math.round(number * factor) / factor;
    };
    var decimal2sexagesimalNext = function decimal2sexagesimalNext2(decimal) {
      var _decimal$toString$spl = decimal.toString().split("."), _decimal$toString$spl2 = _slicedToArray(_decimal$toString$spl, 2), pre = _decimal$toString$spl2[0], post = _decimal$toString$spl2[1];
      var deg = Math.abs(Number(pre));
      var min0 = Number("0." + (post || 0)) * 60;
      var sec0 = min0.toString().split(".");
      var min = Math.floor(min0);
      var sec = imprecise(Number("0." + (sec0[1] || 0)) * 60).toString();
      var _sec$split = sec.split("."), _sec$split2 = _slicedToArray(_sec$split, 2), secPreDec = _sec$split2[0], _sec$split2$ = _sec$split2[1], secDec = _sec$split2$ === void 0 ? "0" : _sec$split2$;
      return deg + "\xB0 " + min.toString().padStart(2, "0") + "' " + secPreDec.padStart(2, "0") + "." + secDec.padEnd(1, "0") + '"';
    };
    var _default = decimal2sexagesimalNext;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/robustAcos.js
var require_robustAcos = __commonJS({
  "node_modules/geolib/es/robustAcos.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var robustAcos = function robustAcos2(value) {
      if (value > 1) {
        return 1;
      }
      if (value < -1) {
        return -1;
      }
      return value;
    };
    var _default = robustAcos;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getDistance.js
var require_getDistance = __commonJS({
  "node_modules/geolib/es/getDistance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _robustAcos = _interopRequireDefault(require_robustAcos());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getDistance2 = function getDistance3(from, to) {
      var accuracy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
      var fromLat = (0, _getLatitude.default)(from);
      var fromLon = (0, _getLongitude.default)(from);
      var toLat = (0, _getLatitude.default)(to);
      var toLon = (0, _getLongitude.default)(to);
      var distance = Math.acos((0, _robustAcos.default)(Math.sin((0, _toRad.default)(toLat)) * Math.sin((0, _toRad.default)(fromLat)) + Math.cos((0, _toRad.default)(toLat)) * Math.cos((0, _toRad.default)(fromLat)) * Math.cos((0, _toRad.default)(fromLon) - (0, _toRad.default)(toLon)))) * _constants.earthRadius;
      return Math.round(distance / accuracy) * accuracy;
    };
    var _default = getDistance2;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/orderByDistance.js
var require_orderByDistance = __commonJS({
  "node_modules/geolib/es/orderByDistance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var orderByDistance = function orderByDistance2(point, coords) {
      var distanceFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getDistance.default;
      distanceFn = typeof distanceFn === "function" ? distanceFn : _getDistance.default;
      return coords.slice().sort(function(a, b) {
        return distanceFn(point, a) - distanceFn(point, b);
      });
    };
    var _default = orderByDistance;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/findNearest.js
var require_findNearest = __commonJS({
  "node_modules/geolib/es/findNearest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _orderByDistance = _interopRequireDefault(require_orderByDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var findNearest = function findNearest2(point, coords) {
      return (0, _orderByDistance.default)(point, coords)[0];
    };
    var _default = findNearest;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getAreaOfPolygon.js
var require_getAreaOfPolygon = __commonJS({
  "node_modules/geolib/es/getAreaOfPolygon.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _toRad = _interopRequireDefault(require_toRad());
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getAreaOfPolygon = function getAreaOfPolygon2(points) {
      var area = 0;
      if (points.length > 2) {
        var lowerIndex;
        var middleIndex;
        var upperIndex;
        for (var i = 0; i < points.length; i++) {
          if (i === points.length - 2) {
            lowerIndex = points.length - 2;
            middleIndex = points.length - 1;
            upperIndex = 0;
          } else if (i === points.length - 1) {
            lowerIndex = points.length - 1;
            middleIndex = 0;
            upperIndex = 1;
          } else {
            lowerIndex = i;
            middleIndex = i + 1;
            upperIndex = i + 2;
          }
          var p1lon = (0, _getLongitude.default)(points[lowerIndex]);
          var p2lat = (0, _getLatitude.default)(points[middleIndex]);
          var p3lon = (0, _getLongitude.default)(points[upperIndex]);
          area += ((0, _toRad.default)(p3lon) - (0, _toRad.default)(p1lon)) * Math.sin((0, _toRad.default)(p2lat));
        }
        area = area * _constants.earthRadius * _constants.earthRadius / 2;
      }
      return Math.abs(area);
    };
    var _default = getAreaOfPolygon;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getBounds.js
var require_getBounds = __commonJS({
  "node_modules/geolib/es/getBounds.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getBounds = function getBounds2(points) {
      if (Array.isArray(points) === false || points.length === 0) {
        throw new Error("No points were given.");
      }
      return points.reduce(function(stats, point) {
        var latitude = (0, _getLatitude.default)(point);
        var longitude = (0, _getLongitude.default)(point);
        return { maxLat: Math.max(latitude, stats.maxLat), minLat: Math.min(latitude, stats.minLat), maxLng: Math.max(longitude, stats.maxLng), minLng: Math.min(longitude, stats.minLng) };
      }, { maxLat: -Infinity, minLat: Infinity, maxLng: -Infinity, minLng: Infinity });
    };
    var _default = getBounds;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getBoundsOfDistance.js
var require_getBoundsOfDistance = __commonJS({
  "node_modules/geolib/es/getBoundsOfDistance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getBoundsOfDistance = function getBoundsOfDistance2(point, distance) {
      var latitude = (0, _getLatitude.default)(point);
      var longitude = (0, _getLongitude.default)(point);
      var radLat = (0, _toRad.default)(latitude);
      var radLon = (0, _toRad.default)(longitude);
      var radDist = distance / _constants.earthRadius;
      var minLat = radLat - radDist;
      var maxLat = radLat + radDist;
      var MAX_LAT_RAD = (0, _toRad.default)(_constants.MAXLAT);
      var MIN_LAT_RAD = (0, _toRad.default)(_constants.MINLAT);
      var MAX_LON_RAD = (0, _toRad.default)(_constants.MAXLON);
      var MIN_LON_RAD = (0, _toRad.default)(_constants.MINLON);
      var minLon;
      var maxLon;
      if (minLat > MIN_LAT_RAD && maxLat < MAX_LAT_RAD) {
        var deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
        minLon = radLon - deltaLon;
        if (minLon < MIN_LON_RAD) {
          minLon += Math.PI * 2;
        }
        maxLon = radLon + deltaLon;
        if (maxLon > MAX_LON_RAD) {
          maxLon -= Math.PI * 2;
        }
      } else {
        minLat = Math.max(minLat, MIN_LAT_RAD);
        maxLat = Math.min(maxLat, MAX_LAT_RAD);
        minLon = MIN_LON_RAD;
        maxLon = MAX_LON_RAD;
      }
      return [{ latitude: (0, _toDeg.default)(minLat), longitude: (0, _toDeg.default)(minLon) }, { latitude: (0, _toDeg.default)(maxLat), longitude: (0, _toDeg.default)(maxLon) }];
    };
    var _default = getBoundsOfDistance;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getCenter.js
var require_getCenter = __commonJS({
  "node_modules/geolib/es/getCenter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getCenter = function getCenter2(points) {
      if (Array.isArray(points) === false || points.length === 0) {
        return false;
      }
      var numberOfPoints = points.length;
      var sum = points.reduce(function(acc, point) {
        var pointLat = (0, _toRad.default)((0, _getLatitude.default)(point));
        var pointLon = (0, _toRad.default)((0, _getLongitude.default)(point));
        return { X: acc.X + Math.cos(pointLat) * Math.cos(pointLon), Y: acc.Y + Math.cos(pointLat) * Math.sin(pointLon), Z: acc.Z + Math.sin(pointLat) };
      }, { X: 0, Y: 0, Z: 0 });
      var X = sum.X / numberOfPoints;
      var Y = sum.Y / numberOfPoints;
      var Z = sum.Z / numberOfPoints;
      return { longitude: (0, _toDeg.default)(Math.atan2(Y, X)), latitude: (0, _toDeg.default)(Math.atan2(Z, Math.sqrt(X * X + Y * Y))) };
    };
    var _default = getCenter;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getCenterOfBounds.js
var require_getCenterOfBounds = __commonJS({
  "node_modules/geolib/es/getCenterOfBounds.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getBounds = _interopRequireDefault(require_getBounds());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getCenterOfBounds = function getCenterOfBounds2(coords) {
      var bounds = (0, _getBounds.default)(coords);
      var latitude = bounds.minLat + (bounds.maxLat - bounds.minLat) / 2;
      var longitude = bounds.minLng + (bounds.maxLng - bounds.minLng) / 2;
      return { latitude: parseFloat(latitude.toFixed(6)), longitude: parseFloat(longitude.toFixed(6)) };
    };
    var _default = getCenterOfBounds;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getRhumbLineBearing.js
var require_getRhumbLineBearing = __commonJS({
  "node_modules/geolib/es/getRhumbLineBearing.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getRhumbLineBearing = function getRhumbLineBearing2(origin, dest) {
      var diffLon = (0, _toRad.default)((0, _getLongitude.default)(dest)) - (0, _toRad.default)((0, _getLongitude.default)(origin));
      var diffPhi = Math.log(Math.tan((0, _toRad.default)((0, _getLatitude.default)(dest)) / 2 + Math.PI / 4) / Math.tan((0, _toRad.default)((0, _getLatitude.default)(origin)) / 2 + Math.PI / 4));
      if (Math.abs(diffLon) > Math.PI) {
        if (diffLon > 0) {
          diffLon = (Math.PI * 2 - diffLon) * -1;
        } else {
          diffLon = Math.PI * 2 + diffLon;
        }
      }
      return ((0, _toDeg.default)(Math.atan2(diffLon, diffPhi)) + 360) % 360;
    };
    var _default = getRhumbLineBearing;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getCompassDirection.js
var require_getCompassDirection = __commonJS({
  "node_modules/geolib/es/getCompassDirection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getRhumbLineBearing = _interopRequireDefault(require_getRhumbLineBearing());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getCompassDirection = function getCompassDirection2(origin, dest) {
      var bearingFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getRhumbLineBearing.default;
      var bearing = typeof bearingFn === "function" ? bearingFn(origin, dest) : (0, _getRhumbLineBearing.default)(origin, dest);
      if (isNaN(bearing)) {
        throw new Error("Could not calculate bearing for given points. Check your bearing function");
      }
      switch (Math.round(bearing / 22.5)) {
        case 1:
          return "NNE";
        case 2:
          return "NE";
        case 3:
          return "ENE";
        case 4:
          return "E";
        case 5:
          return "ESE";
        case 6:
          return "SE";
        case 7:
          return "SSE";
        case 8:
          return "S";
        case 9:
          return "SSW";
        case 10:
          return "SW";
        case 11:
          return "WSW";
        case 12:
          return "W";
        case 13:
          return "WNW";
        case 14:
          return "NW";
        case 15:
          return "NNW";
        default:
          return "N";
      }
    };
    var _default = getCompassDirection;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getDistanceFromLine.js
var require_getDistanceFromLine = __commonJS({
  "node_modules/geolib/es/getDistanceFromLine.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    var _robustAcos = _interopRequireDefault(require_robustAcos());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getDistanceFromLine = function getDistanceFromLine2(point, lineStart, lineEnd) {
      var accuracy = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
      var d1 = (0, _getDistance.default)(lineStart, point, accuracy);
      var d2 = (0, _getDistance.default)(point, lineEnd, accuracy);
      var d3 = (0, _getDistance.default)(lineStart, lineEnd, accuracy);
      var alpha = Math.acos((0, _robustAcos.default)((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3)));
      var beta = Math.acos((0, _robustAcos.default)((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3)));
      if (alpha > Math.PI / 2) {
        return d1;
      }
      if (beta > Math.PI / 2) {
        return d2;
      }
      return Math.sin(alpha) * d1;
    };
    var _default = getDistanceFromLine;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getGreatCircleBearing.js
var require_getGreatCircleBearing = __commonJS({
  "node_modules/geolib/es/getGreatCircleBearing.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getGreatCircleBearing = function getGreatCircleBearing2(origin, dest) {
      var destLat = (0, _getLatitude.default)(dest);
      var detLon = (0, _getLongitude.default)(dest);
      var originLat = (0, _getLatitude.default)(origin);
      var originLon = (0, _getLongitude.default)(origin);
      var bearing = ((0, _toDeg.default)(Math.atan2(Math.sin((0, _toRad.default)(detLon) - (0, _toRad.default)(originLon)) * Math.cos((0, _toRad.default)(destLat)), Math.cos((0, _toRad.default)(originLat)) * Math.sin((0, _toRad.default)(destLat)) - Math.sin((0, _toRad.default)(originLat)) * Math.cos((0, _toRad.default)(destLat)) * Math.cos((0, _toRad.default)(detLon) - (0, _toRad.default)(originLon)))) + 360) % 360;
      return bearing;
    };
    var _default = getGreatCircleBearing;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getPathLength.js
var require_getPathLength = __commonJS({
  "node_modules/geolib/es/getPathLength.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    var getPathLength = function getPathLength2(points) {
      var distanceFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _getDistance.default;
      return points.reduce(function(acc, point) {
        if (_typeof(acc) === "object" && acc.last !== null) {
          acc.distance += distanceFn(point, acc.last);
        }
        acc.last = point;
        return acc;
      }, { last: null, distance: 0 }).distance;
    };
    var _default = getPathLength;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getPreciseDistance.js
var require_getPreciseDistance = __commonJS({
  "node_modules/geolib/es/getPreciseDistance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getDistance2 = function getDistance3(start, end) {
      var accuracy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
      var startLat = (0, _getLatitude.default)(start);
      var startLon = (0, _getLongitude.default)(start);
      var endLat = (0, _getLatitude.default)(end);
      var endLon = (0, _getLongitude.default)(end);
      var b = 6356752314245e-6;
      var ellipsoidParams = 1 / 298.257223563;
      var L = (0, _toRad.default)(endLon - startLon);
      var cosSigma;
      var sigma;
      var sinAlpha;
      var cosSqAlpha;
      var cos2SigmaM;
      var sinSigma;
      var U1 = Math.atan((1 - ellipsoidParams) * Math.tan((0, _toRad.default)(parseFloat(startLat))));
      var U2 = Math.atan((1 - ellipsoidParams) * Math.tan((0, _toRad.default)(parseFloat(endLat))));
      var sinU1 = Math.sin(U1);
      var cosU1 = Math.cos(U1);
      var sinU2 = Math.sin(U2);
      var cosU2 = Math.cos(U2);
      var lambda = L;
      var lambdaP;
      var iterLimit = 100;
      do {
        var sinLambda = Math.sin(lambda);
        var cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma === 0) {
          return 0;
        }
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) {
          cos2SigmaM = 0;
        }
        var C = ellipsoidParams / 16 * cosSqAlpha * (4 + ellipsoidParams * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * ellipsoidParams * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
      } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
      if (iterLimit === 0) {
        return NaN;
      }
      var uSq = cosSqAlpha * (_constants.earthRadius * _constants.earthRadius - b * b) / (b * b);
      var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
      var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
      var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
      var distance = b * A * (sigma - deltaSigma);
      return Math.round(distance / accuracy) * accuracy;
    };
    var _default = getDistance2;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getRoughCompassDirection.js
var require_getRoughCompassDirection = __commonJS({
  "node_modules/geolib/es/getRoughCompassDirection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var getRoughCompassDirection = function getRoughCompassDirection2(exact) {
      if (/^(NNE|NE|NNW|N)$/.test(exact)) {
        return "N";
      }
      if (/^(ENE|E|ESE|SE)$/.test(exact)) {
        return "E";
      }
      if (/^(SSE|S|SSW|SW)$/.test(exact)) {
        return "S";
      }
      if (/^(WSW|W|WNW|NW)$/.test(exact)) {
        return "W";
      }
    };
    var _default = getRoughCompassDirection;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/getSpeed.js
var require_getSpeed = __commonJS({
  "node_modules/geolib/es/getSpeed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var getSpeed = function getSpeed2(start, end) {
      var distanceFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getDistance.default;
      var distance = distanceFn(start, end);
      var time = Number(end.time) - Number(start.time);
      var metersPerSecond = distance / time * 1e3;
      return metersPerSecond;
    };
    var _default = getSpeed;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isPointInLine.js
var require_isPointInLine = __commonJS({
  "node_modules/geolib/es/isPointInLine.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isPointInLine = function isPointInLine2(point, lineStart, lineEnd) {
      return (0, _getDistance.default)(lineStart, point) + (0, _getDistance.default)(point, lineEnd) === (0, _getDistance.default)(lineStart, lineEnd);
    };
    var _default = isPointInLine;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isPointInPolygon.js
var require_isPointInPolygon = __commonJS({
  "node_modules/geolib/es/isPointInPolygon.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isPointInPolygon = function isPointInPolygon2(point, polygon) {
      var isInside = false;
      var totalPolys = polygon.length;
      for (var i = -1, j = totalPolys - 1; ++i < totalPolys; j = i) {
        if (((0, _getLongitude.default)(polygon[i]) <= (0, _getLongitude.default)(point) && (0, _getLongitude.default)(point) < (0, _getLongitude.default)(polygon[j]) || (0, _getLongitude.default)(polygon[j]) <= (0, _getLongitude.default)(point) && (0, _getLongitude.default)(point) < (0, _getLongitude.default)(polygon[i])) && (0, _getLatitude.default)(point) < ((0, _getLatitude.default)(polygon[j]) - (0, _getLatitude.default)(polygon[i])) * ((0, _getLongitude.default)(point) - (0, _getLongitude.default)(polygon[i])) / ((0, _getLongitude.default)(polygon[j]) - (0, _getLongitude.default)(polygon[i])) + (0, _getLatitude.default)(polygon[i])) {
          isInside = !isInside;
        }
      }
      return isInside;
    };
    var _default = isPointInPolygon;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isPointNearLine.js
var require_isPointNearLine = __commonJS({
  "node_modules/geolib/es/isPointNearLine.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistanceFromLine = _interopRequireDefault(require_getDistanceFromLine());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isPointNearLine = function isPointNearLine2(point, start, end, distance) {
      return (0, _getDistanceFromLine.default)(point, start, end) < distance;
    };
    var _default = isPointNearLine;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/isPointWithinRadius.js
var require_isPointWithinRadius = __commonJS({
  "node_modules/geolib/es/isPointWithinRadius.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isPointWithinRadius = function isPointWithinRadius2(point, center, radius) {
      var accuracy = 0.01;
      return (0, _getDistance.default)(point, center, accuracy) < radius;
    };
    var _default = isPointWithinRadius;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/wktToPolygon.js
var require_wktToPolygon = __commonJS({
  "node_modules/geolib/es/wktToPolygon.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    var wktToPolygon = function wktToPolygon2(wkt) {
      if (!wkt.startsWith("POLYGON")) {
        throw new Error("Invalid wkt.");
      }
      var coordsText = wkt.slice(wkt.indexOf("(") + 2, wkt.indexOf(")")).split(", ");
      var polygon = coordsText.map(function(coordText) {
        var _coordText$split = coordText.split(" "), _coordText$split2 = _slicedToArray(_coordText$split, 2), longitude = _coordText$split2[0], latitude = _coordText$split2[1];
        return { longitude: parseFloat(longitude), latitude: parseFloat(latitude) };
      });
      return polygon;
    };
    var _default = wktToPolygon;
    exports2.default = _default;
  }
});

// node_modules/geolib/es/index.js
var require_es = __commonJS({
  "node_modules/geolib/es/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _exportNames = { computeDestinationPoint: true, convertArea: true, convertDistance: true, convertSpeed: true, decimalToSexagesimal: true, findNearest: true, getAreaOfPolygon: true, getBounds: true, getBoundsOfDistance: true, getCenter: true, getCenterOfBounds: true, getCompassDirection: true, getCoordinateKey: true, getCoordinateKeys: true, getDistance: true, getDistanceFromLine: true, getGreatCircleBearing: true, getLatitude: true, getLongitude: true, getPathLength: true, getPreciseDistance: true, getRhumbLineBearing: true, getRoughCompassDirection: true, getSpeed: true, isDecimal: true, isPointInLine: true, isPointInPolygon: true, isPointNearLine: true, isPointWithinRadius: true, isSexagesimal: true, isValidCoordinate: true, isValidLatitude: true, isValidLongitude: true, orderByDistance: true, sexagesimalToDecimal: true, toDecimal: true, toRad: true, toDeg: true, wktToPolygon: true };
    Object.defineProperty(exports2, "computeDestinationPoint", { enumerable: true, get: function get() {
      return _computeDestinationPoint.default;
    } });
    Object.defineProperty(exports2, "convertArea", { enumerable: true, get: function get() {
      return _convertArea.default;
    } });
    Object.defineProperty(exports2, "convertDistance", { enumerable: true, get: function get() {
      return _convertDistance.default;
    } });
    Object.defineProperty(exports2, "convertSpeed", { enumerable: true, get: function get() {
      return _convertSpeed.default;
    } });
    Object.defineProperty(exports2, "decimalToSexagesimal", { enumerable: true, get: function get() {
      return _decimalToSexagesimal.default;
    } });
    Object.defineProperty(exports2, "findNearest", { enumerable: true, get: function get() {
      return _findNearest.default;
    } });
    Object.defineProperty(exports2, "getAreaOfPolygon", { enumerable: true, get: function get() {
      return _getAreaOfPolygon.default;
    } });
    Object.defineProperty(exports2, "getBounds", { enumerable: true, get: function get() {
      return _getBounds.default;
    } });
    Object.defineProperty(exports2, "getBoundsOfDistance", { enumerable: true, get: function get() {
      return _getBoundsOfDistance.default;
    } });
    Object.defineProperty(exports2, "getCenter", { enumerable: true, get: function get() {
      return _getCenter.default;
    } });
    Object.defineProperty(exports2, "getCenterOfBounds", { enumerable: true, get: function get() {
      return _getCenterOfBounds.default;
    } });
    Object.defineProperty(exports2, "getCompassDirection", { enumerable: true, get: function get() {
      return _getCompassDirection.default;
    } });
    Object.defineProperty(exports2, "getCoordinateKey", { enumerable: true, get: function get() {
      return _getCoordinateKey.default;
    } });
    Object.defineProperty(exports2, "getCoordinateKeys", { enumerable: true, get: function get() {
      return _getCoordinateKeys.default;
    } });
    Object.defineProperty(exports2, "getDistance", { enumerable: true, get: function get() {
      return _getDistance.default;
    } });
    Object.defineProperty(exports2, "getDistanceFromLine", { enumerable: true, get: function get() {
      return _getDistanceFromLine.default;
    } });
    Object.defineProperty(exports2, "getGreatCircleBearing", { enumerable: true, get: function get() {
      return _getGreatCircleBearing.default;
    } });
    Object.defineProperty(exports2, "getLatitude", { enumerable: true, get: function get() {
      return _getLatitude.default;
    } });
    Object.defineProperty(exports2, "getLongitude", { enumerable: true, get: function get() {
      return _getLongitude.default;
    } });
    Object.defineProperty(exports2, "getPathLength", { enumerable: true, get: function get() {
      return _getPathLength.default;
    } });
    Object.defineProperty(exports2, "getPreciseDistance", { enumerable: true, get: function get() {
      return _getPreciseDistance.default;
    } });
    Object.defineProperty(exports2, "getRhumbLineBearing", { enumerable: true, get: function get() {
      return _getRhumbLineBearing.default;
    } });
    Object.defineProperty(exports2, "getRoughCompassDirection", { enumerable: true, get: function get() {
      return _getRoughCompassDirection.default;
    } });
    Object.defineProperty(exports2, "getSpeed", { enumerable: true, get: function get() {
      return _getSpeed.default;
    } });
    Object.defineProperty(exports2, "isDecimal", { enumerable: true, get: function get() {
      return _isDecimal.default;
    } });
    Object.defineProperty(exports2, "isPointInLine", { enumerable: true, get: function get() {
      return _isPointInLine.default;
    } });
    Object.defineProperty(exports2, "isPointInPolygon", { enumerable: true, get: function get() {
      return _isPointInPolygon.default;
    } });
    Object.defineProperty(exports2, "isPointNearLine", { enumerable: true, get: function get() {
      return _isPointNearLine.default;
    } });
    Object.defineProperty(exports2, "isPointWithinRadius", { enumerable: true, get: function get() {
      return _isPointWithinRadius.default;
    } });
    Object.defineProperty(exports2, "isSexagesimal", { enumerable: true, get: function get() {
      return _isSexagesimal.default;
    } });
    Object.defineProperty(exports2, "isValidCoordinate", { enumerable: true, get: function get() {
      return _isValidCoordinate.default;
    } });
    Object.defineProperty(exports2, "isValidLatitude", { enumerable: true, get: function get() {
      return _isValidLatitude.default;
    } });
    Object.defineProperty(exports2, "isValidLongitude", { enumerable: true, get: function get() {
      return _isValidLongitude.default;
    } });
    Object.defineProperty(exports2, "orderByDistance", { enumerable: true, get: function get() {
      return _orderByDistance.default;
    } });
    Object.defineProperty(exports2, "sexagesimalToDecimal", { enumerable: true, get: function get() {
      return _sexagesimalToDecimal.default;
    } });
    Object.defineProperty(exports2, "toDecimal", { enumerable: true, get: function get() {
      return _toDecimal.default;
    } });
    Object.defineProperty(exports2, "toRad", { enumerable: true, get: function get() {
      return _toRad.default;
    } });
    Object.defineProperty(exports2, "toDeg", { enumerable: true, get: function get() {
      return _toDeg.default;
    } });
    Object.defineProperty(exports2, "wktToPolygon", { enumerable: true, get: function get() {
      return _wktToPolygon.default;
    } });
    var _computeDestinationPoint = _interopRequireDefault(require_computeDestinationPoint());
    var _convertArea = _interopRequireDefault(require_convertArea());
    var _convertDistance = _interopRequireDefault(require_convertDistance());
    var _convertSpeed = _interopRequireDefault(require_convertSpeed());
    var _decimalToSexagesimal = _interopRequireDefault(require_decimalToSexagesimal());
    var _findNearest = _interopRequireDefault(require_findNearest());
    var _getAreaOfPolygon = _interopRequireDefault(require_getAreaOfPolygon());
    var _getBounds = _interopRequireDefault(require_getBounds());
    var _getBoundsOfDistance = _interopRequireDefault(require_getBoundsOfDistance());
    var _getCenter = _interopRequireDefault(require_getCenter());
    var _getCenterOfBounds = _interopRequireDefault(require_getCenterOfBounds());
    var _getCompassDirection = _interopRequireDefault(require_getCompassDirection());
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _getCoordinateKeys = _interopRequireDefault(require_getCoordinateKeys());
    var _getDistance = _interopRequireDefault(require_getDistance());
    var _getDistanceFromLine = _interopRequireDefault(require_getDistanceFromLine());
    var _getGreatCircleBearing = _interopRequireDefault(require_getGreatCircleBearing());
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _getPathLength = _interopRequireDefault(require_getPathLength());
    var _getPreciseDistance = _interopRequireDefault(require_getPreciseDistance());
    var _getRhumbLineBearing = _interopRequireDefault(require_getRhumbLineBearing());
    var _getRoughCompassDirection = _interopRequireDefault(require_getRoughCompassDirection());
    var _getSpeed = _interopRequireDefault(require_getSpeed());
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isPointInLine = _interopRequireDefault(require_isPointInLine());
    var _isPointInPolygon = _interopRequireDefault(require_isPointInPolygon());
    var _isPointNearLine = _interopRequireDefault(require_isPointNearLine());
    var _isPointWithinRadius = _interopRequireDefault(require_isPointWithinRadius());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _isValidCoordinate = _interopRequireDefault(require_isValidCoordinate());
    var _isValidLatitude = _interopRequireDefault(require_isValidLatitude());
    var _isValidLongitude = _interopRequireDefault(require_isValidLongitude());
    var _orderByDistance = _interopRequireDefault(require_orderByDistance());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _wktToPolygon = _interopRequireDefault(require_wktToPolygon());
    var _constants = require_constants();
    Object.keys(_constants).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      Object.defineProperty(exports2, key, { enumerable: true, get: function get() {
        return _constants[key];
      } });
    });
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// src/index.js
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/core/index.js
var import_geolib = __toESM(require_es(), 1);
var WEIGHTS = {
  age: 0.1,
  distance: 0.1,
  acceptedOffers: 0.3,
  canceledOffers: 0.3,
  averageReplyTime: 0.2
};
var AGE_MAX = 100;
var DISTANCE_MAX_METERS = 45e5;
var ACCEPTED_OFFERS_MAX = 100;
var CANCELED_OFFERS_MAX = 100;
var REPLY_TIME_MAX = 3600;
function addRandomness(score, patient) {
  let missing = 0;
  if (patient.acceptedOffers == null) missing++;
  if (patient.canceledOffers == null) missing++;
  if (patient.averageReplyTime == null) missing++;
  if (missing > 0) {
    const noise = Math.random() * (0.5 * missing / 3);
    const result = Math.max(0, Math.min(1, score + noise));
    return result;
  }
  return score;
}
function normalize(value, min, max) {
  if (value == null) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
function computeScore(patient, targetLocation) {
  if (!targetLocation || targetLocation.latitude == null || targetLocation.longitude == null) {
    throw new Error("Invalid target location");
  }
  const ageNorm = normalize(patient.age, 0, AGE_MAX);
  const patientLocation = {
    latitude: Number(patient.location.latitude),
    longitude: Number(patient.location.longitude)
  };
  const targetLoc = {
    latitude: Number(targetLocation.latitude),
    longitude: Number(targetLocation.longitude)
  };
  const distance = (0, import_geolib.getDistance)(patientLocation, targetLoc);
  const distanceNorm = 1 - normalize(distance, 0, DISTANCE_MAX_METERS);
  const acceptedNorm = patient.acceptedOffers != null ? normalize(patient.acceptedOffers, 0, ACCEPTED_OFFERS_MAX) : null;
  const canceledNorm = patient.canceledOffers != null ? 1 - normalize(patient.canceledOffers, 0, CANCELED_OFFERS_MAX) : null;
  const replyTimeNorm = patient.averageReplyTime != null ? 1 - normalize(patient.averageReplyTime, 0, REPLY_TIME_MAX) : null;
  let score = ageNorm * WEIGHTS.age + distanceNorm * WEIGHTS.distance + (acceptedNorm ?? 0.2) * WEIGHTS.acceptedOffers + (canceledNorm ?? 0.2) * WEIGHTS.canceledOffers + (replyTimeNorm ?? 0.2) * WEIGHTS.averageReplyTime;
  score = addRandomness(score, patient);
  return Math.max(1, Math.min(10, Number((score * 9 + 1).toFixed(2))));
}

// src/index.js
var index_default = computeScore;
