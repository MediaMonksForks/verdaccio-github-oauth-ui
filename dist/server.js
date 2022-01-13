// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"joHI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staticPath = exports.publicRoot = exports.publicGitHubOrigin = exports.publicGitHubApiOrigin = exports.pluginName = exports.cliProviderId = exports.cliPort = exports.cliAuthorizeUrl = exports.callbackPath = exports.authorizePath = exports.authenticatedUserGroups = void 0;
var pluginName = "oidc-ui";
exports.pluginName = pluginName;
var publicRoot = __dirname + "/public";
exports.publicRoot = publicRoot;
var staticPath = "/-/static/" + pluginName;
exports.staticPath = staticPath;
var authorizePath = "/-/oauth/authorize";
exports.authorizePath = authorizePath;
var callbackPath = "/-/oauth/callback";
exports.callbackPath = callbackPath;
var cliPort = 8239;
exports.cliPort = cliPort;
var cliProviderId = "cli";
exports.cliProviderId = cliProviderId;
var cliAuthorizeUrl = "/oauth/authorize";
exports.cliAuthorizeUrl = cliAuthorizeUrl;
var publicGitHubOrigin = "https://github.com";
exports.publicGitHubOrigin = publicGitHubOrigin;
var publicGitHubApiOrigin = "https://api.github.com";
/**
 * See https://verdaccio.org/docs/en/packages
 */

exports.publicGitHubApiOrigin = publicGitHubApiOrigin;
var authenticatedUserGroups = ["$all", "@all", "$authenticated", "@authenticated"];
exports.authenticatedUserGroups = authenticatedUserGroups;
},{}],"isaH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = _chalk.default.blue("[".concat(_constants.pluginName, "]"));

var logger = {
  log: console.log.bind(console, prefix),
  error: console.error.bind(console, prefix)
};
exports.logger = logger;

var plugin = require(__dirname + "/../package.json");

logger.log("Version: ".concat(plugin.name, "@").concat(plugin.version));
},{"./constants":"joHI"}],"wBNZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthorizePath = getAuthorizePath;
exports.getCallbackPath = getCallbackPath;

var _constants = require("./constants");

function getAuthorizePath(id) {
  return _constants.authorizePath + "/" + (id || ":id?");
}

function getCallbackPath(id) {
  return _constants.callbackPath + (id ? "/" + id : "");
}
},{"./constants":"joHI"}],"jlHe":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CliFlow = void 0;

var query_string_1 = __importDefault(require("query-string"));

var constants_1 = require("../../constants");

var logger_1 = require("../../logger");

var redirect_1 = require("../../redirect");

var pluginCallbackeUrl = (0, redirect_1.getCallbackPath)(constants_1.cliProviderId);

var CliFlow =
/** @class */
function () {
  function CliFlow(verdaccio, core, provider) {
    var _this = this;

    this.verdaccio = verdaccio;
    this.core = core;
    this.provider = provider;

    this.callback = function (req, res) {
      return __awaiter(_this, void 0, void 0, function () {
        var params, code, token, _a, username, groups, user, npmToken, error_1, redirectUrl;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              params = {};
              _b.label = 1;

            case 1:
              _b.trys.push([1, 8,, 9]);

              code = this.provider.getCode(req);
              return [4
              /*yield*/
              , this.provider.getToken(code, pluginCallbackeUrl)];

            case 2:
              token = _b.sent();
              return [4
              /*yield*/
              , Promise.all([this.provider.getUsername(token), this.provider.getGroups(token)])];

            case 3:
              _a = _b.sent(), username = _a[0], groups = _a[1];
              if (!this.core.authenticate(username, groups)) return [3
              /*break*/
              , 6];
              return [4
              /*yield*/
              , this.core.createAuthenticatedUser(username, groups)];

            case 4:
              user = _b.sent();
              return [4
              /*yield*/
              , this.verdaccio.issueNpmToken(token, user)];

            case 5:
              npmToken = _b.sent();
              params.status = "success";
              params.token = encodeURIComponent(npmToken);
              return [3
              /*break*/
              , 7];

            case 6:
              params.status = "denied";
              _b.label = 7;

            case 7:
              return [3
              /*break*/
              , 9];

            case 8:
              error_1 = _b.sent();
              logger_1.logger.error(error_1);
              params.status = "error";
              params.message = error_1.message || error_1;
              return [3
              /*break*/
              , 9];

            case 9:
              redirectUrl = "http://localhost:".concat(constants_1.cliPort) + "?" + query_string_1.default.stringify(params);
              res.redirect(redirectUrl);
              return [2
              /*return*/
              ];
          }
        });
      });
    };
  }
  /**
   * IPluginMiddleware
   */


  CliFlow.prototype.register_middlewares = function (app) {
    app.get(pluginCallbackeUrl, this.callback);
  };

  return CliFlow;
}();

exports.CliFlow = CliFlow;
},{"../../constants":"joHI","../../logger":"isaH","../../redirect":"wBNZ"}],"qSLj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAccessDeniedPage = buildAccessDeniedPage;
exports.buildErrorPage = buildErrorPage;
exports.buildStatusPage = buildStatusPage;

var _constants = require("./constants");

