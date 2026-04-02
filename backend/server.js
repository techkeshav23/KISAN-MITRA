const express = require("express")
const cors = require('cors')
const connectDb = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const plantRoutes = require( "./routes/plantRoutes")


require("dotenv").config();
connectDb();

const app = express()
const allowedOrigins =
  (
    process.env.FRONTEND_URL ||
    "http://localhost:5173,http://127.0.0.1:5173"
  )
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

// middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    
})