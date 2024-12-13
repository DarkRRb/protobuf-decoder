import { JSXElement } from "solid-js";
import { cx } from "@emotion/css";
import ButtonStyles from "../components.styles/Button.styles";

export default (props: { class?: string; "on:click"?: () => void; children: JSXElement }): JSXElement => {
    return (
        <div class={cx(ButtonStyles.Root, props.class)} on:click={props["on:click"]}>
            {props.children}
        </div>
    );
};
