/* @aimitojs/utils version ' + 4.1.2 */
import { globalVar, AiMitoResourceFetchStartKey } from '@aimitojs/shared';
import { _global as _global$1 } from '@aimitojs/utils';

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}
var variableTypeDetection = {
    isNumber: isType("Number"),
    isString: isType("String"),
    isBoolean: isType("Boolean"),
    isNull: isType("Null"),
    isUndefined: isType("Undefined"),
    isSymbol: isType("Symbol"),
    isFunction: isType("Function"),
    isObject: isType("Object"),
    isArray: isType("Array"),
    isProcess: isType("process"),
    isWindow: isType("Window")
};
function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
function isEmptyObject(obj) {
    return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0;
}
function isEmpty(wat) {
    return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null;
}
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}
function isExistProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
    variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (isBrowserEnv || typeof window === 'object')
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalAiMitoSupport();
var _performance = window.performance;
function getGlobalAiMitoSupport() {
    _global.__AIMITO__ = _global.__AIMITO__ || {};
    return _global.__AIMITO__;
}
function supportsHistory() {
    var chrome = _global.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}

var PREFIX = 'AIMITO Logger';
var Logger = (function () {
    function Logger() {
        var _this = this;
        this.enabled = false;
        this._console = {};
        _global.console = console || _global.console;
        if (console || _global.console) {
            var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
            logType.forEach(function (level) {
                if (!(level in _global.console))
                    return;
                _this._console[level] = _global.console[level];
            });
        }
    }
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    Logger.prototype.bindOptions = function (debug) {
        this.enabled = debug ? true : false;
    };
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    Logger.prototype.getEnableStatus = function () {
        return this.enabled;
    };
    Logger.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).log.apply(_a, __spreadArray([PREFIX + "[Log]:"], args));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).warn.apply(_a, __spreadArray([PREFIX + "[Warn]:"], args));
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._console).error.apply(_a, __spreadArray([PREFIX + "[Error]:"], args));
    };
    return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}

function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
function getUrlWithEnv() {
    if (isWxMiniEnv)
        return getCurrentRoute();
    if (isBrowserEnv)
        return getLocationHref();
    return '';
}
function on(target, eventName, handler, opitons) {
    if (opitons === void 0) { opitons = false; }
    target.addEventListener(eventName, handler, opitons);
}
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (source === undefined)
        return;
    if (name in source || isForced) {
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
}
function throttle(fn, delay) {
    var canRun = true;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!canRun)
            return;
        canRun = false;
        setTimeout(function () {
            fn.apply(_this, args);
            canRun = true;
        }, delay);
    };
}
function isInclude(origin, target) {
    return !!~origin.indexOf(target);
}
function getTimestamp() {
    return Date.now();
}
function toStringAny(target, type) {
    return nativeToString.call(target) === "[object " + type + "]";
}
function toStringValidateOption(target, targetName, expectType) {
    if (toStringAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165:" + expectType + "\u7C7B\u578B\uFF0C\u5F53\u524D\u662F:" + nativeToString.call(target) + "\u7C7B\u578B");
    return false;
}
function silentConsoleScope(callback) {
    globalVar.isLogAddBreadcrumb = false;
    callback();
    globalVar.isLogAddBreadcrumb = true;
}
function generateUUID() {
    return v4();
}
function unknownToString(target) {
    if (variableTypeDetection.isString(target)) {
        return target;
    }
    if (variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}
function getBigVersion(version) {
    return Number(version.split('.')[0]);
}
function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}
function interceptStr(str, interceptLength) {
    if (variableTypeDetection.isString(str)) {
        return str.slice(0, interceptLength) + (str.length > interceptLength ? ";slice the first " + interceptLength + " characters" : '');
    }
    return '';
}
function getCurrentRoute() {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    var currentPage = pages.pop();
    return setUrlQuery(currentPage.route, currentPage.options);
}
function firstStrtoUppercase(str) {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return "" + $1.toUpperCase() + $2;
    });
}
function firstStrtoLowerCase(str) {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return "" + $1.toLowerCase() + $2;
    });
}
function safeStringify(obj) {
    var set = new Set();
    var str = JSON.stringify(obj, function (_key, value) {
        if (set.has(value)) {
            return 'Circular';
        }
        typeof value === 'object' && set.add(value);
        return value;
    });
    set.clear();
    return str;
}
function getObjectWithForIn(obj) {
    if (!variableTypeDetection.isObject(obj))
        return obj;
    var result = {};
    for (var key in obj) {
        result[key] = obj[key];
    }
    return result;
}
function validateOptionsAndSet(targetArr) {
    var _this = this;
    targetArr.forEach(function (_a) {
        var target = _a[0], targetName = _a[1], expectType = _a[2];
        return toStringValidateOption(target, targetName, expectType) && (_this[targetName] = target);
    });
}
function sleepRun(fn, delay) {
    if (delay === void 0) { delay = 200; }
    setTimeout(function () {
        fn();
    }, delay);
}
function deepClone(obj) {
    if (!obj && typeof obj !== "object") {
        throw new Error("deepClone error arguments");
    }
    var targetObj = obj.constructor === Array ? [] : {};
    Object.keys(obj).forEach(function (keys) {
        if (obj[keys] && typeof obj[keys] === "object") {
            targetObj[keys] = deepClone(obj[keys]);
        }
        else {
            targetObj[keys] = obj[keys];
        }
    });
    return targetObj;
}

