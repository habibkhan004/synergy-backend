import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Auth from "./models/authModel.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const ADMIN_EMAIL = "admin@synergyinnovations.com";
const ADMIN_PASSWORD = "Admin@1234";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");

  const existing = await Auth.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    console.log("Admin already exists:");
    console.log("  Email   :", existing.email);
    console.log("  Password: (stored in DB — use the one you set)");
  } else {
    await Auth.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.log("Admin created successfully!");
    console.log("  Email   :", ADMIN_EMAIL);
    console.log("  Password:", ADMIN_PASSWORD);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
