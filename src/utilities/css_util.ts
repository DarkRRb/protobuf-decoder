type CSSMediaKey = "prefers-color-scheme";

type CSSMediaMapper = {
    "prefers-color-scheme": "no-preference" | "light" | "dark";
};

export const media = (media: CSSMediaKey, value: CSSMediaMapper[CSSMediaKey]): string => `@media (${media}: ${value})`;

export const calc = (node: string) => {
    let expression = `${node}`;

    return {
        add: (next: string) => calc(`${expression} + ${next}`),
        sub: (next: string) => calc(`${expression} - ${next}`),
        build: () => `calc(${expression})`,
    };
};
