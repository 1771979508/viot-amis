/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __read, __decorate } from 'tslib';
import React from 'react';
import { normalizeDate, Renderer } from 'amis-core';

var DateRangeField = /** @class */ (function (_super) {
    __extends(DateRangeField, _super);
    function DateRangeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeField.prototype.render = function () {
        var _a = this.props, _b = _a.delimiter, delimiter = _b === void 0 ? ',' : _b, _c = _a.connector, connector = _c === void 0 ? '~' : _c, value = _a.value, valueFormat = _a.valueFormat, _d = _a.format, format = _d === void 0 ? 'YYYY-MM-DD' : _d, displayFormat = _a.displayFormat, cx = _a.classnames, className = _a.className, style = _a.style;
        if (!value) {
            return null;
        }
        if (typeof value === 'string') {
            value = value.split(delimiter);
        }
        var _e = __read(value, 2), _f = _e[0], startTime = _f === void 0 ? '' : _f, _g = _e[1], endTime = _g === void 0 ? '' : _g;
        if (valueFormat) {
            startTime = normalizeDate(startTime, valueFormat);
            endTime = normalizeDate(endTime, valueFormat);
        }
        else {
            startTime = normalizeDate(startTime * 1000);
            endTime = normalizeDate(endTime * 1000);
        }
        startTime = (startTime === null || startTime === void 0 ? void 0 : startTime.isValid())
            ? startTime.format(displayFormat || format)
            : '';
        endTime = (endTime === null || endTime === void 0 ? void 0 : endTime.isValid()) ? endTime.format(displayFormat || format) : '';
        return (React.createElement("span", { className: cx('DateRangeField', className), style: style }, [startTime, endTime].join(" ".concat(connector, " "))));
    };
    DateRangeField.defaultProps = {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        connector: '~'
    };
    return DateRangeField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DateRangeFieldRenderer, _super);
    function DateRangeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeFieldRenderer = __decorate([
        Renderer({
            type: 'date-range'
        })
    ], DateRangeFieldRenderer);
    return DateRangeFieldRenderer;
})(DateRangeField));

export { DateRangeField };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
