/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveVariable, FormItemWrap, autobind, Renderer } from 'amis-core';

/** @class */ ((function (_super) {
    __extends(ControlRenderer, _super);
    function ControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlRenderer.prototype.renderInput = function () {
        var _a = this.props, render = _a.render, body = _a.body, name = _a.name, data = _a.data;
        return render('inner', body, {
            value: typeof name === 'string' ? resolveVariable(name, data) : undefined
        });
    };
    ControlRenderer.prototype.render = function () {
        var _a;
        var _b = this.props, render = _b.render, label = _b.label; _b.control; var rest = __rest(_b, ["render", "label", "control"]);
        return (React.createElement(FormItemWrap, __assign({}, rest, { formMode: (_a = rest.mode) !== null && _a !== void 0 ? _a : rest.formMode, render: render, sizeMutable: false, label: label, renderControl: this.renderInput })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ControlRenderer.prototype, "renderInput", null);
    ControlRenderer = __decorate([
        Renderer({
            type: 'control'
        })
    ], ControlRenderer);
    return ControlRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
