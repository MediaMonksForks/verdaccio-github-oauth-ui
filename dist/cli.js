#!/usr/bin/env node
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
},{"./constants":"joHI"}],"m9yh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNpmConfigFile = getNpmConfigFile;
exports.getNpmSaveCommands = getNpmSaveCommands;
exports.getRegistryUrl = getRegistryUrl;
exports.saveNpmToken = saveNpmToken;

var _child_process = require("child_process");

var _minimist = _interopRequireDefault(require("minimist"));

var _url = require("url");

var _logger = require("./logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseCliArgs() {
  return (0, _minimist.default)(process.argv.slice(2));
}

function runCommand(command) {
  _logger.logger.log("Running command: ".concat(command));

  return (0, _child_process.execSync)(command);
}

function getNpmConfig() {
  return JSON.parse(runCommand("npm config list --json").toString());
}

function removeTrailingSlash(input) {
  return input.trim().replace(/\/?$/, "");
}

function ensureTrailingSlash(input) {
  return input.endsWith("/") ? input : "".concat(input, "/");
}

function getRegistryUrl() {
  var cliArgs = parseCliArgs();
  var npmConfig = getNpmConfig();
  var registry = cliArgs.registry || npmConfig.registry;
  return removeTrailingSlash(registry);
}

function getNpmConfigFile() {
  var npmConfig = getNpmConfig();
  return npmConfig.userconfig;
}

function getNpmSaveCommands(registry, token) {
  var url = new _url.URL(registry);
  var pathname = ensureTrailingSlash(url.pathname);
  var baseUrl = url.host + pathname;
  return ["npm config set //".concat(baseUrl, ":always-auth true"), "npm config set //".concat(baseUrl, ":_authToken \"").concat(token, "\"")];
}

function saveNpmToken(token) {
  var registry = getRegistryUrl();
  var commands = getNpmSaveCommands(registry, token);
  commands.forEach(function (command) {
    return runCommand(command);
  });
}
},{"./logger":"isaH"}],"wBNZ":[function(require,module,exports) {
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
},{"./constants":"joHI"}],"iNgi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respondWithCliMessage = void 0;

var logger_1 = require("../logger");

function respondWithCliMessage(status, message) {
  switch (status) {
    case "success":
      logger_1.logger.log("All done! We've updated your npm configuration.");
      break;

    case "denied":
      logger_1.logger.log("You are not a member of the required access group.");
      break;

    default:
      logger_1.logger.error(message);
      break;
  }
}

exports.respondWithCliMessage = respondWithCliMessage;
},{"../logger":"isaH"}],"eNLw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegistry = exports.printUsage = exports.getUsageInfo = void 0;

var constants_1 = require("../constants");

var logger_1 = require("../logger");

var npm_1 = require("../npm");

function getUsageInfo() {
  return ["It seems you are using the default npm registry.", "Please update it to your Verdaccio URL by either running:", "", "npm config set registry <URL>", "", "or by using the registry argument", "", "npx verdaccio-".concat(constants_1.pluginName, " --registry <URL>")];
}

exports.getUsageInfo = getUsageInfo;

function printUsage() {
  getUsageInfo().forEach(function (line) {
    return logger_1.logger.log(line);
  });
}

exports.printUsage = printUsage;

function validateRegistry() {
  var registry = (0, npm_1.getRegistryUrl)();

  if (registry.includes("registry.npmjs.org")) {
    printUsage();
    process.exit(1);
  }

  return registry;
}

exports.validateRegistry = validateRegistry;
},{"../constants":"joHI","../logger":"isaH","../npm":"m9yh"}],"qSLj":[function(require,module,exports) {
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
},{"./constants":"joHI"}],"fd5L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respondWithWebPage = void 0;

var npm_1 = require("../npm");

var statusPage_1 = require("../statusPage");

var withBackButton = false;
var successPage = (0, statusPage_1.buildStatusPage)("<h1>All done!</h1>\n  <p>We've updated your npm configuration.</p>\n  <p><code>".concat((0, npm_1.getNpmConfigFile)(), "</code></p>"), withBackButton);

function respondWithWebPage(status, message, res) {
  res.setHeader("Content-Type", "text/html");

  switch (status) {
    case "success":
      res.status(200);
      res.send(successPage);
      break;

    case "denied":
      res.status(401);
      res.send((0, statusPage_1.buildAccessDeniedPage)(withBackButton));
      break;

    default:
      res.status(500);
      res.send((0, statusPage_1.buildErrorPage)(message, withBackButton));
      break;
  }
}

exports.respondWithWebPage = respondWithWebPage;
},{"../npm":"m9yh","../statusPage":"qSLj"}],"QCba":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var open_1 = __importDefault(require("open"));

var constants_1 = require("../constants");

var npm_1 = require("../npm");

var redirect_1 = require("../redirect");

var cli_response_1 = require("./cli-response");

var usage_1 = require("./usage");

var web_response_1 = require("./web-response");

var registry = (0, usage_1.validateRegistry)();
var authorizeUrl = registry + (0, redirect_1.getAuthorizePath)(constants_1.cliProviderId);
var server = (0, express_1.default)().get("/", function (req, res) {
  var status = req.query.status;
  var message = req.query.message;
  var token = decodeURIComponent(req.query.token); // We use `!status` for compatibility with plugin version <=2.3.0
  // where there was no error handling and status differentiation yet.

  if (!status) {
    status = "success";
  }

  try {
    if (status === "success") {
      (0, npm_1.saveNpmToken)(token);
    }
  } catch (error) {
    status = "error";
    message = error.message;
  }

  (0, web_response_1.respondWithWebPage)(status, message, res);
  (0, cli_response_1.respondWithCliMessage)(status, message);
  server.close();
  process.exit(status === "success" ? 0 : 1);
}).listen(constants_1.cliPort, function () {
  (0, open_1.default)(authorizeUrl);
});
},{"../constants":"joHI","../npm":"m9yh","../redirect":"wBNZ","./cli-response":"iNgi","./usage":"eNLw","./web-response":"fd5L"}]},{},["QCba"], null)
//# sourceMappingURL=/cli.js.map
