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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var InputGroup = /** @class */ (function (_super) {
    tslib.__extends(InputGroup, _super);
    function InputGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.toDispose = [];
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.validateHook = _this.validateHook.bind(_this);
        _this.state = {
            isFocused: false
        };
        return _this;
    }
    InputGroup.prototype.componentDidMount = function () {
        var _a = this.props, addHook = _a.addHook, name = _a.name;
        if (name && addHook) {
            this.toDispose.push(addHook(this.validateHook, 'validate'));
        }
    };
    InputGroup.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        if (amisCore.anyChanged(['errorCode', 'delimiter'], prevProps === null || prevProps === void 0 ? void 0 : prevProps.validationConfig, (_a = this.props) === null || _a === void 0 ? void 0 : _a.validationConfig)) {
            this.validateHook();
        }
    };
    InputGroup.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
    };
    InputGroup.prototype.getValidationConfig = function () {
        var validationConfig = this.props.validationConfig;
        return {
            errorMode: (validationConfig === null || validationConfig === void 0 ? void 0 : validationConfig.errorMode) !== 'partial' ? 'full' : 'partial',
            delimiter: (validationConfig === null || validationConfig === void 0 ? void 0 : validationConfig.delimiter) &&
                typeof validationConfig.delimiter === 'string'
                ? validationConfig.delimiter
                : '; '
        };
    };
    InputGroup.prototype.validateHook = function () {
        var _a;
        var _b = this.props, formStore = _b.formStore, formItem = _b.formItem, name = _b.name;
        var delimiter = this.getValidationConfig().delimiter;
        if (!name) {
            return;
        }
        var chidren = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.inputGroupItems) === null || _a === void 0 ? void 0 : _a[name];
        if (!Array.isArray(chidren)) {
            return;
        }
        var errorCollection = chidren
            .map(function (item, index) {
            if (item.errors.length <= 0) {
                return '';
            }
            /** 标识符格式: 索引值 + label */
            var identifier = item.label
                ? "(".concat(index + 1, ")").concat(item.label)
                : "(".concat(index + 1, ")");
            return "".concat(identifier, ": ").concat(item.errors.join(delimiter));
        })
            .filter(Boolean);
        formItem && formItem.setError(errorCollection);
    };
    InputGroup.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    InputGroup.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    InputGroup.prototype.renderControl = function (control, index, otherProps) {
        var _a = this.props, render = _a.render, onChange = _a.onChange;
        if (!control) {
            return null;
        }
        var subSchema = control;
        return render("".concat(index), subSchema, tslib.__assign({ onChange: onChange }, otherProps));
    };
    InputGroup.prototype.validate = function () {
        var formItem = this.props.formItem;
        var errors = [];
        // issue 处理这个，按理不需要这么弄。
        formItem === null || formItem === void 0 ? void 0 : formItem.subFormItems.forEach(function (item) {
            if (item.errors.length) {
                errors.push.apply(errors, tslib.__spreadArray([], tslib.__read(item.errors), false));
            }
        });
        return errors.length ? errors : '';
    };
    InputGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, body = _a.body, controls = _a.controls, className = _a.className; _a.style; _a.mode; var horizontal = _a.horizontal; _a.formMode; var formHorizontal = _a.formHorizontal, data = _a.data, cx = _a.classnames, isStatic = _a.static, disabled = _a.disabled, mobileUI = _a.mobileUI;
        var errorMode = this.getValidationConfig().errorMode;
        var inputs = Array.isArray(controls) ? controls : body;
        if (!Array.isArray(inputs)) {
            inputs = [];
        }
        inputs = inputs.filter(function (item) {
            if (item && (item.hidden || item.visible === false)) {
                return false;
            }
            var exprProps = amisCore.getExprProperties(item || {}, data);
            if (exprProps.hidden || exprProps.visible === false) {
                return false;
            }
            return true;
        });
        var horizontalDeeper = horizontal ||
            (formHorizontal
                ? amisCore.makeHorizontalDeeper(formHorizontal, inputs.length)
                : undefined);
        return (_J$X_("div", { className: cx("InputGroup", "InputGroup-validation--".concat(errorMode), className, {
                'is-focused': this.state.isFocused
            }, {
                'is-mobile': mobileUI
            }) }, inputs.map(function (control, index) {
            var isAddOn = ~[
                'icon',
                'plain',
                'tpl',
                'button',
                'submit',
                'reset'
            ].indexOf(control && control.type);
            var dom = _this.renderControl(control, index, {
                formHorizontal: horizontalDeeper,
                formMode: 'normal',
                inputOnly: true,
                inputGroupControl: {
                    name: _this.props.name,
                    path: _this.props.$path,
                    schema: _this.props.$schema
                },
                key: index,
                static: isStatic,
                disabled: disabled,
                onFocus: _this.handleFocus,
                onBlur: _this.handleBlur
            });
            return isAddOn ? (_J$X_("span", { key: index, className: cx(control.addOnclassName, ~['button', 'submit', 'reset'].indexOf(control && control.type)
                    ? 'InputGroup-btn'
                    : 'InputGroup-addOn') }, dom)) : (dom);
        })));
    };
    InputGroup.defaultProps = {
        validationConfig: {
            errorMode: 'full',
            delimiter: '; '
        }
    };
    return InputGroup;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(InputGroupRenderer, _super);
    function InputGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputGroupRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-group',
            strictMode: false
        })
    ], InputGroupRenderer);
    return InputGroupRenderer;
})(InputGroup));

exports.InputGroup = InputGroup;
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
