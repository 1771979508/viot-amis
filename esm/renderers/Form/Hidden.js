/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { FormItem } from 'amis-core';

var HiddenControl = /** @class */ (function (_super) {
    __extends(HiddenControl, _super);
    function HiddenControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenControl.prototype.render = function () {
        return null;
    };
    return HiddenControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(HiddenControlRenderer, _super);
    function HiddenControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenControlRenderer = __decorate([
        FormItem({
            type: 'hidden',
            wrap: false,
            sizeMutable: false
        })
    ], HiddenControlRenderer);
    return HiddenControlRenderer;
})(HiddenControl));

export { HiddenControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