function buildStatusPage(body, withBackButton) {
  var backButton = withBackButton ? "<p><button onclick=\"window.history.back()\">Go back</button></p>" : "";
  return "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>".concat(_constants.pluginName, "</title>\n    <style>\n      html,\n      body {\n        padding: 0;\n        margin: 0;\n        height: 100%;\n        background-color: #e0e0e0;\n        color: #24292F;\n        font-family: Helvetica, sans-serif;\n        position: relative;\n        text-align: center;\n      }\n      .wrap {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n      }\n      a {\n        color: #3f51b5;\n      }\n      .img {\n        filter: drop-shadow(0 0.5rem 0.5rem #24292F80);\n        width: 100px;\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"wrap\">\n      <svg class=\"img\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\"><defs/><defs><filter id=\"a\" width=\"139.6%\" height=\"140.4%\" x=\"-20%\" y=\"-12%\" filterUnits=\"objectBoundingBox\"><feOffset dy=\"4\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"/><feGaussianBlur in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\" stdDeviation=\"2.5\"/><feComposite in=\"shadowBlurOuter1\" in2=\"SourceAlpha\" operator=\"out\" result=\"shadowBlurOuter1\"/><feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0906646286 0\"/></filter><filter id=\"c\" width=\"167.9%\" height=\"272.7%\" x=\"-34%\" y=\"-50%\" filterUnits=\"objectBoundingBox\"><feOffset dy=\"4\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"/><feGaussianBlur in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\" stdDeviation=\"2.5\"/><feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0906646286 0\"/></filter><path id=\"b\" d=\"M48 17L33 47h-9L0 0h15l13 25 5-8h15z\"/><path id=\"d\" d=\"M35 11h-7V9h8l2-3h-6V4h7l1-2h-4V0h20l-6 11H35z\"/></defs><g fill=\"none\" fill-rule=\"evenodd\"><rect width=\"100\" height=\"100\" fill=\"#000\" rx=\"37\"/><g transform=\"translate(22 30)\"><use fill=\"#000\" filter=\"url(#a)\" xlink:href=\"#b\"/><use fill=\"#FFF\" fill-opacity=\".6\" xlink:href=\"#b\"/></g><g transform=\"translate(22 30)\"><use fill=\"#000\" filter=\"url(#c)\" xlink:href=\"#d\"/><use fill=\"#FFF\" xlink:href=\"#d\"/></g><path fill=\"#FFF\" d=\"M55 77h-9L22 30h15l21 41z\"/></g></svg>\n      ").concat(body, "\n      ").concat(backButton, "\n    </div>\n  </body>\n</html>");
}

function buildErrorPage(error, withBackButton) {
  return buildStatusPage("<h1>Sorry :(</h1>\n    <p>".concat((error === null || error === void 0 ? void 0 : error.message) || error, "</p>"), withBackButton);
}

function buildAccessDeniedPage(withBackButton) {
  return buildStatusPage("<h1>Access Denied</h1>\n    <p>You are not a member of the required access group.</p>", withBackButton);
}
},{"./constants":"joHI"}],"dRsD":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebFlow = void 0;

var url_1 = require("@verdaccio/url");

var logger_1 = require("../../logger");

var redirect_1 = require("../../redirect");

var statusPage_1 = require("../../statusPage");

var WebFlow =
/** @class */
function () {
  function WebFlow(config, core, provider) {
    var _this = this;

    this.config = config;
    this.core = core;
    this.provider = provider;
    /**
     * Initiates the auth flow by redirecting to the provider's login URL.
     */

    this.authorize = function (req, res, next) {
      return __awaiter(_this, void 0, void 0, function () {
        var redirectUrl, url;
        return __generator(this, function (_a) {
          try {
            redirectUrl = this.getRedirectUrl(req);
            url = this.provider.getLoginUrl(redirectUrl);
            res.redirect(url);
          } catch (error) {
            logger_1.logger.error(error);
            next(error);
          }

          return [2
          /*return*/
          ];
        });
      });
    };
    /**
     * After successful authentication, the auth provider redirects back to us.
     * We use the code in the query params to get an access token and the username
     * associated with the account.
     *
     * We issue a JWT using these values and pass them back to the frontend as
     * query parameters so they can be stored in the browser.
     *
     * The username and token are encrypted and base64 encoded to form a token for
     * the npm CLI.
     *
     * There is no need to later decode and decrypt the token. This process is
     * automatically reversed by verdaccio before passing it to the plugin.
     */


    this.callback = function (req, res) {
      return __awaiter(_this, void 0, void 0, function () {
        var withBackButton, code, token, _a, username, groups, ui, error_1;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              withBackButton = true;
              _b.label = 1;

            case 1:
              _b.trys.push([1, 7,, 8]);

              code = this.provider.getCode(req);
              return [4
              /*yield*/
              , this.provider.getToken(code, this.getRedirectUrl(req))];

            case 2:
              token = _b.sent();
              return [4
              /*yield*/
              , Promise.all([this.provider.getUsername(token), this.provider.getGroups(token)])];

            case 3:
              _a = _b.sent(), username = _a[0], groups = _a[1];
              if (!this.core.authenticate(username, groups)) return [3
              /*break*/
              , 5];
              return [4
              /*yield*/
              , this.core.createUiCallbackUrl(username, token, groups)];

            case 4:
              ui = _b.sent();
              res.redirect(ui);
              return [3
              /*break*/
              , 6];

            case 5:
              res.status(401).send((0, statusPage_1.buildAccessDeniedPage)(withBackButton));
              _b.label = 6;

            case 6:
              return [3
              /*break*/
              , 8];

            case 7:
              error_1 = _b.sent();
              logger_1.logger.error(error_1);
              res.status(500).send((0, statusPage_1.buildErrorPage)(error_1, withBackButton));
              return [3
              /*break*/
              , 8];

            case 8:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
  }
  /**
   * IPluginMiddleware
   */


  WebFlow.prototype.register_middlewares = function (app) {
    app.get((0, redirect_1.getAuthorizePath)(), this.authorize);
    app.get((0, redirect_1.getCallbackPath)(), this.callback);
  };

  WebFlow.prototype.getRedirectUrl = function (req) {
    var baseUrl = (0, url_1.getPublicUrl)(this.config.url_prefix, req).replace(/\/$/, "");
    var path = (0, redirect_1.getCallbackPath)(req.params.id);
    var redirectUrl = baseUrl + path;
    return redirectUrl;
  };

  return WebFlow;
}();

exports.WebFlow = WebFlow;
},{"../../logger":"isaH","../../redirect":"wBNZ","../../statusPage":"qSLj"}],"W9VQ":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./CliFlow"), exports);

__exportStar(require("./WebFlow"), exports);
},{"./CliFlow":"jlHe","./WebFlow":"dRsD"}],"PqN6":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConfig = exports.getMajorVersion = exports.getConfig = void 0;

