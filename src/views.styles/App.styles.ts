import { css } from "@emotion/css";
import { calc } from "../utilities/css_util";

export default {
    Root: css({
        padding: "5rem",
    }),

    Up: css({
        display: "flex",

        height: "5rem",
    }),

    Input: css({
        width: calc("100%").sub("6rem").build(),
    }),

    Middle: css({
        width: "1rem",
    }),

    Button: css({
        width: "5rem",
    }),

    TreeItemRoot: css({
        display: "flex",
        alignItems: "center",

        height: "2rem",

        padding: "0.125rem 0",

        whiteSpace: "nowrap"
    }),
};
