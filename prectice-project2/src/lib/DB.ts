import { connect } from "mongoose";

let mongodbURL = process.env.MONGODB_URL;

if (!mongodbURL) {
    throw new Error("Mongodb URL is Not Found")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connnectDB = async () => {
    if (cached.conn) {
        console.log("cached DataBase Connected")
        return cached.conn;
    }

    if (!cached.promise){
        cached.promise =  connect(mongodbURL).then((c) => c.connection)
    }

    try {
        cached.conn = await cached.promise
        console.log("db connected")
    } catch (error) {
        throw error
    }
    return cached.conn;
}

export default connnectDB;