/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __decorate } from 'tslib';
import ButtonGroupControl from './Form/ButtonGroupSelect.js';
export { default } from './Form/ButtonGroupSelect.js';
import { Renderer } from 'amis-core';

/** @class */ ((function (_super) {
    __extends(ButtonGroupRenderer, _super);
    function ButtonGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupRenderer = __decorate([
        Renderer({
            type: 'button-group'
        })
    ], ButtonGroupRenderer);
    return ButtonGroupRenderer;
})(ButtonGroupControl));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
