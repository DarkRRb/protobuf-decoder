import { css } from "@emotion/css";
import { media } from "../utilities/css_util";

export default {
    Root: css({
        width: "100%",
        height: "100%",

        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "0.5rem",

        padding: "0.5rem",

        overflow: "overlay",

        ":focus-visible": {
            outline: "unset",
        },

        [media("prefers-color-scheme", "light")]: {
            borderColor: "#212121",
        },

        [media("prefers-color-scheme", "dark")]: {
            borderColor: "#FAFAFA",
        },
    }),
};
