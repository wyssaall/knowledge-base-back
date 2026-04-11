import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const fixPasswords = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        const users = await User.find();
        console.log("Fixing users...");
        for (const u of users) {
            if (!u.password.startsWith('$2')) {
                console.log(`Fixing plaintext password for ${u.email}...`);
                u.password = await bcrypt.hash(u.password, 10);
                await u.save();
                console.log(`Password for ${u.email} is now hashed!`);
            } else {
                console.log(`Password for ${u.email} is already hashed.`);
            }
        }
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
fixPasswords();
