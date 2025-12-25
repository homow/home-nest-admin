import mongoose from "mongoose";

let isConnected: boolean = false;

export default async function connectToDB() {
    if (isConnected) return;

    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    const dbURI: string | undefined = process.env.MONGO_DB_URI;
    const dbName: string | undefined = process.env.MONGO_DB_NAME;

    try {

        if (!dbURI) {
            return new Error("MongoDB URI is missing");
        }

        await mongoose.connect(dbURI, {
            dbName,
        });
        console.log(`MongoDB Created and Connected: ${dbName}`);
    } catch (e) {
        console.log(`MongoDB Connected failed while created or connected to ${dbName}: ${e}`);
    }
};