import express from "express";
import cors from "cors";
import toolRoutes from "./routes/tool.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import orderDetailsRoutes from "./routes/orderDetails.routes";
import { connectDB } from "./config/database";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // Allow only this frontend
        methods: "GET,POST,PUT,DELETE", // Allowed request methods
        allowedHeaders: "Content-Type,Authorization", // Allowed headers
        credentials: true, // Allow cookies & credentials
    })
);



app.use("/api/tools", toolRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-details", orderDetailsRoutes);


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server failed to start:", error);
        process.exit(1);
    }
};

startServer();
