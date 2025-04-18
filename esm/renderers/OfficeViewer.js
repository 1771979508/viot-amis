/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isApiOutdated, filter, resolveVariableAndFilter, createObject, ScopedContext, Renderer } from 'amis-core';
import { Spinner } from 'amis-ui';

/**
 * office 文件预览
 */
var OfficeViewer = /** @class */ (function (_super) {
    __extends(OfficeViewer, _super);
    function OfficeViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElement = React.createRef();
        _this.state = {
            loading: false
        };
        return _this;
    }
    OfficeViewer.prototype.componentDidMount = function () {
        var _a;
        if ((_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.current) {
            this.renderWord();
        }
    };
    OfficeViewer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a, _b;
        // 避免 loading 时更新
        if (this.state.loading) {
            return;
        }
        var props = this.props;
        if (isApiOutdated(prevProps.src, props.src, prevProps.data, props.data)) {
            this.fetchWord().then(function () {
                _this.renderWord();
            });
        }
        if (props.name) {
            if (prevProps.data[props.name] !== props.data[props.name]) {
                this.renderWord();
            }
        }
        if (JSON.stringify(prevProps.wordOptions) !==
            JSON.stringify(props.wordOptions) ||
            prevProps.display !== props.display) {
            this.renderWord();
        }
        if ((_a = props.wordOptions) === null || _a === void 0 ? void 0 : _a.enableVar) {
            if (props.trackExpression &&
                filter(props.trackExpression, props.data) !==
                    filter(prevProps.trackExpression, prevProps.data)) {
                this.renderWord();
            }
            else {
                // 默认只更新变量提升性能
                (_b = this.office) === null || _b === void 0 ? void 0 : _b.updateVariable();
            }
        }
    };
    /**
     * 接收动作事件
     */
    OfficeViewer.prototype.doAction = function (action, data, throwErrors, args) {
        var _a, _b;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'saveAs') {
            (_a = this.office) === null || _a === void 0 ? void 0 : _a.download((args === null || args === void 0 ? void 0 : args.name) || this.fileName);
        }
        if (actionType === 'print') {
            (_b = this.office) === null || _b === void 0 ? void 0 : _b.print();
        }
    };
    /**
     * 执行变量替换
     */
    OfficeViewer.prototype.evalVar = function (text, data) {
        var localData = this.props.data;
        return resolveVariableAndFilter('${' + text + '}', createObject(data, localData), '| raw');
    };
    OfficeViewer.prototype.renderWord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, src, name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, src = _a.src, name = _a.name;
                        if (!src) return [3 /*break*/, 4];
                        if (!!this.document) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchWord()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.renderRemoteWord()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (name) {
                            this.renderFormFile();
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OfficeViewer.prototype.fetchWord = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, env, src, data, __, finalSrc, resolveSrc, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, env = _b.env, src = _b.src, data = _b.data, __ = _b.translate;
                        resolveSrc = src
                            ? resolveVariableAndFilter(src, data, '| raw')
                            : undefined;
                        if (typeof resolveSrc === 'string') {
                            finalSrc = resolveSrc;
                            this.fileName = finalSrc.split('/').pop();
                        }
                        else if (typeof resolveSrc === 'object' &&
                            typeof resolveSrc.value === 'string') {
                            finalSrc = resolveSrc.value;
                            this.fileName = resolveSrc.name || finalSrc.split('/').pop();
                        }
                        if (!finalSrc) {
                            console.warn('file src is empty');
                            return [2 /*return*/];
                        }
                        this.finalSrc = finalSrc;
                        this.setState({
                            loading: true
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(finalSrc, data, {
                                responseType: 'arraybuffer'
                            })];
                    case 2:
                        response = _c.sent();
                        this.document = response.data;
                        return [3 /*break*/, 4];
                    case 3:
                        _c.sent();
                        // 显示一下报错信息避免没法选中组件
                        if ((_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.current) {
                            this.rootElement.current.innerHTML =
                                __('loadingFailed') + ' url:' + finalSrc;
                        }
                        this.setState({
                            loading: false
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OfficeViewer.prototype.initOffice = function (officeViewer, file) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wordOptions, excelOptions, data, createOfficeViewer, office;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, wordOptions = _a.wordOptions, excelOptions = _a.excelOptions, _a.env, _a.src, data = _a.data, _a.translate;
                        createOfficeViewer = officeViewer.createOfficeViewer;
                        return [4 /*yield*/, createOfficeViewer(file || this.document, {}, this.finalSrc)];
                    case 1:
                        office = _b.sent();
                        if (!(office instanceof officeViewer.Word)) return [3 /*break*/, 2];
                        office.updateOptions(__assign(__assign({}, wordOptions), { data: data, evalVar: this.evalVar.bind(this) }));
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(office instanceof officeViewer.Excel)) return [3 /*break*/, 4];
                        office.updateOptions(__assign(__assign({}, excelOptions), { data: data, evalVar: this.evalVar.bind(this) }));
                        return [4 /*yield*/, office.loadExcel()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, office];
                }
            });
        });
    };
    /**
     * 渲染远端文件
     */
    OfficeViewer.prototype.renderRemoteWord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, display;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.props, _a.wordOptions, _a.excelOptions, _a.env, _a.src, _a.data, display = _a.display, _a.translate;
                if (!this.document) {
                    return [2 /*return*/];
                }
                import('office-viewer').then(function (officeViewer) { return __awaiter(_this, void 0, void 0, function () {
                    var office;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, this.initOffice(officeViewer)];
                            case 1:
                                office = _c.sent();
                                if (display !== false) {
                                    office.render((_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.current);
                                }
                                else if (display === false && ((_b = this.rootElement) === null || _b === void 0 ? void 0 : _b.current)) {
                                    // 设置为 false 后清空
                                    this.rootElement.current.innerHTML = '';
                                }
                                this.office = office;
                                this.setState({
                                    loading: false
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 渲染本地文件，用于预览 input-file
     */
    OfficeViewer.prototype.renderFormFile = function () {
        var _this = this;
        this.setState({
            loading: true
        });
        var _a = this.props; _a.wordOptions; var name = _a.name, data = _a.data, display = _a.display;
        var file = data[name];
        if (file instanceof File) {
            var reader_1 = new FileReader();
            reader_1.onload = function (_e) {
                var data = reader_1.result;
                import('office-viewer').then(function (officeViewer) { return __awaiter(_this, void 0, void 0, function () {
                    var office;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, this.initOffice(officeViewer, data)];
                            case 1:
                                office = _c.sent();
                                if (display !== false) {
                                    office.render((_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.current);
                                }
                                else if (display === false && ((_b = this.rootElement) === null || _b === void 0 ? void 0 : _b.current)) {
                                    // 设置为 false 后清空
                                    this.rootElement.current.innerHTML = '';
                                }
                                this.office = office;
                                this.setState({
                                    loading: false
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            };
            reader_1.readAsArrayBuffer(file);
        }
    };
    OfficeViewer.prototype.render = function () {
        var _a = this.props, cx = _a.classnames; _a.translate; var className = _a.className, _b = _a.loading, loading = _b === void 0 ? false : _b, src = _a.src, name = _a.name, display = _a.display, loadingConfig = _a.loadingConfig;
        return (React.createElement("div", null,
            display !== false && !src && !name && (React.createElement("svg", { width: "100%", height: "100", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("rect", { x: "0", y: "0", width: "100%", height: "100", style: { fill: '#F7F7F9' } }),
                React.createElement("text", { x: "50%", y: "50%", fontSize: "18", textAnchor: "middle", alignmentBaseline: "middle", fontFamily: "monospace, sans-serif", fill: "#555555" }, "office viewer"))),
            React.createElement("div", { ref: this.rootElement, className: cx('office-viewer', className) }),
            React.createElement(Spinner, { overlay: true, key: "info", show: loading && this.state.loading, loadingConfig: loadingConfig })));
    };
    return OfficeViewer;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(OfficeViewerRenderer, _super);
    function OfficeViewerRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    OfficeViewerRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    OfficeViewerRenderer.contextType = ScopedContext;
    OfficeViewerRenderer = __decorate([
        Renderer({
            type: 'office-viewer'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], OfficeViewerRenderer);
    return OfficeViewerRenderer;
})(OfficeViewer));

export { OfficeViewer as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
