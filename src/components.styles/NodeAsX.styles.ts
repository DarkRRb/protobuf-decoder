import { css } from "@emotion/css";

export default {
    Prefix: css({ flexShrink: 0, width: "0.5rem" }),
    ButtonLeft: css({
        flexShrink: 0,
        padding: "0.25rem",
        whiteSpace: "nowrap",

        "&:not(.hidden)": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
    }),
    Middle: css({ flexShrink: 0, width: "1px" }),
    ButtonRight: css({
        flexShrink: 0,
        padding: "0.25rem",
        whiteSpace: "nowrap",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    }),
};
