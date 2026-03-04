import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import connectDB from "./db/db"
import authRoute from "./routes/auth.route"
import cookieParser from "cookie-parser"
import cors from "cors"

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
dotenv.config()
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.use("/api" , authRoute)

const port = process.env.PORT || 5000;
connectDB()
app.listen(port, (): void => {
    console.log("Server is running on port : ", port)
})