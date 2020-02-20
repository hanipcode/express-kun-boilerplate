declare class InvalidRequestError extends Error {
    field: string;
    constructor(message: string, field: string);
}
export default InvalidRequestError;
