/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var amisCore = require('amis-core');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function ColGroup(_a) {
    var columns = _a.columns, store = _a.store;
    var domRef = React__default["default"].createRef();
    React__default["default"].useEffect(function () {
        var table = domRef.current.parentElement;
        var trs = [];
        function reConnect() {
            // 整体监听不准，因为整体可能不会宽度变化
            // 监控 thead 下面所有的 th 的 resize 变化
            // 如果变化了，需要重新更新表格宽度计算
            var doms = [].slice.call(table.querySelectorAll(':scope > thead > tr > *'));
            // 先看 th 本身有没有变化，如果没变化，就不要重新监听了
            if (doms.some(function (d, index) { return trs[index] !== d; })) {
                observer.disconnect();
                trs = doms;
                doms.forEach(function (dom) {
                    observer.observe(dom);
                });
            }
        }
        var observer = new ResizeObserver(function () {
            reConnect();
            store.syncTableWidth();
        });
        store.initTableWidth();
        store.syncTableWidth();
        reConnect();
        return function () {
            observer.disconnect();
        };
    }, []);
    // 解决 chrome 91 以下版本的设置 colgroup>col 的 width 属性无效的问题
    // 低版本同时设置 thead>th
    // The problem is min-width CSS property.
    // Before Chrome 91, min-width was ignored on COL elements. 91 no longer ignores it.
    //
    // 同时 safari 也存在类似问题，设置 colgroup>col 的 width 属性无效
    if (amisCore.isSafari || (typeof amisCore.chromeVersion === 'number' && amisCore.chromeVersion < 91)) {
        React__default["default"].useEffect(function () {
            if (domRef.current) {
                var ths = [].slice.call(domRef.current.parentElement.querySelectorAll(':scope > thead > tr > th[data-index]'));
                ths.forEach(function (th) {
                    var index = parseInt(th.getAttribute('data-index'), 10);
                    var column = store.columns[index];
                    var style = '';
                    var width = -1;
                    if (store.columnWidthReady && column.width) {
                        width = column.width;
                    }
                    else if (column.pristine.width) {
                        width = column.pristine.width;
                    }
                    if (width === -1) {
                        return;
                    }
                    style += "width: ".concat(
                    // 有可能是百分比
                    typeof width === 'number' ? "".concat(width, "px") : width, ";");
                    if (store.tableLayout === 'auto') {
                        style += "min-width: ".concat(typeof width === 'number' ? "".concat(width, "px") : width, ";");
                    }
                    th.style.cssText = style;
                });
            }
        }, columns.map(function (column) { return column.width; }).concat(store.columnWidthReady));
    }
    return (_J$X_("colgroup", { ref: domRef }, columns.map(function (column) {
        var style = {};
        if (store.columnWidthReady && column.width) {
            style.width = column.width;
        }
        else if (column.pristine.width) {
            style.width = column.pristine.width;
        }
        if (store.tableLayout === 'auto' && style.width) {
            style.minWidth = style.width;
        }
        return _J$X_("col", { "data-index": column.index, style: style, key: column.id });
    })));
}
var ColGroup$1 = mobxReact.observer(ColGroup);

exports.ColGroup = ColGroup;
exports["default"] = ColGroup$1;
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
