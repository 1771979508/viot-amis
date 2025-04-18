/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __rest } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { difference, setVariable, Overlay, PopOver, getRendererByName, getPropValue, noop } from 'amis-core';
import hoistNonReactStatic from 'hoist-non-react-statics';
import keycode from 'keycode';
import omit from 'lodash/omit';

/**
 * @file scoped.jsx.
 * @author fex
 */
var inited = false;
var currentOpened;
var HocQuickEdit = function (config) {
    return function (Component) {
        var QuickEditComponent = /** @class */ (function (_super) {
            __extends(QuickEditComponent, _super);
            function QuickEditComponent(props) {
                var _this = _super.call(this, props) || this;
                _this.openQuickEdit = _this.openQuickEdit.bind(_this);
                _this.closeQuickEdit = _this.closeQuickEdit.bind(_this);
                _this.handleAction = _this.handleAction.bind(_this);
                _this.handleSubmit = _this.handleSubmit.bind(_this);
                _this.handleKeyUp = _this.handleKeyUp.bind(_this);
                _this.overlayRef = _this.overlayRef.bind(_this);
                _this.handleWindowKeyPress = _this.handleWindowKeyPress.bind(_this);
                _this.handleWindowKeyDown = _this.handleWindowKeyDown.bind(_this);
                _this.formRef = _this.formRef.bind(_this);
                _this.formItemRef = _this.formItemRef.bind(_this);
                _this.handleInit = _this.handleInit.bind(_this);
                _this.handleChange = _this.handleChange.bind(_this);
                _this.handleFormItemChange = _this.handleFormItemChange.bind(_this);
                _this.handleBulkChange = _this.handleBulkChange.bind(_this);
                _this.state = {
                    isOpened: false
                };
                return _this;
            }
            QuickEditComponent.prototype.componentDidMount = function () {
                this.target = findDOMNode(this);
                if (inited) {
                    return;
                }
                inited = true;
                document.body.addEventListener('keypress', this.handleWindowKeyPress);
                document.body.addEventListener('keydown', this.handleWindowKeyDown);
            };
            QuickEditComponent.prototype.formRef = function (ref) {
                var _a = this.props, quickEditFormRef = _a.quickEditFormRef, rowIndex = _a.rowIndex, colIndex = _a.colIndex;
                if (quickEditFormRef) {
                    while (ref && ref.getWrappedInstance) {
                        ref = ref.getWrappedInstance();
                    }
                    quickEditFormRef(ref, colIndex, rowIndex);
                }
            };
            QuickEditComponent.prototype.formItemRef = function (ref) {
                var _a = this.props, quickEditFormItemRef = _a.quickEditFormItemRef, rowIndex = _a.rowIndex, colIndex = _a.colIndex;
                if (quickEditFormItemRef) {
                    while (ref && ref.getWrappedInstance) {
                        ref = ref.getWrappedInstance();
                    }
                    quickEditFormItemRef(ref, colIndex, rowIndex);
                }
            };
            QuickEditComponent.prototype.handleWindowKeyPress = function (e) {
                var ns = this.props.classPrefix;
                var el = e.target.closest(".".concat(ns, "Field--quickEditable"));
                if (!el) {
                    return;
                }
                var table = el.closest('table');
                if (!table) {
                    return;
                }
                if (keycode(e) === 'space' &&
                    !~['INPUT', 'TEXTAREA'].indexOf(el.tagName)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            };
            QuickEditComponent.prototype.handleWindowKeyDown = function (e) {
                var code = keycode(e);
                if (code === 'esc' && currentOpened) {
                    currentOpened.closeQuickEdit();
                }
                else if (~['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) ||
                    e.target.contentEditable === 'true' ||
                    !~['up', 'down', 'left', 'right'].indexOf(code)) {
                    return;
                }
                e.preventDefault();
                var ns = this.props.classPrefix;
                var el = e.target.closest(".".concat(ns, "Field--quickEditable")) ||
                    document.querySelector(".".concat(ns, "Field--quickEditable"));
                if (!el) {
                    return;
                }
                var table = el.closest('table');
                if (!table) {
                    return;
                }
                var current = table.querySelector(".".concat(ns, "Field--quickEditable:focus"));
                if (!current) {
                    var dom = table.querySelector(".".concat(ns, "Field--quickEditable[tabindex]"));
                    dom && dom.focus();
                }
                else {
                    var prevTr = void 0, nextTr = void 0, prevTd = void 0, nextTd = void 0;
                    switch (code) {
                        case 'up':
                            prevTr = current.parentNode
                                .previousSibling;
                            if (prevTr) {
                                var index = current.cellIndex;
                                prevTr.children[index].focus();
                            }
                            break;
                        case 'down':
                            nextTr = current.parentNode
                                .nextSibling;
                            if (nextTr) {
                                var index = current.cellIndex;
                                nextTr.children[index].focus();
                            }
                            break;
                        case 'left':
                            prevTd = current.previousElementSibling;
                            while (prevTd) {
                                if (prevTd.matches(".".concat(ns, "Field--quickEditable[tabindex]"))) {
                                    break;
                                }
                                prevTd = prevTd.previousElementSibling;
                            }
                            if (prevTd) {
                                prevTd.focus();
                            }
                            else if (current.parentNode.previousSibling) {
                                var tds = current.parentNode
                                    .previousSibling.querySelectorAll(".".concat(ns, "Field--quickEditable[tabindex]"));
                                if (tds.length) {
                                    tds[tds.length - 1].focus();
                                }
                            }
                            break;
                        case 'right':
                            nextTd = current.nextSibling;
                            while (nextTd) {
                                if (nextTd.matches(".".concat(ns, "Field--quickEditable[tabindex]"))) {
                                    break;
                                }
                                nextTd = nextTd.nextSibling;
                            }
                            if (nextTd) {
                                nextTd.focus();
                            }
                            else if (current.parentNode.nextSibling) {
                                nextTd = current.parentNode.nextSibling.querySelector(".".concat(ns, "Field--quickEditable[tabindex]"));
                                if (nextTd) {
                                    nextTd.focus();
                                }
                            }
                            break;
                    }
                }
            };
            // handleClickOutside() {
            //     this.closeQuickEdit();
            // }
            QuickEditComponent.prototype.overlayRef = function (ref) {
                this.overlay = ref;
            };
            QuickEditComponent.prototype.handleAction = function (e, action, ctx) {
                var onAction = this.props.onAction;
                if (action.actionType === 'cancel' || action.actionType === 'close') {
                    this.closeQuickEdit();
                    return;
                }
                onAction && onAction(e, action, ctx);
            };
            QuickEditComponent.prototype.handleSubmit = function (values) {
                var _a = this.props, onQuickChange = _a.onQuickChange, quickEdit = _a.quickEdit;
                this.closeQuickEdit();
                onQuickChange(values, quickEdit.saveImmediately, false, quickEdit);
                return false;
            };
            QuickEditComponent.prototype.handleInit = function (values) {
                var _a = this.props, onQuickChange = _a.onQuickChange, data = _a.data;
                var diff = difference(values, data);
                Object.keys(diff).length && onQuickChange(diff, false, true);
            };
            QuickEditComponent.prototype.handleChange = function (values, diff) {
                var _a = this.props, onQuickChange = _a.onQuickChange, quickEdit = _a.quickEdit;
                Object.keys(diff).length &&
                    onQuickChange(diff, // 只变化差异部分，其他值有可能是旧的
                    quickEdit.saveImmediately, false, quickEdit);
            };
            QuickEditComponent.prototype.handleFormItemChange = function (value) {
                var _a = this.props, onQuickChange = _a.onQuickChange, quickEdit = _a.quickEdit, name = _a.name;
                var data = {};
                setVariable(data, name, value);
                onQuickChange(data, quickEdit.saveImmediately, false, quickEdit);
            };
            // autoFill 是通过 onBulkChange 触发的
            // quickEdit 需要拦截这个，否则修改的数据就是错的
            QuickEditComponent.prototype.handleBulkChange = function (values) {
                var _a = this.props, onQuickChange = _a.onQuickChange, quickEdit = _a.quickEdit;
                onQuickChange(values, quickEdit.saveImmediately, false, quickEdit);
            };
            QuickEditComponent.prototype.openQuickEdit = function () {
                currentOpened = this;
                this.setState({
                    isOpened: true
                });
            };
            QuickEditComponent.prototype.closeQuickEdit = function () {
                var _this = this;
                if (!this.state.isOpened) {
                    return;
                }
                currentOpened = null;
                var ns = this.props.classPrefix;
                this.setState({
                    isOpened: false
                }, function () {
                    var el = findDOMNode(_this);
                    var table = el.closest('table');
                    ((table &&
                        table.querySelectorAll("td.".concat(ns, "Field--quickEditable:focus"))
                            .length) ||
                        el) &&
                        el.focus();
                });
            };
            QuickEditComponent.prototype.buildSchema = function () {
                var _a = this.props, quickEdit = _a.quickEdit, name = _a.name, label = _a.label, __ = _a.translate, id = _a.id;
                var schema;
                var isline = quickEdit.mode === 'inline';
                if (quickEdit === true) {
                    schema = {
                        type: 'form',
                        title: '',
                        autoFocus: true,
                        body: [
                            {
                                type: 'input-text',
                                name: name,
                                placeholder: label,
                                label: false
                            }
                        ]
                    };
                }
                else if (quickEdit) {
                    if (quickEdit === null || quickEdit === void 0 ? void 0 : quickEdit.isFormMode) {
                        schema = {
                            mode: 'normal',
                            type: 'form',
                            wrapWithPanel: false,
                            body: [
                                __assign(__assign({}, omit(quickEdit, 'isFormMode')), { label: false })
                            ]
                        };
                    }
                    else if (quickEdit.body &&
                        !~['combo', 'group', 'panel', 'fieldSet', 'fieldset'].indexOf(quickEdit.type)) {
                        schema = __assign(__assign({ title: '', autoFocus: !isline }, quickEdit), { mode: 'normal', type: 'form' });
                    }
                    else {
                        schema = {
                            title: '',
                            className: quickEdit.formClassName,
                            type: 'form',
                            autoFocus: !isline,
                            mode: 'normal',
                            body: [
                                __assign(__assign(__assign({ type: quickEdit.type || 'input-text', name: quickEdit.name || name }, (isline ? { id: id } : {})), quickEdit), { mode: undefined })
                            ]
                        };
                    }
                }
                var isFormMode = quickEdit === null || quickEdit === void 0 ? void 0 : quickEdit.isFormMode;
                if (schema) {
                    schema = __assign(__assign({}, schema), { wrapWithPanel: !(isline || isFormMode), actions: isline || isFormMode
                            ? []
                            : [
                                {
                                    type: 'button',
                                    label: __('cancel'),
                                    actionType: 'cancel'
                                },
                                {
                                    label: __('confirm'),
                                    type: 'submit',
                                    primary: true
                                }
                            ] });
                }
                return schema || 'error';
            };
            QuickEditComponent.prototype.handleKeyUp = function (e) {
                var code = keycode(e);
                if (code === 'space' &&
                    !~['INPUT', 'TEXTAREA'].indexOf(e.target.tagName)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openQuickEdit();
                }
            };
            QuickEditComponent.prototype.renderPopOver = function () {
                var _this = this;
                var _a = this.props, quickEdit = _a.quickEdit, render = _a.render, popOverContainer = _a.popOverContainer, ns = _a.classPrefix, cx = _a.classnames, canAccessSuperData = _a.canAccessSuperData;
                var content = (React.createElement("div", { ref: this.overlayRef, className: cx(quickEdit.className) }, render('quick-edit-form', this.buildSchema(), {
                    value: undefined,
                    defaultStatic: false,
                    onSubmit: this.handleSubmit,
                    onAction: this.handleAction,
                    onChange: null,
                    formLazyChange: false,
                    ref: this.formRef,
                    popOverContainer: function () { return _this.overlay; },
                    canAccessSuperData: canAccessSuperData,
                    formStore: undefined
                })));
                popOverContainer = popOverContainer || (function () { return findDOMNode(_this); });
                return (React.createElement(Overlay, { container: popOverContainer, target: function () { return _this.target; }, onHide: this.closeQuickEdit, placement: "left-top right-top left-bottom right-bottom left-top-right-top left-bottom-right-bottom left-top", show: true },
                    React.createElement(PopOver, { classPrefix: ns, className: cx("".concat(ns, "QuickEdit-popover"), quickEdit.popOverClassName), onHide: this.closeQuickEdit, overlay: true }, content)));
            };
            QuickEditComponent.prototype.renderInlineForm = function () {
                var _a, _b;
                var _c = this.props, render = _c.render, cx = _c.classnames, canAccessSuperData = _c.canAccessSuperData, disabled = _c.disabled; _c.value; var name = _c.name;
                var schema = this.buildSchema();
                // 有且只有一个表单项时，直接渲染表单项
                if (Array.isArray(schema.body) &&
                    schema.body.length === 1 &&
                    !schema.body[0].unique && // 唯一模式还不支持
                    !schema.body[0].value && // 不能有默认值表达式什么的情况
                    schema.body[0].name &&
                    schema.body[0].name === name &&
                    schema.body[0].type &&
                    ((_a = getRendererByName(schema.body[0].type)) === null || _a === void 0 ? void 0 : _a.isFormItem)) {
                    return render('inline-form-item', schema.body[0], {
                        mode: 'normal',
                        value: (_b = getPropValue(this.props)) !== null && _b !== void 0 ? _b : '',
                        onChange: this.handleFormItemChange,
                        onBulkChange: this.handleBulkChange,
                        formItemRef: this.formItemRef,
                        defaultStatic: false,
                        // 不下发下面的属性，否则当使用表格类型的 Picker 时（或其他会用到 Table 的自定义组件），会导致一些异常行为
                        buildItemProps: null,
                        quickEditFormRef: null,
                        quickEditFormItemRef: null
                    });
                }
                return render('inline-form', schema, {
                    value: undefined,
                    wrapperComponent: 'div',
                    className: cx('Form--quickEdit'),
                    ref: this.formRef,
                    simpleMode: true,
                    onInit: this.handleInit,
                    onChange: this.handleChange,
                    onBulkChange: this.handleBulkChange,
                    formLazyChange: false,
                    canAccessSuperData: canAccessSuperData,
                    disabled: disabled,
                    defaultStatic: false,
                    // 不下发这下面的属性，否则当使用表格类型的 Picker 时（或其他会用到 Table 的自定义组件），会导致一些异常行为
                    buildItemProps: null,
                    // quickEditFormRef: null,
                    // ^ 不知道为什么，这里不能阻挡下发，否则单测 Renderer:input-table formula 过不了
                    quickEditFormItemRef: null
                });
            };
            QuickEditComponent.prototype.render = function () {
                var _a = this.props, onQuickChange = _a.onQuickChange, quickEdit = _a.quickEdit, quickEditEnabled = _a.quickEditEnabled, className = _a.className, cx = _a.classnames, render = _a.render, noHoc = _a.noHoc; _a.canAccessSuperData; var disabled = _a.disabled;
                // 静态渲染等情况也把 InputTable 相关的回调函数剔除，防止嵌套渲染表格时出问题
                var _b = this.props; _b.buildItemProps; _b.quickEditFormRef; _b.quickEditFormItemRef; var restProps = __rest(_b, ["buildItemProps", "quickEditFormRef", "quickEditFormItemRef"]);
                if (!quickEdit ||
                    !onQuickChange ||
                    (!(typeof quickEdit === 'object' && (quickEdit === null || quickEdit === void 0 ? void 0 : quickEdit.isQuickEditFormMode)) &&
                        quickEditEnabled === false) ||
                    noHoc
                // 此处的readOnly会导致组件值无法传递出去，如 value: "${a + b}" 这样的 value 变化需要同步到数据域
                // || readOnly
                ) {
                    return React.createElement(Component, __assign({}, restProps, { formItemRef: this.formItemRef }));
                }
                if (quickEdit.mode === 'inline' ||
                    quickEdit.isFormMode) {
                    return (React.createElement(Component, __assign({}, restProps), this.renderInlineForm()));
                }
                else {
                    return (React.createElement(Component, __assign({}, restProps, { className: cx("Field--quickEditable", className, {
                            in: this.state.isOpened
                        }), tabIndex: quickEdit.focusable === false
                            ? undefined
                            : '0', onKeyUp: disabled ? noop : this.handleKeyUp }),
                        React.createElement(Component, __assign({}, restProps, { contentsOnly: true, noHoc: true })),
                        disabled
                            ? null
                            : render('quick-edit-button', {
                                type: 'button',
                                onClick: this.openQuickEdit,
                                className: 'Field-quickEditBtn',
                                icon: quickEdit.icon || 'edit',
                                level: 'link'
                            }),
                        this.state.isOpened ? this.renderPopOver() : null));
                }
            };
            QuickEditComponent.ComposedComponent = Component;
            return QuickEditComponent;
        }(React.PureComponent));
        hoistNonReactStatic(QuickEditComponent, Component);
        return QuickEditComponent;
    };
};

export { HocQuickEdit, HocQuickEdit as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
