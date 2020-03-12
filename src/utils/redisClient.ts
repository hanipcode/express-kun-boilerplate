import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

interface Redis {
  get: (key: string) => Promise<string>;
  set: (
    key: string,
    value: any,
    flag?: any,
    duration?: any
  ) => Promise<unknown>;
  del: (key: string) => Promise<number>;
}
const Redis: Redis = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  del: promisify(client.del).bind(client)
};

export default Redis;
