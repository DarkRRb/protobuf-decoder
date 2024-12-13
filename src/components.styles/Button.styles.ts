import { css } from "@emotion/css";
import { media } from "../utilities/css_util";

export default {
    Root: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: "0.5rem",

        cursor: "pointer",
        userSelect: "none",

        transitionProperty: "background-color",
        transitionDuration: "200ms",

        [media("prefers-color-scheme", "light")]: {
            backgroundColor: "#00000011",

            ":hover": {
                backgroundColor: "#00000022",
            },

            ":active": {
                backgroundColor: "#00000033",
            },
        },

        [media("prefers-color-scheme", "dark")]: {
            backgroundColor: "#ffffff11",

            ":hover": {
                backgroundColor: "#ffffff22",
            },

            ":active": {
                backgroundColor: "#ffffff33",
            },
        },
    }),
};
