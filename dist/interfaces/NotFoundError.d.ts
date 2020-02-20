declare class NotFoundError extends Error {
    field: string;
    constructor(message: string, field: string);
}
export default NotFoundError;
