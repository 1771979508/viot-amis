/// <reference types="lodash" />
import React from 'react';
import Sortable from 'sortablejs';
import { ITableStore, IScopedContext, SchemaExpression, RendererProps, SchemaNode, ActionObject } from 'amis-core';
import { BadgeObject, SpinnerExtraProps } from 'amis-ui';
import { TableCell } from './TableCell';
import type { AutoGenerateFilterObject } from '../CRUD';
import { BaseSchema, SchemaApi, SchemaClassName, SchemaObject, SchemaTokenizeableString, SchemaTpl } from '../../Schema';
import { SchemaPopOver } from '../PopOver';
import { SchemaQuickEdit } from '../QuickEdit';
import { SchemaCopyable } from '../Copyable';
import { SchemaRemark } from '../Remark';
import type { IColumn, IRow } from 'amis-core';
/**
 * 表格列，不指定类型时默认为文本类型。
 */
export type TableColumnObject = {
    /**
     * 列标题
     */
    label: string;
    /**
     * 配置是否固定当前列
     */
    fixed?: 'left' | 'right' | 'none';
    /**
     * 绑定字段名
     */
    name?: string;
    /**
     * 配置查看详情功能
     */
    popOver?: SchemaPopOver;
    /**
     * 配置快速编辑功能
     */
    quickEdit?: SchemaQuickEdit;
    /**
     * 作为表单项时，可以单独配置编辑时的快速编辑面板。
     */
    quickEditOnUpdate?: SchemaQuickEdit;
    /**
     * 配置点击复制功能
     */
    copyable?: SchemaCopyable;
    /**
     * 配置是否可以排序
     */
    sortable?: boolean;
    /**
     * 是否可快速搜索
     */
    searchable?: boolean | SchemaObject;
    /**
     * 配置是否默认展示
     */
    toggled?: boolean;
    /**
     * 列宽度
     */
    width?: number | string;
    /**
     * 列对齐方式
     */
    align?: 'left' | 'right' | 'center' | 'justify';
    /**
     * 列垂直对齐方式
     */
    vAlign?: 'top' | 'middle' | 'bottom';
    /**
     * 标题左右对齐方式
     */
    headerAlign?: 'left' | 'right' | 'center' | 'justify';
    /**
     * 列样式表
     */
    className?: string;
    /**
     * 单元格样式表达式
     */
    classNameExpr?: string;
    /**
     * 列头样式表
     */
    labelClassName?: string;
    /**
     * todo
     */
    filterable?: boolean | {
        source?: string;
        options?: Array<any>;
    };
    /**
     * 结合表格的 footable 一起使用。
     * 填写 *、xs、sm、md、lg指定 footable 的触发条件，可以填写多个用空格隔开
     */
    breakpoint?: '*' | 'xs' | 'sm' | 'md' | 'lg';
    /**
     * 提示信息
     */
    remark?: SchemaRemark;
    /**
     * 默认值, 只有在 inputTable 里面才有用
     */
    value?: any;
    /**
     * 是否唯一, 只有在 inputTable 里面才有用
     */
    unique?: boolean;
    /**
     * 表格列单元格是否可以获取父级数据域值，默认为true，该配置对当前列内单元格生效
     */
    canAccessSuperData?: boolean;
    /**
     * 当一次性渲染太多列上有用，默认为 100，可以用来提升表格渲染性能
     * @default 100
     */
    lazyRenderAfter?: number;
    /**
     * 单元格内部组件自定义样式 style作为单元格自定义样式的配置
     */
    innerStyle?: {
        [propName: string]: any;
    };
};
export type TableColumnWithType = SchemaObject & TableColumnObject;
export type TableColumn = TableColumnWithType | TableColumnObject;
type AutoFillHeightObject = Record<'height' | 'maxHeight', number>;
/**
 * Table 表格渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/table
 */
