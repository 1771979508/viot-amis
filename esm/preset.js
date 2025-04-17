/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

import { extendDefaultEnv, render, addRootWrapper, themeable, LazyComponent } from 'amis-core';
import { alert, confirm, toast, setRenderSchemaFn, ImageGallery } from 'amis-ui';
import React from 'react';

extendDefaultEnv({
    alert: alert,
    confirm: confirm,
    notify: function (type, msg, conf) {
        return toast[type] ? toast[type](msg, conf) : console.warn('[Notify]', type, msg);
    }
});
setRenderSchemaFn(function (controls, value, callback, scopeRef, theme) {
    return render({
        name: 'form',
        type: 'form',
        wrapWithPanel: false,
        mode: 'horizontal',
        controls: controls,
        messages: {
            validateFailed: ''
        }
    }, {
        data: value,
        onFinished: callback,
        scopeRef: scopeRef,
        theme: theme
    }, {
        session: 'prompt'
    });
});
addRootWrapper(function (props) {
    var env = props.env, children = props.children;
    return (React.createElement(ImageGallery, { modalContainer: env.getModalContainer }, children));
});
var SimpleSpinner = themeable(function (props) {
    var cx = props.classnames;
    return (React.createElement("div", { "data-testid": "spinner", className: cx("Spinner", 'in', props.className) },
        React.createElement("div", { className: cx("Spinner-icon", 'Spinner-icon--default', props.spinnerClassName) })));
});
LazyComponent.defaultProps.placeholder = React.createElement(SimpleSpinner, null);
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
