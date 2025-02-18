const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const mainRoute = require("./routes/index");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware'ler
app.use(express.json());
app.use(cors());
app.use("/api", mainRoute);

// MongoDB Bağlantı Fonksiyonu
const connect = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL bulunamadı. .env dosyanızı kontrol edin.");
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB bağlantısı başarılı.");
    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error.message);
        process.exit(1); // Sunucuyu kapat
    }
};

// Sunucu Başlat
app.listen(PORT, () => {
    connect();
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});
