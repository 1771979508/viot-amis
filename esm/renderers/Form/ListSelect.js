/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { getVariable, createObject, filter, OptionsControl } from 'amis-core';
import { supportStatic } from './StaticHoc.js';

var ListControl = /** @class */ (function (_super) {
    __extends(ListControl, _super);
    function ListControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        var _c = this.props, resetValue = _c.resetValue, onChange = _c.onChange, formStore = _c.formStore, store = _c.store, name = _c.name;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            var pristineVal = (_b = getVariable((_a = formStore === null || formStore === void 0 ? void 0 : formStore.pristine) !== null && _a !== void 0 ? _a : store === null || store === void 0 ? void 0 : store.pristine, name)) !== null && _b !== void 0 ? _b : resetValue;
            onChange === null || onChange === void 0 ? void 0 : onChange(pristineVal !== null && pristineVal !== void 0 ? pristineVal : '');
        }
    };
    ListControl.prototype.handleDBClick = function (option, e) {
        this.props.onToggle(option, false, true);
        this.props.onAction(null, {
            type: 'submit'
        });
    };
    ListControl.prototype.handleClick = function (option, e) {
        if (e.target && e.target.closest('a,button')) {
            return;
        }
        var onToggle = this.props.onToggle;
        onToggle(option);
    };
    ListControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ListControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props, itemSchema = _a.itemSchema, labelField = _a.labelField; _a.valueField; var imageClassName = _a.imageClassName, itemClassName = _a.itemClassName, selectedOptions = _a.selectedOptions, cx = _a.classnames, render = _a.render, data = _a.data;
        if (!selectedOptions.length) {
            return displayValue;
        }
        var itemRender = function (option, key) {
            var label = option[labelField || 'label'];
            label = label || "\u9009\u9879".concat(key + 1);
            if (itemSchema || option.body || option.image) {
                return (React.createElement("div", { key: key, className: cx('ListControl-static-item', itemClassName) }, itemSchema
                    ? render("".concat(key, "/body"), itemSchema, {
                        data: createObject(data, option)
                    })
                    : option.body
                        ? render("".concat(key, "/body"), option.body)
                        : [
                            option.image ? (React.createElement("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                                React.createElement("img", { src: option.image, alt: label }))) : null,
                            React.createElement("div", { key: "label", className: cx('ListControl-itemLabel') }, label)
                        ]));
            }
            return (React.createElement("div", { key: key, className: cx("ListControl-static-item") }, label));
        };
        return (React.createElement("div", { className: cx('StaticList') }, selectedOptions.map(itemRender)));
    };
    ListControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, itemClassName = _a.itemClassName, cx = _a.classnames, className = _a.className; _a.style; var disabled = _a.disabled, options = _a.options, placeholder = _a.placeholder, selectedOptions = _a.selectedOptions, imageClassName = _a.imageClassName, submitOnDBClick = _a.submitOnDBClick, itemSchema = _a.itemSchema, activeItemSchema = _a.activeItemSchema, data = _a.data, labelField = _a.labelField, listClassName = _a.listClassName, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
        var body = null;
        if (options && options.length) {
            body = (React.createElement("div", { className: cx('ListControl-items', listClassName) }, options.map(function (option, key) { return (React.createElement("div", __assign({ key: key, className: cx("ListControl-item", itemClassName, {
                    'is-active': ~selectedOptions.indexOf(option),
                    'is-disabled': option.disabled || disabled,
                    'is-custom': !!itemSchema
                }), onClick: _this.handleClick.bind(_this, option), onDoubleClick: submitOnDBClick
                    ? _this.handleDBClick.bind(_this, option)
                    : undefined }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("options-".concat(option.value || key)).getTestId()), itemSchema
                ? render("".concat(key, "/body"), ~selectedOptions.indexOf(option)
                    ? activeItemSchema !== null && activeItemSchema !== void 0 ? activeItemSchema : itemSchema
                    : itemSchema, {
                    data: createObject(data, option)
                })
                : option.body
                    ? render("".concat(key, "/body"), option.body)
                    : [
                        option.image ? (React.createElement("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                            React.createElement("img", { src: option.image, alt: option[labelField || 'label'] }))) : null,
                        option[labelField || 'label'] ? (React.createElement("div", { key: "label", className: cx('ListControl-itemLabel') }, filter(String(option[labelField || 'label']), data))) : null
                        // {/* {option.tip ? (<div className={`${ns}ListControl-tip`}>{option.tip}</div>) : null} */}
                    ])); })));
        }
        return (React.createElement("div", { className: cx('ListControl', className) }, body ? (body) : (React.createElement("span", { className: cx('ListControl-placeholder') }, __(placeholder)))));
    };
    ListControl.propsList = ['itemSchema', 'value', 'renderFormItems'];
    ListControl.defaultProps = {
        clearable: false,
        imageClassName: '',
        submitOnDBClick: false
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ListControl.prototype, "render", null);
    return ListControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ListControlRenderer, _super);
    function ListControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControlRenderer = __decorate([
        OptionsControl({
            type: 'list-select',
            sizeMutable: false
        })
    ], ListControlRenderer);
    return ListControlRenderer;
})(ListControl));

export { ListControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
