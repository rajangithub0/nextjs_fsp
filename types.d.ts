import { Connection } from 'mongoose';
import { mongoose } from 'mongoose';


declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    }
}

export { }