import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import userModel from './mongodb/models/user.js';

dotenv.config();

const realisticNames = [
    { name: "Emily Davis", email: "emily.davis@example.com" },
    { name: "David Wilson", email: "david.wilson@example.com" },
    { name: "Sarah Connor", email: "sarah.connor@example.com" },
    { name: "James Bond", email: "james.bond@example.com" },
    { name: "Natasha Romanoff", email: "natasha.romanoff@example.com" },
    { name: "Bruce Wayne", email: "bruce.wayne@example.com" },
];

const updateUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const users = await userModel.find({});
        console.log("Current users:", users.map(u => ({id: u._id, name: u.name, email: u.email})));
        
        let updateIndex = 0;
        for (let i = 0; i < users.length; i++) {
            const nameLower = users[i].name.toLowerCase();
            if (nameLower.includes("demo") || nameLower.includes("post") || nameLower.includes("test")) {
                const update = realisticNames[updateIndex % realisticNames.length];
                console.log(`Updating ${users[i].name} to ${update.name}`);
                users[i].name = update.name;
                users[i].email = update.email;
                if (!users[i].avatar) {
                    users[i].avatar = `https://i.pravatar.cc/300?u=${update.email}`;
                }
                await users[i].save();
                updateIndex++;
            }
        }
        console.log("Users updated successfully.");
        mongoose.disconnect();
    } catch (error) {
        console.error(error);
        mongoose.disconnect();
    }
}

updateUsers();
