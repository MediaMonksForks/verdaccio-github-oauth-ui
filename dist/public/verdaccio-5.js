(function () {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? {
    d: a.default
  } : {
    d: a
  };
}

// ASSET: verdaccio-5.ts
var $luKd$exports = {};

//
// After a successful login we are redirected to the UI with our username
// and a JWT token. We need to save these in local storage so Verdaccio
// thinks we are logged in.
//
function $Tj7a$export$saveCredentials(credentials) {
  localStorage.setItem("username", credentials.username);
  localStorage.setItem("token", credentials.uiToken);
  localStorage.setItem("npm", credentials.npmToken);
}

function $Tj7a$export$clearCredentials() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("npm");
}

function $Tj7a$export$isLoggedIn() {
  return true && !!localStorage.getItem("username") && !!localStorage.getItem("token") && !!localStorage.getItem("npm");
}

function $Tj7a$export$validateCredentials(credentials) {
  return true && credentials.username && credentials.uiToken && credentials.npmToken;
}

var $C9JJ$export$loginHref = "/-/oauth/authorize";
var $C9JJ$export$logoutHref = "/";
// ASSET: ../../node_modules/strict-uri-encode/index.js
var $Gjwo$exports = {};

$Gjwo$exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

// ASSET: ../../node_modules/decode-uri-component/index.js
var $s8qw$exports = {};
var $s8qw$var$token = '%[a-f0-9]{2}';
var $s8qw$var$singleMatcher = new RegExp($s8qw$var$token, 'gi');
var $s8qw$var$multiMatcher = new RegExp('(' + $s8qw$var$token + ')+', 'gi');

function $s8qw$var$decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], $s8qw$var$decodeComponents(left), $s8qw$var$decodeComponents(right));
}

function $s8qw$var$decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match($s8qw$var$singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = $s8qw$var$decodeComponents(tokens, i).join('');
      tokens = input.match($s8qw$var$singleMatcher);
    }

    return input;
  }
}

function $s8qw$var$customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = $s8qw$var$multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = $s8qw$var$decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = $s8qw$var$multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

$s8qw$exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return $s8qw$var$customDecodeURIComponent(encodedURI);
  }
};

// ASSET: ../../node_modules/split-on-first/index.js
var $EYyA$exports = {};

$EYyA$exports = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

// ASSET: ../../node_modules/filter-obj/index.js
var $NFs2$exports = {};

$NFs2$exports = function (obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};

// ASSET: ../../node_modules/query-string/index.js
var $P2vx$exports = {};

const $P2vx$var$isNullOrUndefined = value => value === null || value === undefined;

const $P2vx$var$encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function $P2vx$var$encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return key => (result, value) => {
        const index = result.length;

        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [$P2vx$var$encode(key, options), '[', index, ']'].join('')];
        }

        return [...result, [$P2vx$var$encode(key, options), '[', $P2vx$var$encode(index, options), ']=', $P2vx$var$encode(value, options)].join('')];
      };

    case 'bracket':
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [$P2vx$var$encode(key, options), '[]'].join('')];
        }

        return [...result, [$P2vx$var$encode(key, options), '[]=', $P2vx$var$encode(value, options)].join('')];
      };

    case 'comma':
    case 'separator':
    case 'bracket-separator':
      {
        const keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          } // Translate null to an empty string so that it doesn't serialize as 'null'


          value = value === null ? '' : value;

          if (result.length === 0) {
            return [[$P2vx$var$encode(key, options), keyValueSep, $P2vx$var$encode(value, options)].join('')];
          }

          return [[result, $P2vx$var$encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }

    default:
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, $P2vx$var$encode(key, options)];
        }

        return [...result, [$P2vx$var$encode(key, options), '=', $P2vx$var$encode(value, options)].join('')];
      };
  }
}

