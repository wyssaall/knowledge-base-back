import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/user.model.js";

dotenv.config();

const run = async () => {
  const dbUri = (process.env.DB_URI || "").replace(/^['"]|['"]$/g, "");
  if (!dbUri) throw new Error("DB_URI missing");

  await mongoose.connect(dbUri);

  const email = "admin@inct.com";
  const password = "admin123";
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { email },
    {
      name: "Admin INCT",
      email,
      password: hashed,
      role: "admin",
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin ready: ${user.email} (${user.role})`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
