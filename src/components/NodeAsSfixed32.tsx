import { createMemo, createSignal, JSXElement, Show } from "solid-js";
import { ProtoBufNode } from "../utilities/n_protobuf_decode/node";
import { cx } from "@emotion/css";

import NodeAsXStyles from "../components.styles/NodeAsX.styles";

import Button from "./Button";

export default (props: { node: ProtoBufNode }): JSXElement => {
    const result = createMemo(() => props.node.tryAsSfixed32());
    const isSucceed = createMemo(() => result()[0]);
    const value = createMemo(() => result()[1]);

    const [isShow, setIsShow] = createSignal(false);

    const leftButtonClickHandler = (): void => {
        setIsShow(!isShow());
    };

    const rightButtonClickHandler = (): void => {
        navigator.clipboard.writeText(value().toString());
    };

    return (
        <Show when={isSucceed()}>
            <div class={NodeAsXStyles.Prefix} />
            <Button class={cx(NodeAsXStyles.ButtonLeft, { hidden: !isShow() })} on:click={leftButtonClickHandler}>
                Sfixed32
            </Button>
            <Show when={isShow()}>
                <div class={NodeAsXStyles.Middle} />
                <Button class={NodeAsXStyles.ButtonRight} on:click={rightButtonClickHandler}>
                    {value().toString()}
                </Button>
            </Show>
        </Show>
    );
};
