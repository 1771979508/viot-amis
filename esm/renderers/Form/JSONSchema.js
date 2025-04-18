/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { autobind, FormItem } from 'amis-core';
import { withRemoteConfig, InputJSONSchema } from 'amis-ui';

var EnhancedInputJSONSchema = withRemoteConfig({
    sourceField: 'schema',
    injectedPropsFilter: function (injectedProps, props) {
        return {
            schema: injectedProps.config,
            loading: injectedProps.loading
        };
    }
})(InputJSONSchema);
var JSONSchemaControl = /** @class */ (function (_super) {
    __extends(JSONSchemaControl, _super);
    function JSONSchemaControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaControl.prototype.controlRef = function (ref) {
        while (ref === null || ref === void 0 ? void 0 : ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.control = ref;
    };
    JSONSchemaControl.prototype.validate = function () {
        var _a;
        return (_a = this.control) === null || _a === void 0 ? void 0 : _a.validate();
    };
    JSONSchemaControl.prototype.render = function () {
        var rest = __rest(this.props, []);
        return React.createElement(EnhancedInputJSONSchema, __assign({}, rest, { ref: this.controlRef }));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JSONSchemaControl.prototype, "controlRef", null);
    return JSONSchemaControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(JSONSchemaRenderer, _super);
    function JSONSchemaRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaRenderer = __decorate([
        FormItem({
            type: 'json-schema',
            strictMode: false
        })
    ], JSONSchemaRenderer);
    return JSONSchemaRenderer;
})(JSONSchemaControl));

export { JSONSchemaControl as default };
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