var chalk_1 = __importDefault(require("chalk"));

var get_1 = __importDefault(require("lodash/get"));

var ow_1 = __importDefault(require("ow"));

var constants_1 = require("../../constants");

var logger_1 = require("../../logger"); //
// Access
//


function getConfig(config, key) {
  var _a;

  var value = (_a = (0, get_1.default)(config, "middlewares[".concat(constants_1.pluginName, "][").concat(key, "]"))) !== null && _a !== void 0 ? _a : (0, get_1.default)(config, "auth[".concat(constants_1.pluginName, "][").concat(key, "]"));
  return process.env[value] || value;
}

exports.getConfig = getConfig;
/**
 * user_agent: e.g. "verdaccio/5.0.4" --> 5
 */

function getMajorVersion(config) {
  return +config.user_agent.replace(/^verdaccio\/(\d+).\d+.\d+$/, "$1");
}

exports.getMajorVersion = getMajorVersion; //
// Validation
//

function validateProp(config, key, predicate) {
  var value = getConfig(config, key);

  try {
    (0, ow_1.default)(value, predicate);
  } catch (error) {
    logger_1.logger.error(chalk_1.default.red("[".concat(constants_1.pluginName, "] ERR: Invalid configuration at \"auth.").concat(constants_1.pluginName, ".").concat(key, "\": ").concat(error.message)));
    throw new Error("Please check your verdaccio config.");
  }
}

function ensureObjectNotEmpty(config, node) {
  var path = "[".concat(node, "][").concat(constants_1.pluginName, "]");
  var obj = (0, get_1.default)(config, path, {});

  if (!Object.keys(obj).length) {
    throw new Error("\"".concat(node, ".").concat(constants_1.pluginName, "\" must be enabled"));
  }
}

function validateConfig(config) {
  var majorVersion = getMajorVersion(config);

  if (majorVersion < 5) {
    throw new Error("This plugin requires verdaccio 5 or above");
  }

  ensureObjectNotEmpty(config, "auth");
  ensureObjectNotEmpty(config, "middlewares");
  validateProp(config, "client-id", ow_1.default.string.nonEmpty);
  validateProp(config, "client-secret", ow_1.default.string.nonEmpty);
  validateProp(config, "org", ow_1.default.any(ow_1.default.string.nonEmpty.not.startsWith(constants_1.publicGitHubOrigin), ow_1.default.boolean.false));
  validateProp(config, "enterprise-origin", ow_1.default.any(ow_1.default.undefined, ow_1.default.string.url.nonEmpty.not.startsWith(constants_1.publicGitHubOrigin), ow_1.default.boolean.false));
}

exports.validateConfig = validateConfig;
},{"../../constants":"joHI","../../logger":"isaH"}],"R6pr":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitHubClient = void 0;

var oauth_methods_1 = require("@octokit/oauth-methods");

var request_1 = require("@octokit/request");

var octokit_1 = require("octokit");

