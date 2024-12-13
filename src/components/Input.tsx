import { createMemo, For, JSXElement, onCleanup, onMount } from "solid-js";
import { cx } from "@emotion/css";
import { editable } from "edix";
import InputStyles from "../components.styles/Input.styles";

export default (props: { class?: string; value: string; "on:change": (text: string) => void }): JSXElement => {
    let ref: HTMLDivElement;

    onMount(() => {
        const cleanup = editable(ref, { onChange: props["on:change"] });
        onCleanup(cleanup);
    });

    const lines = createMemo(() => props.value.split("\n"));

    return (
        <div ref={ref} class={cx(InputStyles.Root, props.class)}>
            <For each={lines()}>{(line) => <div>{line ? line : <br />}</div>}</For>
        </div>
    );
};
