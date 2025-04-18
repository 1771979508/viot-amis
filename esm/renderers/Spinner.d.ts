import { SpinnerExtraProps } from 'amis-ui';
import { RendererProps } from 'amis-core';
import React from 'react';
import { BaseSchema, SchemaCollection } from '../Schema';
export interface SpinnerSchema extends BaseSchema, SpinnerExtraProps {
    /**
     * 组件类型
     */
    type: 'spinner';
    /**
     * 控制Spinner显示与隐藏
     */
    show: boolean;
    /**
     * 自定义spinner的class
     */
    className?: string;
    /**
     * spin图标位置包裹元素的自定义class
     */
    spinnerClassName?: string;
    /**
     * 作为容器使用时最外层元素的class
     */
    spinnerWrapClassName?: string;
    /**
     * @deprecated 已废弃，没有作用
     */
    mode?: string;
    /**
     * spinner Icon 大小
     */
    size?: 'sm' | 'lg' | '';
    /**
     * 自定义icon
     */
    icon?: string;
    /**
     * spinner文案
     */
    tip?: string;
    /**
     * spinner文案位置
     */
    tipPlacement?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * 延迟显示
     */
    delay?: number;
    /**
     * 是否显示遮罩层
     */
    overlay?: boolean;
    /**
     * 作为容器使用时内容
     */
    body?: SchemaCollection;
}
interface SpinnerRenderProps extends RendererProps, Omit<SpinnerSchema, 'className'> {
}
export declare class SpinnerRenderer extends React.Component<SpinnerRenderProps> {
    renderBody(): JSX.Element | null;
    render(): React.JSX.Element;
}
export {};
