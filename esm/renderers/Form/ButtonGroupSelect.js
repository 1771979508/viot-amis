/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { getVariable, isObject, getLevelFromClassName, autobind, OptionsControl } from 'amis-core';
import { supportStatic } from './StaticHoc.js';

var ButtonGroupControl = /** @class */ (function (_super) {
    __extends(ButtonGroupControl, _super);
    function ButtonGroupControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        var _c = this.props, resetValue = _c.resetValue, onChange = _c.onChange, formStore = _c.formStore, store = _c.store, name = _c.name;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            var pristineVal = (_b = getVariable((_a = formStore === null || formStore === void 0 ? void 0 : formStore.pristine) !== null && _a !== void 0 ? _a : store === null || store === void 0 ? void 0 : store.pristine, name)) !== null && _b !== void 0 ? _b : resetValue;
            onChange(pristineVal !== null && pristineVal !== void 0 ? pristineVal : '');
        }
    };
    ButtonGroupControl.prototype.handleToggle = function (option) {
        var _a = this.props, onToggle = _a.onToggle; _a.multiple; _a.autoFill; _a.onBulkChange;
        onToggle(option);
    };
    ButtonGroupControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ButtonGroupControl.prototype.getBadgeConfig = function (config, item) {
        return config
            ? (item === null || item === void 0 ? void 0 : item.badge) &&
                (typeof item.badge === 'string' || typeof item.badge === 'number')
                ? __assign(__assign({}, config), { text: item.badge }) : (item === null || item === void 0 ? void 0 : item.badge) && isObject(item.badge)
                ? __assign(__assign({}, config), item.badge) : null
            : item.badge;
    };
    ButtonGroupControl.prototype.render = function (props) {
        var _a;
        var _this = this;
        if (props === void 0) { props = this.props; }
        var render = props.render, ns = props.classPrefix, cx = props.classnames, className = props.className; props.style; var disabled = props.disabled, options = props.options; props.value; var labelField = props.labelField, placeholder = props.placeholder, btnClassName = props.btnClassName, btnActiveClassName = props.btnActiveClassName, selectedOptions = props.selectedOptions, buttons = props.buttons, size = props.size, block = props.block, vertical = props.vertical, tiled = props.tiled, badge = props.badge, testIdBuilder = props.testIdBuilder, __ = props.translate;
        var body = [];
        var btnLevel = props.btnLevel;
        var btnActiveLevel = props.btnActiveLevel;
        btnClassName && (btnLevel = getLevelFromClassName(btnClassName));
        btnActiveClassName &&
            (btnActiveLevel = getLevelFromClassName(btnActiveClassName));
        if (options && options.length) {
            body = options.map(function (option, key) {
                var active = !!~selectedOptions.indexOf(option);
                var optionBadge = _this.getBadgeConfig(badge, option);
                return render("option/".concat(key), {
                    label: option[labelField || 'label'],
                    icon: option.icon,
                    size: option.size || size,
                    badge: optionBadge,
                    type: 'button',
                    block: block
                }, {
                    key: key,
                    level: (active ? btnActiveLevel : '') || option.level || btnLevel,
                    className: cx(option.className, btnClassName, active && 'ButtonGroup-button--active'),
                    disabled: option.disabled || disabled,
                    testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("item-".concat(option[labelField || 'label'] || key)),
                    onClick: function (e) {
                        if (disabled) {
                            return;
                        }
                        _this.handleToggle(option);
                        e.preventDefault(); // 禁止 onAction 触发
                    }
                });
            });
        }
        else if (Array.isArray(buttons)) {
            body = buttons.map(function (button, key) {
                var buttonBadge = _this.getBadgeConfig(badge, button);
                return render("button/".concat(key), __assign(__assign({ size: size, block: block, activeLevel: btnActiveLevel, level: btnLevel, disabled: disabled }, button), { badge: buttonBadge }), {
                    key: key,
                    className: cx(button.className, btnClassName)
                });
            });
        }
        return (React.createElement("div", { className: cx("ButtonGroup", (_a = {
                    'ButtonGroup--block': block,
                    'ButtonGroup--vertical': vertical,
                    'ButtonGroup--tiled': tiled
                },
                _a["ButtonGroup--".concat(size)] = size,
                _a), className) }, body.length ? (body) : (React.createElement("span", { className: "".concat(ns, "ButtonGroup-placeholder") }, __(placeholder)))));
    };
    ButtonGroupControl.defaultProps = {
        btnLevel: 'default',
        btnActiveLevel: 'primary',
        clearable: false,
        vertical: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ButtonGroupControl.prototype, "handleToggle", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ButtonGroupControl.prototype, "render", null);
    return ButtonGroupControl;
}(React.Component));
var ButtonGroupControlRenderer = /** @class */ (function (_super) {
    __extends(ButtonGroupControlRenderer, _super);
    function ButtonGroupControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControlRenderer = __decorate([
        OptionsControl({
            type: 'button-group-select',
            sizeMutable: false,
            strictMode: false
        })
    ], ButtonGroupControlRenderer);
    return ButtonGroupControlRenderer;
}(ButtonGroupControl));

export { ButtonGroupControlRenderer, ButtonGroupControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
