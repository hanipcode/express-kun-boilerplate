import mongoose from 'mongoose';
declare const initDB: () => Promise<typeof mongoose>;
export default initDB;
