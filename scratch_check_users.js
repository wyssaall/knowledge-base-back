import mongoose from 'mongoose';
import User from './src/models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        const users = await User.find();
        console.log("Users found:");
        users.forEach(u => {
            console.log(`- Email: ${u.email}, Role: ${u.role}, Password length: ${u.password?.length}, Password hash starts with: ${u.password?.substring(0, 5)}`);
        });
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
checkUsers();
