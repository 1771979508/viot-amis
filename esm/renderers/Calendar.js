/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import { Renderer } from 'amis-core';
import { DateControlRenderer } from './Form/InputDate.js';

/** @class */ ((function (_super) {
    __extends(CalendarRenderer, _super);
    function CalendarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRenderer.defaultProps = __assign(__assign({}, DateControlRenderer.defaultProps), { embed: true });
    CalendarRenderer = __decorate([
        Renderer({
            type: 'calendar'
        })
    ], CalendarRenderer);
    return CalendarRenderer;
})(DateControlRenderer));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
