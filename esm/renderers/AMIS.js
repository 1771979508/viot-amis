/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __decorate } from 'tslib';
import { getPropValue, Renderer } from 'amis-core';
import React from 'react';

/** @class */ ((function (_super) {
    __extends(AMISRenderer, _super);
    function AMISRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AMISRenderer.prototype.render = function () {
        var _a = this.props, render = _a.render, props = _a.props, schema = _a.schema;
        var value = getPropValue(this.props) || schema;
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
    AMISRenderer = __decorate([
        Renderer({
            type: 'amis'
        })
    ], AMISRenderer);
    return AMISRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
