/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/** @class */ ((function (_super) {
    tslib.__extends(AMISRenderer, _super);
    function AMISRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AMISRenderer.prototype.render = function () {
        var _a = this.props, render = _a.render, props = _a.props, schema = _a.schema;
        var value = amisCore.getPropValue(this.props) || schema;
        if (typeof value === 'string') {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                console.warn('amis value must be json string', e);
                value = null;
            }
        }
        return render('amis', value, props);
    };
    AMISRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'amis'
        })
    ], AMISRenderer);
    return AMISRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
