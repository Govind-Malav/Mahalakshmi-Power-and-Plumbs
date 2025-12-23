import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

console.log('--- STARTING LOGIN VERIFICATION ---');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Exists' : 'MISSING');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('ADMIN_LOGIN_PASSWORD:', process.env.ADMIN_LOGIN_PASSWORD);

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Check Admin Login (Env check)
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_LOGIN_PASSWORD) {
            console.log('✅ Admin Credentials present in .env');
        } else {
            console.log('❌ Admin Credentials MISSING in .env');
        }

        // Check Users in DB
        const users = await User.find({});
        console.log(`\nFound ${users.length} users in the database:`);
        users.forEach(u => {
            console.log(`- Name: ${u.name}, Email: ${u.email}, Password (stored): ${u.password}, Role: ${u.role || 'user'}`);
        });

    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('--- END VERIFICATION ---');
    }
};

verify();
