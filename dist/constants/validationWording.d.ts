declare const _default: {
    invalid: (name: string) => string;
    minLength: (min: number) => string;
    required: (name: string) => string;
    notFound: (name: string) => string;
    incorrect: (name: string) => string;
    duplicate: (name: string, value: string) => string;
    oneOf: (name: string, ...args: string[]) => string;
};
export default _default;
