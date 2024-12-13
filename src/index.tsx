/* @refresh reload */
import { render } from "solid-js/web";

import App from "./views/App";
import { injectGlobal } from "@emotion/css";
import { media } from "./utilities/css_util";

injectGlobal({
    "*": {
        boxSizing: "border-box",
    },

    html: {
        overflow: "overlay"
    },

    body: {
        margin: 0,

        [media("prefers-color-scheme", "light")]: {
            color: "#212121",
            backgroundColor: "#FAFAFA",
        },

        [media("prefers-color-scheme", "dark")]: {
            color: "#FAFAFA",
            backgroundColor: "#212121",
        },

        colorScheme: "light dark",

        transitionProperty: "color background-color",
        transitionDuration: "200ms",
    },
});

render(() => <App />, document.body);