var GitHubClient =
/** @class */
function () {
  function GitHubClient(webBaseUrl, apiBaseUrl) {
    var _this = this;

    this.webBaseUrl = webBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    /**a
     * `POST /login/oauth/access_token`
     *
     * [Web application flow](bit.ly/2mNSppX).
     */

    this.requestAccessToken = function (code, clientId, clientSecret) {
      return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4
              /*yield*/
              , (0, oauth_methods_1.exchangeWebFlowCode)({
                clientType: "oauth-app",
                clientId: clientId,
                clientSecret: clientSecret,
                code: code,
                request: request_1.request.defaults({
                  baseUrl: this.webBaseUrl
                })
              })];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_1 = _a.sent();
              throw new Error("Failed requesting GitHub access token: " + error_1.message);

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
    /**
     * `GET /user`
     *
     * [Get the authenticated user](https://developer.github.com/v3/users/#get-the-authenticated-user)
     */


    this.requestUser = function (accessToken) {
      return __awaiter(_this, void 0, void 0, function () {
        var oktokit, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              oktokit = this.createOktokit(accessToken);
              return [4
              /*yield*/
              , oktokit.rest.users.getAuthenticated()];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_2 = _a.sent();
              throw new Error("Failed requesting GitHub user info: " + error_2.message);

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
    /**
     * `GET /user/orgs`
     *
     * [List your organizations](https://developer.github.com/v3/orgs/#list-your-organizations)
     */


    this.requestUserOrgs = function (accessToken) {
      return __awaiter(_this, void 0, void 0, function () {
        var oktokit, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              oktokit = this.createOktokit(accessToken);
              return [4
              /*yield*/
              , oktokit.paginate(oktokit.rest.orgs.listForAuthenticatedUser, {
                per_page: 100
              })];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_3 = _a.sent();
              throw new Error("Failed requesting GitHub user orgs: " + error_3.message);

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
    /**
     * `GET /user/teams`
     *
     * [List your teams](https://docs.github.com/en/rest/reference/teams#list-teams-for-the-authenticated-user)
     */


    this.requestUserTeams = function (accessToken) {
      return __awaiter(_this, void 0, void 0, function () {
        var oktokit, error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              oktokit = this.createOktokit(accessToken);
              return [4
              /*yield*/
              , oktokit.paginate(oktokit.rest.teams.listForAuthenticatedUser, {
                per_page: 100
              })];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_4 = _a.sent();
              throw new Error("Failed requesting GitHub user teams: " + error_4.message);

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
    /**
     * `GET /user/repos`
     *
     * [List your repositories](https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user)
     */


    this.requestUserRepos = function (accessToken) {
      return __awaiter(_this, void 0, void 0, function () {
        var oktokit, error_5;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              oktokit = this.createOktokit(accessToken);
              return [4
              /*yield*/
              , oktokit.paginate(oktokit.rest.repos.listForAuthenticatedUser, {
                per_page: 100
              })];

            case 1:
              return [2
              /*return*/
              , _a.sent()];

            case 2:
              error_5 = _a.sent();
              throw new Error("Failed requesting GitHub user repositories: " + error_5.message);

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
  }

  GitHubClient.prototype.createOktokit = function (accessToken) {
    return new octokit_1.Octokit({
      auth: accessToken,
      baseUrl: this.apiBaseUrl
    });
  };

  return GitHubClient;
}();

exports.GitHubClient = GitHubClient;
},{}],"uD4g":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitHubAuthProvider = void 0;

var querystring_1 = require("querystring");

var constants_1 = require("../../constants");

var Config_1 = require("../plugin/Config");

var Client_1 = require("./Client");

var GitHubAuthProvider =
/** @class */
function () {
  function GitHubAuthProvider(config) {
    this.config = config;
    this.clientId = (0, Config_1.getConfig)(this.config, "client-id");
    this.clientSecret = (0, Config_1.getConfig)(this.config, "client-secret");
    this.enterpriseOrigin = (0, Config_1.getConfig)(this.config, "enterprise-origin");
    this.client = new Client_1.GitHubClient(this.webBaseUrl, this.apiBaseUrl);
  }

  Object.defineProperty(GitHubAuthProvider.prototype, "webBaseUrl", {
    get: function () {
      return this.enterpriseOrigin || constants_1.publicGitHubOrigin;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GitHubAuthProvider.prototype, "apiBaseUrl", {
    get: function () {
      return this.enterpriseOrigin ? this.enterpriseOrigin.replace(/\/?$/, "") + "/api/v3" : constants_1.publicGitHubApiOrigin;
    },
    enumerable: false,
    configurable: true
  });

  GitHubAuthProvider.prototype.getId = function () {
    return "github";
  };

  GitHubAuthProvider.prototype.getLoginUrl = function (callbackUrl) {
    var queryParams = (0, querystring_1.stringify)({
      client_id: this.clientId,
      redirect_uri: callbackUrl,
      scope: "read:org,repo"
    });
    return this.webBaseUrl + "/login/oauth/authorize?" + queryParams;
  };

  GitHubAuthProvider.prototype.getCode = function (req) {
    return req.query.code;
  };

  GitHubAuthProvider.prototype.getToken = function (code) {
    return __awaiter(this, void 0, void 0, function () {
      var auth;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.client.requestAccessToken(code, this.clientId, this.clientSecret)];

          case 1:
            auth = _a.sent();
            return [2
            /*return*/
            , auth.authentication.token];
        }
      });
    });
  };

  GitHubAuthProvider.prototype.getUsername = function (token) {
    return __awaiter(this, void 0, void 0, function () {
      var user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.client.requestUser(token)];

          case 1:
            user = _a.sent();
            return [2
            /*return*/
            , user.data.login];
        }
      });
    });
  };

  GitHubAuthProvider.prototype.createOwnerGroup = function (orgName) {
    return "".concat(this.getId(), "/owner/").concat(orgName);
  };

  GitHubAuthProvider.prototype.createTeamGroup = function (orgName, teamName) {
    return "".concat(this.createOwnerGroup(orgName), "/team/").concat(teamName);
  };

  GitHubAuthProvider.prototype.createRepoGroup = function (ownerName, repoName) {
    return "".concat(this.createOwnerGroup(ownerName), "/repo/").concat(repoName);
  };

  GitHubAuthProvider.prototype.createLegacyOrgGroup = function (orgName) {
    return "".concat(this.getId(), "/").concat(orgName);
  };

  GitHubAuthProvider.prototype.createLegacyTeamGroup = function (orgName, teamName) {
    return "".concat(this.createLegacyOrgGroup(orgName), "/team/").concat(teamName);
  };

  GitHubAuthProvider.prototype.getGroups = function (token) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, username, orgs, teams, repos, orgGroups, teamGroups, repoGroups, userGroup, legacyOrgGroups, legacyTeamGroups;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , Promise.all([this.getUsername(token), this.client.requestUserOrgs(token), this.client.requestUserTeams(token), this.client.requestUserRepos(token)])];

          case 1:
            _a = _b.sent(), username = _a[0], orgs = _a[1], teams = _a[2], repos = _a[3];
            orgGroups = orgs.map(function (org) {
              return _this.createOwnerGroup(org.login);
            });
            teamGroups = teams.map(function (team) {
              var _a;

              return _this.createTeamGroup((_a = team.organization) === null || _a === void 0 ? void 0 : _a.login, team.name);
            });
            repoGroups = repos.map(function (repo) {
              return _this.createRepoGroup(repo.owner.login, repo.name);
            });
            userGroup = this.createOwnerGroup(username);
            legacyOrgGroups = orgs.map(function (org) {
              return _this.createLegacyOrgGroup(org.login);
            });
            legacyTeamGroups = teams.map(function (team) {
              return _this.createLegacyTeamGroup(team.organization.login, team.name);
            });
            return [2
            /*return*/
            , __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], orgGroups, true), teamGroups, true), repoGroups, true), [userGroup], false), legacyOrgGroups, true), legacyTeamGroups, true)];
        }
      });
    });
  };

  return GitHubAuthProvider;
}();