function $P2vx$var$parserForArrayFormat(options) {
  let result;

  switch (options.arrayFormat) {
    case 'index':
      return (key, value, accumulator) => {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return (key, value, accumulator) => {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
    case 'separator':
      return (key, value, accumulator) => {
        const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
        const isEncodedArray = typeof value === 'string' && !isArray && $P2vx$var$decode(value, options).includes(options.arrayFormatSeparator);
        value = isEncodedArray ? $P2vx$var$decode(value, options) : value;
        const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => $P2vx$var$decode(item, options)) : value === null ? value : $P2vx$var$decode(value, options);
        accumulator[key] = newValue;
      };

    case 'bracket-separator':
      return (key, value, accumulator) => {
        const isArray = /(\[\])$/.test(key);
        key = key.replace(/\[\]$/, '');

        if (!isArray) {
          accumulator[key] = value ? $P2vx$var$decode(value, options) : value;
          return;
        }

        const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(item => $P2vx$var$decode(item, options));

        if (accumulator[key] === undefined) {
          accumulator[key] = arrayValue;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], arrayValue);
      };

    default:
      return (key, value, accumulator) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function $P2vx$var$validateArrayFormatSeparator(value) {
  if (typeof value !== 'string' || value.length !== 1) {
    throw new TypeError('arrayFormatSeparator must be single character string');
  }
}

function $P2vx$var$encode(value, options) {
  if (options.encode) {
    return options.strict ? $Gjwo$exports(value) : encodeURIComponent(value);
  }

  return value;
}

function $P2vx$var$decode(value, options) {
  if (options.decode) {
    return $s8qw$exports(value);
  }

  return value;
}

function $P2vx$var$keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (typeof input === 'object') {
    return $P2vx$var$keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
  }

  return input;
}

function $P2vx$var$removeHash(input) {
  const hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function $P2vx$var$getHash(url) {
  let hash = '';
  const hashStart = url.indexOf('#');

  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }

  return hash;
}

function $P2vx$var$extract(input) {
  input = $P2vx$var$removeHash(input);
  const queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function $P2vx$var$parseValue(value, options) {
  if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
    value = Number(value);
  } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    value = value.toLowerCase() === 'true';
  }

  return value;
}

