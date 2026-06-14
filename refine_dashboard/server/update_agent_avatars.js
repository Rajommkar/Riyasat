import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import userModel from './mongodb/models/user.js';

dotenv.config();

const updateAvatars = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const users = await userModel.find({});
        console.log(`Found ${users.length} users.`);
        
        let unsplashUrls = [];
        
        // Fetch 2 pages of 15 images = 30 images
        for (let page = 1; page <= 2; page++) {
            const response = await fetch(`https://unsplash.com/napi/search/photos?query=professional%20headshot%20portrait&per_page=15&page=${page}`);
            const data = await response.json();
            const urls = data.results.map(r => r.urls.regular);
            unsplashUrls.push(...urls);
        }
        
        console.log(`Fetched ${unsplashUrls.length} unique portrait URLs from Unsplash.`);

        // Shuffle the URLs slightly so it's random
        unsplashUrls = unsplashUrls.sort(() => Math.random() - 0.5);

        for (let i = 0; i < users.length; i++) {
            // Keep the real user's Google avatar if they have one (Google avatars contain lh3.googleusercontent)
            if (users[i].avatar && users[i].avatar.includes('googleusercontent')) {
                continue;
            }
            const randomUrl = unsplashUrls[i % unsplashUrls.length];
            users[i].avatar = randomUrl;
            await users[i].save();
        }
        
        console.log("User avatars updated successfully.");
        mongoose.disconnect();
    } catch (error) {
        console.error(error);
        mongoose.disconnect();
    }
}

updateAvatars();
