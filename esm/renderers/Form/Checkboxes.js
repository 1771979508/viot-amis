/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import inRange from 'lodash/inRange';
import { getVariable, createObject, hasAbility, columnsSplit, flattenTreeWithLeafNodes, autobind, OptionsControl } from 'amis-core';
import { Checkbox, Icon, Spinner } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var CheckboxesControl = /** @class */ (function (_super) {
    __extends(CheckboxesControl, _super);
    function CheckboxesControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControl.prototype.doAction = function (action, data, throwErrors) {
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
    CheckboxesControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    CheckboxesControl.prototype.handleAddClick = function () {
        var onAdd = this.props.onAdd;
        onAdd && onAdd();
    };
    CheckboxesControl.prototype.handleEditClick = function (e, item) {
        var onEdit = this.props.onEdit;
        e.preventDefault();
        e.stopPropagation();
        onEdit && onEdit(item);
    };
    CheckboxesControl.prototype.handleDeleteClick = function (e, item) {
        var onDelete = this.props.onDelete;
        e.preventDefault();
        e.stopPropagation();
        onDelete && onDelete(item);
    };
    CheckboxesControl.prototype.componentDidMount = function () {
        this.updateBorderStyle();
        window.addEventListener('resize', this.updateBorderStyle);
    };
    CheckboxesControl.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.updateBorderStyle);
    };
    CheckboxesControl.prototype.updateBorderStyle = function () {
        if (this.props.optionType !== 'button') {
            return;
        }
        var wrapDom = this.refs.checkboxRef;
        var wrapWidth = wrapDom.clientWidth;
        var childs = Array.from(wrapDom.children);
        childs.forEach(function (child) {
            child.style.borderRadius = '0';
            child.style.borderLeftWidth = '1px';
            child.style.borderTopWidth = '1px';
        });
        var childTotalWidth = childs.reduce(function (pre, next) { return pre + next.clientWidth; }, 0);
        if (childTotalWidth <= wrapWidth) {
            if (childs.length === 1) {
                childs[0].style.borderRadius = '4px';
            }
            else {
                childs[0].style.borderRadius = '4px 0 0 4px';
                childs[childs.length - 1].style.borderRadius = '0 4px 4px 0';
                childs.forEach(function (child, idx) {
                    idx !== 0 && (child.style.borderLeftWidth = '0');
                });
            }
        }
        else {
            var curRowWidth_1 = 0;
            var curRow_1 = 0;
            var rowNum_1 = Math.floor(childTotalWidth / wrapWidth);
            var rowColArr_1 = [];
            for (var i = 0; i <= rowNum_1; i++) {
                var arr = [];
                rowColArr_1[i] = arr;
            }
            childs.forEach(function (child, idx) {
                curRowWidth_1 += child.clientWidth;
                if (curRowWidth_1 > wrapWidth) {
                    curRowWidth_1 = child.clientWidth;
                    curRow_1++;
                }
                if (curRow_1 > rowNum_1) {
                    return;
                }
                rowColArr_1[curRow_1].push(child);
            });
            rowColArr_1.forEach(function (row, rowIdx) {
                if (rowIdx === 0) {
                    row.forEach(function (r, colIdx) {
                        r.style.borderRadius = '0';
                        colIdx !== 0 && (r.style.borderLeftWidth = '0');
                        row.length > rowColArr_1[rowIdx + 1].length &&
                            (row[row.length - 1].style.borderBottomRightRadius = '4px');
                    });
                    row[0].style.borderTopLeftRadius = '4px';
                    row[row.length - 1].style.borderTopRightRadius = '4px';
                }
                else if (rowIdx === rowNum_1) {
                    row.forEach(function (r, colIdx) {
                        r.style.borderRadius = '0';
                        colIdx !== 0 && (r.style.borderLeftWidth = '0');
                        r.style.borderTopWidth = '0';
                        row[0].style.borderBottomLeftRadius = '4px';
                        row[row.length - 1].style.borderBottomRightRadius = '4px';
                    });
                }
                else {
                    row.forEach(function (r, colIdx) {
                        r.style.borderRadius = '0';
                        colIdx !== 0 && (r.style.borderLeftWidth = '0');
                        r.style.borderTopWidth = '0';
                        row.length > rowColArr_1[rowIdx + 1].length &&
                            (row[row.length - 1].style.borderBottomRightRadius = '4px');
                    });
                }
            });
        }
    };
    CheckboxesControl.prototype.renderGroup = function (option, index) {
        var _this = this;
        var _a;
        var _b = this.props, cx = _b.classnames, labelField = _b.labelField;
        if (!((_a = option.children) === null || _a === void 0 ? void 0 : _a.length)) {
            return null;
        }
        var children = option.children.map(function (option, index) {
            return _this.renderItem(option, index);
        });
        var body = this.columnsSplit(children);
        return (React.createElement("div", { key: 'group-' + index, className: cx('CheckboxesControl-group', option.className) },
            React.createElement("label", { className: cx('CheckboxesControl-groupLabel', option.labelClassName) }, option[labelField || 'label']),
            body));
    };
    CheckboxesControl.prototype.renderItem = function (option, index) {
        var _this = this;
        if (option.children) {
            return this.renderGroup(option, index);
        }
        var _a = this.props, render = _a.render, itemClassName = _a.itemClassName, onToggle = _a.onToggle, selectedOptions = _a.selectedOptions, disabled = _a.disabled, inline = _a.inline, labelClassName = _a.labelClassName, labelField = _a.labelField, removable = _a.removable, editable = _a.editable, __ = _a.translate, optionType = _a.optionType, menuTpl = _a.menuTpl, data = _a.data, testIdBuilder = _a.testIdBuilder;
        var labelText = String(option[labelField || 'label']);
        var optionLabelClassName = option['labelClassName'];
        var itemTestIdBuilder = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('item-' + labelText || index);
        return (React.createElement(Checkbox, { className: itemClassName, key: index, onChange: function () { return onToggle(option); }, checked: !!~selectedOptions.indexOf(option), disabled: disabled || option.disabled, inline: inline, labelClassName: optionLabelClassName || labelClassName, description: option.description, optionType: optionType, testIdBuilder: itemTestIdBuilder },
            menuTpl
                ? render("checkboxes/".concat(index), menuTpl, {
                    data: createObject(data, option)
                })
                : labelText,
            removable && hasAbility(option, 'removable') ? (React.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "left" },
                React.createElement(Icon, { icon: "minus", className: "icon", onClick: function (e) { return _this.handleDeleteClick(e, option); } }))) : null,
            editable && hasAbility(option, 'editable') ? (React.createElement("a", { "data-tooltip": "\u7F16\u8F91", "data-position": "left" },
                React.createElement(Icon, { icon: "pencil", className: "icon", onClick: function (e) { return _this.handleEditClick(e, option); } }))) : null));
    };
    CheckboxesControl.prototype.columnsSplit = function (body) {
        var _a = this.props, columnsCount = _a.columnsCount, cx = _a.classnames;
        var result = [];
        var tmp = [];
        body.forEach(function (node) {
            // 如果有分组，组内单独分列
            if (node && node.key && String(node.key).startsWith('group')) {
                // 夹杂在分组间的无分组选项，分别成块
                if (tmp.length) {
                    result.push(columnsSplit(tmp, cx, columnsCount));
                    tmp = [];
                }
                result.push(node);
            }
            else {
                tmp.push(node);
            }
        });
        // 收尾
        tmp.length && result.push(columnsSplit(tmp, cx, columnsCount));
        return result;
    };
    CheckboxesControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var disabled = _a.disabled, placeholder = _a.placeholder, options = _a.options, inline = _a.inline; _a.columnsCount; var selectedOptions = _a.selectedOptions; _a.onToggle; var onToggleAll = _a.onToggleAll, checkAll = _a.checkAll, checkAllText = _a.checkAllText, cx = _a.classnames, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName, creatable = _a.creatable, addApi = _a.addApi, createBtnLabel = _a.createBtnLabel, __ = _a.translate, optionType = _a.optionType, loading = _a.loading, loadingConfig = _a.loadingConfig;
        var body = [];
        if (options && options.length) {
            body = options.map(function (option, key) { return _this.renderItem(option, key); });
        }
        if (checkAll && body.length && optionType === 'default') {
            body.unshift(React.createElement(Checkbox, { key: "checkall", className: itemClassName, onChange: onToggleAll, checked: !!selectedOptions.length, partial: inRange(selectedOptions.length, 0, flattenTreeWithLeafNodes(options).length), disabled: disabled, inline: inline, labelClassName: labelClassName }, checkAllText !== null && checkAllText !== void 0 ? checkAllText : __('Checkboxes.selectAll')));
        }
        body = this.columnsSplit(body);
        return (React.createElement("div", { className: cx("CheckboxesControl", className), ref: "checkboxRef" },
            body && body.length ? (body) : loading ? null : (React.createElement("span", { className: "Form-placeholder" }, __(placeholder))),
            loading ? (React.createElement(Spinner, { show: true, icon: "reload", size: "sm", spinnerClassName: cx('Checkboxes-spinner'), loadingConfig: loadingConfig })) : null,
            (creatable || addApi) && !disabled ? (React.createElement("a", { className: cx('Checkboxes-addBtn'), onClick: this.handleAddClick },
                React.createElement(Icon, { icon: "plus", className: "icon" }),
                __(createBtnLabel))) : null));
    };
    CheckboxesControl.defaultProps = {
        columnsCount: 1,
        multiple: true,
        placeholder: 'placeholder.noOption',
        creatable: false,
        inline: true,
        createBtnLabel: 'Select.createLabel',
        optionType: 'default'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleAddClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event, Object]),
        __metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleEditClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event, Object]),
        __metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleDeleteClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "updateBorderStyle", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "render", null);
    return CheckboxesControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CheckboxesControlRenderer, _super);
    function CheckboxesControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControlRenderer = __decorate([
        OptionsControl({
            type: 'checkboxes',
            sizeMutable: false
        })
    ], CheckboxesControlRenderer);
    return CheckboxesControlRenderer;
})(CheckboxesControl));

export { CheckboxesControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