function $P2vx$var$parse(query, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    parseNumbers: false,
    parseBooleans: false
  }, options);
  $P2vx$var$validateArrayFormatSeparator(options.arrayFormatSeparator);
  const formatter = $P2vx$var$parserForArrayFormat(options); // Create an object with no prototype

  const ret = Object.create(null);

  if (typeof query !== 'string') {
    return ret;
  }

  query = query.trim().replace(/^[?#&]/, '');

  if (!query) {
    return ret;
  }

  for (const param of query.split('&')) {
    if (param === '') {
      continue;
    }

    let [key, value] = $EYyA$exports(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : $P2vx$var$decode(value, options);
    formatter($P2vx$var$decode(key, options), value, ret);
  }

  for (const key of Object.keys(ret)) {
    const value = ret[key];

    if (typeof value === 'object' && value !== null) {
      for (const k of Object.keys(value)) {
        value[k] = $P2vx$var$parseValue(value[k], options);
      }
    } else {
      ret[key] = $P2vx$var$parseValue(value, options);
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    const value = ret[key];

    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = $P2vx$var$keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

var $P2vx$export$extract = $P2vx$var$extract;
$P2vx$exports.extract = $P2vx$export$extract;
var $P2vx$export$parse = $P2vx$var$parse;
$P2vx$exports.parse = $P2vx$export$parse;

var $P2vx$export$stringify = (object, options) => {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ','
  }, options);
  $P2vx$var$validateArrayFormatSeparator(options.arrayFormatSeparator);

  const shouldFilter = key => options.skipNull && $P2vx$var$isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

  const formatter = $P2vx$var$encoderForArrayFormat(options);
  const objectCopy = {};

  for (const key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  const keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(key => {
    const value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return $P2vx$var$encode(key, options);
    }

    if (Array.isArray(value)) {
      if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
        return $P2vx$var$encode(key, options) + '[]';
      }

      return value.reduce(formatter(key), []).join('&');
    }

    return $P2vx$var$encode(key, options) + '=' + $P2vx$var$encode(value, options);
  }).filter(x => x.length > 0).join('&');
};

$P2vx$exports.stringify = $P2vx$export$stringify;

var $P2vx$export$parseUrl = (url, options) => {
  options = Object.assign({
    decode: true
  }, options);
  const [url_, hash] = $EYyA$exports(url, '#');
  return Object.assign({
    url: url_.split('?')[0] || '',
    query: $P2vx$var$parse($P2vx$var$extract(url), options)
  }, options && options.parseFragmentIdentifier && hash ? {
    fragmentIdentifier: $P2vx$var$decode(hash, options)
  } : {});
};

$P2vx$exports.parseUrl = $P2vx$export$parseUrl;

var $P2vx$export$stringifyUrl = (object, options) => {
  options = Object.assign({
    encode: true,
    strict: true,
    [$P2vx$var$encodeFragmentIdentifier]: true
  }, options);
  const url = $P2vx$var$removeHash(object.url).split('?')[0] || '';
  const queryFromUrl = $P2vx$export$extract(object.url);
  const parsedQueryFromUrl = $P2vx$export$parse(queryFromUrl, {
    sort: false
  });
  const query = Object.assign(parsedQueryFromUrl, object.query);
  let queryString = $P2vx$export$stringify(query, options);

  if (queryString) {
    queryString = `?${queryString}`;
  }

  let hash = $P2vx$var$getHash(object.url);

  if (object.fragmentIdentifier) {
    hash = `#${options[$P2vx$var$encodeFragmentIdentifier] ? $P2vx$var$encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
  }

  return `${url}${queryString}${hash}`;
};

$P2vx$exports.stringifyUrl = $P2vx$export$stringifyUrl;

var $P2vx$export$pick = (input, filter, options) => {
  options = Object.assign({
    parseFragmentIdentifier: true,
    [$P2vx$var$encodeFragmentIdentifier]: false
  }, options);
  const {
    url,
    query,
    fragmentIdentifier
  } = $P2vx$export$parseUrl(input, options);
  return $P2vx$export$stringifyUrl({
    url,
    query: $NFs2$exports(query, filter),
    fragmentIdentifier
  }, options);
};

$P2vx$exports.pick = $P2vx$export$pick;

var $P2vx$export$exclude = (input, filter, options) => {
  const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);
  return $P2vx$export$pick(input, exclusionFilter, options);
};

$P2vx$exports.exclude = $P2vx$export$exclude;

/**
 * Returns `?a=b&c` as `{ a: b, c: true }`.
 */
function $eTfY$export$parseQueryParams() {
  var $P2vx$$interop$default = $parcel$interopDefault($P2vx$exports);
  return $P2vx$$interop$default.d.parse(window.location.search || "?");
}

function $eTfY$export$retry(action) {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      return action();
    }, 100 * i);
  }
}

function $eTfY$var$pathContainsElement(selector, e) {
  var path = e.path || e.composedPath && e.composedPath();
  var element = document.querySelector(selector);
  return path.includes(element);
}

function $eTfY$export$interruptClick(selector, callback) {
  var handleClick = function (e) {
    if ($eTfY$var$pathContainsElement(selector, e)) {
      e.preventDefault();
      e.stopPropagation();
      callback();
    }
  };

  var capture = true;
  document.addEventListener("click", handleClick, capture);
}

/**
 * Change the current URL to only the current pathname and reload.
 * We don't use `location.href` because we want the query params
 * to be excluded from the history.
 */
function $wPEU$var$reloadToPathname() {
  history.replaceState(null, "", location.pathname);
  location.reload();
}

function $wPEU$var$saveAndRemoveQueryParams() {
  if ($Tj7a$export$isLoggedIn()) {
    return;
  }

  var credentials = $eTfY$export$parseQueryParams();

  if (!$Tj7a$export$validateCredentials(credentials)) {
    return;
  }

  $Tj7a$export$saveCredentials(credentials);
  $wPEU$var$reloadToPathname();
} //
// By default the login button opens a form that asks the user to submit credentials.
// We replace this behaviour and instead redirect to the route that handles OAuth.
//


function $wPEU$export$init(options) {
  $wPEU$var$saveAndRemoveQueryParams();
  var loginButton = options.loginButton,
      logoutButton = options.logoutButton,
      updateUsageInfo = options.updateUsageInfo;
  $eTfY$export$interruptClick(loginButton, function () {
    location.href = $C9JJ$export$loginHref;
  });
  $eTfY$export$interruptClick(logoutButton, function () {
    $Tj7a$export$clearCredentials();
    location.href = $C9JJ$export$logoutHref;
  });
  document.addEventListener("click", function () {
    return $eTfY$export$retry(updateUsageInfo);
  });
  $eTfY$export$retry(updateUsageInfo);
}

// to be configured.
//
function $kHlU$export$getUsageInfo() {
  var username = localStorage.getItem("username");

  if (!username) {
    return "Click the login button to authenticate.";
  }

  var configBase = window.VERDACCIO_API_URL ? window.VERDACCIO_API_URL.replace(/^https?:/, "").replace(/-\/verdaccio\/$/, "") : "//".concat(location.host).concat(location.pathname);
  var authToken = localStorage.getItem("npm");
  return ["npm config set ".concat(configBase, ":_authToken \"").concat(authToken, "\""), "npm config set ".concat(configBase, ":always-auth true")].join("\n");
}

var $luKd$var$__awaiter = $luKd$exports && $luKd$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $luKd$var$__generator = $luKd$exports && $luKd$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var $luKd$var$helpCardUsageInfoSelector = "#help-card .MuiCardContent-root span";
var $luKd$var$dialogUsageInfoSelector = "#registryInfo--dialog-container .MuiDialogContent-root .MuiTypography-root span";
var $luKd$var$randomClass = "Os1waV6BSoZQKfFwNlIwS";

function $luKd$var$copyToClipboard(text) {
  return $luKd$var$__awaiter(this, void 0, void 0, function () {
    return $luKd$var$__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , navigator.clipboard.writeText(text)];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

function $luKd$var$modifyUsageInfoNodes(selector, findPredicate) {
  var usageInfo = $kHlU$export$getUsageInfo();
  var loggedIn = $Tj7a$export$isLoggedIn();
  var infoElements = document.querySelectorAll(selector);
  var firstUsageInfoEl = Array.prototype.find.call(infoElements, findPredicate);
  var hasInjectedElement = !!Array.prototype.find.call(infoElements, function (node) {
    return node.parentElement.classList.contains($luKd$var$randomClass);
  }); // We can't find any element related to usage instructions,
  // or we have already injected elements

  if (!firstUsageInfoEl || hasInjectedElement) {
    return;
  }

  var cachedParent = firstUsageInfoEl.parentElement;

  if (cachedParent) {
    usageInfo.split("\n").reverse().forEach(function (info) {
      var clonedNode = cachedParent.cloneNode(true);
      var textElem = clonedNode.querySelector("span");
      var copyEl = clonedNode.querySelector("button");
      clonedNode.classList.add($luKd$var$randomClass);
      textElem.innerText = info;
      copyEl.style.visibility = loggedIn ? "visible" : "hidden";

      copyEl.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        $luKd$var$copyToClipboard(info);
      };

      cachedParent.insertAdjacentElement("afterend", clonedNode);
    });
  }

  infoElements.forEach(function (node) {
    if ( // We only match lines related to bundler commands
    !!node.innerText.match(/^(npm|pnpm|yarn)/) && ( // And only commands that we want to remove
    node.innerText.includes("adduser") || node.innerText.includes("set password"))) {
      node.parentElement.parentElement.removeChild(node.parentElement);
    }
  });
}

function $luKd$var$updateUsageInfo() {
  $luKd$var$modifyUsageInfoNodes($luKd$var$helpCardUsageInfoSelector, function (node) {
    return node.innerText.includes("adduser");
  });
  $luKd$var$modifyUsageInfoNodes($luKd$var$dialogUsageInfoSelector, function (node) {
    return !!node.innerText.match( // This checks for an element showing instructions to set the registry URL
    /((npm|pnpm) set|(yarn) config set)/);
  });
}

$wPEU$export$init({
  loginButton: "[data-testid=\"header--button-login\"]",
  logoutButton: "[data-testid=\"header--button-logout\"]",
  updateUsageInfo: $luKd$var$updateUsageInfo
});

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $luKd$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $luKd$exports;
  });
}
})();