function htmlElementAsString(target) {
    var tagName = target.tagName.toLowerCase();
    if (tagName === 'body') {
        return null;
    }
    var classNames = target.classList.value;
    classNames = classNames !== '' ? " class=\"" + classNames + "\"" : '';
    var id = target.id ? " id=\"" + target.id + "\"" : '';
    var innerText = target.innerText;
    return "<" + tagName + id + (classNames !== '' ? classNames : '') + ">" + innerText + "</" + tagName + ">";
}
function parseUrlToObj(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
    };
}
function getBreadcrumbCategoryInBrowser(type) {
    switch (type) {
        case "Xhr":
        case "Fetch":
            return "http";
        case "UI.Click":
        case "Route":
            return "user";
        case "Console":
            return "debug";
        case "Unhandledrejection":
        case "Code Error":
        case "Resource":
        default:
            return "exception";
    }
}
function extractErrorStack(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getUrlWithEnv(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = "UNKNOWN_FUNCTION";
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}
function completionUrl(url) {
    if (url && !url.startsWith('http')) {
        return window.location.origin + url;
    }
    return url;
}
function perforResource(_performance) {
    var resource = _performance.getEntriesByType('resource');
    var resourceList = [];
    if (!resource && !resource.length)
        return resourceList;
    var lastFetchStart = _global$1[AiMitoResourceFetchStartKey];
    resource.forEach(function (item) {
        if (item.fetchStart > ~~lastFetchStart
            && item.initiatorType != 'xmlhttprequest'
            && item.initiatorType != 'fetch') {
            var json = {
                name: item.name,
                type: item.initiatorType,
                duration: item.duration.toFixed(2) || 0,
                decodedBodySize: item.decodedBodySize || 0,
                nextHopProtocol: item.nextHopProtocol,
            };
            resourceList.push(json);
        }
    });
    var fetchStart = resource.length ? resource[resource.length - 1].fetchStart : 0;
    _global$1[AiMitoResourceFetchStartKey] = fetchStart + 1;
    return resourceList;
}

function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.error('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}

var Queue = (function () {
    function Queue() {
        this.stack = [];
        this.isFlushing = false;
        if (!('Promise' in _global))
            return;
        this.micro = Promise.resolve();
    }
    Queue.prototype.addTask = function (fn) {
        var _this = this;
        if (typeof fn !== 'function')
            return;
        if (!('Promise' in _global)) {
            fn();
            return;
        }
        this.stack.push(fn);
        if (!this.isFlushing) {
            this.isFlushing = true;
            this.micro.then(function () { return _this.flushStack(); });
        }
    };
    Queue.prototype.clear = function () {
        this.stack = [];
    };
    Queue.prototype.getStack = function () {
        return this.stack;
    };
    Queue.prototype.flushStack = function () {
        var temp = this.stack.slice(0);
        this.stack.length = 0;
        this.isFlushing = false;
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var fn = temp_1[_i];
            fn();
        }
    };
    return Queue;
}());

var Severity;
(function (Severity) {
    Severity["Else"] = "else";
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Info"] = "info";
    Severity["Debug"] = "debug";
    Severity["Low"] = "low";
    Severity["Normal"] = "normal";
    Severity["High"] = "high";
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
(function (Severity) {
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
            case 'log':
            case 'assert':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case Severity.Low:
            case Severity.Normal:
            case Severity.High:
            case Severity.Critical:
            case 'error':
                return Severity.Error;
            default:
                return Severity.Else;
        }
    }
    Severity.fromString = fromString;
})(Severity || (Severity = {}));

function fromHttpStatus(httpStatus) {
    if (httpStatus < 400) {
        return "ok";
    }
    if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
            case 401:
                return "unauthenticated";
            case 403:
                return "permission_denied";
            case 404:
                return "not_found";
            case 409:
                return "already_exists";
            case 413:
                return "failed_precondition";
            case 429:
                return "resource_exhausted";
            default:
                return "invalid_argument";
        }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
            case 501:
                return "unimplemented";
            case 503:
                return "unavailable";
            case 504:
                return "deadline_exceeded";
            default:
                return "internal_error";
        }
    }
    return "unknown_error";
}