exports.GitHubAuthProvider = GitHubAuthProvider;
},{"../../constants":"joHI","../plugin/Config":"PqN6","./Client":"R6pr"}],"WfIS":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./AuthProvider"), exports);
},{"./AuthProvider":"uD4g"}],"ukrg":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenIDConnectAuthProvider = void 0;

var openid_client_1 = require("openid-client");

var Config_1 = require("../plugin/Config");

var OpenIDConnectAuthProvider =
/** @class */
function () {
  function OpenIDConnectAuthProvider(config) {
    this.config = config;
    this.issuerUrl = (0, Config_1.getConfig)(this.config, "oidc-issuer-url") || "";
    this.usernameProperty = (0, Config_1.getConfig)(this.config, "oidc-username-property") || "nickname";
    this.groupsProperty = (0, Config_1.getConfig)(this.config, "oidc-groups-property") || "groups";
    this.clientId = (0, Config_1.getConfig)(this.config, "client-id");
    this.clientSecret = (0, Config_1.getConfig)(this.config, "client-secret"); // not sure of a better way to do this:

    this.discoverClient();
  }

  Object.defineProperty(OpenIDConnectAuthProvider.prototype, "discoveredClient", {
    get: function () {
      if (!this.client) {
        throw new Error('Client has not yet been discovered');
      }

      return this.client;
    },
    enumerable: false,
    configurable: true
  });

  OpenIDConnectAuthProvider.prototype.discoverClient = function () {
    return __awaiter(this, void 0, void 0, function () {
      var issuer, client;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , openid_client_1.Issuer.discover(this.issuerUrl)];

          case 1:
            issuer = _a.sent();
            client = new issuer.Client({
              client_id: this.clientId,
              client_secret: this.clientSecret,
              response_types: ["code"]
            });
            this.client = client;
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  OpenIDConnectAuthProvider.prototype.getId = function () {
    return "oidc";
  };

  OpenIDConnectAuthProvider.prototype.getLoginUrl = function (callbackUrl) {
    return this.discoveredClient.authorizationUrl({
      scope: "openid groups",
      redirect_uri: callbackUrl
    });
  };

  OpenIDConnectAuthProvider.prototype.getCode = function (req) {
    return JSON.stringify(this.discoveredClient.callbackParams(req.url));
  };

  OpenIDConnectAuthProvider.prototype.getToken = function (code, callbackUrl) {
    return __awaiter(this, void 0, Promise, function () {
      var params, tokenSet;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            params = JSON.parse(code);
            return [4
            /*yield*/
            , this.discoveredClient.callback(callbackUrl, params)];

          case 1:
            tokenSet = _a.sent();

            if (tokenSet.access_token !== undefined) {
              return [2
              /*return*/
              , tokenSet.access_token];
            }

            throw new Error("No access_token received in getToken callback");
        }
      });
    });
  };

  OpenIDConnectAuthProvider.prototype.getUsername = function (token) {
    return __awaiter(this, void 0, Promise, function () {
      var userinfo, username;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.discoveredClient.userinfo(token)];

          case 1:
            userinfo = _a.sent();
            username = userinfo[this.usernameProperty];

            if (username !== undefined) {
              return [2
              /*return*/
              , username];
            }

            throw new Error("Could not grab username using the ".concat(this.usernameProperty, " property"));
        }
      });
    });
  };

  OpenIDConnectAuthProvider.prototype.getGroups = function (token) {
    return __awaiter(this, void 0, Promise, function () {
      var userinfo, groups;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.discoveredClient.userinfo(token)];

          case 1:
            userinfo = _a.sent();
            groups = userinfo[this.groupsProperty];

            if (groups !== undefined) {
              return [2
              /*return*/
              , groups];
            }

            throw new Error("Could not grab groups using the ".concat(this.groupsProperty, " property"));
        }
      });
    });
  };

  return OpenIDConnectAuthProvider;
}();

