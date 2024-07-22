import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)

        console.log(`MongoDB Connected \nDB host : ${connect.connection.host
            }`)

    } catch (error) {
        console.log('MongoDB Connection Error ', error)
        process.exit(10)
    }
}


export default connectDB