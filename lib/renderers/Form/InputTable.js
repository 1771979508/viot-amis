/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var omit = require('lodash/omit');
var find = require('lodash/find');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var FormTable = /** @class */ (function (_super) {
    tslib.__extends(FormTable, _super);
    function FormTable(props) {
        var _this = _super.call(this, props) || this;
        _this.entityId = 1;
        _this.subForms = {};
        _this.subFormItems = {};
        _this.rowPrinstine = [];
        _this.editting = {};
        _this.emittedValue = null;
        props.addHook;
        _this.state = {
            columns: _this.buildColumns(props),
            editIndex: '',
            items: Array.isArray(props.value) ? props.value.concat() : []
        };
        _this.entries = new amisCore.SimpleMap();
        _this.buildItemProps = _this.buildItemProps.bind(_this);
        _this.confirmEdit = _this.confirmEdit.bind(_this);
        _this.cancelEdit = _this.cancelEdit.bind(_this);
        _this.handleSaveTableOrder = _this.handleSaveTableOrder.bind(_this);
        _this.handleTableSave = _this.handleTableSave.bind(_this);
        _this.handleRadioChange = _this.handleRadioChange.bind(_this);
        _this.getEntryId = _this.getEntryId.bind(_this);
        _this.subFormRef = _this.subFormRef.bind(_this);
        _this.subFormItemRef = _this.subFormItemRef.bind(_this);
        _this.handlePageChange = _this.handlePageChange.bind(_this);
        _this.emitValue = _this.emitValue.bind(_this);
        return _this;
    }
    FormTable.prototype.componentDidUpdate = function (prevProps, prevState) {
        var props = this.props;
        var toUpdate = null;
        // 如果static为true 或 disabled为true，
        // 则删掉正在新增 或 编辑的那一行
        // Form会向FormItem下发disabled属性，disbaled 属性值也需要同步到
        if (prevProps.disabled !== props.disabled ||
            prevProps.static !== props.static ||
            props.$schema.disabled !== prevProps.$schema.disabled ||
            props.$schema.static !== prevProps.$schema.static) {
            var items = this.state.items.filter(function (item) { return !item.__isPlaceholder; });
            toUpdate = tslib.__assign(tslib.__assign({}, toUpdate), { items: items, editIndex: '', columns: this.buildColumns(props) });
        }
        if (props.columns !== prevProps.columns) {
            toUpdate = tslib.__assign(tslib.__assign({}, toUpdate), { columns: this.buildColumns(props) });
        }
        if (props.value !== prevProps.value && props.value !== this.emittedValue) {
            toUpdate = tslib.__assign(tslib.__assign({}, toUpdate), { items: Array.isArray(props.value) ? props.value.concat() : [], editIndex: '' });
        }
        toUpdate && this.setState(toUpdate);
    };
    FormTable.prototype.componentWillUnmount = function () {
        this.entries.dispose();
    };
    FormTable.prototype.resolveVariableProps = function (props, key) {
        var defaultMap = {
            minLength: 0,
            maxLength: Infinity
        };
        var value = props[key];
        if (!value) {
            return defaultMap[key];
        }
        if (typeof value === 'string') {
            if (amisCore.isPureVariable(value)) {
                var resolved = amisCore.resolveVariableAndFilter(value, props.data, '| raw');
                value = (typeof resolved === 'number' && resolved >= 0
                    ? resolved
                    : defaultMap[key]);
            }
            else {
                var parsed = parseInt(value, 10);
                value = (isNaN(parsed) ? defaultMap[key] : parsed);
            }
        }
        return value;
    };
    FormTable.prototype.subFormRef = function (form, x, y) {
        this.subForms["".concat(x, "-").concat(y)] = form;
    };
    FormTable.prototype.subFormItemRef = function (form, x, y) {
        this.subFormItems["".concat(x, "-").concat(y)] = form;
    };
    FormTable.prototype.validate = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, value, __, columns, minLength, maxLength, subForms_1, results_1, msg_1, uniqueColumn_1, subFormItemss, results, msg;
            var _this = this;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, __ = _a.translate, columns = _a.columns;
                        minLength = this.resolveVariableProps(this.props, 'minLength');
                        maxLength = this.resolveVariableProps(this.props, 'maxLength');
                        // todo: 如果当前正在编辑中，表单提交了，应该先让正在编辑的东西提交然后再做验证。
                        if (this.state.editIndex) {
                            return [2 /*return*/, __('Table.editing')];
                        }
                        if (!(minLength && (!Array.isArray(value) || value.length < minLength))) return [3 /*break*/, 1];
                        return [2 /*return*/, __('Combo.minLength', { minLength: minLength })];
                    case 1:
                        if (!(maxLength && Array.isArray(value) && value.length > maxLength)) return [3 /*break*/, 2];
                        return [2 /*return*/, __('Combo.maxLength', { maxLength: maxLength })];
                    case 2:
                        subForms_1 = [];
                        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms_1.push(_this.subForms[key]); });
                        if (!subForms_1.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(subForms_1.map(function (item) { return item.validate(); }))];
                    case 3:
                        results_1 = _b.sent();
                        msg_1 = ~results_1.indexOf(false) ? __('Form.validateFailed') : '';
                        uniqueColumn_1 = '';
                        if (!msg_1 &&
                            Array.isArray(columns) &&
                            Array.isArray(value) &&
                            columns.some(function (item) {
                                if (item.unique && item.name) {
                                    var exists_1 = [];
                                    return value.some(function (obj) {
                                        var value = amisCore.getVariable(obj, item.name);
                                        if (~exists_1.indexOf(value)) {
                                            uniqueColumn_1 = "".concat(item.label || item.name);
                                            return true;
                                        }
                                        exists_1.push(value);
                                        return false;
                                    });
                                }
                                return false;
                            })) {
                            msg_1 = __('InputTable.uniqueError', {
                                label: uniqueColumn_1
                            });
                        }
                        if (msg_1) {
                            return [2 /*return*/, msg_1];
                        }
                        _b.label = 4;
                    case 4:
                        subFormItemss = [];
                        Object.keys(this.subFormItems).forEach(function (key) {
                            return _this.subFormItems[key] && subFormItemss.push(_this.subFormItems[key]);
                        });
                        return [4 /*yield*/, Promise.all(subFormItemss.map(function (item) { return item.props.onValidate(); }))];
                    case 5:
                        results = _b.sent();
                        msg = ~results.indexOf(false) ? __('Form.validateFailed') : '';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    FormTable.prototype.emitValue = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var items, onChange, isPrevented;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = value !== null && value !== void 0 ? value : this.state.items.filter(function (item) { return !item.__isPlaceholder; });
                        onChange = this.props.onChange;
                        return [4 /*yield*/, this.dispatchEvent('change')];
                    case 1:
                        isPrevented = _a.sent();
                        if (!isPrevented) {
                            this.emittedValue = items;
                            onChange === null || onChange === void 0 ? void 0 : onChange(items);
                        }
                        return [2 /*return*/, isPrevented];
                }
            });
        });
    };
    FormTable.prototype.doAction = function (action, ctx) {
        var _a, _b;
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _c, onAction, valueField, env, needConfirm, addable, addApi, __, onChange, actionType, items_1, toAdd_1, payload, items_2, toRemove;
            var _d, _e;
            var _this = this;
            return tslib.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _c = this.props, onAction = _c.onAction, valueField = _c.valueField, env = _c.env, needConfirm = _c.needConfirm, addable = _c.addable, addApi = _c.addApi, __ = _c.translate, onChange = _c.onChange;
                        actionType = action.actionType;
                        if (!(actionType === 'add')) return [3 /*break*/, 6];
                        if (addable === false) {
                            return [2 /*return*/];
                        }
                        items_1 = this.state.items.concat();
                        if (!(addApi || action.payload)) return [3 /*break*/, 4];
                        toAdd_1 = null;
                        if (!amisCore.isEffectiveApi(addApi, ctx)) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(addApi, ctx)];
                    case 1:
                        payload = _f.sent();
                        if (payload && !payload.ok) {
                            !(addApi === null || addApi === void 0 ? void 0 : addApi.silent) &&
                                env.notify('error', (_b = (_a = addApi === null || addApi === void 0 ? void 0 : addApi.messages) === null || _a === void 0 ? void 0 : _a.failed) !== null && _b !== void 0 ? _b : (payload.msg || __('fetchFailed')));
                            return [2 /*return*/];
                        }
                        else if (payload && payload.ok) {
                            toAdd_1 = payload.data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        toAdd_1 = amisCore.dataMapping(action.payload, ctx);
                        _f.label = 3;
                    case 3:
                        toAdd_1 = Array.isArray(toAdd_1) ? toAdd_1 : [toAdd_1];
                        toAdd_1.forEach(function (toAdd) {
                            if (!valueField ||
                                !find__default["default"](items_1, function (item) { return item[valueField] == toAdd[valueField]; })) {
                                // 不要重复加入
                                items_1.push(toAdd);
                            }
                        });
                        this.setState({
                            items: items_1
                        }, function () {
                            if (toAdd_1.length === 1 && needConfirm !== false) {
                                _this.startEdit("".concat(items_1.length - 1), true);
                            }
                            else {
                                onChange === null || onChange === void 0 ? void 0 : onChange(items_1);
                            }
                        });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/, this.addItem("".concat(items_1.length - 1), false)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (actionType === 'remove' || actionType === 'delete') {
                            if (!valueField) {
                                return [2 /*return*/, env.alert(__('Table.valueField'))];
                            }
                            else if (!action.payload) {
                                return [2 /*return*/, env.alert(__('Table.playload'))];
                            }
                            items_2 = this.state.items.concat();
                            toRemove = amisCore.dataMapping(action.payload, ctx);
                            toRemove = Array.isArray(toRemove) ? toRemove : [toRemove];
                            toRemove.forEach(function (toRemove) {
                                var idex = amisCore.findTreeIndex(items_2, function (item) { return item[valueField] == toRemove[valueField]; });
                                if (idex === null || idex === void 0 ? void 0 : idex.length) {
                                    items_2 = amisCore.spliceTree(items_2, idex, 1);
                                }
                            });
                            this.setState({
                                items: items_2
                            }, function () {
                                onChange === null || onChange === void 0 ? void 0 : onChange(items_2);
                            });
                            return [2 /*return*/];
                        }
                        else if (actionType === 'initDrag') {
                            (_d = this.table).doAction.apply(_d, tslib.__spreadArray([action, ctx], tslib.__read(rest), false));
                        }
                        else if (actionType === 'cancelDrag') {
                            (_e = this.table).doAction.apply(_e, tslib.__spreadArray([action, ctx], tslib.__read(rest), false));
                        }
                        _f.label = 7;
                    case 7: return [2 /*return*/, onAction && onAction.apply(void 0, tslib.__spreadArray([action, ctx], tslib.__read(rest), false))];
                }
            });
        });
    };
    FormTable.prototype.copyItem = function (index) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, needConfirm, data, _b, copyData, items, indexes, next, originItems, src, item;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                _a = this.props, needConfirm = _a.needConfirm, data = _a.data, _b = _a.copyData, copyData = _b === void 0 ? { '&': '$$' } : _b;
                items = this.state.items.concat();
                indexes = index.split('.').map(function (item) { return parseInt(item, 10); });
                next = indexes.concat();
                next[next.length - 1] += 1;
                originItems = items;
                src = amisCore.getTree(items, indexes);
                item = amisCore.dataMapping(copyData, amisCore.createObject(data, src));
                if (needConfirm === false) {
                    items = amisCore.spliceTree(items, next, 0, item);
                }
                else {
                    // 复制相当于新增一行
                    // 需要同addItem一致添加__placeholder属性
                    items = amisCore.spliceTree(items, next, 0, tslib.__assign(tslib.__assign({}, item), { __isPlaceholder: true }));
                }
                this.reUseRowId(items, originItems, next);
                this.setState({
                    items: items
                }, function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                    var isPrevented;
                    return tslib.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.dispatchEvent('add', {
                                    index: next[next.length - 1],
                                    indexPath: next.join('.'),
                                    item: item
                                })];
                            case 1:
                                isPrevented = _a.sent();
                                if (isPrevented) {
                                    return [2 /*return*/];
                                }
                                if (needConfirm === false) {
                                    this.emitValue();
                                }
                                else {
                                    this.startEdit(next.join('.'), true);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    FormTable.prototype.addItem = function (index, isDispatch, callback) {
        if (isDispatch === void 0) { isDispatch = true; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, needConfirm, scaffold, columns, data, items, value, indexes, next, originHost;
            var _this = this;
            return tslib.__generator(this, function (_b) {
                index = index || "".concat(this.state.items.length - 1);
                _a = this.props, needConfirm = _a.needConfirm, scaffold = _a.scaffold, columns = _a.columns, data = _a.data;
                items = this.state.items.concat();
                value = {
                    __isPlaceholder: true
                };
                if (Array.isArray(columns)) {
                    columns.forEach(function (column) {
                        if (typeof column.value !== 'undefined' &&
                            typeof column.name === 'string') {
                            if ('type' in column &&
                                (column.type === 'input-date' ||
                                    column.type === 'input-datetime' ||
                                    column.type === 'input-time' ||
                                    column.type === 'input-month' ||
                                    column.type === 'input-quarter' ||
                                    column.type === 'input-year')) {
                                if (!(typeof column.value === 'string' && column.value.trim() === '')) {
                                    var date = amisCore.filterDate(column.value, data, column.format || 'X');
                                    amisCore.setVariable(value, column.name, (column.utc ? moment__default["default"].utc(date) : date).format(column.format || 'X'));
                                }
                            }
                            else {
                                /** 如果value值设置为表达式，则忽略 */
                                if (!amisCore.isExpression(column.value)) {
                                    amisCore.setVariable(value, column.name, column.value);
                                }
                            }
                        }
                    });
                }
                value = tslib.__assign(tslib.__assign({}, value), scaffold);
                if (needConfirm === false) {
                    delete value.__isPlaceholder;
                }
                indexes = index.split('.').map(function (item) { return parseInt(item, 10); });
                next = indexes.concat();
                next[next.length - 1] += 1;
                originHost = items;
                items = amisCore.spliceTree(items, next, 0, value);
                this.reUseRowId(items, originHost, next);
                this.setState(tslib.__assign({ items: items }, (needConfirm === false
                    ? {}
                    : {
                        editIndex: next.join('.'),
                        isCreateMode: true,
                        columns: this.buildColumns(this.props, true, "".concat(index))
                    })), function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                    return tslib.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!isDispatch) return [3 /*break*/, 2];
                                // todo: add 无法阻止, state 状态也要还原
                                return [4 /*yield*/, this.dispatchEvent('add', {
                                        index: next[next.length - 1],
                                        indexPath: next.join('.'),
                                        item: value
                                    })];
                            case 1:
                                // todo: add 无法阻止, state 状态也要还原
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                if (needConfirm === false) {
                                    this.emitValue();
                                }
                                callback === null || callback === void 0 ? void 0 : callback();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // 阻止触发 onAction 动作
                // 因为 footerAddButton 的 onClick 也绑定了这个
                // Action 会先触发 onClick，没被组织就会 onAction
                // 而执行 onAction 的话，dialog 会监控所有的 onAction
                // onAction 过程中会下发 disabled: true
                // 所以重新构建 buildColumns 的结果就是表单项都不可点了
                return [2 /*return*/, false];
            });
        });
    };
    FormTable.prototype.subAddItem = function (index, isDispatch, item) {
        if (isDispatch === void 0) { isDispatch = true; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                return [2 /*return*/, this.addItem(index + '.-1', isDispatch, function () {
                        item === null || item === void 0 ? void 0 : item.setExpanded(true);
                    })];
            });
        });
    };
    /**
     * 点击“编辑”按钮
     * @param index 编辑的行索引
     */
    FormTable.prototype.editItem = function (index) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var items, indexes, item, isPrevented;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = this.state.items;
                        indexes = index.split('.').map(function (item) { return parseInt(item, 10); });
                        item = amisCore.getTree(items, indexes);
                        return [4 /*yield*/, this.dispatchEvent('edit', {
                                index: indexes[indexes.length - 1],
                                indexPath: indexes.join('.'),
                                item: item
                            })];
                    case 1:
                        isPrevented = _a.sent();
                        !isPrevented && this.startEdit(index, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 派发事件
     * @param eventName 事件名称
     * @param eventData 事件数据
     * @returns
     */
    FormTable.prototype.dispatchEvent = function (eventName, eventData) {
        if (eventData === void 0) { eventData = {}; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var dispatchEvent, items, rendererEvent;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatchEvent = this.props.dispatchEvent;
                        items = this.state.items;
                        return [4 /*yield*/, dispatchEvent(eventName, amisCore.resolveEventData(this.props, tslib.__assign({ value: tslib.__spreadArray([], tslib.__read(items), false) }, eventData)))];
                    case 1:
                        rendererEvent = _a.sent();
                        return [2 /*return*/, !!(rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented)];
                }
            });
        });
    };
    FormTable.prototype.startEdit = function (index, isCreate) {
        if (isCreate === void 0) { isCreate = false; }
        this.setState({
            editIndex: index,
            isCreateMode: isCreate,
            columns: this.buildColumns(this.props, isCreate, index)
        });
    };
    FormTable.prototype.confirmEdit = function () {
        var _a, _b, _c;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _d, addApi, updateApi, data, env, __, subForms, subFormItems, validateForms, results, items, indexes, item, isNew, confirmEventName, isPrevented, remote, apiMsg, failEventName, originItems;
            var _this = this;
            return tslib.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = this.props, addApi = _d.addApi, updateApi = _d.updateApi, data = _d.data, env = _d.env, __ = _d.translate;
                        subForms = [];
                        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
                        subForms.forEach(function (form) { return form.flush(); });
                        subFormItems = [];
                        Object.keys(this.subFormItems).forEach(function (key) { return _this.subFormItems[key] && subFormItems.push(_this.subFormItems[key]); });
                        subFormItems.forEach(function (item) { var _a, _b; return (_b = (_a = item.props).onFlushChange) === null || _b === void 0 ? void 0 : _b.call(_a); });
                        validateForms = subForms;
                        return [4 /*yield*/, Promise.all(validateForms
                                .map(function (item) { return item.validate(); })
                                .concat(subFormItems.map(function (item) { return item.props.onValidate(); })))];
                    case 1:
                        results = _e.sent();
                        // 有校验不通过的
                        if (~results.indexOf(false)) {
                            return [2 /*return*/];
                        }
                        items = this.state.items.concat();
                        indexes = this.state.editIndex
                            .split('.')
                            .map(function (item) { return parseInt(item, 10); });
                        item = tslib.__assign({}, amisCore.getTree(items, indexes));
                        isNew = !!item.__isPlaceholder;
                        confirmEventName = isNew ? 'addConfirm' : 'editConfirm';
                        return [4 /*yield*/, this.dispatchEvent(confirmEventName, {
                                index: indexes[indexes.length - 1],
                                indexPath: indexes.join('.'),
                                item: item
                            })];
                    case 2:
                        isPrevented = _e.sent();
                        if (isPrevented) {
                            return [2 /*return*/];
                        }
                        remote = null;
                        apiMsg = undefined;
                        if (!(isNew && amisCore.isEffectiveApi(addApi, amisCore.createObject(data, item)))) return [3 /*break*/, 4];
                        return [4 /*yield*/, env.fetcher(addApi, amisCore.createObject(data, item))];
                    case 3:
                        remote = _e.sent();
                        apiMsg = (_a = addApi === null || addApi === void 0 ? void 0 : addApi.messages) === null || _a === void 0 ? void 0 : _a.failed;
                        return [3 /*break*/, 6];
                    case 4:
                        if (!amisCore.isEffectiveApi(updateApi, amisCore.createObject(data, item))) return [3 /*break*/, 6];
                        return [4 /*yield*/, env.fetcher(updateApi, amisCore.createObject(data, item))];
                    case 5:
                        remote = _e.sent();
                        apiMsg = (_b = updateApi === null || updateApi === void 0 ? void 0 : updateApi.messages) === null || _b === void 0 ? void 0 : _b.failed;
                        _e.label = 6;
                    case 6:
                        if (remote && !remote.ok) {
                            !((_c = ((isNew ? addApi : updateApi))) === null || _c === void 0 ? void 0 : _c.silent) &&
                                env.notify('error', apiMsg !== null && apiMsg !== void 0 ? apiMsg : (remote.msg || __('saveFailed')));
                            failEventName = isNew ? 'addFail' : 'editFail';
                            this.dispatchEvent(failEventName, {
                                index: indexes[indexes.length - 1],
                                indexPath: indexes.join('.'),
                                item: item,
                                error: remote
                            });
                            return [2 /*return*/];
                        }
                        else if (remote && remote.ok) {
                            item = tslib.__assign(tslib.__assign({}, ((isNew ? addApi : updateApi).replaceData
                                ? {}
                                : item)), remote.data);
                        }
                        delete item.__isPlaceholder;
                        originItems = items;
                        items = amisCore.spliceTree(items, indexes, 1, item);
                        this.reUseRowId(items, originItems, indexes);
                        this.setState({
                            editIndex: '',
                            items: items,
                            columns: this.buildColumns(this.props)
                        }, function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                            var isPrevented, successEventName;
                            return tslib.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.emitValue()];
                                    case 1:
                                        isPrevented = _a.sent();
                                        if (isPrevented) {
                                            return [2 /*return*/];
                                        }
                                        successEventName = isNew ? 'addSuccess' : 'editSuccess';
                                        this.dispatchEvent(successEventName, {
                                            index: indexes[indexes.length - 1],
                                            indexPath: indexes.join('.'),
                                            item: item
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.cancelEdit = function () {
        var items = this.state.items.concat();
        var lastModifiedRow = this.state.lastModifiedRow;
        var indexes = this.state.editIndex
            .split('.')
            .map(function (item) { return parseInt(item, 10); });
        var item = tslib.__assign({}, amisCore.getTree(items, indexes));
        var isNew = !!item.__isPlaceholder;
        var originItems = items;
        if (isNew) {
            items = amisCore.spliceTree(items, indexes, 1);
        }
        else {
            /** 恢复编辑前的值 */
            if (lastModifiedRow &&
                ~(lastModifiedRow === null || lastModifiedRow === void 0 ? void 0 : lastModifiedRow.index) &&
                amisCore.isObject(lastModifiedRow === null || lastModifiedRow === void 0 ? void 0 : lastModifiedRow.data)) {
                items = amisCore.spliceTree(items, indexes, 1, tslib.__assign(tslib.__assign({}, item), lastModifiedRow.data));
            }
        }
        this.reUseRowId(items, originItems, indexes);
        this.setState({
            editIndex: '',
            items: items,
            columns: this.buildColumns(this.props),
            lastModifiedRow: undefined
        }, this.emitValue);
    };
    FormTable.prototype.removeItem = function (index) {
        var _a, _b;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _c, value, deleteApi, deleteConfirmText, env, data, __, newValue, indexes, item, isPrevented, ctx, confirmed, result, originItems;
            var _this = this;
            return tslib.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.props, value = _c.value, _c.onChange, deleteApi = _c.deleteApi, deleteConfirmText = _c.deleteConfirmText, env = _c.env, data = _c.data, __ = _c.translate;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        indexes = index.split('.').map(function (item) { return parseInt(item, 10); });
                        item = amisCore.getTree(newValue, indexes);
                        if (!item) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dispatchEvent('delete', {
                                index: indexes[indexes.length - 1],
                                indexPath: indexes.join('.'),
                                item: item
                            })];
                    case 1:
                        isPrevented = _d.sent();
                        if (isPrevented) {
                            return [2 /*return*/];
                        }
                        ctx = amisCore.createObject(data, item);
                        if (!amisCore.isEffectiveApi(deleteApi, ctx)) return [3 /*break*/, 4];
                        return [4 /*yield*/, env.confirm(deleteConfirmText ? amisCore.filter(deleteConfirmText, ctx) : __('deleteConfirm'))];
                    case 2:
                        confirmed = _d.sent();
                        if (!confirmed) {
                            // 如果不确认，则跳过！
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, env.fetcher(deleteApi, ctx)];
                    case 3:
                        result = _d.sent();
                        if (!result.ok) {
                            !(deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.silent) &&
                                env.notify('error', (_b = (_a = deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.messages) === null || _a === void 0 ? void 0 : _a.failed) !== null && _b !== void 0 ? _b : __('deleteFailed'));
                            this.dispatchEvent('deleteFail', {
                                index: indexes[indexes.length - 1],
                                indexPath: indexes.join('.'),
                                item: item,
                                error: result
                            });
                            return [2 /*return*/];
                        }
                        _d.label = 4;
                    case 4:
                        this.removeEntry(item);
                        originItems = newValue;
                        newValue = amisCore.spliceTree(newValue, indexes, 1);
                        this.reUseRowId(newValue, originItems, indexes);
                        this.setState({
                            items: newValue
                        }, function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                            var prevented;
                            return tslib.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.emitValue(newValue)];
                                    case 1:
                                        prevented = _a.sent();
                                        if (prevented) {
                                            return [2 /*return*/];
                                        }
                                        this.dispatchEvent('deleteSuccess', {
                                            value: newValue,
                                            index: indexes[indexes.length - 1],
                                            indexPath: indexes.join('.'),
                                            item: item
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.rowPathPlusOffset = function (path, offset) {
        if (offset === void 0) { offset = 0; }
        var list = path.split('.').map(function (item) { return parseInt(item, 10); });
        list[0] += offset;
        return list.join('.');
    };
    FormTable.prototype.reUseRowId = function (items, originItems, indexes) {
        //  row 不能换 id，否则会重新渲染，导致编辑状态丢失
        // 展开状态也会丢失
        var originHost = originItems;
        var host = items;
        for (var i = 0, len = indexes.length; i < len; i++) {
            var idx = indexes[i];
            if (!(originHost === null || originHost === void 0 ? void 0 : originHost[idx]) || !(host === null || host === void 0 ? void 0 : host[idx])) {
                break;
            }
            this.entries.set(host[idx], this.entries.get(originHost[idx]) || this.entityId++);
            this.entries.delete(originHost[idx]);
            host = host[idx].children;
            originHost = originHost[idx].children;
        }
    };
    FormTable.prototype.buildItemProps = function (item, index) {
        if (this.props.needConfirm === false) {
            return {
                quickEditEnabled: true
            };
        }
        else if (!this.props.editable &&
            !this.props.addable &&
            !this.state.isCreateMode) {
            return null;
        }
        var perPage = this.props.perPage;
        var page = this.state.page || 1;
        var offset = 0;
        if (typeof perPage === 'number' && perPage) {
            offset = (page - 1) * perPage;
        }
        return {
            quickEditEnabled: this.state.editIndex === this.rowPathPlusOffset(item.path, offset)
        };
    };
    FormTable.prototype.buildColumns = function (props, isCreateMode, editRowIndex) {
        var _this = this;
        if (isCreateMode === void 0) { isCreateMode = false; }
        var _a = this.props, env = _a.env, enableStaticTransform = _a.enableStaticTransform, testIdBuilder = _a.testIdBuilder;
        var columns = Array.isArray(props.columns)
            ? props.columns.concat()
            : [];
        var ns = this.props.classPrefix;
        var __ = this.props.translate;
        var needConfirm = this.props.needConfirm;
        var showIndex = this.props.showIndex;
        var minLength = this.resolveVariableProps(this.props, 'minLength');
        var maxLength = this.resolveVariableProps(this.props, 'maxLength');
        var isStatic = this.props.static;
        var disabled = this.props.disabled;
        var btns = [];
        if (!isStatic && props.addable && props.showTableAddBtn !== false) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, offset = _a.offset;
                    return (_this.state.editIndex && needConfirm !== false) ||
                        maxLength <= _this.state.items.length ? null : (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.addRow'), tooltipContainer: props.popOverContainer || env.getModalContainer, disabled: disabled, onClick: _this.addItem.bind(_this, _this.rowPathPlusOffset(rowIndexPath, offset), undefined, undefined), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("addRow-".concat(rowIndex + offset)) },
                        props.addBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.addBtnIcon, className: "icon" })) : null,
                        props.addBtnLabel ? _J$X_("span", null, props.addBtnLabel) : null));
                }
            });
        }
        if (!isStatic && props.childrenAddable && props.showTableAddBtn !== false) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, offset = _a.offset, row = _a.row;
                    return _this.state.editIndex && needConfirm !== false ? null : (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.subAddRow'), tooltipContainer: props.popOverContainer || env.getModalContainer, disabled: disabled, onClick: _this.subAddItem.bind(_this, _this.rowPathPlusOffset(rowIndexPath, offset), undefined, row), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("subAddRow-".concat(rowIndex + offset)) },
                        props.subAddBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.subAddBtnIcon, className: "icon" })) : null,
                        props.subAddBtnLabel ? (_J$X_("span", null, props.subAddBtnLabel)) : null));
                }
            });
        }
        if (!isStatic && props.copyable && props.showCopyBtn !== false) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, offset = _a.offset;
                    return _this.state.editIndex && needConfirm !== false ? null : (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.copyRow'), tooltipContainer: props.popOverContainer || env.getModalContainer, disabled: disabled, onClick: _this.copyItem.bind(_this, _this.rowPathPlusOffset(rowIndexPath, offset), undefined), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("copyRow-".concat(rowIndex + offset)) },
                        props.copyBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.copyBtnIcon, className: "icon" })) : null,
                        props.copyBtnLabel ? _J$X_("span", null, props.copyBtnLabel) : null));
                }
            });
        }
        if (props.needConfirm === false) {
            columns = columns.map(function (column) {
                var quickEdit = column.quickEdit;
                return quickEdit === false
                    ? omit__default["default"](column, ['quickEdit'])
                    : tslib.__assign(tslib.__assign({}, column), (column.type === 'operation'
                        ? {}
                        : {
                            quickEdit: tslib.__assign(tslib.__assign(tslib.__assign({}, _this.columnToQuickEdit(column)), quickEdit), { 
                                // 因为列本身已经做过显隐判断了，单元格不应该再处理
                                visibleOn: '', hiddenOn: '', visible: true, hidden: false, saveImmediately: true, mode: 'inline', disabled: disabled, static: isStatic || column.static })
                        }));
            });
        }
        else if (isStatic !== true &&
            (props.addable || props.editable || isCreateMode)) {
            columns = columns.map(function (column, index) {
                var quickEdit = !isCreateMode && column.hasOwnProperty('quickEditOnUpdate')
                    ? column.quickEditOnUpdate
                    : column.quickEdit;
                var render = amisCore.getRendererByName(column === null || column === void 0 ? void 0 : column.type);
                return tslib.__assign(tslib.__assign({}, (quickEdit === false
                    ? omit__default["default"](column, ['quickEdit'])
                    : tslib.__assign(tslib.__assign({}, column), { quickEdit: tslib.__assign(tslib.__assign(tslib.__assign({}, _this.columnToQuickEdit(column)), quickEdit), { 
                            // 因为列本身已经做过显隐判断了，单元格不应该再处理
                            visibleOn: '', hiddenOn: '', visible: true, hidden: false, isQuickEditFormMode: !!(render === null || render === void 0 ? void 0 : render.isFormItem), saveImmediately: true, mode: 'inline', disabled: disabled }) }))), (enableStaticTransform && props.needConfirm !== false
                    ? { staticOn: "".concat(!isCreateMode, " || data.index !== '").concat(editRowIndex, "'") }
                    : {}));
            });
            !isStatic &&
                props.editable &&
                btns.push({
                    children: function (_a) {
                        var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, data = _a.data, offset = _a.offset;
                        return _this.state.editIndex || (data && data.__isPlaceholder) ? null : (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.editRow'), tooltipContainer: props.popOverContainer || env.getModalContainer, disabled: disabled, onClick: function () {
                                return _this.editItem(_this.rowPathPlusOffset(rowIndexPath, offset));
                            }, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("editRow-".concat(rowIndex + offset)) },
                            typeof props.updateBtnIcon !== 'undefined' ? (props.updateBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.updateBtnIcon, className: "icon" })) : null) : props.editBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.editBtnIcon, className: "icon" })) : null,
                            props.updateBtnLabel || props.editBtnLabel ? (_J$X_("span", null, props.updateBtnLabel || props.editBtnLabel)) : null));
                    }
                });
            !isStatic &&
                btns.push({
                    children: function (_a) {
                        var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, offset = _a.offset;
                        return _this.state.editIndex ===
                            _this.rowPathPlusOffset(rowIndexPath, offset) ? (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('save'), tooltipContainer: props.popOverContainer || env.getModalContainer, onClick: _this.confirmEdit, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("confirmRow-".concat(rowIndex + offset)) },
                            props.confirmBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.confirmBtnIcon, className: "icon" })) : null,
                            props.confirmBtnLabel ? (_J$X_("span", null, props.confirmBtnLabel)) : null)) : null;
                    }
                });
            !isStatic &&
                btns.push({
                    children: function (_a) {
                        var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, offset = _a.offset;
                        return _this.state.editIndex ===
                            _this.rowPathPlusOffset(rowIndexPath, offset) ? (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('cancel'), tooltipContainer: props.popOverContainer || env.getModalContainer, onClick: _this.cancelEdit, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("cancelRow-".concat(rowIndex + offset)) },
                            props.cancelBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.cancelBtnIcon, className: "icon" })) : null,
                            props.cancelBtnLabel ? (_J$X_("span", null, props.cancelBtnLabel)) : null)) : null;
                    }
                });
        }
        else {
            columns = columns.map(function (column) {
                var render = amisCore.getRendererByName(column === null || column === void 0 ? void 0 : column.type);
                if (!!(render === null || render === void 0 ? void 0 : render.isFormItem)) {
                    return tslib.__assign(tslib.__assign({}, column), { quickEdit: tslib.__assign(tslib.__assign({}, column), { 
                            // 因为列本身已经做过显隐判断了，单元格不应该再处理
                            visibleOn: '', hiddenOn: '', visible: true, hidden: false, isFormMode: true }) });
                }
                return column;
            });
        }
        if (!isStatic && props.removable) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, rowIndexPath = _a.rowIndexPath, data = _a.data, offset = _a.offset;
                    return ((_this.state.editIndex || (data && data.__isPlaceholder)) &&
                        needConfirm !== false) ||
                        minLength >= _this.state.items.length ? null : (_J$X_(amisUi.Button, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.deleteRow'), tooltipContainer: props.popOverContainer || env.getModalContainer, disabled: disabled, onClick: _this.removeItem.bind(_this, _this.rowPathPlusOffset(rowIndexPath, offset)), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("delRow-".concat(rowIndex + offset)) },
                        props.deleteBtnIcon ? (_J$X_(amisUi.Icon, { cx: props.classnames, icon: props.deleteBtnIcon, className: "icon" })) : null,
                        props.deleteBtnLabel ? (_J$X_("span", null, props.deleteBtnLabel)) : null));
                }
            });
        }
        if (btns.length) {
            var operation = columns.find(function (item) { return item.type === 'operation'; });
            if (!operation) {
                operation = {
                    type: 'operation',
                    buttons: [],
                    label: __('Table.operation'),
                    className: 'v-middle nowrap',
                    fixed: 'right',
                    width: 150,
                    innerClassName: 'm-n'
                };
                columns.push(operation);
            }
            operation.buttons = Array.isArray(operation.buttons)
                ? operation.buttons.concat()
                : [];
            operation.buttons.unshift.apply(operation.buttons, btns);
            if (operation.hasOwnProperty('quickEdit')) {
                delete operation.quickEdit;
            }
        }
        if (showIndex) {
            columns.unshift({
                label: __('Table.index'),
                width: 50,
                children: function (props) {
                    var indexes = props.rowIndexPath
                        .split('.')
                        .map(function (item) { return parseInt(item, 10) + 1; });
                    indexes[0] += props.offset;
                    return (_J$X_("td", { className: props.className },
                        props.cellPrefix,
                        _J$X_("span", null, indexes.join('.')),
                        props.cellAffix));
                }
            });
        }
        return columns;
    };
    FormTable.prototype.columnToQuickEdit = function (column) {
        var _a;
        var quickEdit = {
            type: 'input-text'
        };
        if (((_a = amisCore.getRendererByName(column === null || column === void 0 ? void 0 : column.type)) === null || _a === void 0 ? void 0 : _a.isFormItem) ||
            ~['group'].indexOf(column.type)) {
            return tslib.__assign(tslib.__assign({}, column), { label: '' });
        }
        return quickEdit;
    };
    FormTable.prototype.handleTableSave = function (rows, diff, rowIndexes) {
        var _this = this;
        var callback;
        // 这里有可能执行频率非常高，上次的变更还没结束就会再次进来，会拿不到最新的数据
        // https://legacy.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
        this.setState(function (state, props) {
            var newState = {};
            var perPage = props.perPage;
            var editIndex = state.editIndex;
            var lastModifiedRow = state.lastModifiedRow;
            if (editIndex) {
                var indexes = editIndex.split('.').map(function (item) { return parseInt(item, 10); });
                var items_3 = state.items.concat();
                var origin_1 = amisCore.getTree(items_3, indexes);
                if (!origin_1) {
                    return newState;
                }
                var value = tslib.__assign({}, rows);
                var originItems = items_3;
                items_3 = amisCore.spliceTree(items_3, indexes, 1, value);
                _this.reUseRowId(items_3, originItems, indexes);
                Object.assign(newState, tslib.__assign({ items: items_3 }, ((lastModifiedRow === null || lastModifiedRow === void 0 ? void 0 : lastModifiedRow.index) === editIndex
                    ? {}
                    : {
                        lastModifiedRow: origin_1.__isPlaceholder
                            ? undefined
                            : { index: editIndex, data: tslib.__assign({}, origin_1) }
                    })));
                return newState;
            }
            var page = state.page;
            var items = state.items.concat();
            if (Array.isArray(rows)) {
                rowIndexes.forEach(function (rowIndex, index) {
                    var indexes = rowIndex.split('.').map(function (item) { return parseInt(item, 10); });
                    if (page && page > 1 && typeof perPage === 'number') {
                        indexes[0] += (page - 1) * perPage;
                    }
                    // const origin = getTree(items, indexes);
                    var data = tslib.__assign({}, amisCore.getTree(rows, indexes));
                    items = amisCore.spliceTree(items, indexes, 1, data);
                });
            }
            else {
                var indexes = rowIndexes
                    .split('.')
                    .map(function (item) { return parseInt(item, 10); });
                if (page && page > 1 && typeof perPage === 'number') {
                    indexes[0] += (page - 1) * perPage;
                }
                // const origin = getTree(items, indexes);
                var data = tslib.__assign({}, rows);
                var originItems = items;
                items = amisCore.spliceTree(items, indexes, 1, data);
                _this.reUseRowId(items, originItems, indexes);
            }
            Object.assign(newState, {
                items: items
            });
            callback = _this.emitValue;
            return newState;
        }, function () {
            callback && callback();
        });
    };
    FormTable.prototype.handleRadioChange = function (cxt, _a) {
        var name = _a.name, row = _a.row, _b = _a.trueValue, trueValue = _b === void 0 ? true : _b, _c = _a.falseValue, falseValue = _c === void 0 ? false : _c;
        var path = row.path;
        var items = amisCore.mapTree(this.state.items, function (item, index, level, paths, indexes) {
            var _a;
            return (tslib.__assign(tslib.__assign({}, item), (_a = {}, _a[name] = path === indexes.join('.') ? trueValue : falseValue, _a)));
        });
        this.setState({
            items: items
        }, this.state.editIndex == row.path ? undefined : this.emitValue);
        return false;
    };
    FormTable.prototype.handleSaveTableOrder = function (moved, rows) {
        var onChange = this.props.onChange;
        onChange(rows.map(function (item) { return (tslib.__assign({}, item)); }));
    };
    FormTable.prototype.handlePageChange = function (page) {
        this.setState({ page: page });
    };
    /**
     * Table Row中数据更新到InputTable中
     * 解决columns形如[{name: 'a'}, {name: 'c', value: '${a}'}]时，使用默认值的列数据无法更新到数据域的问题
     *
     * @param data 行数据
     * @param rowIndex 行索引值
     */
    FormTable.prototype.handlePristineChange = function (data, rowIndex) {
        var _this = this;
        var _a = this.props, needConfirm = _a.needConfirm, perPage = _a.perPage;
        var indexes = rowIndex.split('.').map(function (item) { return parseInt(item, 10); });
        this.setState(function (prevState) {
            var items = prevState.items.concat();
            var page = prevState.page;
            if (page && page > 1 && typeof perPage === 'number') {
                indexes[0] += (page - 1) * perPage;
            }
            var origin = amisCore.getTree(items, indexes);
            var value = tslib.__assign(tslib.__assign({}, origin), data);
            var originItems = items;
            items = amisCore.spliceTree(items, indexes, 1, value);
            _this.reUseRowId(items, originItems, indexes);
            return {
                items: items
            };
        }, function () {
            if (needConfirm === false) {
                _this.emitValue();
            }
        });
    };
    FormTable.prototype.removeEntry = function (entry) {
        if (this.entries.has(entry)) {
            this.entries.delete(entry);
        }
    };
    FormTable.prototype.getEntryId = function (entry) {
        if (!this.entries.has(entry)) {
            this.entries.set(entry, this.entityId++);
        }
        return String(this.entries.get(entry));
    };
    FormTable.prototype.tableRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.table = ref;
    };
    FormTable.prototype.computedAddBtnDisabled = function () {
        var disabled = this.props.disabled;
        return disabled || !!this.state.editIndex;
    };
    FormTable.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; _a.value; var disabled = _a.disabled, render = _a.render, placeholder = _a.placeholder, draggable = _a.draggable, addable = _a.addable, columnsTogglable = _a.columnsTogglable, combineNum = _a.combineNum, combineFromIndex = _a.combineFromIndex, __ = _a.translate, canAccessSuperData = _a.canAccessSuperData, expandConfig = _a.expandConfig, affixRow = _a.affixRow, prefixRow = _a.prefixRow, formInited = _a.formInited, perPage = _a.perPage, cx = _a.classnames, rowClassName = _a.rowClassName, rowClassNameExpr = _a.rowClassNameExpr, _b = _a.affixHeader, affixHeader = _b === void 0 ? false : _b, _c = _a.autoFillHeight, autoFillHeight = _c === void 0 ? false : _c, tableContentClassName = _a.tableContentClassName, isStatic = _a.static, showFooterAddBtn = _a.showFooterAddBtn, footerAddBtn = _a.footerAddBtn, toolbarClassName = _a.toolbarClassName, onEvent = _a.onEvent, testIdBuilder = _a.testIdBuilder;
        var maxLength = this.resolveVariableProps(this.props, 'maxLength');
        if (formInited === false) {
            return null;
        }
        var items = this.state.items;
        var showPager = false;
        var page = this.state.page || 1;
        var offset = 0;
        var lastPage = 1;
        if (typeof perPage === 'number' && perPage && items.length > perPage) {
            lastPage = Math.ceil(items.length / perPage);
            if (page > lastPage) {
                page = lastPage;
            }
            items = items.slice((page - 1) * perPage, page * perPage);
            showPager = true;
            offset = (page - 1) * perPage;
        }
        return (_J$X_("div", { className: cx('InputTable', className) },
            render('body', {
                type: 'table',
                placeholder: __(placeholder),
                columns: this.state.columns,
                affixHeader: affixHeader,
                prefixRow: prefixRow,
                affixRow: affixRow,
                autoFillHeight: autoFillHeight,
                tableContentClassName: tableContentClassName,
                onEvent: onEvent
            }, {
                ref: this.tableRef.bind(this),
                value: undefined,
                saveImmediately: true,
                disabled: disabled,
                draggable: draggable && !this.state.editIndex,
                items: items,
                getEntryId: this.getEntryId,
                reUseRow: false,
                onSave: this.handleTableSave,
                onRadioChange: this.handleRadioChange,
                onSaveOrder: this.handleSaveTableOrder,
                buildItemProps: this.buildItemProps,
                quickEditFormRef: this.subFormRef,
                quickEditFormItemRef: this.subFormItemRef,
                columnsTogglable: columnsTogglable,
                combineNum: combineNum,
                combineFromIndex: combineFromIndex,
                expandConfig: expandConfig,
                canAccessSuperData: canAccessSuperData,
                offset: offset,
                rowClassName: rowClassName,
                rowClassNameExpr: rowClassNameExpr,
                onPristineChange: this.handlePristineChange,
                testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('table')
            }),
            (!isStatic &&
                addable &&
                showFooterAddBtn !== false &&
                (!maxLength || maxLength > items.length)) ||
                showPager ? (_J$X_("div", { className: cx('InputTable-toolbar', toolbarClassName) },
                addable && showFooterAddBtn !== false
                    ? render('button', tslib.__assign({ type: 'button', level: 'primary', size: 'sm', label: __('Table.add'), icon: 'fa fa-plus', disabledTip: __('Table.addButtonDisabledTip') }, (footerAddBtn || {})), {
                        disabled: this.computedAddBtnDisabled(),
                        onClick: function () { return _this.addItem(); },
                        testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('add')
                    })
                    : null,
                showPager
                    ? render('pager', {
                        type: 'pagination'
                    }, {
                        activePage: page,
                        perPage: perPage,
                        total: this.state.items.length,
                        onPageChange: this.handlePageChange,
                        className: 'InputTable-pager',
                        testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('page')
                    })
                    : null)) : null));
    };
    FormTable.defaultProps = {
        placeholder: 'placeholder.empty',
        scaffold: {},
        addBtnIcon: 'plus',
        subAddBtnIcon: 'sub-plus',
        copyBtnIcon: 'copy',
        editBtnIcon: 'pencil',
        deleteBtnIcon: 'minus',
        confirmBtnIcon: 'check',
        cancelBtnIcon: 'close',
        valueField: '',
        minLength: 0,
        maxLength: Infinity,
        showFooterAddBtn: true,
        showTableAddBtn: true
    };
    FormTable.propsList = [
        'onChange',
        'name',
        'columns',
        'label',
        'scaffold',
        'showTableAddBtn',
        'addable',
        'removable',
        'copyable',
        'editable',
        'addApi',
        'updateApi',
        'deleteApi',
        'needConfirm',
        'canAccessSuperData',
        'formStore',
        'footerActions',
        'toolbarClassName'
    ];
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, String]),
        tslib.__metadata("design:returntype", void 0)
    ], FormTable.prototype, "handlePristineChange", null);
    return FormTable;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TableControlRenderer, _super);
    function TableControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableControlRenderer.prototype.setData = function (value, replace, index, condition) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var items_4, indexs, items_5, promises_1;
            var _this = this;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.state.items.length;
                        if (!(index !== undefined)) return [3 /*break*/, 1];
                        items_4 = tslib.__spreadArray([], tslib.__read(this.state.items), false);
                        indexs = String(index).split(',');
                        indexs.forEach(function (i) {
                            var indexes = i.split('.').map(function (item) { return parseInt(item, 10); });
                            items_4 = amisCore.spliceTree(items_4, indexes, 1, value);
                        });
                        this.setState({ items: items_4 }, function () {
                            _this.emitValue();
                        });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(condition !== undefined)) return [3 /*break*/, 3];
                        items_5 = tslib.__spreadArray([], tslib.__read(this.state.items), false);
                        promises_1 = [];
                        amisCore.everyTree(items_5, function (item, index, paths, indexes) {
                            promises_1.unshift(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                                var isUpdate;
                                return tslib.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, amisCore.evalExpressionWithConditionBuilderAsync(condition, item)];
                                        case 1:
                                            isUpdate = _a.sent();
                                            if (isUpdate) {
                                                items_5 = amisCore.spliceTree(items_5, indexes, 1, value);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return true;
                        });
                        return [4 /*yield*/, Promise.all(promises_1.map(function (fn) { return fn(); }))];
                    case 2:
                        _a.sent();
                        this.setState({ items: items_5 }, function () {
                            _this.emitValue();
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        // 如果setValue动作没有传入index，则直接替换组件数据
                        this.setState({
                            items: tslib.__spreadArray([], tslib.__read(value), false)
                        }, function () {
                            _this.emitValue();
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TableControlRenderer.prototype.doAction = function (action, data, throwErrors, args) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (throwErrors === void 0) { throwErrors = false; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _h, valueField, env, needConfirm, addApi, deleteApi, resetValue, __, onChange, formStore, store, name, actionType, ctx, items_6, toAdd_2, payload, indexes_1, items_7, deletedItems_1, indexs, promises_2, payload, pristineVal, newItems_1;
            var _this = this;
            return tslib.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _h = this.props, valueField = _h.valueField, env = _h.env, needConfirm = _h.needConfirm, _h.addable, addApi = _h.addApi, deleteApi = _h.deleteApi, resetValue = _h.resetValue, __ = _h.translate, onChange = _h.onChange, formStore = _h.formStore, store = _h.store, name = _h.name;
                        actionType = action.actionType;
                        ctx = ((_a = this.props.store) === null || _a === void 0 ? void 0 : _a.data) || {};
                        if (!(actionType === 'addItem')) return [3 /*break*/, 6];
                        items_6 = this.state.items.concat();
                        if (!(addApi || args)) return [3 /*break*/, 4];
                        toAdd_2 = null;
                        if (!amisCore.isEffectiveApi(addApi, ctx)) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(addApi, ctx)];
                    case 1:
                        payload = _j.sent();
                        if (payload && !payload.ok) {
                            !(addApi === null || addApi === void 0 ? void 0 : addApi.silent) &&
                                env.notify('error', (_c = (_b = addApi === null || addApi === void 0 ? void 0 : addApi.messages) === null || _b === void 0 ? void 0 : _b.failed) !== null && _c !== void 0 ? _c : (payload.msg || __('fetchFailed')));
                            return [2 /*return*/];
                        }
                        else if (payload && payload.ok) {
                            toAdd_2 = payload.data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        toAdd_2 = args.item;
                        _j.label = 3;
                    case 3:
                        toAdd_2 = (Array.isArray(toAdd_2) ? toAdd_2 : [toAdd_2]).filter(function (a) {
                            return !valueField ||
                                !find__default["default"](items_6, function (item) { return item[valueField] == a[valueField]; });
                        });
                        indexes_1 = [];
                        if (typeof args.index === 'string' &&
                            /^\d+(\.\d+)*$/.test(args.index)) {
                            indexes_1 = args.index.split('.').map(function (i) { return parseInt(i, 10); });
                        }
                        else if (typeof args.index === 'number') {
                            indexes_1 = [args.index];
                        }
                        if (indexes_1.length) {
                            items_6 = amisCore.spliceTree.apply(void 0, tslib.__spreadArray([items_6, indexes_1, 0], tslib.__read(toAdd_2), false));
                        }
                        else {
                            // 没有指定默认插入在最后
                            items_6.push.apply(items_6, tslib.__spreadArray([], tslib.__read(toAdd_2), false));
                        }
                        this.setState({
                            items: items_6
                        }, function () {
                            if (toAdd_2.length === 1 && needConfirm !== false) {
                                var next = indexes_1.concat();
                                next[next.length - 1] += 1;
                                _this.startEdit(next.join('.'), true);
                            }
                            else {
                                onChange === null || onChange === void 0 ? void 0 : onChange(items_6);
                            }
                        });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/, this.addItem("".concat(items_6.length - 1), false)];
                    case 5: return [3 /*break*/, 13];
                    case 6:
                        if (!(actionType === 'deleteItem')) return [3 /*break*/, 12];
                        items_7 = tslib.__spreadArray([], tslib.__read(this.state.items), false);
                        deletedItems_1 = [];
                        if (!((args === null || args === void 0 ? void 0 : args.index) !== undefined)) return [3 /*break*/, 7];
                        indexs = String(args.index).split(',');
                        indexs.forEach(function (i) {
                            var indexes = i.split('.').map(function (item) { return parseInt(item, 10); });
                            deletedItems_1.push(amisCore.getTree(items_7, indexes));
                            items_7 = amisCore.spliceTree(items_7, indexes, 1);
                        });
                        return [3 /*break*/, 9];
                    case 7:
                        if (!((args === null || args === void 0 ? void 0 : args.condition) !== undefined)) return [3 /*break*/, 9];
                        promises_2 = [];
                        amisCore.everyTree(items_7, function (item, index, paths, indexes) {
                            promises_2.unshift(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                                var result;
                                return tslib.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, amisCore.evalExpressionWithConditionBuilderAsync(args === null || args === void 0 ? void 0 : args.condition, item)];
                                        case 1:
                                            result = _a.sent();
                                            if (result) {
                                                deletedItems_1.push(item);
                                                items_7 = amisCore.spliceTree(items_7, indexes, 1);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return true;
                        });
                        return [4 /*yield*/, promises_2.reduce(function (p, fn) { return p.then(fn); }, Promise.resolve())];
                    case 8:
                        _j.sent();
                        _j.label = 9;
                    case 9:
                        if (!amisCore.isEffectiveApi(deleteApi, amisCore.createObject(ctx, { deletedItems: deletedItems_1 }))) return [3 /*break*/, 11];
                        return [4 /*yield*/, env.fetcher(deleteApi, amisCore.createObject(ctx, { deletedItems: deletedItems_1 }))];
                    case 10:
                        payload = _j.sent();
                        if (payload && !payload.ok) {
                            !(deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.silent) &&
                                env.notify('error', (_e = (_d = deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.messages) === null || _d === void 0 ? void 0 : _d.failed) !== null && _e !== void 0 ? _e : (payload.msg || __('fetchFailed')));
                            return [2 /*return*/];
                        }
                        _j.label = 11;
                    case 11:
                        this.setState({
                            items: items_7
                        }, function () {
                            onChange === null || onChange === void 0 ? void 0 : onChange(items_7);
                        });
                        return [2 /*return*/];
                    case 12:
                        if (actionType === 'clear') {
                            this.setState({
                                items: []
                            }, function () {
                                onChange === null || onChange === void 0 ? void 0 : onChange([]);
                            });
                            return [2 /*return*/];
                        }
                        else if (actionType === 'reset') {
                            pristineVal = (_g = amisCore.getVariable((_f = formStore === null || formStore === void 0 ? void 0 : formStore.pristine) !== null && _f !== void 0 ? _f : store === null || store === void 0 ? void 0 : store.pristine, name)) !== null && _g !== void 0 ? _g : resetValue;
                            newItems_1 = Array.isArray(pristineVal) ? pristineVal : [];
                            this.setState({
                                items: newItems_1
                            }, function () {
                                onChange === null || onChange === void 0 ? void 0 : onChange(newItems_1);
                            });
                            return [2 /*return*/];
                        }
                        _j.label = 13;
                    case 13: return [2 /*return*/, _super.prototype.doAction.call(this, action, data, throwErrors, ctx)];
                }
            });
        });
    };
    TableControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-table'
        })
    ], TableControlRenderer);
    return TableControlRenderer;
})(FormTable));

exports["default"] = FormTable;
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
