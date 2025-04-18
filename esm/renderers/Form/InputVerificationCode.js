/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveVariableAndFilter, autobind, FormItem } from 'amis-core';
import { VerificationCode } from 'amis-ui';

var VerificationCodeControl = /** @class */ (function (_super) {
    __extends(VerificationCodeControl, _super);
    function VerificationCodeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * actions finish
     * @date 2024-06-04 星期二
     * @function
     * @param {}
     * @return {}
     */
    VerificationCodeControl.prototype.onFinish = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        return [4 /*yield*/, dispatchEvent('finish', __assign(__assign({}, data), { value: value }), this)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * actions change
     * @date 2024-06-04 星期二
     * @function
     * @param {}
     * @return {}
     */
    VerificationCodeControl.prototype.onChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, data, dispatchEvent, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('change', __assign(__assign({}, data), { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    VerificationCodeControl.prototype.render = function () {
        var separator = this.props.separator;
        return (React.createElement(VerificationCode, __assign({}, this.props, { separator: typeof separator === 'string'
                ? function (data) {
                    return resolveVariableAndFilter(separator, data);
                }
                : function () { }, onFinish: this.onFinish, onChange: this.onChange })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], VerificationCodeControl.prototype, "onFinish", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], VerificationCodeControl.prototype, "onChange", null);
    return VerificationCodeControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(VerificationCodeControlRenderer, _super);
    function VerificationCodeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerificationCodeControlRenderer = __decorate([
        FormItem({
            type: 'input-verification-code'
        })
    ], VerificationCodeControlRenderer);
    return VerificationCodeControlRenderer;
})(VerificationCodeControl));

export { VerificationCodeControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
