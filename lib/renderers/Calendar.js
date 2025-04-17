/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
var InputDate = require('./Form/InputDate.js');

/** @class */ ((function (_super) {
    tslib.__extends(CalendarRenderer, _super);
    function CalendarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRenderer.defaultProps = tslib.__assign(tslib.__assign({}, InputDate.DateControlRenderer.defaultProps), { embed: true });
    CalendarRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'calendar'
        })
    ], CalendarRenderer);
    return CalendarRenderer;
})(InputDate.DateControlRenderer));
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
