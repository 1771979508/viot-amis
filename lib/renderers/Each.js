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
function EachItem(props) {
    var render = props.render, data = props.data, items = props.items, item = props.item, name = props.name, index = props.index, itemKeyName = props.itemKeyName, indexKeyName = props.indexKeyName;
    var ctx = React__default["default"].useMemo(function () {
        var _a, _b;
        return amisCore.createObject(data, tslib.__assign(tslib.__assign({}, (amisCore.isObject(item) ? tslib.__assign({ index: index }, item) : (_a = {}, _a[name] = item, _a))), (_b = {}, _b[itemKeyName || 'item'] = item, _b[indexKeyName || 'index'] = index, _b)));
    }, [item, data, name, index, itemKeyName, indexKeyName]);
    return render("item/".concat(index), items, {
        data: ctx
    });
}
var Each = /** @class */ (function (_super) {
    tslib.__extends(Each, _super);
    function Each() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Each.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, name = _a.name, className = _a.className, style = _a.style, render = _a.render, items = _a.items, itemKeyName = _a.itemKeyName, indexKeyName = _a.indexKeyName, placeholder = _a.placeholder, cx = _a.classnames, __ = _a.translate, env = _a.env, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, themeCss = _a.themeCss;
        var value = amisCore.getPropValue(this.props, function (props) {
            return props.source
                ? amisCore.resolveVariableAndFilter(props.source, props.data, '| raw')
                : undefined;
        });
        var arr = amisCore.isObject(value)
            ? Object.keys(value).map(function (key) { return ({
                key: key,
                value: value[key]
            }); })
            : Array.isArray(value)
                ? value
                : [];
        // 最大循环次数支持
        var maxLength = amisCore.isPureVariable(this.props.maxLength)
            ? amisCore.resolveVariableAndFilter(this.props.maxLength, this.props.data) || 0
            : this.props.maxLength;
        if (Array.isArray(arr) && maxLength >= 1 && arr.length > maxLength) {
            arr = arr.slice(0, maxLength);
        }
        return (_J$X_("div", { className: cx('Each', className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss }))), style: amisCore.buildStyle(style, data) },
            Array.isArray(arr) && arr.length && items ? (arr.map(function (item, index) { return (_J$X_(EachItem, tslib.__assign({}, _this.props, { items: items, key: index, index: index, data: data, item: item, name: name, itemKeyName: itemKeyName, indexKeyName: indexKeyName }))); })) : (_J$X_("div", { className: cx('Each-placeholder') }, render('placeholder', __(placeholder)))),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Each.propsList = ['name', 'items', 'value'];
    Each.defaultProps = {
        className: '',
        placeholder: 'placeholder.noData'
    };
    return Each;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(EachRenderer, _super);
    function EachRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EachRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'each'
        })
    ], EachRenderer);
    return EachRenderer;
})(Each));

exports["default"] = Each;
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