var allErrorNumber = {};
function createErrorId(data, appKey, maxDuplicateCount) {
    var id;
    switch (data.type) {
        case "HTTP":
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + appKey;
            break;
        case "JAVASCRIPT":
        case "VUE":
        case "REACT":
            id = data.type + data.name + data.message + appKey;
            break;
        case "PROMISE":
            id = generatePromiseErrorId(data, appKey);
            break;
        default:
            id = data.type + data.message + appKey;
            break;
    }
    id = hashCode(id);
    if (allErrorNumber[id] >= maxDuplicateCount) {
        return null;
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++;
    }
    else {
        allErrorNumber[id] = 1;
    }
    return Math.abs(id);
}
function generatePromiseErrorId(data, appKey) {
    var locationUrl = getRealPath(data.url);
    if (data.name === "unhandledrejection") {
        return data.type + stringToObjAndOrder(data.message) + appKey;
    }
    return data.type + data.name + stringToObjAndOrder(data.message) + locationUrl;
}
function sortObjByKey(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (total, key) {
        if (variableTypeDetection.isObject(obj[key])) {
            total[key] = sortObjByKey(obj[key]);
        }
        else {
            total[key] = obj[key];
        }
        return total;
    }, {});
}
function stringToObjAndOrder(reason) {
    try {
        if (/\{.*\}/.test(reason)) {
            var obj = JSON.parse(reason);
            obj = sortObjByKey(obj);
            return JSON.stringify(obj);
        }
        return reason;
    }
    catch (error) {
        return reason;
    }
}
function getRealPath(url) {
    return url
        .replace(/[?#].*$/, '')
        .replace(/\/(\d+)\//g, '/{param}/$1')
        .replace(/\/\d+([/]*$)/g, '/{param}$1');
}
function getFlutterRealOrigin(url) {
    return removeHashPath(getFlutterRealPath(url));
}
function getFlutterRealPath(url) {
    return url.replace(/(\S+)(\/Documents\/)(\S*)/, "$3");
}
function removeHashPath(url) {
    return url.replace(/(\S+)(\/#\/)(\S*)/, "$1");
}
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}

function parseErrorString(str) {
    var splitLine = str.split('\n');
    if (splitLine.length < 2)
        return null;
    if (splitLine[0].indexOf('MiniProgramError') !== -1) {
        splitLine.splice(0, 1);
    }
    var message = splitLine.splice(0, 1)[0];
    var name = splitLine.splice(0, 1)[0].split(':')[0];
    var stack = [];
    splitLine.forEach(function (errorLine) {
        var regexpGetFun = /at\s+([\S]+)\s+\(/;
        var regexGetFile = /\(([^)]+)\)/;
        var regexGetFileNoParenthese = /\s+at\s+(\S+)/;
        var funcExec = regexpGetFun.exec(errorLine);
        var fileURLExec = regexGetFile.exec(errorLine);
        if (!fileURLExec) {
            fileURLExec = regexGetFileNoParenthese.exec(errorLine);
        }
        var funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : '';
        var fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : '';
        var lineInfo = fileURLMatch.split(':');
        stack.push({
            args: [],
            func: funcNameMatch || "UNKNOWN_FUNCTION",
            column: Number(lineInfo.pop()),
            line: Number(lineInfo.pop()),
            url: lineInfo.join(':')
        });
    });
    return {
        message: message,
        name: name,
        stack: stack
    };
}
function getBreadcrumbCategoryInWx(type) {
    switch (type) {
        case "Xhr":
            return "http";
        case "Route":
        case "UI.Tap":
        case "UI.Touchmove":
            return "user";
        case "Console":
            return "debug";
        case "App On Launch":
        case "App On Show":
        case "App On Hide":
        case "Page On Load":
        case "Page On Show":
        case "Page On Ready":
        case "Page On Hide":
        case "Page On Share App Message":
        case "Page On Share Timeline":
        case "Page On Tab Item Tap":
            return "lifecycle";
        case "Unhandledrejection":
        case "Code Error":
        case "Resource":
        case "Vue":
        case "React":
        default:
            return "exception";
    }
}
function getAppId() {
    return wx.getAccountInfoSync().miniProgram.appId;
}

var Storage = (function () {
    function Storage() {
    }
    Storage.prototype.setTrackerId = function () {
        var trackerId = this.getTrackerId();
        if (trackerId)
            return;
        localStorage.setItem("AiMito_tracker_id_key", generateUUID());
    };
    Storage.prototype.getTrackerId = function () {
        var trackerId = localStorage.getItem("AiMito_tracker_id_key");
        return trackerId;
    };
    Storage.prototype.setSessionId = function () {
        var sessionId = this.getSessionId();
        if (sessionId)
            return;
        sessionStorage.setItem("AiMito_session_id_key", generateUUID());
    };
    Storage.prototype.getSessionId = function () {
        var sessionId = sessionStorage.getItem("AiMito_session_id_key");
        return sessionId;
    };
    return Storage;
}());
var storage = new Storage();

var FirstScreen = (function () {
    function FirstScreen() {
        this.startTime = _performance.timing.navigationStart;
        this.calcFirstScreenTime = 'init';
        this.observerData = [];
    }
    FirstScreen.prototype.mountObserver = function () {
        var _this = this;
        if (!('MutationObserver' in _global)) {
            console.warn('MutationObserver 不支持，首屏时间无法被采集');
            return;
        }
        var observer = new window.MutationObserver(function () {
            var time = Date.now() - _this.startTime;
            var body = document.querySelector('body');
            var score = 0;
            if (body) {
                score = _this.traverseEl(body, 1, false);
                _this.observerData.push({ score: score, time: time });
            }
            else {
                _this.observerData.push({ score: 0, time: time });
            }
        });
        observer.observe(document, { childList: true, subtree: true });
        this.observer = observer;
        if (document.readyState === 'complete') {
            this.unmountObserver(10000, false);
        }
        else {
            window.addEventListener('load', function () {
                _this.unmountObserver(10000, false);
            }, false);
        }
        window.addEventListener('beforeunload', function () {
            if (_this.calcFirstScreenTime === 'pending') {
                _this.unmountObserver(0, true);
            }
        });
    };
    FirstScreen.prototype.traverseEl = function (element, layer, identify) {
        var height = _global.innerHeight || 0;
        var score = 0;
        var tagName = element.tagName;
        if (tagName !== 'SCRIPT' &&
            tagName !== 'STYLE' &&
            tagName !== 'META' &&
            tagName !== 'HEAD') {
            var len = element.children ? element.children.length : 0;
            if (len > 0) {
                for (var children = element.children, i = len - 1; i >= 0; i--) {
                    score += this.traverseEl(children[i], layer + 1, score > 0);
                }
            }
            if (score <= 0 && !identify) {
                if (element.getBoundingClientRect &&
                    element.getBoundingClientRect().top >= height) {
                    return 0;
                }
            }
            score += 1 + 0.5 * layer;
        }
        return score;
    };
    FirstScreen.prototype.removeSmallScore = function (observerData) {
        for (var i = 1; i < observerData.length; i++) {
            if (observerData[i].score < observerData[i - 1].score) {
                observerData.splice(i, 1);
                return this.removeSmallScore(observerData);
            }
        }
        return observerData;
    };
    FirstScreen.prototype.getfirstScreenTime = function () {
        this.observerData = this.removeSmallScore(this.observerData);
        var data = null;
        var observerData = this.observerData;
        if (observerData.length === 1) {
            data = { time: observerData[0].time, rate: observerData[0].score };
        }
        else {
            for (var i = 1; i < observerData.length; i++) {
                if (observerData[i].time >= observerData[i - 1].time) {
                    var scoreDiffer = observerData[i].score - observerData[i - 1].score;
                    if (!data || data.rate <= scoreDiffer) {
                        data = { time: observerData[i].time, rate: scoreDiffer };
                    }
                }
            }
        }
        if (data && data.time > 0 && data.time < 3600000) {
            this.callBack(data.time);
        }
    };
    FirstScreen.prototype.unmountObserver = function (delayTime, immediately) {
        var _this = this;
        if (this.observer) {
            this.calcFirstScreenTime = 'pending';
            if (immediately || this.compare(delayTime)) {
                this.observer.disconnect();
                this.observer = null;
                this.getfirstScreenTime();
                this.calcFirstScreenTime = 'finished';
            }
            else {
                setTimeout(function () {
                    _this.unmountObserver(delayTime, false);
                }, 500);
            }
        }
    };
    FirstScreen.prototype.compare = function (delayTime) {
        var _time = Date.now() - this.startTime;
        var observerData = this.observerData;
        var time = (observerData &&
            observerData.length &&
            observerData[observerData.length - 1].time) ||
            0;
        return _time > delayTime || _time - time > 2 * 500;
    };
    return FirstScreen;
}());

export { FirstScreen, Logger, Queue, Severity, Storage, _global, _performance, _support, completionUrl, createErrorId, deepClone, defaultFunctionName, extractErrorStack, firstStrtoLowerCase, firstStrtoUppercase, fromHttpStatus, generateUUID, getAppId, getBigVersion, getBreadcrumbCategoryInBrowser, getBreadcrumbCategoryInWx, getCurrentRoute, getFlutterRealOrigin, getFlutterRealPath, getFunctionName, getGlobal, getLocationHref, getObjectWithForIn, getRealPath, getTimestamp, getUrlWithEnv, hashCode, htmlElementAsString, interceptStr, isBrowserEnv, isEmpty, isEmptyObject, isError, isExistProperty, isInclude, isInstanceOf, isNodeEnv, isType, isWxMiniEnv, logger, nativeToString, nativeTryCatch, on, parseErrorString, parseUrlToObj, perforResource, removeHashPath, replaceOld, safeStringify, setUrlQuery, silentConsoleScope, sleepRun, sortObjByKey, storage, stringToObjAndOrder, supportsHistory, throttle, toStringAny, toStringValidateOption, unknownToString, validateOptionsAndSet, variableTypeDetection };
/* creator @it前端 */
//# sourceMappingURL=utils.esm.js.map
