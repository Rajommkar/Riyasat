import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Property from './mongodb/models/property.js';
import User from './mongodb/models/user.js';

dotenv.config();

const dummyUsers = [
    { name: 'Alice Smith', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { name: 'Charlie Davis', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=charlie' },
    { name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=diana' },
    { name: 'Ethan Hunt', email: 'ethan@example.com', avatar: 'https://i.pravatar.cc/150?u=ethan' },
    { name: 'Fiona Gallagher', email: 'fiona@example.com', avatar: 'https://i.pravatar.cc/150?u=fiona' },
    { name: 'George Constanza', email: 'george@example.com', avatar: 'https://i.pravatar.cc/150?u=george' },
    { name: 'Hannah Abbott', email: 'hannah@example.com', avatar: 'https://i.pravatar.cc/150?u=hannah' }
];

const updateDealers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        const createdUsers = [];
        for (const userData of dummyUsers) {
            let user = await User.findOne({ email: userData.email });
            if (!user) {
                user = await User.create(userData);
            }
            createdUsers.push(user);
        }

        const properties = await Property.find();
        
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            
            if (property.creator) {
                const oldCreator = await User.findById(property.creator);
                if (oldCreator) {
                    oldCreator.allProperties.pull(property._id);
                    await oldCreator.save();
                }
            }

            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            property.creator = randomUser._id;
            await property.save();

            randomUser.allProperties.push(property._id);
            await randomUser.save();
        }

        console.log('Successfully reassigned properties to different dealers!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating dealers:', error);
        process.exit(1);
    }
};

updateDealers();
