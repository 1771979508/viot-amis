/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import cx from 'classnames';
import { matchSorter } from 'match-sorter';
import { value2array, Tree, Spinner, SearchBox } from 'amis-ui';
import { getVariable, findTree, hasAbility, findTreeIndex, resolveEventData, createObject, isEffectiveApi, isPureVariable, resolveVariableAndFilter, toNumber, autobind, OptionsControl } from 'amis-core';
import { supportStatic } from './StaticHoc.js';

var TreeControl = /** @class */ (function (_super) {
    __extends(TreeControl, _super);
    function TreeControl(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.state = {
            keyword: '',
            filteredOptions: (_a = _this.props.options) !== null && _a !== void 0 ? _a : []
        };
        _this.handleSearch = debounce(_this.handleSearch.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        return _this;
    }
    TreeControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var keyword = this.state.keyword;
        if (prevProps.options !== props.options ||
            prevProps.searchable !== props.searchable) {
            var options = props.options, searchable = props.searchable;
            this.setState({
                filteredOptions: searchable && keyword ? this.filterOptions(options, keyword) : options
            });
        }
    };
    TreeControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TreeControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _j = this.props, resetValue = _j.resetValue, onChange = _j.onChange, formStore = _j.formStore, store = _j.store, name = _j.name;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            var pristineVal = (_b = getVariable((_a = formStore === null || formStore === void 0 ? void 0 : formStore.pristine) !== null && _a !== void 0 ? _a : store === null || store === void 0 ? void 0 : store.pristine, name)) !== null && _b !== void 0 ? _b : resetValue;
            onChange === null || onChange === void 0 ? void 0 : onChange(pristineVal !== null && pristineVal !== void 0 ? pristineVal : '');
        }
        else if (action.actionType === 'expand') {
            this.treeRef.syncUnFolded(this.props, (_c = action.args) === null || _c === void 0 ? void 0 : _c.openLevel);
        }
        else if (action.actionType === 'collapse') {
            this.treeRef.syncUnFolded(this.props, 0);
        }
        else if (action.actionType === 'add') {
            this.addItemFromAction((_d = action.args) === null || _d === void 0 ? void 0 : _d.item, (_e = action.args) === null || _e === void 0 ? void 0 : _e.parentValue);
        }
        else if (action.actionType === 'edit') {
            this.editItemFromAction((_f = action.args) === null || _f === void 0 ? void 0 : _f.item, (_g = action.args) === null || _g === void 0 ? void 0 : _g.originValue);
        }
        else if (action.actionType === 'delete') {
            this.deleteItemFromAction((_h = action.args) === null || _h === void 0 ? void 0 : _h.value);
        }
        else if (action.actionType === 'reload') {
            this.reload();
        }
    };
    /**
     * @deprecated 不推荐使用，没考虑 jointValues false，没考虑多选
     * @param options
     * @param value
     * @returns
     */
    TreeControl.prototype.resolveOption = function (options, value) {
        var _this = this;
        return findTree(options, function (item) {
            var valueAbility = _this.props.valueField || 'value';
            var itemValue = hasAbility(item, valueAbility)
                ? item[valueAbility]
                : '';
            return itemValue === value;
        });
    };
    TreeControl.prototype.addItemFromAction = function (item, parentValue) {
        var _a = this.props, onAdd = _a.onAdd, options = _a.options, valueField = _a.valueField;
        var idxes = findTreeIndex(options, function (item) {
            var valueAbility = valueField || 'value';
            var value = hasAbility(item, valueAbility) ? item[valueAbility] : '';
            return value === parentValue;
        }) || [];
        onAdd && onAdd(idxes.concat(0), item, true);
    };
    TreeControl.prototype.editItemFromAction = function (item, originValue) {
        var _a = this.props, onEdit = _a.onEdit, options = _a.options;
        var editItem = this.resolveOption(options, originValue);
        onEdit && editItem && onEdit(__assign(__assign({}, item), { originValue: originValue }), editItem, true);
    };
    TreeControl.prototype.deleteItemFromAction = function (value) {
        var _a = this.props, onDelete = _a.onDelete, options = _a.options;
        var deleteItem = this.resolveOption(options, value);
        onDelete && deleteItem && onDelete(deleteItem);
    };
    TreeControl.prototype.filterOptions = function (options, keywords) {
        var _this = this;
        var _a = this.props, labelField = _a.labelField, valueField = _a.valueField;
        return options.map(function (option) {
            option = __assign({}, option);
            option.visible = !!matchSorter([option], keywords, {
                keys: [labelField || 'label', valueField || 'value'],
                threshold: matchSorter.rankings.CONTAINS
            }).length;
            if (!option.visible && option.children) {
                option.children = _this.filterOptions(option.children, keywords);
                var visibleCount = option.children.filter(function (item) { return item.visible; }).length;
                option.visible = !!visibleCount;
            }
            option.visible && (option.collapsed = false);
            return option;
        });
    };
    TreeControl.prototype.handleChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, searchable, options, dispatchEvent, multiple, delimiter, valueField, originSelectedItems, joinValues, extractValue, filteredOptions, items, selectedItems, item, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, searchable = _a.searchable, options = _a.options, dispatchEvent = _a.dispatchEvent, multiple = _a.multiple, delimiter = _a.delimiter, valueField = _a.valueField, originSelectedItems = _a.selectedOptions, joinValues = _a.joinValues, extractValue = _a.extractValue;
                        filteredOptions = this.state.filteredOptions;
                        items = searchable ? filteredOptions : options;
                        selectedItems = value2array(value, {
                            multiple: multiple,
                            delimiter: delimiter,
                            valueField: valueField,
                            options: filteredOptions
                        });
                        item = multiple ? null : selectedItems[0];
                        // 如果是搜索模式，有可能已经选择的值被过滤掉了，如果值发生了变化
                        // 不应该让原来选中的值丢失
                        // https://github.com/baidu/amis/issues/9946
                        if (multiple && searchable && originSelectedItems.length) {
                            originSelectedItems.forEach(function (origin) {
                                var exists = findTree(filteredOptions, function (item) { return item[valueField || 'value'] === origin[valueField || 'value']; });
                                if (!exists) {
                                    selectedItems.push(origin);
                                }
                            });
                            value = selectedItems.map(function (item) {
                                return extractValue || joinValues ? item[valueField || 'value'] : item;
                            });
                            if (joinValues) {
                                value = value.join(delimiter || ',');
                            }
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: value,
                                item: item,
                                items: items,
                                selectedItems: selectedItems
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeControl.prototype.handleSearch = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchApi, options, env, data, __, filterOptions, payload, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, searchApi = _a.searchApi, options = _a.options, env = _a.env, data = _a.data, __ = _a.translate;
                        filterOptions = [];
                        if (!isEffectiveApi(searchApi)) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, createObject(data, { term: keyword }))];
                    case 2:
                        payload = _b.sent();
                        if (!payload.ok) {
                            throw new Error(__(payload.msg || 'networkError'));
                        }
                        result = payload.data.options || payload.data.items || payload.data;
                        if (!Array.isArray(result)) {
                            throw new Error(__('Tree.invalidArray'));
                        }
                        filterOptions = result;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        if (!env.isCancel(e_1)) {
                            !searchApi.silent &&
                                env.notify('error', e_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (keyword) {
                            filterOptions = this.filterOptions(options, keyword);
                        }
                        _b.label = 6;
                    case 6:
                        this.setState({
                            keyword: keyword,
                            filteredOptions: keyword ? filterOptions : options
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeControl.prototype.domRef = function (ref) {
        this.treeRef = ref;
    };
    TreeControl.prototype.validate = function () {
        var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, delimiter = _a.delimiter;
        var curValue = Array.isArray(value)
            ? value
            : (value ? String(value) : '').split(delimiter || ',');
        if (minLength && curValue.length < minLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u4F4E\u4E8E\u8BBE\u5B9A\u7684\u6700\u5C0F\u4E2A\u6570".concat(minLength, "\uFF0C\u8BF7\u9009\u62E9\u66F4\u591A\u7684\u9009\u9879\u3002");
        }
        else if (maxLength && curValue.length > maxLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u8D85\u51FA\u8BBE\u5B9A\u7684\u6700\u5927\u4E2A\u6570".concat(maxLength, "\uFF0C\u8BF7\u53D6\u6D88\u9009\u62E9\u8D85\u51FA\u7684\u9009\u9879\u3002");
        }
    };
    TreeControl.prototype.renderOptionItem = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data;
        return render("option/".concat(states.index), menuTpl, {
            data: createObject(createObject(data, __assign({}, states)), option)
        });
    };
    TreeControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var treeContainerClassName = _a.treeContainerClassName, ns = _a.classPrefix, value = _a.value, enableNodePath = _a.enableNodePath, _b = _a.pathSeparator, pathSeparator = _b === void 0 ? '/' : _b, disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, multiple = _a.multiple, valueField = _a.valueField, initiallyOpen = _a.initiallyOpen, unfoldedLevel = _a.unfoldedLevel, withChildren = _a.withChildren, onlyChildren = _a.onlyChildren, onlyLeaf = _a.onlyLeaf, loading = _a.loading, hideRoot = _a.hideRoot, rootLabel = _a.rootLabel, autoCheckChildren = _a.autoCheckChildren, cascade = _a.cascade, rootValue = _a.rootValue, showIcon = _a.showIcon, showRadio = _a.showRadio, showOutline = _a.showOutline, onAdd = _a.onAdd, creatable = _a.creatable, createTip = _a.createTip, addControls = _a.addControls, onEdit = _a.onEdit, editable = _a.editable, editTip = _a.editTip, editControls = _a.editControls, removable = _a.removable, removeTip = _a.removeTip, onDelete = _a.onDelete, rootCreatable = _a.rootCreatable, rootCreateTip = _a.rootCreateTip, labelField = _a.labelField, iconField = _a.iconField, deferField = _a.deferField, nodePath = _a.nodePath, deferLoad = _a.deferLoad, expandTreeOptions = _a.expandTreeOptions, __ = _a.translate, data = _a.data, virtualThreshold = _a.virtualThreshold, itemHeight = _a.itemHeight, loadingConfig = _a.loadingConfig, menuTpl = _a.menuTpl, enableDefaultIcon = _a.enableDefaultIcon, searchable = _a.searchable, _c = _a.searchConfig, searchConfig = _c === void 0 ? {} : _c, heightAuto = _a.heightAuto, mobileUI = _a.mobileUI, testIdBuilder = _a.testIdBuilder; _a.popOverContainer; _a.env;
        var highlightTxt = this.props.highlightTxt;
        var _d = this.state, filteredOptions = _d.filteredOptions, keyword = _d.keyword;
        if (isPureVariable(highlightTxt)) {
            highlightTxt = resolveVariableAndFilter(highlightTxt, data);
        }
        var TreeCmpt = (React.createElement(Tree, { classPrefix: ns, onRef: this.domRef, labelField: labelField, valueField: valueField, iconField: iconField, deferField: deferField, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: __(placeholder), options: searchable ? filteredOptions : options, highlightTxt: searchable ? keyword : highlightTxt, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, onlyChildren: onlyChildren, onlyLeaf: onlyLeaf, hideRoot: hideRoot, rootLabel: __(rootLabel), rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, showOutline: showOutline, autoCheckChildren: autoCheckChildren, cascade: cascade, foldedField: "collapsed", value: value || '', nodePath: nodePath, enableNodePath: enableNodePath, pathSeparator: pathSeparator, selfDisabledAffectChildren: false, onAdd: onAdd, creatable: creatable, createTip: createTip, rootCreatable: rootCreatable, rootCreateTip: rootCreateTip, onEdit: onEdit, editable: editable, editTip: editTip, removable: removable, removeTip: removeTip, onDelete: onDelete, bultinCUD: !addControls && !editControls, onDeferLoad: deferLoad, onExpandTree: expandTreeOptions, virtualThreshold: virtualThreshold, itemHeight: toNumber(itemHeight) > 0 ? toNumber(itemHeight) : undefined, itemRender: menuTpl ? this.renderOptionItem : undefined, enableDefaultIcon: enableDefaultIcon, mobileUI: mobileUI, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('tree') }));
        return (React.createElement("div", __assign({ className: cx("".concat(ns, "TreeControl"), className, treeContainerClassName, {
                'is-sticky': searchable && (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.sticky),
                'h-auto': heightAuto
            }) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('control').getTestId()),
            React.createElement(Spinner, { size: "sm", key: "info", show: loading, loadingConfig: loadingConfig }),
            loading ? null : searchable ? (React.createElement(React.Fragment, null,
                React.createElement(SearchBox, __assign({ className: cx("".concat(ns, "TreeControl-searchbox"), searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className, { 'is-sticky': searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.sticky }), mini: false, clearable: true }, omit(searchConfig, 'className', 'sticky'), { onSearch: this.handleSearch, mobileUI: mobileUI, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('search') })),
                TreeCmpt)) : (TreeCmpt)));
    };
    TreeControl.defaultProps = {
        placeholder: 'placeholder.noData',
        multiple: false,
        rootLabel: 'Tree.root',
        rootValue: '',
        showIcon: true,
        enableNodePath: false,
        pathSeparator: '/'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "addItemFromAction", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "editItemFromAction", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "deleteItemFromAction", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TreeControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "domRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "renderOptionItem", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeControl.prototype, "render", null);
    return TreeControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TreeControlRenderer, _super);
    function TreeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeControlRenderer = __decorate([
        OptionsControl({
            type: 'input-tree'
        })
    ], TreeControlRenderer);
    return TreeControlRenderer;
})(TreeControl));

export { TreeControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
