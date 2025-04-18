/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filter, createObject, autobind } from 'amis-core';
import TableRow from './TableRow.js';
import { observer } from 'mobx-react';

var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.componentDidMount = function () {
        this.props.store.initTableWidth();
    };
    TableBody.prototype.testIdBuilder = function (rowPath) {
        var _a;
        return (_a = this.props.testIdBuilder) === null || _a === void 0 ? void 0 : _a.getChild("row-".concat(rowPath));
    };
    TableBody.prototype.renderRows = function (rows, columns, rowProps, indexPath) {
        var _this = this;
        if (columns === void 0) { columns = this.props.columns; }
        if (rowProps === void 0) { rowProps = {}; }
        var _a = this.props, rowClassName = _a.rowClassName, rowClassNameExpr = _a.rowClassNameExpr, onAction = _a.onAction, buildItemProps = _a.buildItemProps, checkOnItemClick = _a.checkOnItemClick, cx = _a.classnames, render = _a.render, renderCell = _a.renderCell, onCheck = _a.onCheck, onQuickChange = _a.onQuickChange, footable = _a.footable, ignoreFootableContent = _a.ignoreFootableContent, footableColumns = _a.footableColumns, itemAction = _a.itemAction, onRowClick = _a.onRowClick, onRowDbClick = _a.onRowDbClick, onRowMouseEnter = _a.onRowMouseEnter, onRowMouseLeave = _a.onRowMouseLeave, store = _a.store;
        return rows.map(function (item, rowIndex) {
            var itemProps = buildItemProps ? buildItemProps(item, rowIndex) : null;
            var rowPath = "".concat(indexPath ? indexPath + '/' : '').concat(rowIndex);
            var doms = [
                React.createElement(TableRow, __assign({}, itemProps, { testIdBuilder: _this.testIdBuilder, store: store, itemAction: itemAction, classnames: cx, checkOnItemClick: checkOnItemClick, key: item.id, itemIndex: rowIndex, rowPath: rowPath, item: item, itemClassName: cx(rowClassNameExpr
                        ? filter(rowClassNameExpr, item.locals)
                        : rowClassName, {
                        'is-last': item.depth > 1 &&
                            rowIndex === rows.length - 1 &&
                            !item.children.length
                    }), columns: columns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, 
                    // todo 先注释 quickEditEnabled={item.depth === 1}
                    onQuickChange: onQuickChange, onRowClick: onRowClick, onRowDbClick: onRowDbClick, onRowMouseEnter: onRowMouseEnter, onRowMouseLeave: onRowMouseLeave }, rowProps))
            ];
            if (footable && footableColumns.length) {
                if (item.depth === 1) {
                    doms.push(React.createElement(TableRow, __assign({}, itemProps, { store: store, itemAction: itemAction, classnames: cx, checkOnItemClick: checkOnItemClick, key: "foot-".concat(item.id), itemIndex: rowIndex, rowPath: rowPath, item: item, itemClassName: cx(rowClassNameExpr
                            ? filter(rowClassNameExpr, item.locals)
                            : rowClassName), columns: footableColumns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, onRowClick: onRowClick, onRowDbClick: onRowDbClick, onRowMouseEnter: onRowMouseEnter, onRowMouseLeave: onRowMouseLeave, footableMode: true, footableColSpan: columns.length, onQuickChange: onQuickChange, ignoreFootableContent: ignoreFootableContent }, rowProps, { testIdBuilder: _this.testIdBuilder })));
                }
            }
            else if (item.children.length && item.expanded) {
                // 嵌套表格
                doms.push.apply(doms, __spreadArray([], __read(_this.renderRows(item.children, columns, __assign(__assign({}, rowProps), { parent: item }), rowPath)), false));
            }
            return doms;
        });
    };
    TableBody.prototype.renderSummaryRow = function (position, items, rowIndex) {
        var _a, _b;
        var _c = this.props, columns = _c.columns, render = _c.render, data = _c.data, cx = _c.classnames, rows = _c.rows, prefixRowClassName = _c.prefixRowClassName, affixRowClassName = _c.affixRowClassName, store = _c.store;
        if (!(Array.isArray(items) && items.length)) {
            return null;
        }
        var offset = 0;
        // 将列的隐藏对应的把总结行也隐藏起来
        var result = items
            .map(function (item, index) {
            var colIdxs = [offset + index];
            if (item.colSpan > 1) {
                for (var i = 1; i < item.colSpan; i++) {
                    colIdxs.push(offset + index + i);
                }
                offset += item.colSpan - 1;
            }
            var matchedColumns = colIdxs
                .map(function (idx) { return columns.find(function (col) { return col.rawIndex === idx; }); })
                .filter(function (item) { return item; });
            return __assign(__assign({}, item), { colSpan: matchedColumns.length, firstColumn: matchedColumns[0], lastColumn: matchedColumns[matchedColumns.length - 1] });
        })
            .filter(function (item) { return item.colSpan; });
        //  如果是勾选栏，或者是展开栏，或者是拖拽栏，让它和下一列合并。
        if (result[0] &&
            typeof ((_a = columns[0]) === null || _a === void 0 ? void 0 : _a.type) === 'string' &&
            ((_b = columns[0]) === null || _b === void 0 ? void 0 : _b.type.substring(0, 2)) === '__') {
            result[0].colSpan = (result[0].colSpan || 1) + 1;
        }
        // 缺少的单元格补齐
        var appendLen = columns.length - result.reduce(function (p, c) { return p + (c.colSpan || 1); }, 0);
        // 多了则干掉一些
        while (appendLen < 0) {
            var item = result.pop();
            if (!item) {
                break;
            }
            appendLen += item.colSpan || 1;
        }
        // 少了则补个空的
        if (appendLen) {
            var item = /*result.length
              ? result.pop()
              : */ {
                type: 'html',
                html: '&nbsp;'
            };
            var column = store.filteredColumns[store.filteredColumns.length - 1];
            result.push(__assign(__assign({}, item), { colSpan: /*(item.colSpan || 1)*/ 1 + appendLen, firstColumn: column, lastColumn: column }));
        }
        var ctx = createObject(data, {
            items: rows.map(function (row) { return row.locals; })
        });
        return (React.createElement("tr", { className: cx('Table-tr', 'is-summary', position === 'prefix' ? prefixRowClassName : '', position === 'affix' ? affixRowClassName : ''), key: "summary-".concat(position, "-").concat(rowIndex || 0) }, result.map(function (item, index) {
            var Com = item.isHead ? 'th' : 'td';
            var firstColumn = item.firstColumn;
            var lastColumn = item.lastColumn;
            var style = __assign({}, item.style);
            if (item.align) {
                style.textAlign = item.align;
            }
            if (item.vAlign) {
                style.verticalAlign = item.vAlign;
            }
            var _a = __read(store.getStickyStyles(lastColumn.fixed === 'right' ? lastColumn : firstColumn, store.filteredColumns), 2), stickyStyle = _a[0], stickyClassName = _a[1];
            Object.assign(style, stickyStyle);
            return (React.createElement(Com, { key: index, colSpan: item.colSpan == 1 ? undefined : item.colSpan, style: style, className: (item.cellClassName || '') + ' ' + stickyClassName }, render("summary-row/".concat(index), item, {
                data: ctx
            })));
        })));
    };
    TableBody.prototype.renderSummary = function (position, items) {
        var _this = this;
        return Array.isArray(items)
            ? items.some(function (i) { return Array.isArray(i); })
                ? items.map(function (i, rowIndex) {
                    return _this.renderSummaryRow(position, Array.isArray(i) ? i : [i], rowIndex);
                })
                : this.renderSummaryRow(position, items)
            : null;
    };
    TableBody.prototype.render = function () {
        var _a = this.props; _a.classnames; var className = _a.className; _a.render; var rows = _a.rows, columns = _a.columns, rowsProps = _a.rowsProps, prefixRow = _a.prefixRow, affixRow = _a.affixRow; _a.translate;
        return (React.createElement("tbody", { className: className }, rows.length ? (React.createElement(React.Fragment, null,
            this.renderSummary('prefix', prefixRow),
            this.renderRows(rows, columns, rowsProps),
            this.renderSummary('affix', affixRow))) : null));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TableBody.prototype, "testIdBuilder", null);
    TableBody = __decorate([
        observer
    ], TableBody);
    return TableBody;
}(React.Component));

export { TableBody };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