exports.OpenIDConnectAuthProvider = OpenIDConnectAuthProvider;
},{"../plugin/Config":"PqN6"}],"fa24":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./AuthProvider"), exports);
},{"./AuthProvider":"ukrg"}],"KSGr":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Verdaccio = void 0;

var merge_1 = __importDefault(require("lodash/merge"));

var logger_1 = require("../../logger");

var Config_1 = require("../plugin/Config"); // Most of this is duplicated Verdaccio code because it is unfortunately not availabel via API.
// https://github.com/verdaccio/verdaccio/blob/master/src/lib/auth-utils.ts#L129


var TIME_EXPIRATION_7D = "7d";
var defaultSecurity = {
  api: {
    legacy: true
  },
  web: {
    sign: {
      expiresIn: TIME_EXPIRATION_7D
    },
    verify: {}
  }
};

function getSecurity(config) {
  return (0, merge_1.default)({}, defaultSecurity, config.security);
}
/**
 * Abstract Verdaccio version differences and usage of all Verdaccio objects.
 */


var Verdaccio =
/** @class */
function () {
  function Verdaccio(config) {
    this.config = config;
    this.majorVersion = (0, Config_1.getMajorVersion)(this.config);
    this.security = getSecurity(this.config);
  }

  Verdaccio.prototype.setAuth = function (auth) {
    this.auth = auth;
    return this;
  };

  Verdaccio.prototype.issueNpmToken = function (token, user) {
    var _a, _b, _c;

    return __awaiter(this, void 0, void 0, function () {
      var jwtSignOptions;
      return __generator(this, function (_d) {
        logger_1.logger.log('[issueNpmToken]', token, user);
        jwtSignOptions = (_c = (_b = (_a = this.security) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.jwt) === null || _c === void 0 ? void 0 : _c.sign;
        logger_1.logger.log('jwtSignOptions', jwtSignOptions);

        if (jwtSignOptions) {
          return [2
          /*return*/
          , this.issueVerdaccio4PlusJWT(user, jwtSignOptions)];
        } else {
          return [2
          /*return*/
          , this.encrypt(user.name + ":" + token)];
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  Verdaccio.prototype.issueUiToken = function (user) {
    return __awaiter(this, void 0, void 0, function () {
      var jwtSignOptions;
      return __generator(this, function (_a) {
        jwtSignOptions = this.security.web.sign;
        return [2
        /*return*/
        , this.issueVerdaccio4PlusJWT(user, jwtSignOptions)];
      });
    });
  }; // https://github.com/verdaccio/verdaccio/blob/master/src/api/web/endpoint/user.ts#L31


  Verdaccio.prototype.issueVerdaccio4PlusJWT = function (user, jwtSignOptions) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        logger_1.logger.log('issueVerdaccio4PlusJWT');
        return [2
        /*return*/
        , this.auth.jwtEncrypt(user, jwtSignOptions)];
      });
    });
  };

  Verdaccio.prototype.encrypt = function (text) {
    logger_1.logger.log('encrypt', text, this.auth.secret);
    return this.auth.aesEncrypt(text);
  };

  return Verdaccio;
}();

exports.Verdaccio = Verdaccio;
},{"../../logger":"isaH","../plugin/Config":"PqN6"}],"RruY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Verdaccio = void 0;

var Verdaccio_1 = require("./Verdaccio");

Object.defineProperty(exports, "Verdaccio", {
  enumerable: true,
  get: function () {
    return Verdaccio_1.Verdaccio;
  }
});
},{"./Verdaccio":"KSGr"}],"o5UK":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCore = void 0;

var uniq_1 = __importDefault(require("lodash/uniq"));

var querystring_1 = require("querystring");

var constants_1 = require("../../constants");

var logger_1 = require("../../logger");

var Config_1 = require("./Config");

