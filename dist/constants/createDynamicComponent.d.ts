/// <reference types="react" />
import { DynamicComponentContextConfig } from '../@types';
import { DynamicComponentProps } from '../components/DynamicComponent';
export default function createDynamicComponent({ buildRequestForUri, global, verify, }: DynamicComponentContextConfig): Readonly<{
    DynamicComponent: (props: DynamicComponentProps) => JSX.Element;
    preload: (uri: string) => Promise<void>;
}>;
