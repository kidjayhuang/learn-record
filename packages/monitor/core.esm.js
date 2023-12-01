/* @aimitojs/core version ' + 4.1.2 */
import { apiStackMaxCount, globalVar, AiMitoApis, SDK_VERSION, SDK_NAME, AiMitoPerformance, AiMitoResource, AiMitoWebVitals, AiMitoLog, AiMitoView } from '@aimitojs/shared';
import { silentConsoleScope, deepClone, getTimestamp, logger, getLocationHref, toStringValidateOption, nativeTryCatch, getFunctionName, storage, validateOptionsAndSet, generateUUID, isInclude, Queue, isEmpty, createErrorId } from '@aimitojs/utils';

var Breadcrumb = (function () {
    function Breadcrumb(options, transport) {
        if (options === void 0) { options = {}; }
        this.maxBreadcrumbs = 20;
        this.silentApis = false;
        this.beforePushBreadcrumb = null;
        this.stack = [];
        this.apiStack = [];
        this.transport = null;
        this.bindOptions(options);
        this.transport = transport;
    }
    Breadcrumb.prototype.push = function (data) {
        var _this = this;
        if (data.url)
            data.url = this.transport.beautifyRestfulUrl(data);
        if (typeof this.beforePushBreadcrumb === 'function') {
            var result_1 = null;
            var beforePushBreadcrumb_1 = this.beforePushBreadcrumb;
            silentConsoleScope(function () {
                result_1 = beforePushBreadcrumb_1.call(_this, _this, data);
            });
            if (!result_1)
                return this.stack;
            return this.immediatePush(deepClone(result_1));
        }
        return this.immediatePush(deepClone(data));
    };
    Breadcrumb.prototype.immediatePush = function (data) {
        data.time || (data.time = getTimestamp());
        this.stack.push(data);
        logger.log(this.getStack());
        if (this.getStack().length > this.maxBreadcrumbs) {
            this.shift();
        }
        if (!this.silentApis && (data.type === "Xhr" || data.type === "Fetch")) {
            this.apiStack.push(data);
            if (this.getApiStack().length >= apiStackMaxCount) {
                globalVar.isLogAddBreadcrumb = false;
                this.transport.send({
                    type: "APIS",
                    url: getLocationHref(),
                    name: AiMitoApis,
                    time: getTimestamp(),
                    apis: this.getApiStack()
                });
                this.clearApiStack();
                globalVar.isLogAddBreadcrumb = true;
            }
        }
        return this.getStack();
    };
    Breadcrumb.prototype.shift = function () {
        return this.stack.shift() !== undefined;
    };
    Breadcrumb.prototype.clearApiStack = function () {
        this.apiStack = [];
    };
    Breadcrumb.prototype.getStack = function () {
        var stack = this.stack;
        return stack;
    };
    Breadcrumb.prototype.getApiStack = function () {
        var apiStack = this.apiStack;
        return apiStack;
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, silentApis = options.silentApis, beforePushBreadcrumb = options.beforePushBreadcrumb;
        this.silentApis = silentApis;
        toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', "Number") && (this.maxBreadcrumbs = maxBreadcrumbs);
        toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', "Function") &&
            (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());

var Subscribe = (function () {
    function Subscribe() {
        this.dep = new Map();
    }
    Subscribe.prototype.watch = function (eventName, callBack) {
        var fns = this.dep.get(eventName);
        if (fns) {
            this.dep.set(eventName, fns.concat(callBack));
            return;
        }
        this.dep.set(eventName, [callBack]);
    };
    Subscribe.prototype.notify = function (eventName, data) {
        var fns = this.dep.get(eventName);
        if (!eventName || !fns)
            return;
        fns.forEach(function (fn) {
            nativeTryCatch(function () {
                fn(data);
            }, function (e) {
                logger.error("Subscribe.notify\uFF1A\u76D1\u542C\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\neventName:" + eventName + "\nName: " + getFunctionName(fn) + "\nError: " + e);
            });
        });
    };
    return Subscribe;
}());

var BaseClient = (function () {
    function BaseClient(options) {
        this.SDK_VERSION = SDK_VERSION;
        storage.setTrackerId();
        storage.setSessionId();
        this.options = options;
        logger.bindOptions(options.debug);
    }
    BaseClient.prototype.use = function (plugins) {
        var _this = this;
        if (this.options.disabled)
            return;
        var subscribe = new Subscribe();
        plugins.forEach(function (item) {
            if (!_this.isPluginEnable(item.name))
                return;
            item.monitor.call(_this, subscribe.notify.bind(subscribe));
            var wrapperTransform = function () {
                var _a, _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var res = (_a = item.transform) === null || _a === void 0 ? void 0 : _a.apply(_this, args);
                (_b = item.consumer) === null || _b === void 0 ? void 0 : _b.call(_this, res);
            };
            subscribe.watch(item.name, wrapperTransform);
        });
    };
    BaseClient.prototype.getOptions = function () {
        return this.options;
    };
    return BaseClient;
}());

var BaseOptions = (function () {
    function BaseOptions() {
        this.enableTraceId = false;
        this.enableEnvId = false;
        this.disabled = false;
        this.appKey = '';
        this.includeHttpUrlTraceIdRegExp = /.*/;
        this.includeHttpUrlEnvIdRegExp = /.*/;
        this.beautifyRestfulUrlRegExps = null;
        this.traceIdFieldName = 'midea-gtrace-id';
        this.envIdFieldName = 'midea-env-id';
        this.throttleDelayTime = 0;
        this.beforeAppAjaxSend = null;
        this.vue = null;
    }
    BaseOptions.prototype.bindOptions = function (options) {
        var enableTraceId = options.enableTraceId, enableEnvId = options.enableEnvId, disabled = options.disabled, appKey = options.appKey, vue = options.vue, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, throttleDelayTime = options.throttleDelayTime, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp, includeHttpUrlEnvIdRegExp = options.includeHttpUrlEnvIdRegExp, beautifyRestfulUrlRegExps = options.beautifyRestfulUrlRegExps, beforeAppAjaxSend = options.beforeAppAjaxSend;
        var optionArr = [
            [enableTraceId, 'enableTraceId', "Boolean"],
            [enableEnvId, 'enableEnvId', "Boolean"],
            [disabled, 'disabled', "Boolean"],
            [appKey, 'appKey', "String"],
            [traceIdFieldName, 'traceIdFieldName', "String"],
            [throttleDelayTime, 'throttleDelayTime', "Number"],
            [filterXhrUrlRegExp, 'filterXhrUrlRegExp', "RegExp"],
            [includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', "RegExp"],
            [includeHttpUrlEnvIdRegExp, 'includeHttpUrlEnvIdRegExp', "RegExp"],
            [beautifyRestfulUrlRegExps, 'beautifyRestfulUrlRegExps', "Array"],
            [beforeAppAjaxSend, 'beforeAppAjaxSend', "Function"]
        ];
        validateOptionsAndSet.call(this, optionArr);
        this.vue = vue;
    };
    BaseOptions.prototype.isFilterHttpUrl = function (url) {
        return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url);
    };
    BaseOptions.prototype.setTraceId = function (httpUrl, callback) {
        var _a = this, includeHttpUrlTraceIdRegExp = _a.includeHttpUrlTraceIdRegExp, enableTraceId = _a.enableTraceId;
        if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
            var traceId = generateUUID();
            callback(this.traceIdFieldName, traceId);
        }
    };
    BaseOptions.prototype.setEnvId = function (httpUrl, callback) {
        var _a = this, includeHttpUrlEnvIdRegExp = _a.includeHttpUrlEnvIdRegExp, enableEnvId = _a.enableEnvId;
        if (enableEnvId && includeHttpUrlEnvIdRegExp && includeHttpUrlEnvIdRegExp.test(httpUrl)) {
            callback(this.envIdFieldName, "appKey:" + this.appKey);
        }
    };
    return BaseOptions;
}());

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
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var BaseTransport = (function () {
    function BaseTransport() {
        this.appKey = '';
        this.serviceName = '';
        this.version = '';
        this.dsn = '';
        this.beforeDataReport = null;
        this.backUserId = null;
        this.configReportUrl = null;
        this.maxDuplicateCount = 2;
        this.queue = new Queue();
    }
    BaseTransport.prototype.getAuthInfo = function () {
        var trackerId = storage.getTrackerId();
        var userId = this.getUserId();
        var connection = {};
        if (navigator['connection']) {
            connection = {
                effectiveType: navigator['connection']['effectiveType'],
                downlink: navigator['connection']['downlink'],
                rtt: navigator['connection']['rtt'],
            };
        }
        var result = {
            trackerId: String(trackerId),
            sessionId: storage.getSessionId(),
            sdkVersion: SDK_VERSION,
            sdkName: SDK_NAME,
            version: this.version,
            userId: String(userId),
            appKey: this.appKey,
            serviceName: this.serviceName,
            userAgent: navigator['userAgent'],
            connection: connection,
        };
        return result;
    };
    BaseTransport.prototype.getUserId = function () {
        if (typeof this.backUserId === 'function') {
            var userId = this.backUserId();
            if (typeof userId === 'string' || typeof userId === 'number') {
                return userId;
            }
            else {
                logger.error("userId:" + userId + " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 " + typeof userId);
            }
        }
        return '';
    };
    BaseTransport.prototype.beautifyRestfulUrl = function (data) {
        var targetUrl = data.url;
        var regExpArr = this.getBeautifyRestfulUrlRegExps();
        if (regExpArr && regExpArr.length != 0) {
            regExpArr.map(function (regExp) {
                targetUrl = targetUrl.replace(regExp, function () {
                    var rest = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        rest[_i] = arguments[_i];
                    }
                    var final = rest.slice(0, rest.length - 2).reduce(function (prev, cur) {
                        return prev.replace(cur, '**');
                    });
                    return final;
                });
            });
        }
        return targetUrl;
    };
    BaseTransport.prototype.getBeautifyRestfulUrlRegExps = function () {
        return __spreadArray([
            /\?(\S*)/
        ], (this.beautifyRestfulUrlRegExps ? this.beautifyRestfulUrlRegExps : []));
    };
    BaseTransport.prototype.isSelfDsn = function (targetUrl) {
        return this.dsn && isInclude(targetUrl, this.dsn);
    };
    BaseTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var dsn = options.dsn, beforeDataReport = options.beforeDataReport, appKey = options.appKey, serviceName = options.serviceName, version = options.version, maxDuplicateCount = options.maxDuplicateCount, backUserId = options.backUserId, configReportUrl = options.configReportUrl, beautifyRestfulUrlRegExps = options.beautifyRestfulUrlRegExps;
        var functionType = "Function";
        var optionArr = [
            [appKey, 'appKey', "String"],
            [serviceName, 'serviceName', "String"],
            [version, 'version', "String"],
            [dsn, 'dsn', "String"],
            [maxDuplicateCount, 'maxDuplicateCount', "Number"],
            [beforeDataReport, 'beforeDataReport', functionType],
            [backUserId, 'backUserId', functionType],
            [configReportUrl, 'configReportUrl', functionType],
            [beautifyRestfulUrlRegExps, 'beautifyRestfulUrlRegExps', "Array"],
        ];
        validateOptionsAndSet.call(this, optionArr);
    };
    BaseTransport.prototype.send = function (data, breadcrumb) {
        if (breadcrumb === void 0) { breadcrumb = []; }
        return __awaiter(this, void 0, void 0, function () {
            var errorId, transportData, dsn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.isTrack
                            && data.name !== AiMitoPerformance
                            && data.name !== AiMitoResource
                            && data.name !== AiMitoApis
                            && data.name !== AiMitoWebVitals
                            && data.name !== AiMitoLog
                            && data.name !== AiMitoView) {
                            errorId = createErrorId(data, this.appKey, this.maxDuplicateCount);
                            if (!errorId)
                                return [2];
                            data.errorId = errorId;
                            data.breadcrumb = breadcrumb;
                        }
                        if (data.url)
                            data.url = this.beautifyRestfulUrl(data);
                        transportData = __assign({}, this.getTransportData(data));
                        if (!(typeof this.beforeDataReport === 'function')) return [3, 2];
                        return [4, this.beforeDataReport(transportData)];
                    case 1:
                        transportData = _a.sent();
                        if (!transportData)
                            return [2];
                        _a.label = 2;
                    case 2:
                        dsn = this.dsn;
                        if (isEmpty(dsn)) {
                            logger.error('dsn is empty,pass in when initializing please');
                            return [2];
                        }
                        if (typeof this.configReportUrl === 'function') {
                            dsn = this.configReportUrl(transportData, dsn);
                            if (!dsn)
                                return [2];
                        }
                        return [2, this.sendToServer(transportData, dsn)];
                }
            });
        });
    };
    return BaseTransport;
}());

export { BaseClient, BaseOptions, BaseTransport, Breadcrumb, Subscribe };
/* creator @it前端 */
//# sourceMappingURL=core.esm.js.map