export interface TableSchema extends BaseSchema {
    /**
     * 指定为表格渲染器。
     */
    type: 'table' | 'static-table';
    /**
     * 是否固定表头
     */
    affixHeader?: boolean;
    /**
     * 是否固底
     */
    affixFooter?: boolean;
    /**
     * 表格的列信息
     */
    columns?: Array<TableColumn>;
    /**
     * 展示列显示开关，自动即：列数量大于或等于5个时自动开启
     */
    columnsTogglable?: boolean | 'auto';
    /**
     * 是否开启底部展示功能，适合移动端展示
     */
    footable?: boolean | {
        expand?: 'first' | 'all' | 'none';
        /**
         * 是否为手风琴模式
         */
        accordion?: boolean;
    };
    /**
     * 底部外层 CSS 类名
     */
    footerClassName?: SchemaClassName;
    /**
     * 顶部外层 CSS 类名
     */
    headerClassName?: SchemaClassName;
    /**
     * 占位符
     */
    placeholder?: string | SchemaTpl;
    /**
     * 是否显示底部
     */
    showFooter?: boolean;
    /**
     * 是否显示头部
     */
    showHeader?: boolean;
    /**
     * 数据源：绑定当前环境变量
     */
    source?: SchemaTokenizeableString;
    /**
     * 表格 CSS 类名
     */
    tableClassName?: SchemaClassName;
    /**
     * 标题
     */
    title?: string;
    /**
     * 工具栏 CSS 类名
     */
    toolbarClassName?: SchemaClassName;
    /**
     * 合并单元格配置，配置数字表示从左到右的多少列自动合并单元格。
     */
    combineNum?: number | SchemaExpression;
    /**
     * 合并单元格配置，配置从第几列开始合并。
     */
    combineFromIndex?: number;
    /**
     * 顶部总结行
     */
    prefixRow?: Array<SchemaObject>;
    /**
     * 底部总结行
     */
    affixRow?: Array<SchemaObject>;
    /**
     * 是否可调整列宽
     */
    resizable?: boolean;
    /**
     * 行样式表表达式
     */
    rowClassNameExpr?: string;
    /**
     * 行角标
     */
    itemBadge?: BadgeObject;
    /**
     * 开启查询区域，会根据列元素的searchable属性值，自动生成查询条件表单
     */
    autoGenerateFilter?: AutoGenerateFilterObject | boolean;
    /**
     * 表格是否可以获取父级数据域值，默认为false
     */
    canAccessSuperData?: boolean;
    /**
     * 表格自动计算高度
     */
    autoFillHeight?: boolean | AutoFillHeightObject;
    /**
     * table layout
     */
    tableLayout?: 'fixed' | 'auto';
    /**
     * 懒加载 API，当行数据中用 defer: true 标记了，则其孩子节点将会用这个 API 来拉取数据。
     */
    deferApi?: SchemaApi;
}
export interface TableProps extends RendererProps, SpinnerExtraProps {
    title?: string;
    header?: SchemaNode;
    footer?: SchemaNode;
    actions?: ActionObject[];
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    store: ITableStore;
    columns?: Array<any>;
    headingClassName?: string;
    toolbarClassName?: string;
    headerToolbarClassName?: string;
    footerToolbarClassName?: string;
    tableClassName?: string;
    source?: string;
    selectable?: boolean;
    selected?: Array<any>;
    maxKeepItemSelectionLength?: number;
    maxItemSelectionLength?: number;
    valueField?: string;
    draggable?: boolean;
    columnsTogglable?: boolean | 'auto';
    affixHeader?: boolean;
    affixColumns?: boolean;
    combineNum?: number | SchemaExpression;
    combineFromIndex?: number;
    footable?: boolean | {
        expand?: 'first' | 'all' | 'none';
        expandAll?: boolean;
        accordion?: boolean;
    };
    expandConfig?: {
        expand?: 'first' | 'all' | 'none';
        expandAll?: boolean;
        accordion?: boolean;
    };
    itemCheckableOn?: string;
    itemDraggableOn?: string;
    itemActions?: Array<ActionObject>;
    onSelect: (selectedItems: Array<object>, unSelectedItems: Array<object>) => void;
    onPristineChange?: (data: object, rowIndexe: string) => void;
    onSave?: (items: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<string> | string, unModifiedItems?: Array<object>, rowOrigins?: Array<object> | object, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }) => void;
    onSaveOrder?: (moved: Array<object>, items: Array<object>) => void;
    onQuery?: (values: object) => any;
    onImageEnlarge?: (data: any, target: any) => void;
    buildItemProps?: (item: any, index: number) => any;
    checkOnItemClick?: boolean;
    hideCheckToggler?: boolean;
    rowClassName?: string;
    rowClassNameExpr?: string;
    popOverContainer?: any;
    canAccessSuperData?: boolean;
    reUseRow?: boolean;
    itemBadge?: BadgeObject;
    loading?: boolean;
    autoFillHeight?: boolean | AutoFillHeightObject;
}
export type ExportExcelToolbar = SchemaNode & {
    api?: SchemaApi;
    columns?: string[];
    exportColumns?: any[];
    rowSlice?: string;
    filename?: string;
    pageField?: string;
    perPageField?: string;
};
export type TableRendererEvent = 'selectedChange' | 'columnSort' | 'columnFilter' | 'columnSearch' | 'columnToggled' | 'orderChange' | 'rowClick' | 'rowDbClick' | 'rowMouseEnter' | 'rowMouseLeave';
export type TableRendererAction = 'selectAll' | 'clearAll' | 'select' | 'initDrag' | 'cancelDrag';
export default class Table extends React.Component<TableProps, object> {
    static contextType: React.Context<IScopedContext>;
    static propsList: Array<string>;
    static defaultProps: Partial<TableProps>;
    dom: React.RefObject<HTMLDivElement>;
    table?: HTMLTableElement;
    sortable?: Sortable;
    dragTip?: HTMLElement;
    affixedTable?: HTMLTableElement;
    renderedToolbars: Array<string>;
    subForms: any;
    timer: ReturnType<typeof setTimeout>;
    toDispose: Array<() => void>;
    updateTableInfoLazy: import("lodash").DebouncedFunc<any>;
    updateAutoFillHeightLazy: import("lodash").DebouncedFunc<any>;
    constructor(props: TableProps, context: IScopedContext);
    static syncRows(store: ITableStore, props: TableProps, prevProps?: TableProps): boolean;
    componentDidMount(): void;
    loadDeferredRow(row: IRow): Promise<void>;
    /**
     * 自动设置表格高度占满界面剩余区域
     * 用 css 实现有点麻烦，要改很多结构，所以先用 dom hack 了，避免对之前的功能有影响
     */
    updateAutoFillHeight(): void;
    componentDidUpdate(prevProps: TableProps): void;
    componentWillUnmount(): void;
    scrollToTop(): void;
    rowPathPlusOffset(path: string, offset?: number): string;
    subFormRef(form: any, x: number, y: number): void;
    handleAction(e: React.UIEvent<any> | undefined, action: ActionObject, ctx: object): void;
    handleCheck(item: IRow, value?: boolean, shift?: boolean): Promise<void>;
    handleRowClick(item: IRow, index: number): Promise<import("amis-core").RendererEvent<any, any>>;
    handleRowDbClick(item: IRow, index: number): Promise<import("amis-core").RendererEvent<any, any>>;
    handleRowMouseEnter(item: IRow, index: number): Promise<import("amis-core").RendererEvent<any, any>>;
    handleRowMouseLeave(item: IRow, index: number): Promise<import("amis-core").RendererEvent<any, any>>;
    handleCheckAll(): Promise<void>;
    handleQuickChange(item: IRow, values: object, saveImmediately?: boolean | any, savePristine?: boolean, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    handleSave(): Promise<void>;
    handleSaveOrder(): Promise<void>;
    syncSelected(): void;
    reset(): void;
    bulkUpdate(value: any, items: Array<object>): void;
    getSelected(): any[];
    updateTableInfo(callback?: () => void): void;
    handleOutterScroll(): void;
    tableRef(ref: HTMLTableElement): void;
    dragTipRef(ref: any): void;
    affixedTableRef(ref: HTMLTableElement): void;
    initDragging(): void;
    destroyDragging(): void;
    getPopOverContainer(): Element | Text | null;
    handleMouseMove(e: React.MouseEvent<any>): void;
    handleMouseLeave(): void;
    draggingTr: HTMLTableRowElement;
    originIndex: number;
    draggingSibling: Array<HTMLTableRowElement>;
    handleDragStart(e: React.DragEvent): void;
    handleDragOver(e: any): void;
    handleDrop(): Promise<void>;
    handleDragEnd(): void;
    handleImageEnlarge(info: any, target: {
        rowIndex: number;
        colIndex: number;
        type: string;
    }): void;
    resizeLine?: HTMLElement;
    lineStartX: number;
    lineStartWidth: number;
    handleColResizeMouseDown(e: React.MouseEvent<HTMLElement>): void;
    handleColResizeMouseMove(e: MouseEvent): void;
    handleColResizeMouseUp(e: MouseEvent): void;
    handleColumnToggle(columns: Array<IColumn>): void;
    renderAutoFilterForm(): React.ReactNode;
    renderHeading(): React.JSX.Element | null;
    renderHeadCell(column: IColumn, props?: any): React.JSX.Element;
    renderCell(region: string, column: IColumn, item: IRow, props: any, ignoreDrag?: boolean): React.JSX.Element;
    renderAffixHeader(tableClassName: string): React.JSX.Element | null;
    renderToolbar(toolbar: SchemaNode): React.JSX.Element | null | undefined;
    renderColumnsToggler(config?: any): React.JSX.Element | null;
    renderDragToggler(): React.JSX.Element | null;
    renderExportExcel(toolbar: ExportExcelToolbar): JSX.Element | null;
    /**
     * 导出 Excel 模板
     */
    renderExportExcelTemplate(toolbar: ExportExcelToolbar): JSX.Element | null;
    renderActions(region: string): React.JSX.Element | null;
    renderHeader(editable?: boolean): React.JSX.Element | React.JSX.Element[] | null;
    renderFooter(): React.JSX.Element | React.JSX.Element[] | null;
    renderTableContent(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class TableRenderer extends Table {
    receive(values: any, subPath?: string): any;
    /**
     * 通过 index 或者 condition 获取需要处理的目标
     *
     * - index 支持数字
     * - index 支持逗号分隔的数字列表
     * - index 支持路径比如 0.1.2,0.1.3
     * - index 支持表达式，比如 0.1.2,${index}
     *
     * - condition 上下文为当前行的数据
     *
     * @param ctx
     * @param index
     * @param condition
     * @returns
     */
    getEventTargets(ctx: any, index?: string | number, condition?: string, oldCondition?: string): Promise<({
        storeType: string;
        id: string;
        parentId: string;
        key: string;
        pristine: any;
        data: any;
        rowSpans: any;
        index: number;
        newIndex: number;
        path: string;
        checkdisable: boolean;
        isHover: boolean;
        children: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IAnyModelType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>>;
        defer: boolean;
        loaded: boolean;
        loading: boolean;
        error: string;
        depth: number;
        appeared: boolean;
        lazyRender: boolean;
    } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
        readonly parent: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyStateTreeNode> | (object & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyComplexType>);
        readonly table: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyStateTreeNode> | (object & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyComplexType>);
        readonly expandable: boolean;
        childrenSelected(): import("amis-core/lib/store/table").SELECTED_STATUS;
        readonly partial: boolean;
        readonly checked: boolean;
        readonly modified: boolean;
        getDataWithModifiedChilden(): any;
        readonly collapsed: boolean;
        readonly expanded: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
        readonly isCheckAvaiableOnClick: boolean;
        readonly indentStyle: {
            paddingLeft: string;
        };
    } & {
        toggle(checked: boolean): void;
        toggleExpanded(): void;
        setExpanded(expanded: boolean): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void; /**
         * 懒加载 API，当行数据中用 defer: true 标记了，则其孩子节点将会用这个 API 来拉取数据。
         */
        setCheckdisable(bool: boolean): void;
        setIsHover(value: boolean): void;
        replaceWith(data: any): void;
        replaceChildren(children: any[]): void;
        markAppeared(value: any): void;
        markLoading(value: any): void;
        markLoaded(value: any): void;
        setError(value: any): void;
        resetDefered(): void;
        updateData({ children, ...rest }: any): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        storeType: import("mobx-state-tree").IType<string | undefined, string, string>;
        id: import("mobx-state-tree").ISimpleType<string>;
        parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
        key: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        rowSpans: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>; /**
         * 单元格内部组件自定义样式 style作为单元格自定义样式的配置
         */
        newIndex: import("mobx-state-tree").ISimpleType<number>;
        path: import("mobx-state-tree").IType<string | undefined, string, string>;
        checkdisable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        isHover: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>;
        /**
         * 指定为表格渲染器。
         */
        defer: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        loaded: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        loading: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        error: import("mobx-state-tree").IType<string | undefined, string, string>;
        depth: import("mobx-state-tree").ISimpleType<number>;
        appeared: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        lazyRender: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    }, {
        readonly parent: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyStateTreeNode> | (object & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyComplexType>);
        readonly table: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyStateTreeNode> | (object & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IAnyComplexType>);
        readonly expandable: boolean;
        childrenSelected(): import("amis-core/lib/store/table").SELECTED_STATUS;
        readonly partial: boolean;
        readonly checked: boolean;
        readonly modified: boolean;
        getDataWithModifiedChilden(): any;
        readonly collapsed: boolean;
        readonly expanded: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
        readonly isCheckAvaiableOnClick: boolean;
        readonly indentStyle: {
            paddingLeft: string;
        };
    } & {
        toggle(checked: boolean): void;
        toggleExpanded(): void;
        setExpanded(expanded: boolean): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void; /**
         * 懒加载 API，当行数据中用 defer: true 标记了，则其孩子节点将会用这个 API 来拉取数据。
         */
        setCheckdisable(bool: boolean): void;
        setIsHover(value: boolean): void;
        replaceWith(data: any): void;
        replaceChildren(children: any[]): void;
        markAppeared(value: any): void;
        markLoading(value: any): void;
        markLoaded(value: any): void;
        setError(value: any): void;
        resetDefered(): void;
        updateData({ children, ...rest }: any): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>)[]>;
    reload(subPath?: string, query?: any, ctx?: any, silent?: boolean, replace?: boolean, args?: any): Promise<any>;
    setData(values: any, replace?: boolean, index?: number | string, condition?: any): Promise<void>;
    getData(): any;
    doAction(action: ActionObject, ctx: any, throwErrors: boolean, args: any): Promise<void>;
}
export { TableCell };
