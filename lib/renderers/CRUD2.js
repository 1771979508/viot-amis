/**
 * amis v6.7.0
 * build time: 2025-04-17
 * Copyright 2018-2025 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var ReactDOM = require('react-dom');
var omitBy = require('lodash/omitBy');
var pick = require('lodash/pick');
var findIndex = require('lodash/findIndex');
var upperFirst = require('lodash/upperFirst');
var amisCore = require('amis-core');
var pickBy = require('lodash/pickBy');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omitBy__default = /*#__PURE__*/_interopDefaultLegacy(omitBy);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);
var upperFirst__default = /*#__PURE__*/_interopDefaultLegacy(upperFirst);
var pickBy__default = /*#__PURE__*/_interopDefaultLegacy(pickBy);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var INNER_EVENTS = [
    'selectedChange',
    'columnSort',
    'columnFilter',
    'columnSearch',
    'columnToggled',
    'orderChange',
    'rowClick',
    'rowDbClick',
    'rowMouseEnter',
    'rowMouseLeave',
    'selected'
];
var CRUD2 = /** @class */ (function (_super) {
    tslib.__extends(CRUD2, _super);
    function CRUD2(props) {
        var _this = _super.call(this, props) || this;
        _this.stopingAutoRefresh = false;
        var location = props.location, store = props.store, syncLocation = props.syncLocation, pageField = props.pageField, perPageField = props.perPageField; props.parsePrimitiveQuery;
        var parseQueryOptions = _this.getParseQueryOptions(props);
        _this.mounted = true;
        if (syncLocation && location && (location.query || location.search)) {
            store.updateQuery(amisCore.parseQuery(location, parseQueryOptions), undefined, pageField, perPageField);
        }
        else if (syncLocation && !location && window.location.search) {
            store.updateQuery(amisCore.parseQuery(window.location, parseQueryOptions), undefined, pageField, perPageField);
        }
        // 如果有 api，data 里面先写个 空数组，面得继承外层的 items
        // 比如 crud 打开一个弹框，里面也是个 crud，默认一开始其实显示
        // 的是外层 crud 的数据，等接口回来后就会变成新的。
        // 加上这个就是为了解决这种情况
        if (_this.props.api) {
            _this.props.store.updateData({
                items: []
            });
        }
        // 自定义列需要用store里的数据同步显示列
        // 所以需要先初始化一下
        var mode = props.mode, columns = props.columns;
        if (mode === 'table2' && columns) {
            store.updateColumns(columns);
        }
        return _this;
    }
    CRUD2.prototype.componentDidMount = function () {
        var _a = this.props, store = _a.store, pickerMode = _a.pickerMode, loadType = _a.loadType, loadDataOnce = _a.loadDataOnce, perPage = _a.perPage;
        // 初始化分页
        var pagination = loadType && !!loadDataOnce;
        if (pagination) {
            store.changePage(store.page, perPage);
        }
        // 初始化筛选条件
        this.initQuery({});
        if (pickerMode) {
            // 解析picker组件默认值
            var val = amisCore.getPropValue(this.props);
            val && store.setSelectedItems(val);
        }
    };
    CRUD2.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        var props = this.props;
        var store = prevProps.store;
        props.parsePrimitiveQuery;
        if (prevProps.columns !== props.columns) {
            store.updateColumns(props.columns);
        }
        // picker外部引起的值变化处理
        var val;
        if (this.props.pickerMode &&
            amisCore.isArrayChildrenModified((val = amisCore.getPropValue(this.props)), amisCore.getPropValue(prevProps))) {
            store.setSelectedItems(val);
        }
        var dataInvalid = false;
        if (prevProps.syncLocation &&
            prevProps.location &&
            prevProps.location.search !== props.location.search) {
            // 同步地址栏，那么直接检测 query 是否变了，变了就重新拉数据
            store.updateQuery(amisCore.parseQuery(props.location, this.getParseQueryOptions(props)), undefined, props.pageField, props.perPageField);
            dataInvalid = !!(props.api && amisCore.isObjectShallowModified(store.query, this.lastQuery, false));
        }
        if (dataInvalid) ;
        else if (prevProps.api &&
            props.api &&
            amisCore.isApiOutdated(prevProps.api, props.api, store.fetchCtxOf(prevProps.data, {
                pageField: prevProps.pageField,
                perPageField: prevProps.perPageField
            }), store.fetchCtxOf(props.data, {
                pageField: props.pageField,
                perPageField: props.perPageField
            }))) {
            dataInvalid = true;
        }
        else if (!props.api && amisCore.isPureVariable(props.source)) {
            var next = amisCore.resolveVariableAndFilter(props.source, props.data, '| raw');
            if (!this.lastData || this.lastData !== next) {
                store.initFromScope(props.data, props.source, {
                    columns: (_a = store.columns) !== null && _a !== void 0 ? _a : props.columns
                });
                this.lastData = next;
            }
        }
        if (dataInvalid) {
            this.getData();
        }
    };
    CRUD2.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
    };
    CRUD2.prototype.getParseQueryOptions = function (props) {
        var _a;
        var parsePrimitiveQuery = props.parsePrimitiveQuery;
        var normalizedOptions = {
            parsePrimitive: !!(amisCore.isObject(parsePrimitiveQuery)
                ? parsePrimitiveQuery === null || parsePrimitiveQuery === void 0 ? void 0 : parsePrimitiveQuery.enable
                : parsePrimitiveQuery),
            primitiveTypes: (_a = parsePrimitiveQuery === null || parsePrimitiveQuery === void 0 ? void 0 : parsePrimitiveQuery.types) !== null && _a !== void 0 ? _a : [
                'boolean'
            ]
        };
        return normalizedOptions;
    };
    CRUD2.prototype.controlRef = function (control) {
        // 因为 control 有可能被 n 层 hoc 包裹。
        while (control && control.getWrappedInstance) {
            control = control.getWrappedInstance();
        }
        this.control = control;
    };
    CRUD2.prototype.initQuery = function (values) {
        var _a = this.props, store = _a.store, orderBy = _a.orderBy, orderDir = _a.orderDir, loadType = _a.loadType;
        var params = {};
        if (orderBy) {
            params['orderBy'] = orderBy;
            params['orderDir'] = orderDir || 'asc';
        }
        this.handleSearch({
            query: tslib.__assign(tslib.__assign(tslib.__assign({}, params), values), store.query),
            replaceQuery: this.props.initFetch !== false,
            loadMore: loadType === 'more',
            resetPage: false
        });
        // 保留一次用于重置查询条件
        store.setPristineQuery();
    };
    /**
     * 加载更多动作处理器
     */
    CRUD2.prototype.handleLoadMore = function () {
        var _a = this.props, store = _a.store, perPage = _a.perPage;
        store.changePage(store.page + 1, perPage);
        this.getData(undefined, undefined, undefined, true);
    };
    /**
     * 发起一次新的查询，查询条件不同，需要从第一页数据加载
     */
    CRUD2.prototype.handleSearch = function (data) {
        var _a, _b;
        var _c = this.props, store = _c.store, syncLocation = _c.syncLocation, env = _c.env, pageField = _c.pageField, perPageField = _c.perPageField, parsePrimitiveQuery = _c.parsePrimitiveQuery;
        var parseQueryOptions = this.getParseQueryOptions(this.props);
        var _d = data || {}, query = _d.query, resetQuery = _d.resetQuery, replaceQuery = _d.replaceQuery, loadMore = _d.loadMore, resetPage = _d.resetPage;
        /** 找出clearValueOnHidden的字段, 保证updateQuery时不会使用上次的保留值 */
        query = tslib.__assign(tslib.__assign({}, query), pickBy__default["default"]((_b = (_a = query === null || query === void 0 ? void 0 : query.__super) === null || _a === void 0 ? void 0 : _a.diff) !== null && _b !== void 0 ? _b : {}, function (value) { return value === undefined; }));
        query = syncLocation ? amisCore.qsparse(amisCore.qsstringify(query, undefined, true)) : query;
        /** 把布尔值反解出来 */
        if (parsePrimitiveQuery) {
            query = amisCore.parsePrimitiveQueryString(query, parseQueryOptions);
        }
        store.updateQuery(resetQuery ? tslib.__assign(tslib.__assign({}, query), this.props.store.pristineQuery) : query, syncLocation && env && env.updateLocation
            ? function (location) { return env.updateLocation(location, true); }
            : undefined, pageField, perPageField, replaceQuery);
        if (resetPage) {
            store.changePage(1);
        }
        this.lastQuery = store.query;
        this.getData(undefined, undefined, undefined, loadMore !== null && loadMore !== void 0 ? loadMore : false);
    };
    CRUD2.prototype.handleStopAutoRefresh = function () {
        this.timer && clearTimeout(this.timer);
        this.stopingAutoRefresh = true;
    };
    CRUD2.prototype.handleStartAutoRefresh = function () {
        this.stopingAutoRefresh = false;
        this.reload();
    };
    CRUD2.prototype.reloadTarget = function (target, data) {
        // implement this.
    };
    CRUD2.prototype.closeTarget = function (target) {
        // implement this.
    };
    CRUD2.prototype.updateQuery = function (newQuery) {
        this.props.store;
    };
    /**
     * 更新列表数据
     */
    CRUD2.prototype.getData = function (
    /** 静默更新，不显示加载状态 */
    silent, 
    /** 清空已选择数据 */
    clearSelection, 
    /** 强制重新加载 */
    forceReload, 
    /** 加载更多数据，默认模式取props中的配置，只有事件动作需要直接触发 */
    loadMore) {
        var _this = this;
        var _a, _b;
        if (forceReload === void 0) { forceReload = false; }
        var _c = this.props, store = _c.store, api = _c.api, messages = _c.messages, pageField = _c.pageField, perPageField = _c.perPageField, interval = _c.interval, stopAutoRefreshWhen = _c.stopAutoRefreshWhen, silentPolling = _c.silentPolling; _c.syncLocation; var syncResponse2Query = _c.syncResponse2Query, keepItemSelectionOnPageChange = _c.keepItemSelectionOnPageChange, stopAutoRefreshWhenModalIsOpen = _c.stopAutoRefreshWhenModalIsOpen, pickerMode = _c.pickerMode; _c.env; var loadType = _c.loadType, loadDataOnce = _c.loadDataOnce, source = _c.source, columns = _c.columns, perPage = _c.perPage;
        // reload 需要清空用户选择
        if (!loadMore &&
            keepItemSelectionOnPageChange &&
            clearSelection &&
            !pickerMode) {
            store.setSelectedItems([]);
            store.setUnSelectedItems([]);
        }
        clearTimeout(this.timer);
        this.lastQuery = store.query;
        var loadDataMode = loadMore !== null && loadMore !== void 0 ? loadMore : loadType === 'more';
        var data = amisCore.createObject(store.data, store.query);
        // handleLoadMore 是在事件触发后才执行，首次加载并不走到 handleLoadMore
        // 所以加载更多模式下，首次加载也需要使用设置的 perPage，避免前后 perPage 不一致导致的问题
        if (loadDataMode && perPage) {
            store.changePerPage(perPage);
        }
        amisCore.isEffectiveApi(api, data)
            ? store
                .fetchInitData(api, data, {
                successMessage: messages && messages.fetchSuccess,
                errorMessage: messages && messages.fetchFailed,
                autoAppend: true,
                forceReload: forceReload,
                loadDataOnce: loadDataOnce,
                source: source,
                silent: silent,
                pageField: pageField,
                perPageField: perPageField,
                loadDataMode: false,
                syncResponse2Query: syncResponse2Query,
                columns: (_a = store.columns) !== null && _a !== void 0 ? _a : columns,
                isTable2: true
            })
                .then(function (value) {
                var _a;
                (value === null || value === void 0 ? void 0 : value.ok) && // 接口正常返回才继续轮训
                    interval &&
                    !_this.stopingAutoRefresh &&
                    _this.mounted &&
                    (!stopAutoRefreshWhen ||
                        !(stopAutoRefreshWhen &&
                            amisCore.evalExpression(stopAutoRefreshWhen, amisCore.createObject(store.data, store.query)))) &&
                    // 弹窗期间不进行刷新
                    (!stopAutoRefreshWhenModalIsOpen ||
                        (!store.dialogOpen && !((_a = store === null || store === void 0 ? void 0 : store.parentStore) === null || _a === void 0 ? void 0 : _a.dialogOpen))) &&
                    (_this.timer = setTimeout(_this.getData.bind(_this, silentPolling, undefined, true), Math.max(interval, 1000)));
                return value;
            })
            : source &&
                store.initFromScope(data, source, {
                    columns: (_b = store.columns) !== null && _b !== void 0 ? _b : columns
                });
    };
    CRUD2.prototype.handleChangePage = function (page, perPage) {
        var _a;
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField, autoJumpToTopOnPagerChange = _b.autoJumpToTopOnPagerChange;
        var query = (_a = {},
            _a[pageField || 'page'] = page,
            _a);
        if (perPage) {
            query[perPageField || 'perPage'] = perPage;
        }
        store.updateQuery(query, syncLocation && (env === null || env === void 0 ? void 0 : env.updateLocation) ? env.updateLocation : undefined, pageField, perPageField);
        store.changePage(page, perPage);
        this.getData();
        if (autoJumpToTopOnPagerChange && this.control) {
            ReactDOM.findDOMNode(this.control).scrollIntoView();
            var scrolledY = window.scrollY;
            scrolledY && window.scroll(0, scrolledY);
        }
    };
    CRUD2.prototype.handleSave = function (rows, diff, indexes, unModifiedItems, rowsOrigin, options) {
        var _this = this;
        var _a = this.props, store = _a.store, quickSaveApi = _a.quickSaveApi, quickSaveItemApi = _a.quickSaveItemApi, primaryField = _a.primaryField, env = _a.env, messages = _a.messages, reload = _a.reload;
        if (Array.isArray(rows)) {
            if (!amisCore.isEffectiveApi(quickSaveApi)) {
                env && env.alert('CRUD quickSaveApi is required');
                return;
            }
            var data_1 = amisCore.createObject(store.data, {
                rows: rows,
                rowsDiff: diff,
                indexes: indexes,
                rowsOrigin: rowsOrigin
            });
            if (rows.length && rows[0].hasOwnProperty(primaryField || 'id')) {
                data_1.ids = rows
                    .map(function (item) { return item[primaryField || 'id']; })
                    .join(',');
            }
            if (unModifiedItems) {
                data_1.unModifiedItems = unModifiedItems;
            }
            store
                .saveRemote(quickSaveApi, data_1, {
                successMessage: messages && messages.saveFailed,
                errorMessage: messages && messages.saveSuccess
            })
                .then(function () {
                reload && _this.reloadTarget(amisCore.filterTarget(reload, data_1), data_1);
                _this.getData(undefined, undefined, true);
            })
                .catch(function () { });
        }
        else {
            if (!amisCore.isEffectiveApi(quickSaveItemApi)) {
                env && env.alert('CRUD quickSaveItemApi is required!');
                return;
            }
            var data_2 = amisCore.createObject(store.data, {
                item: rows,
                modified: diff,
                origin: rowsOrigin
            });
            var sendData = amisCore.createObject(data_2, rows);
            store
                .saveRemote(quickSaveItemApi, sendData)
                .then(function () {
                reload && _this.reloadTarget(amisCore.filterTarget(reload, data_2), data_2);
                _this.getData(undefined, undefined, true);
            })
                .catch(function () {
                (options === null || options === void 0 ? void 0 : options.resetOnFailed) && _this.control.reset();
            });
        }
    };
    CRUD2.prototype.handleSaveOrder = function (moved, rows) {
        var _this = this;
        var _a = this.props, store = _a.store, saveOrderApi = _a.saveOrderApi, orderField = _a.orderField, primaryField = _a.primaryField, env = _a.env, reload = _a.reload;
        if (!saveOrderApi) {
            env && env.alert('CRUD saveOrderApi is required!');
            return;
        }
        var model = amisCore.createObject(store.data);
        var insertAfter;
        var insertBefore;
        var holding = [];
        var hasIdField = primaryField &&
            rows[0] &&
            rows[0].hasOwnProperty(primaryField);
        hasIdField || (model.idMap = {});
        model.insertAfter = {};
        rows.forEach(function (item) {
            if (~moved.indexOf(item)) {
                if (insertAfter) {
                    var insertAfterId = hasIdField
                        ? insertAfter[primaryField]
                        : rows.indexOf(insertAfter);
                    model.insertAfter[insertAfterId] =
                        model.insertAfter[insertAfterId] || [];
                    hasIdField || (model.idMap[insertAfterId] = insertAfter);
                    model.insertAfter[insertAfterId].push(hasIdField ? item[primaryField] : item);
                }
                else {
                    holding.push(item);
                }
            }
            else {
                insertAfter = item;
                insertBefore = insertBefore || item;
            }
        });
        if (insertBefore && holding.length) {
            var insertBeforeId = hasIdField
                ? insertBefore[primaryField]
                : rows.indexOf(insertBefore);
            hasIdField || (model.idMap[insertBeforeId] = insertBefore);
            model.insertBefore = {};
            model.insertBefore[insertBeforeId] = holding.map(function (item) {
                return hasIdField ? item[primaryField] : item;
            });
        }
        else if (holding.length) {
            var first = holding[0];
            var firstId = hasIdField
                ? first[primaryField]
                : rows.indexOf(first);
            hasIdField || (model.idMap[firstId] = first);
            model.insertAfter[firstId] = holding
                .slice(1)
                .map(function (item) { return (hasIdField ? item[primaryField] : item); });
        }
        if (orderField) {
            var start_1 = (store.page - 1) * store.perPage || 0;
            rows = rows.map(function (item, key) {
                var _a;
                return amisCore.extendObject(item, (_a = {},
                    _a[orderField] = start_1 + key + 1,
                    _a));
            });
        }
        model.rows = rows.concat();
        hasIdField &&
            (model.ids = rows
                .map(function (item) { return item[primaryField]; })
                .join(','));
        hasIdField &&
            orderField &&
            (model.order = rows.map(function (item) {
                return pick__default["default"](item, [primaryField, orderField]);
            }));
        amisCore.isEffectiveApi(saveOrderApi, model) &&
            store
                .saveRemote(saveOrderApi, model)
                .then(function () {
                reload && _this.reloadTarget(amisCore.filterTarget(reload, model), model);
                _this.getData(undefined, undefined, true);
            })
                .catch(function () { });
    };
    CRUD2.prototype.handleSelect = function (items, unSelectedItems) {
        var _a = this.props, store = _a.store, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, primaryField = _a.primaryField, multiple = _a.multiple, pickerMode = _a.pickerMode, onSelect = _a.onSelect;
        var newItems = items;
        var newUnSelectedItems = unSelectedItems;
        // cards等组件初始化的时候也会抛出来，感觉不太合理，但是只能用这个先暂时规避一下了
        if (!amisCore.isArrayChildrenModified(store.selectedItemsAsArray, newItems)) {
            return;
        }
        if (keepItemSelectionOnPageChange && store.selectedItems.length) {
            var oldItems_1 = store.selectedItems.concat();
            var oldUnselectedItems_1 = store.unSelectedItems.concat();
            items.forEach(function (item) {
                var idx = findIndex__default["default"](oldItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx) {
                    oldItems_1[idx] = item;
                }
                else {
                    oldItems_1.push(item);
                }
                var idx2 = findIndex__default["default"](oldUnselectedItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx2) {
                    oldUnselectedItems_1.splice(idx2, 1);
                }
            });
            unSelectedItems.forEach(function (item) {
                var idx = findIndex__default["default"](oldUnselectedItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                var idx2 = findIndex__default["default"](oldItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx) {
                    oldUnselectedItems_1[idx] = item;
                }
                else {
                    oldUnselectedItems_1.push(item);
                }
                !~idx && ~idx2 && oldItems_1.splice(idx2, 1);
            });
            newItems = oldItems_1;
            newUnSelectedItems = oldUnselectedItems_1;
            // const thisBatch = items.concat(unSelectedItems);
            // let notInThisBatch = (item: any) =>
            //   !find(
            //     thisBatch,
            //     a => a[primaryField || 'id'] == item[primaryField || 'id']
            //   );
            // newItems = store.selectedItems.filter(notInThisBatch);
            // newUnSelectedItems = store.unSelectedItems.filter(notInThisBatch);
            // newItems.push(...items);
            // newUnSelectedItems.push(...unSelectedItems);
        }
        if (pickerMode && multiple === false && newItems.length > 1) {
            newUnSelectedItems.push.apply(newUnSelectedItems, newItems.splice(0, newItems.length - 1));
        }
        // store.updateSelectData(newItems, newUnSelectedItems);
        store.setSelectedItems(newItems);
        store.setUnSelectedItems(newUnSelectedItems);
        onSelect && onSelect(newItems);
    };
    /**
     * 更新Query筛选触发
     */
    CRUD2.prototype.handleQuerySearch = function (values, forceReload) {
        var _a;
        if (forceReload === void 0) { forceReload = false; }
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField;
        store.updateQuery(tslib.__assign(tslib.__assign({}, values), (_a = {}, _a[pageField || 'page'] = 1, _a)), syncLocation && env && env.updateLocation
            ? env.updateLocation
            : undefined, pageField, perPageField);
        this.getData(undefined, undefined, forceReload);
    };
    CRUD2.prototype.reload = function (subpath, query) {
        if (query) {
            return this.receive(query);
        }
        else {
            this.getData(undefined, undefined, true);
        }
    };
    CRUD2.prototype.receive = function (values) {
        this.handleQuerySearch(values, true);
    };
    CRUD2.prototype.doAction = function (action, data, throwErrors) {
        if (action.actionType &&
            [
                'stopAutoRefresh',
                'reload',
                'search',
                'startAutoRefresh',
                'loadMore'
            ].includes(action.actionType)) {
            // @ts-ignore
            return this["handle".concat(upperFirst__default["default"](action.actionType))](data);
        }
    };
    CRUD2.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        if ([
            'stopAutoRefresh',
            'reload',
            'search',
            'startAutoRefresh',
            'loadMore'
        ].includes(action.actionType)) {
            return this.doAction(action, ctx, throwErrors);
        }
        else {
            return this.props.onAction(e, action, ctx, throwErrors, delegate || this.context);
        }
    };
    CRUD2.prototype.unSelectItem = function (item, index) {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        var idx = selected.indexOf(item);
        ~idx && unSelected.push.apply(unSelected, selected.splice(idx, 1));
        store.setSelectedItems(selected);
        store.setUnSelectedItems(unSelected);
    };
    CRUD2.prototype.clearSelection = function () {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        store.setSelectedItems([]);
        store.setUnSelectedItems(unSelected.concat(selected));
    };
    CRUD2.prototype.toggleAllColumns = function (value) {
        var store = this.props.store;
        store.updateColumns(store.columns.map(function (c) { return (tslib.__assign(tslib.__assign({}, c), { toggled: value })); }));
    };
    CRUD2.prototype.toggleToggle = function (index) {
        var store = this.props.store;
        var column = store.columns[index];
        var toggled = column.toggled;
        store.updateColumns(store.columns.map(function (c, i) { return (tslib.__assign(tslib.__assign({}, c), { toggled: index === i ? !toggled : c.toggled !== false })); }));
    };
    CRUD2.prototype.renderChild = function (region, schema, props) {
        if (props === void 0) { props = {}; }
        var _a = this.props, render = _a.render, store = _a.store, _b = _a.primaryField, primaryField = _b === void 0 ? 'id' : _b;
        var data;
        var selectedItems = store.selectedItems;
        var unSelectedItems = store.unSelectedItems;
        var items = store.items;
        if (/^filter/.test(region)) {
            // 包两层，主要是为了处理以下 case
            // 里面放了个 form，form 提交过来的时候不希望把 items 这些发送过来。
            // 因为会把数据呈现在地址栏上。
            /** data 可以被覆盖，因为 filter 中不需要额外的 data */
            data = amisCore.createObject(amisCore.createObject(store.filterData, store.getData(this.props.data)), {});
        }
        else {
            data = amisCore.createObject(store.mergedData, {
                items: items.concat(),
                selectedItems: selectedItems.concat(),
                unSelectedItems: unSelectedItems.concat(),
                ids: selectedItems
                    .map(function (item) {
                    return item.hasOwnProperty(primaryField)
                        ? item[primaryField]
                        : null;
                })
                    .filter(function (item) { return item; })
                    .join(',')
            });
        }
        // 覆盖所有分页组件
        var childProps = {
            activePage: store.page,
            lastPage: store.lastPage,
            perPage: store.perPage,
            total: store.total,
            onPageChange: this.handleChangePage,
            cols: store.columns,
            toggleAllColumns: this.toggleAllColumns,
            toggleToggle: this.toggleToggle,
            // 支持 onQuery，主要是给 searchBox 组件使用
            onQuery: this.handleQuerySearch
            // onAction: onAction
        };
        if (schema.type === 'pagination') ;
        return render(region, schema, tslib.__assign(tslib.__assign({ data: data }, props), childProps));
    };
    CRUD2.prototype.renderToolbar = function (region, toolbar) {
        var _this = this;
        if (!toolbar) {
            return null;
        }
        toolbar = [].concat(toolbar);
        return toolbar.map(function (item, index) {
            return _this.renderChild("".concat(region, "/").concat(index), item, {
                key: index + ''
            });
        });
    };
    CRUD2.prototype.renderFilter = function (filterSchema) {
        var _this = this;
        if (!filterSchema ||
            (Array.isArray(filterSchema) && filterSchema.length === 0)) {
            return null;
        }
        var filterSchemas = Array.isArray(filterSchema)
            ? filterSchema
            : amisCore.isObject(filterSchema) && filterSchema.type != null
                ? [filterSchema]
                : [];
        if (filterSchemas.length < 1) {
            return null;
        }
        return filterSchemas.map(function (item, index) {
            return _this.renderChild("filter/".concat(index), item, {
                key: index + 'filter',
                data: _this.props.store.filterData,
                onSubmit: function (data) {
                    return _this.handleSearch({ query: data, resetPage: true });
                },
                onReset: function (data) {
                    var resetQueries = {};
                    Object.keys(data).forEach(function (key) { return (resetQueries[key] = ''); });
                    _this.handleSearch({
                        query: resetQueries,
                        resetQuery: true,
                        replaceQuery: true,
                        resetPage: true
                    });
                }
            });
        });
    };
    CRUD2.prototype.renderSelection = function () {
        var _this = this;
        var _a = this.props, store = _a.store, cx = _a.classnames, labelField = _a.labelField, labelTpl = _a.labelTpl, primaryField = _a.primaryField, __ = _a.translate, env = _a.env;
        if (!store.selectedItems.length) {
            return null;
        }
        return (_J$X_("div", { className: cx('Crud-selection') },
            _J$X_("div", { className: cx('Crud-selectionLabel') }, __('CRUD.selected', { total: store.selectedItems.length })),
            store.selectedItems.map(function (item, index) { return (_J$X_("div", { key: index, className: cx("Crud-value") },
                _J$X_("span", { "data-tooltip": __('delete'), "data-position": "bottom", className: cx('Crud-valueIcon'), onClick: _this.unSelectItem.bind(_this, item, index) }, "\u00D7"),
                _J$X_("span", { className: cx('Crud-valueLabel') }, labelTpl ? (_J$X_(amisUi.Html, { html: amisCore.filter(labelTpl, item), filterHtml: env.filterHtml })) : (amisCore.getVariable(item, labelField || 'label') ||
                    amisCore.getVariable(item, primaryField || 'id'))))); }),
            _J$X_("a", { onClick: this.clearSelection.bind(this), className: cx('Crud-selectionClear') }, __('clear'))));
    };
    CRUD2.prototype.render = function () {
        var _a = this.props, columns = _a.columns, className = _a.className, style = _a.style, bodyClassName = _a.bodyClassName, filterSchema = _a.filter, render = _a.render, store = _a.store, _b = _a.mode, mode = _b === void 0 ? 'table2' : _b; _a.syncLocation; _a.children; _a.bulkActions; var pickerMode = _a.pickerMode, selectable = _a.selectable, multiple = _a.multiple; _a.valueField; var primaryField = _a.primaryField; _a.value; _a.hideQuickSaveBtn; var itemActions = _a.itemActions, cx = _a.classnames, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, maxKeepItemSelectionLength = _a.maxKeepItemSelectionLength, onEvent = _a.onEvent; _a.onAction; var popOverContainer = _a.popOverContainer; _a.translate; _a.onQuery; var autoGenerateFilter = _a.autoGenerateFilter; _a.onSelect; var autoFillHeight = _a.autoFillHeight, showSelection = _a.showSelection, headerToolbar = _a.headerToolbar, footerToolbar = _a.footerToolbar; 
        // columnsTogglable 在本渲染器中渲染，不需要 table 渲染，避免重复
        _a.columnsTogglable; var headerToolbarClassName = _a.headerToolbarClassName, footerToolbarClassName = _a.footerToolbarClassName, id = _a.id, testIdBuilder = _a.testIdBuilder, rest = tslib.__rest(_a, ["columns", "className", "style", "bodyClassName", "filter", "render", "store", "mode", "syncLocation", "children", "bulkActions", "pickerMode", "selectable", "multiple", "valueField", "primaryField", "value", "hideQuickSaveBtn", "itemActions", "classnames", "keepItemSelectionOnPageChange", "maxKeepItemSelectionLength", "onEvent", "onAction", "popOverContainer", "translate", "onQuery", "autoGenerateFilter", "onSelect", "autoFillHeight", "showSelection", "headerToolbar", "footerToolbar", "columnsTogglable", "headerToolbarClassName", "footerToolbarClassName", "id", "testIdBuilder"]);
        return (_J$X_("div", tslib.__assign({ className: cx('Crud2', className, {
                'is-loading': store.loading
            }), style: style, "data-id": id }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
            _J$X_("div", tslib.__assign({ className: cx('Crud2-filter') }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('filter').getTestId()), this.renderFilter(filterSchema)),
            _J$X_("div", { className: cx('Crud2-toolbar', headerToolbarClassName) }, this.renderToolbar('headerToolbar', headerToolbar)),
            showSelection && keepItemSelectionOnPageChange && multiple !== false
                ? this.renderSelection()
                : null,
            render('body', tslib.__assign(tslib.__assign({}, rest), { 
                // 通用事件 例如cus-event 如果直接透传给table 则会被触发2次
                // 因此只将下层组件table、cards中自定义事件透传下去 否则通过crud配置了也不会执行
                onEvent: omitBy__default["default"](onEvent, function (event, key) { return !INNER_EVENTS.includes(key); }), type: mode, columns: mode.startsWith('table')
                    ? store.columns || columns
                    : undefined, id: id }), {
                key: 'body',
                className: cx('Crud2-body', bodyClassName),
                ref: this.controlRef,
                autoGenerateFilter: !filterSchema && autoGenerateFilter,
                autoFillHeight: autoFillHeight,
                checkAll: false,
                selectable: !!(selectable !== null && selectable !== void 0 ? selectable : pickerMode),
                itemActions: itemActions,
                multiple: multiple,
                // columnsTogglable在CRUD2中渲染 但需要给table2传columnsTogglable为false 否则列数超过5 table2会自动渲染
                columnsTogglable: false,
                selected: pickerMode || keepItemSelectionOnPageChange
                    ? store.selectedItemsAsArray
                    : undefined,
                keepItemSelectionOnPageChange: keepItemSelectionOnPageChange,
                maxKeepItemSelectionLength: maxKeepItemSelectionLength,
                // valueField: valueField || primaryField,
                primaryField: primaryField,
                testIdBuilder: testIdBuilder,
                items: store.data.items,
                query: store.query,
                orderBy: store.query.orderBy,
                orderDir: store.query.orderDir,
                popOverContainer: popOverContainer,
                onSave: this.handleSave.bind(this),
                onSaveOrder: this.handleSaveOrder,
                onSearch: this.handleQuerySearch,
                onSort: this.handleQuerySearch,
                onSelect: this.handleSelect,
                onAction: this.handleAction,
                data: store.mergedData,
                loading: store.loading,
                host: this
            }),
            _J$X_("div", { className: cx('Crud2-toolbar', footerToolbarClassName) }, this.renderToolbar('footerToolbar', footerToolbar))));
    };
    CRUD2.propsList = [
        'mode',
        'syncLocation',
        'value',
        'multiple',
        'valueField',
        'pageField',
        'perPageField',
        'hideQuickSaveBtn',
        'autoJumpToTopOnPagerChange',
        'interval',
        'silentPolling',
        'stopAutoRefreshWhen',
        'stopAutoRefreshWhenModalIsOpen',
        'api',
        'headerToolbar',
        'footerToolbar',
        'autoGenerateFilter',
        'syncResponse2Query',
        'keepItemSelectionOnPageChange',
        'source',
        'onChange',
        'onInit',
        'onSaved',
        'onQuery',
        'autoFillHeight',
        'showSelection',
        'headerToolbarClassName',
        'footerToolbarClassName',
        'primaryField',
        'parsePrimitiveQuery'
    ];
    CRUD2.defaultProps = {
        toolbarInline: true,
        syncLocation: true,
        hideQuickSaveBtn: false,
        autoJumpToTopOnPagerChange: true,
        silentPolling: false,
        autoFillHeight: false,
        showSelection: true,
        perPage: 10,
        primaryField: 'id',
        parsePrimitiveQuery: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "controlRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number, Number]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "handleChangePage", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array, Array]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "handleSaveOrder", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array, Array]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "handleSelect", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "handleQuerySearch", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object, Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "doAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object, Object, Boolean, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "handleAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "toggleAllColumns", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "toggleToggle", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String, Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CRUD2.prototype, "renderChild", null);
    return CRUD2;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CRUD2Renderer, _super);
    function CRUD2Renderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    CRUD2Renderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    CRUD2Renderer.prototype.reload = function (subpath, query, ctx) {
        var scoped = this.context;
        if (subpath) {
            return scoped.reload(query ? "".concat(subpath, "?").concat(amisCore.qsstringify(query)) : subpath, ctx);
        }
        return _super.prototype.reload.call(this, subpath, query);
    };
    CRUD2Renderer.prototype.receive = function (values, subPath) {
        var scoped = this.context;
        if (subPath) {
            return scoped.send(subPath, values);
        }
        return _super.prototype.receive.call(this, values);
    };
    CRUD2Renderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    CRUD2Renderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    CRUD2Renderer.contextType = amisCore.ScopedContext;
    CRUD2Renderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'crud2',
            storeType: amisCore.CRUDStore.name,
            isolateScope: true
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], CRUD2Renderer);
    return CRUD2Renderer;
})(CRUD2));

exports["default"] = CRUD2;
window.amisVersionInfo={version:'6.7.0',buildTime:'2025-04-17'};
