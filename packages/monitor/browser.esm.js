/* @aimitojs/browser version ' + 4.1.2 */
import { BaseOptions, BaseTransport, Breadcrumb, BaseClient } from '@aimitojs/core';
import { validateOptionsAndSet, isEmpty, logger, toStringValidateOption, safeStringify, firstStrtoUppercase, variableTypeDetection, unknownToString, getTimestamp, getLocationHref, Severity, getBreadcrumbCategoryInBrowser, _global, replaceOld, completionUrl, on, fromHttpStatus, getRealPath, interceptStr, isError, extractErrorStack, FirstScreen, _performance, perforResource, htmlElementAsString, isExistProperty, parseUrlToObj, supportsHistory } from '@aimitojs/utils';
import { Silent, AiMitoLog, AiMitoView, AiMitoLogEmptyMsg, AiMitoLogEmptyTag, globalVar, ERROR_TYPE_RE, AiMitoPerformance, AiMitoResource, AiMitoApis, AiMitoWebVitals } from '@aimitojs/shared';
import { onCLS, onLCP, onFCP, onTTFB, onFID } from 'web-vitals';

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
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

var BrowserOptions = (function (_super) {
    __extends(BrowserOptions, _super);
    function BrowserOptions(options) {
        var _this = _super.call(this) || this;
        _this.configReportXhr = null;
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    BrowserOptions.prototype.bindOptions = function (options) {
        var silentXhr = options.silentXhr, silentFetch = options.silentFetch, silentPerformance = options.silentPerformance, silentResource = options.silentResource, silentApis = options.silentApis, silentWebvitals = options.silentWebvitals, silentConsole = options.silentConsole, silentDom = options.silentDom, silentHistory = options.silentHistory, silentError = options.silentError, silentHashchange = options.silentHashchange, silentUnhandledrejection = options.silentUnhandledrejection, useImgUpload = options.useImgUpload, configReportXhr = options.configReportXhr;
        var booleanType = "Boolean";
        var optionArr = [
            [silentXhr, 'silentXhr', booleanType],
            [silentFetch, 'silentFetch', booleanType],
            [silentPerformance, 'silentPerformance', booleanType],
            [silentResource, 'silentResource', booleanType],
            [silentApis, 'silentApis', booleanType],
            [silentWebvitals, 'silentWebvitals', booleanType],
            [silentConsole, 'silentConsole', booleanType],
            [silentDom, 'silentDom', booleanType],
            [silentHistory, 'silentHistory', booleanType],
            [silentError, 'silentError', booleanType],
            [silentHashchange, 'silentHashchange', booleanType],
            [silentUnhandledrejection, 'silentUnhandledrejection', booleanType],
            [useImgUpload, 'useImgUpload', booleanType],
            [configReportXhr, 'configReportXhr', "Function"]
        ];
        validateOptionsAndSet.call(this, optionArr);
    };
    return BrowserOptions;
}(BaseOptions));

var BrowserTransport = (function (_super) {
    __extends(BrowserTransport, _super);
    function BrowserTransport(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.useImgUpload = false;
        _this.appKey = '';
        _this.serviceName = '';
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    BrowserTransport.prototype.post = function (data, url) {
        var _this = this;
        if (isEmpty(this.appKey)) {
            logger.error('appKey is empty,pass in when initializing please');
            return;
        }
        if (isEmpty(this.serviceName)) {
            logger.error('serviceName is empty,pass in when initializing please');
            return;
        }
        if ('sendBeacon' in navigator && data.data.eventName === 'beforeunload') {
            var beanconReauest = function () {
                var res = navigator.sendBeacon(url, JSON.stringify(safeStringify(data)));
                if (!res) {
                    var requestFun_1 = function () {
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", url, true);
                        _this.setCommonXhrHeader(xhr);
                        xhr.withCredentials = true;
                        if (typeof _this.configReportXhr === 'function') {
                            _this.configReportXhr(xhr, data);
                        }
                        xhr.send(safeStringify(data));
                    };
                    return _this.queue.addTask(requestFun_1);
                }
            };
            return this.queue.addTask(beanconReauest);
        }
        var requestFun = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            _this.setCommonXhrHeader(xhr);
            xhr.withCredentials = true;
            if (typeof _this.configReportXhr === 'function') {
                _this.configReportXhr(xhr, data);
            }
            xhr.send(safeStringify(data));
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.setCommonXhrHeader = function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    };
    BrowserTransport.prototype.imgRequest = function (data, url) {
        var requestFun = function () {
            var img = new Image();
            var spliceStr = url.indexOf('?') === -1 ? '?' : '&';
            img.src = "" + url + spliceStr + "data=" + encodeURIComponent(safeStringify(data));
            img = null;
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.sendToServer = function (data, url) {
        return this.useImgUpload ? this.imgRequest(data, url) : this.post(data, url);
    };
    BrowserTransport.prototype.getTransportData = function (data) {
        return {
            authInfo: this.getAuthInfo(),
            data: data
        };
    };
    BrowserTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var configReportXhr = options.configReportXhr, useImgUpload = options.useImgUpload, appKey = options.appKey, serviceName = options.serviceName;
        toStringValidateOption(configReportXhr, 'configReportXhr', "Function") && (this.configReportXhr = configReportXhr);
        toStringValidateOption(useImgUpload, 'useImgUpload', "Boolean") && (this.useImgUpload = useImgUpload);
        toStringValidateOption(appKey, 'appKey', "String") && (this.appKey = appKey);
        toStringValidateOption(serviceName, 'serviceName', "String") && (this.serviceName = serviceName);
    };
    return BrowserTransport;
}(BaseTransport));

var BrowserClient = (function (_super) {
    __extends(BrowserClient, _super);
    function BrowserClient(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.options = new BrowserOptions(options);
        _this.transport = new BrowserTransport(options);
        _this.breadcrumb = new Breadcrumb(options, _this.transport);
        _this.reportPageView();
        return _this;
    }
    BrowserClient.prototype.isPluginEnable = function (name) {
        var silentField = "" + Silent + firstStrtoUppercase(name);
        return !this.options[silentField];
    };
    BrowserClient.prototype.log = function (data) {
        var _a = data.message, message = _a === void 0 ? AiMitoLogEmptyMsg : _a, _b = data.tag, tag = _b === void 0 ? AiMitoLogEmptyTag : _b;
        var msg = variableTypeDetection.isNumber(message) ? message : unknownToString(message);
        var logData = {
            type: "LOG",
            message: msg,
            name: AiMitoLog,
            tag: unknownToString(tag),
            time: getTimestamp(),
            url: getLocationHref(),
        };
        this.transport.send(logData, this.breadcrumb.getStack());
    };
    BrowserClient.prototype.reportPageView = function () {
        if (this.options.disabled)
            return;
        var data = {
            type: "VIEW",
            url: getLocationHref(),
            name: AiMitoView,
            time: getTimestamp(),
        };
        this.transport.send(data, this.breadcrumb.getStack());
    };
    return BrowserClient;
}(BaseClient));

function addBreadcrumbInBrowser(data, type, level, params) {
    if (level === void 0) { level = Severity.Info; }
    if (params === void 0) { params = {}; }
    if (data.url)
        data.url = this.transport.beautifyRestfulUrl(data);
    return this.breadcrumb.push(__assign(__assign({ type: type, data: data, category: getBreadcrumbCategoryInBrowser(type), level: level }, params), { url: getLocationHref() }));
}

var xhrPlugin = {
    name: "xhr",
    monitor: function (notify) {
        monitorXhr.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorXhr(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('XMLHttpRequest' in _global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.httpCollect = {
                request: {
                    httpType: "xhr",
                    method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                    url: completionUrl(args[1])
                },
                response: {},
                time: getTimestamp()
            };
            originalOpen.apply(this, args);
        };
    });
    replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var request = this.httpCollect.request;
            var method = request.method, url = request.url;
            if (!transport.isSelfDsn(url)) {
                options.setTraceId(url, function (headerFieldName, traceId) {
                    request.traceId = traceId;
                    _this.setRequestHeader(headerFieldName, traceId);
                });
            }
            options.setEnvId(url, function (headerFieldName, envId) {
                _this.setRequestHeader(headerFieldName, envId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, this);
            on(this, 'loadend', function () {
                var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
                if (isBlock)
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                request.data = args[0];
                var eTime = getTimestamp();
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.httpCollect.response.data = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.httpCollect.response.status = status;
                this.httpCollect.response.envId = this.getResponseHeader('Midea-Env-Id') || '';
                this.httpCollect.response.gtraceId = this.getResponseHeader('Midea-Gtrace-Id') || '';
                this.httpCollect.response.ntraceId = this.getResponseHeader('Midea-Ntrace-Id') || '';
                this.httpCollect.elapsedTime = eTime - this.httpCollect.time;
                notify("xhr", this.httpCollect);
            });
            originalSend.apply(this, args);
        };
    });
}
function httpTransform(httpCollectedData) {
    var message = '';
    var _a = httpCollectedData.request, httpType = _a.httpType, method = _a.method, url = _a.url, status = httpCollectedData.response.status, elapsedTime = httpCollectedData.elapsedTime;
    var name = httpType + "--" + method;
    if (status === 0) {
        message =
            elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = fromHttpStatus(status);
    }
    message = message === "ok" ? message : message + " " + getRealPath(url);
    return __assign(__assign({}, httpCollectedData), { type: "HTTP", url: getLocationHref(), level: Severity.Low, message: message, name: name });
}
function httpTransformedDataConsumer(transformedData) {
    var type = transformedData.request.httpType === "fetch" ? "Fetch" : "Xhr";
    if (transformedData.request.url)
        transformedData.request.url = this.transport.beautifyRestfulUrl(transformedData.request);
    if (transformedData.url)
        transformedData.url = this.transport.beautifyRestfulUrl(transformedData);
    var status = transformedData.response.status, time = transformedData.time;
    var isError = status === 0 || status === 400 || status > 401;
    if (isError) {
        var breadcrumStack = this.breadcrumb.push({
            type: type,
            category: "exception",
            data: transformedData,
            level: Severity.Error,
            time: time,
            url: getLocationHref()
        });
        this.transport.send(transformedData, breadcrumStack);
        return;
    }
    if (transformedData.request.data)
        delete transformedData.request.data;
    if (transformedData.response.data)
        delete transformedData.response.data;
    addBreadcrumbInBrowser.call(this, transformedData, type, Severity.Info, { time: time });
}

var fetchPlugin = {
    name: "fetch",
    monitor: function (notify) {
        monitorFetch.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorFetch(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('fetch' in _global)) {
        return;
    }
    replaceOld(_global, "fetch", function (originalFetch) {
        return function (httpUrl, config) {
            if (config === void 0) { config = {}; }
            var url = completionUrl(httpUrl);
            var sTime = getTimestamp();
            var method = (config && config.method) || 'GET';
            var httpCollect = {
                request: {
                    httpType: "fetch",
                    url: url,
                    method: method,
                    data: config && config.body
                },
                time: sTime,
                response: {}
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            if (!transport.isSelfDsn(url)) {
                options.setTraceId(url, function (headerFieldName, traceId) {
                    httpCollect.request.traceId = traceId;
                    headers.set(headerFieldName, traceId);
                });
            }
            options.setEnvId(url, function (headerFieldName, envId) {
                headers.set(headerFieldName, envId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
            return originalFetch.apply(_global, [url, config]).then(function (res) {
                var resClone = res.clone();
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = resClone.status;
                httpCollect.response.envId = resClone.headers.get('Midea-Env-Id') || '';
                httpCollect.response.gtraceId = resClone.headers.get('Midea-Gtrace-Id') || '';
                httpCollect.response.ntraceId = resClone.headers.get('Midea-Ntrace-Id') || '';
                resClone.text().then(function (data) {
                    if (isBlock)
                        return;
                    httpCollect.response.data = data;
                    notify("fetch", httpCollect);
                });
                return res;
            }, function (err) {
                if (isBlock)
                    return;
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = 0;
                httpCollect.response.envId = '';
                httpCollect.response.gtraceId = '';
                httpCollect.response.ntraceId = '';
                notify("fetch", httpCollect);
                throw err;
            });
        };
    });
}

var errorPlugin = {
    name: "error",
    monitor: function (notify) {
        on(_global, 'error', function (e) {
            notify("error", e);
        }, true);
    },
    transform: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            return resourceTransform(errorEvent.target);
        }
        return codeErrorTransform(errorEvent);
    },
    consumer: function (transformedData) {
        var type = transformedData.type === "RESOURCE" ? "Resource" : "Code Error";
        var breadcrumbStack = addBreadcrumbInBrowser.call(this, transformedData, type, Severity.Error);
        this.transport.send(transformedData, breadcrumbStack);
    }
};
var resourceMap = {
    img: '图片',
    script: 'JS脚本'
};
function resourceTransform(target) {
    return {
        type: "RESOURCE",
        url: getLocationHref(),
        message: '资源地址: ' + (interceptStr(target.src, 120) || interceptStr(target.href, 120)),
        level: Severity.Low,
        time: getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}
function codeErrorTransform(errorEvent) {
    var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
    var result;
    if (error && isError(error)) {
        result = extractErrorStack(error, Severity.Normal);
    }
    result || (result = handleNotErrorInstance(message, filename, lineno, colno));
    result.type = "JAVASCRIPT";
    return result;
}
function handleNotErrorInstance(message, filename, lineno, colno) {
    var name = "UNKNOWN";
    var url = filename || getLocationHref();
    var msg = message;
    var matches = message.match(ERROR_TYPE_RE);
    if (matches[1]) {
        name = matches[1];
        msg = matches[2];
    }
    var element = {
        url: url,
        func: "UNKNOWN_FUNCTION",
        args: "UNKNOWN",
        line: lineno,
        col: colno
    };
    return {
        url: url,
        name: name,
        message: msg,
        level: Severity.Normal,
        time: getTimestamp(),
        stack: [element]
    };
}

var name$4 = "unhandledrejection";
var unhandlerejectionPlugin = {
    name: name$4,
    monitor: function (notify) {
        on(_global, name$4, function (ev) {
            notify(name$4, ev);
        });
    },
    transform: function (collectedData) {
        var data = {
            type: "PROMISE",
            message: unknownToString(collectedData.reason),
            url: getLocationHref(),
            name: collectedData.type,
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(collectedData.reason)) {
            data = __assign(__assign({}, data), extractErrorStack(collectedData.reason, Severity.Low));
        }
        return data;
    },
    consumer: function (transformedData) {
        var breadcrumbStack = addBreadcrumbInBrowser.call(this, transformedData, "Unhandledrejection", Severity.Error);
        this.transport.send(transformedData, breadcrumbStack);
    }
};

var name$3 = "Performance";
var performancePlugin = {
    name: name$3,
    monitor: function (notify) {
        if (!('performance' in _global)) {
            return;
        }
        var fs = new FirstScreen();
        fs.mountObserver();
        fs.callBack = (function (t) {
            notify(name$3, t);
        });
    },
    transform: function (firstScreen) {
        var performanceTiming = _performance.timing;
        var navigation = _performance.getEntriesByType('navigation');
        var data = {
            type: "PERFORMANCE",
            url: getLocationHref(),
            name: AiMitoPerformance,
            time: getTimestamp(),
            firstScreen: firstScreen,
            performanceTiming: performanceTiming,
            performanceNavigationTiming: (navigation && navigation.length > 0 ? navigation[0] : {})
        };
        return data;
    },
    consumer: function (transformedData) {
        this.transport.send(transformedData, this.breadcrumb.getStack());
    }
};

var name$2 = "Resource";
var resourcePlugin = {
    name: name$2,
    monitor: function (notify) {
        if (!('getEntries' in _performance))
            return;
        on(_global, 'load', function () {
            notify(name$2, {});
        });
    },
    transform: function () {
        var _a = this, options = _a.options, transport = _a.transport;
        var resource = perforResource(_performance).filter(function (item) {
            var isBlock = transport.isSelfDsn(item.name) || options.isFilterHttpUrl(item.name);
            return !isBlock;
        });
        if (resource.length === 0)
            return;
        var data = {
            type: "RESOURCE_PM",
            url: getLocationHref(),
            name: AiMitoResource,
            time: getTimestamp(),
            resource: resource,
        };
        return data;
    },
    consumer: function (transformedData) {
        if (transformedData)
            this.transport.send(transformedData, this.breadcrumb.getStack());
    }
};

var name$1 = "Apis";
var apisPlugin = {
    name: name$1,
    monitor: function (notify) {
        on(_global, 'beforeunload', function (e) {
            e.preventDefault();
            notify(name$1, e);
        });
    },
    transform: function (collectedData) {
        var data = {
            type: "APIS",
            url: getLocationHref(),
            name: AiMitoApis,
            time: getTimestamp(),
            eventName: 'beforeunload',
            apis: this.breadcrumb.getApiStack()
        };
        return data;
    },
    consumer: function (transformedData) {
        if (this.breadcrumb.getApiStack().length === 0)
            return;
        this.transport.send(transformedData, this.breadcrumb.getStack());
    }
};

var name = "WebVitals";
var webVitalsPlugin = {
    name: name,
    monitor: function (notify) {
        if (!('PerformanceObserver' in _global)) {
            return;
        }
        onCLS(function (cls) {
            if (cls.value < 0)
                return;
            notify(name, [cls]);
        });
        onLCP(function (lcp) {
            if (lcp.value <= 0)
                return;
            notify(name, [lcp]);
        });
        onFCP(function (fcp) {
            if (fcp.value <= 0)
                return;
            notify(name, [fcp]);
        });
        onTTFB(function (ttfb) {
            if (ttfb.value <= 0)
                return;
            notify(name, [ttfb]);
        });
        onFID(function (fid) {
            if (fid.value <= 0)
                return;
            notify(name, [fid]);
        });
    },
    transform: function (webVitals) {
        var data = {
            type: "WEBVITALS",
            url: getLocationHref(),
            name: AiMitoWebVitals,
            time: getTimestamp(),
            webVitals: webVitals
        };
        return data;
    },
    consumer: function (transformedData) {
        this.transport.send(transformedData, this.breadcrumb.getStack());
    }
};

var domPlugin = {
    name: "dom",
    monitor: function (notify) {
        if (!('document' in _global))
            return;
        on(_global.document, 'click', function () {
            notify("dom", {
                category: 'click',
                data: this
            });
        }, true);
    },
    transform: function (collectedData) {
        var htmlString = htmlElementAsString(collectedData.data.activeElement);
        return htmlString;
    },
    consumer: function (transformedData) {
        if (transformedData) {
            addBreadcrumbInBrowser.call(this, transformedData, "UI.Click");
        }
    }
};

var hashRoutePlugin = {
    name: "hashchange",
    monitor: function (notify) {
        if (!isExistProperty(_global, 'onpopstate')) {
            on(_global, "hashchange", function (e) {
                var from = e.oldURL, to = e.newURL;
                notify("hashchange", { from: from, to: to });
                if (_performance.getEntries) {
                    notify("Resource", {});
                }
            });
        }
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};
function routeTransform(collectedData) {
    var from = collectedData.from, to = collectedData.to;
    var parsedFrom = parseUrlToObj(from).relative;
    var parsedTo = parseUrlToObj(to).relative;
    return {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/'
    };
}
function routeTransformedConsumer(transformedData) {
    if (transformedData.from === transformedData.to)
        return;
    addBreadcrumbInBrowser.call(this, transformedData, "Route");
}

var historyRoutePlugin = {
    name: "history",
    monitor: function (notify) {
        var lastHref;
        if (!supportsHistory())
            return;
        var oldOnpopstate = _global.onpopstate;
        _global.onpopstate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var to = getLocationHref();
            var from = lastHref;
            lastHref = to;
            notify("history", {
                from: from,
                to: to
            });
            if (_performance.getEntries) {
                notify("Resource", {});
            }
            oldOnpopstate && oldOnpopstate.apply(this, args);
        };
        function historyReplaceFn(originalHistoryFn) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args.length > 2 ? args[2] : undefined;
                if (url) {
                    var from = lastHref;
                    var to = String(url);
                    lastHref = to;
                    notify("history", {
                        from: from,
                        to: to
                    });
                    if (_performance.getEntries) {
                        notify("Resource", {});
                    }
                }
                return originalHistoryFn.apply(this, args);
            };
        }
        replaceOld(_global.history, 'pushState', historyReplaceFn);
        replaceOld(_global.history, 'replaceState', historyReplaceFn);
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};

function createBrowserInstance(options, plugins) {
    if (options === void 0) { options = {}; }
    if (plugins === void 0) { plugins = []; }
    var browserClient = new BrowserClient(options);
    var browserPlugins = [
        fetchPlugin,
        xhrPlugin,
        errorPlugin,
        unhandlerejectionPlugin,
        performancePlugin,
        resourcePlugin,
        apisPlugin,
        webVitalsPlugin,
        domPlugin,
        hashRoutePlugin,
        historyRoutePlugin,
    ];
    browserClient.use(__spreadArray(__spreadArray([], browserPlugins), plugins));
    return browserClient;
}
var init = createBrowserInstance;

export { BrowserClient, createBrowserInstance, init };
/* creator @it前端 */
//# sourceMappingURL=browser.esm.js.map