var AuthCore =
/** @class */
function () {
  function AuthCore(verdaccio, config) {
    this.verdaccio = verdaccio;
    this.config = config;
    this.org = (0, Config_1.getConfig)(this.config, "org");
    this.requiredGroup = this.org ? "github/owner/" + this.org : null;
    this.configuredGroups = this.getConfiguredGroups();
  }
  /**
   * Returns all permission groups used in the Verdacio config.
   */


  AuthCore.prototype.getConfiguredGroups = function () {
    var configuredGroups = {};
    Object.values(this.config.packages || {}).forEach(function (packageConfig) {
      ;
      ["access", "publish", "unpublish"].flatMap(function (key) {
        return packageConfig[key];
      }).filter(Boolean).forEach(function (group) {
        configuredGroups[group] = true;
      });
    });
    return configuredGroups;
  };

  AuthCore.prototype.createAuthenticatedUser = function (username, groups) {
    return __awaiter(this, void 0, Promise, function () {
      var relevantGroups, user;

      var _this = this;

      return __generator(this, function (_a) {
        relevantGroups = groups.filter(function (group) {
          return group in _this.configuredGroups;
        });
        relevantGroups.push(username);

        if (this.requiredGroup) {
          relevantGroups.push(this.requiredGroup);
        }

        user = {
          name: username,
          groups: __spreadArray([], constants_1.authenticatedUserGroups, true),
          real_groups: (0, uniq_1.default)(relevantGroups.filter(Boolean).sort())
        };
        logger_1.logger.log("Created authenticated user", user);
        return [2
        /*return*/
        , user];
      });
    });
  };

  AuthCore.prototype.createUiCallbackUrl = function (username, token, groups) {
    var _a;

    return __awaiter(this, void 0, Promise, function () {
      var user, uiToken, npmToken, query, url;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.createAuthenticatedUser(username, groups)];

          case 1:
            user = _b.sent();
            return [4
            /*yield*/
            , this.verdaccio.issueUiToken(user)];

          case 2:
            uiToken = _b.sent();
            return [4
            /*yield*/
            , this.verdaccio.issueNpmToken(token, user)];

          case 3:
            npmToken = (_a = _b.sent()) !== null && _a !== void 0 ? _a : '';
            logger_1.logger.log('npmToken', npmToken);
            query = {
              username: username,
              uiToken: uiToken,
              npmToken: npmToken
            };
            url = "/?" + (0, querystring_1.stringify)(query);
            return [2
            /*return*/
            , url];
        }
      });
    });
  };

  AuthCore.prototype.authenticate = function (username, groups) {
    if (this.requiredGroup && !groups.includes(this.requiredGroup)) {
      logger_1.logger.error("Access denied: User \"".concat(username, "\" is not a member of \"").concat(this.requiredGroup, "\""));
      return false;
    }

    if (!groups.length) {
      logger_1.logger.error("Access denied: User \"".concat(username, "\" does not have any groups"));
      return false;
    }

    return true;
  };

  return AuthCore;
}();

exports.AuthCore = AuthCore;
},{"../../constants":"joHI","../../logger":"isaH","./Config":"PqN6"}],"zEKG":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = void 0;

var memory_cache_1 = require("memory-cache");

var logger_1 = require("../../logger");
/**
 * When installing packages, the CLI makes a burst of package requests.
 *
 * If we were to perform a full authentication check and fetch the provider groups
 * on each package request, this would slow down the process a lot and we would
 * likely hit a request limit with the auth provider.
 *
 * Therefore authentication is only performed once and is cached until no request
 * has been made for a short period.
 */


var Cache =
/** @class */
function () {
  function Cache(authProvider, cacheTTLms) {
    if (cacheTTLms === void 0) {
      cacheTTLms = 10000;
    }

    this.authProvider = authProvider;
    this.cacheTTLms = cacheTTLms;
    this.cache = new memory_cache_1.Cache();
    this.namespace = this.authProvider.getId();
  }

  Cache.prototype.getGroups = function (token) {
    return __awaiter(this, void 0, Promise, function () {
      var groups, key, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            groups = null;
            _a.label = 1;

          case 1:
            _a.trys.push([1, 4,, 5]);

            key = [this.namespace, token].join("_");
            groups = this.cache.get(key);
            if (!!groups) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , this.authProvider.getGroups(token)];

          case 2:
            groups = _a.sent();
            _a.label = 3;

          case 3:
            this.cache.put(key, groups || [], this.cacheTTLms);
            return [3
            /*break*/
            , 5];

          case 4:
            error_1 = _a.sent();
            logger_1.logger.error(error_1);
            return [3
            /*break*/
            , 5];

          case 5:
            return [2
            /*return*/
            , groups || []];
        }
      });
    });
  };

  return Cache;
}();

exports.Cache = Cache;
},{"../../logger":"isaH"}],"wPt6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchHtml = void 0;

var fs_1 = require("fs");

var constants_1 = require("../../constants");
/**
 * Injects additional static imports into the DOM with code from the client folder
 * that modifies the login button.
 */


var PatchHtml =
/** @class */
function () {
  function PatchHtml(verdaccio) {
    var _this = this;

    this.verdaccio = verdaccio;
    this.scriptTag = "<script src=\"".concat(constants_1.staticPath, "/verdaccio-").concat(this.verdaccio.majorVersion, ".js\"></script>");
    this.styleTag = "<style>".concat((0, fs_1.readFileSync)("".concat(constants_1.publicRoot, "/verdaccio-").concat(this.verdaccio.majorVersion, ".css")), "</style>");
    this.headWithStyle = [this.styleTag, "</head>"].join("");
    this.bodyWithScript = [this.scriptTag, "</body>"].join("");
    /**
     * Patches `res.send` in order to inject style and script tags.
     */

    this.patchResponse = function (req, res, next) {
      var send = res.send;

      res.send = function (html) {
        html = _this.insertTags(html);
        return send.call(res, html);
      };

      next();
    };

    this.insertTags = function (html) {
      html = String(html);

      if (!html.includes("__VERDACCIO_BASENAME_UI_OPTIONS")) {
        return html;
      }

      return html.replace(/<\/head>/, _this.headWithStyle).replace(/<\/body>/, _this.bodyWithScript);
    };
  }
  /**
   * IPluginMiddleware
   */


  PatchHtml.prototype.register_middlewares = function (app) {
    app.use(this.patchResponse);
  };

  return PatchHtml;
}();

exports.PatchHtml = PatchHtml;
},{"../../constants":"joHI"}],"qnNe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGlobalProxyAgent = void 0;

var global_agent_1 = require("global-agent");

