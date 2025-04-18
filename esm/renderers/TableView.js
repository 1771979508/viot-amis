/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { isVisible, resolveMappingObject, setThemeClassName, CustomStyle, Renderer } from 'amis-core';

/**
 * @file 用于表格类型的展现效果，界面可定制化能力更强
 */
var defaultPadding = 'var(--TableCell-paddingY) var(--TableCell-paddingX)';
var TableView = /** @class */ (function (_super) {
    __extends(TableView, _super);
    function TableView(props) {
        return _super.call(this, props) || this;
    }
    TableView.prototype.renderTd = function (td, colIndex, rowIndex) {
        var _a = this.props, border = _a.border, borderColor = _a.borderColor; _a.render; var data = _a.data, padding = _a.padding;
        var key = "td-".concat(colIndex);
        var styleBorder;
        if (border) {
            styleBorder = "1px solid ".concat(borderColor);
        }
        return isVisible(td, data) ? (React.createElement("td", { style: __assign({ border: styleBorder, color: td.color, fontWeight: td.bold ? 'bold' : 'normal', background: td.background, padding: td.padding || padding, width: td.width || 'auto', textAlign: td.align || 'left', verticalAlign: td.valign || 'center' }, td.style), align: td.align, valign: td.valign, rowSpan: td.rowspan, colSpan: td.colspan, key: key }, this.renderTdBody(td.body))) : null;
    };
    TableView.prototype.renderTdBody = function (body) {
        var render = this.props.render;
        return render('td', body || '');
    };
    TableView.prototype.renderTds = function (tds, rowIndex) {
        var _this = this;
        var data = this.props.data;
        return tds.map(function (td, colIndex) {
            return _this.renderTd(resolveMappingObject(td, data), colIndex, rowIndex);
        });
    };
    TableView.prototype.renderTr = function (tr, rowIndex) {
        var key = "tr-".concat(rowIndex);
        var data = this.props.data;
        return isVisible(tr, data) ? (React.createElement("tr", { style: __assign({ height: tr.height, background: tr.background }, tr.style), key: key }, this.renderTds(tr.tds || [], rowIndex))) : null;
    };
    TableView.prototype.renderTrs = function (trs) {
        var _this = this;
        var data = this.props.data;
        var tr = trs.map(function (tr, rowIndex) {
            return _this.renderTr(resolveMappingObject(tr, data), rowIndex);
        });
        return tr;
    };
    TableView.prototype.renderCols = function () {
        var _a = this.props, cols = _a.cols, data = _a.data;
        if (cols) {
            var colsElement = cols.map(function (col) {
                col = resolveMappingObject(col, data);
                return React.createElement("col", { span: col.span, style: col.style });
            });
            return React.createElement("colgroup", null, colsElement);
        }
        return null;
    };
    TableView.prototype.renderCaption = function () {
        if (this.props.caption) {
            return (React.createElement("caption", { style: {
                    captionSide: this.props.captionSide === 'bottom' ? 'bottom' : 'top'
                } }, this.props.caption));
        }
        return null;
    };
    TableView.prototype.render = function () {
        var _a = this.props, width = _a.width, _b = _a.trs, trs = _b === void 0 ? [] : _b, cx = _a.classnames, className = _a.className, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss, style = _a.style;
        var renderNode = (React.createElement("table", { className: cx('TableView', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: { width: width, borderCollapse: 'collapse' }, "data-id": id },
            this.renderCaption(),
            this.renderCols(),
            React.createElement("tbody", null, this.renderTrs(trs)),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
        if (style && Object.keys(style).length) {
            return (React.createElement("div", { className: "ae-TableViewEditor", style: style }, renderNode));
        }
        return renderNode;
    };
    TableView.defaultProps = {
        padding: defaultPadding,
        width: '100%',
        border: true,
        borderColor: 'var(--borderColor)'
    };
    return TableView;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TableViewRenderer, _super);
    function TableViewRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableViewRenderer = __decorate([
        Renderer({
            type: 'table-view',
            autoVar: true
        })
    ], TableViewRenderer);
    return TableViewRenderer;
})(TableView));

export { TableView as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