var logger_1 = require("../../logger");

function registerGlobalProxyAgent() {
  (0, global_agent_1.bootstrap)();
  var config = JSON.stringify(GLOBAL_AGENT || {});
  logger_1.logger.log("Proxy config:", config);
}

exports.registerGlobalProxyAgent = registerGlobalProxyAgent;
},{"../../logger":"isaH"}],"qiEJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServeStatic = void 0;

var express_1 = require("express");

var constants_1 = require("../../constants");
/**
 * Serves additional static assets required to modify the login button.
 */


var ServeStatic =
/** @class */
function () {
  function ServeStatic() {}
  /**
   * IPluginMiddleware
   */


  ServeStatic.prototype.register_middlewares = function (app) {
    app.use(constants_1.staticPath, (0, express_1.static)(constants_1.publicRoot));
  };

  return ServeStatic;
}();

exports.ServeStatic = ServeStatic;
},{"../../constants":"joHI"}],"NuZa":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var logger_1 = require("../../logger");

var flows_1 = require("../flows");

var github_1 = require("../github");

var oidc_1 = require("../oidc");

var verdaccio_1 = require("../verdaccio");

var AuthCore_1 = require("./AuthCore");

var Cache_1 = require("./Cache");

var Config_1 = require("./Config");

var PatchHtml_1 = require("./PatchHtml");

var ProxyAgent_1 = require("./ProxyAgent");

var ServeStatic_1 = require("./ServeStatic");

var createAuthProvider = function (config) {
  // not sure of a better place to put this:
  if (config["oidc-issuer-url"]) {
    return new oidc_1.OpenIDConnectAuthProvider(config);
  }

  return new github_1.GitHubAuthProvider(config);
};
/**
 * Implements the verdaccio plugin interfaces.
 */


var Plugin =
/** @class */
function () {
  function Plugin(config) {
    this.config = config;
    this.provider = createAuthProvider(this.config);
    this.cache = new Cache_1.Cache(this.provider);
    this.verdaccio = new verdaccio_1.Verdaccio(this.config);
    this.core = new AuthCore_1.AuthCore(this.verdaccio, this.config);
    (0, Config_1.validateConfig)(config);
    (0, ProxyAgent_1.registerGlobalProxyAgent)();
  }
  /**
   * IPluginMiddleware
   */


  Plugin.prototype.register_middlewares = function (app, auth) {
    this.verdaccio.setAuth(auth);
    var children = [new ServeStatic_1.ServeStatic(), new PatchHtml_1.PatchHtml(this.verdaccio), new flows_1.WebFlow(this.config, this.core, this.provider), new flows_1.CliFlow(this.verdaccio, this.core, this.provider)];

    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
      var child = children_1[_i];
      child.register_middlewares(app);
    }
  };
  /**
   * IPluginAuth
   */


  Plugin.prototype.authenticate = function (username, token, callback) {
    return __awaiter(this, void 0, Promise, function () {
      var groups, user, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            logger_1.logger.log('[authenticate]', username, token);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 5,, 6]);

            if (!username || !token) {
              callback(null, false);
              return [2
              /*return*/
              ];
            }

            return [4
            /*yield*/
            , this.cache.getGroups(token)];

          case 2:
            groups = _a.sent();
            if (!this.core.authenticate(username, groups)) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , this.core.createAuthenticatedUser(username, groups)];

          case 3:
            user = _a.sent();
            callback(null, user.real_groups);
            return [2
            /*return*/
            ];

          case 4:
            callback(null, false);
            return [3
            /*break*/
            , 6];

          case 5:
            error_1 = _a.sent();
            callback(error_1, false);
            return [3
            /*break*/
            , 6];

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * IPluginAuth
   */


  Plugin.prototype.allow_access = function (user, config, callback) {
    if (config.access) {
      var grant = config.access.some(function (group) {
        return user.groups.includes(group);
      });
      callback(null, grant);
    } else {
      callback(null, true);
    }
  };
  /**
   * IPluginAuth
   */


  Plugin.prototype.allow_publish = function (user, config, callback) {
    if (config.publish) {
      var grant = config.publish.some(function (group) {
        return user.groups.includes(group);
      });
      callback(null, grant);
    } else {
      this.allow_access(user, config, callback);
    }
  };
  /**
   * IPluginAuth
   */


  Plugin.prototype.allow_unpublish = function (user, config, callback) {
    if (config.unpublish) {
      var grant = config.unpublish.some(function (group) {
        return user.groups.includes(group);
      });
      callback(null, grant);
    } else {
      this.allow_publish(user, config, callback);
    }
  };

  return Plugin;
}();

exports.Plugin = Plugin;
},{"../../logger":"isaH","../flows":"W9VQ","../github":"WfIS","../oidc":"fa24","../verdaccio":"RruY","./AuthCore":"o5UK","./Cache":"zEKG","./Config":"PqN6","./PatchHtml":"wPt6","./ProxyAgent":"qnNe","./ServeStatic":"qiEJ"}],"QCba":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Plugin_1 = require("./plugin/Plugin");

var dotenv_1 = __importDefault(require("dotenv"));

dotenv_1.default.config(); // plugins must be a default export

exports.default = Plugin_1.Plugin;
},{"./plugin/Plugin":"NuZa"}]},{},["QCba"], null)
//# sourceMappingURL=/server.js.map