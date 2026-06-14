import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import propertyModel from './mongodb/models/property.js';

dotenv.config();

const updateProperties = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const properties = await propertyModel.find({});
        console.log(`Found ${properties.length} properties.`);
        
        let unsplashUrls = [];
        
        // Fetch 4 pages of 30 images = 120 images
        for (let page = 1; page <= 4; page++) {
            // 'suburban home exterior' yields much more realistic, full-house front views
            const response = await fetch(`https://unsplash.com/napi/search/photos?query=suburban%20home%20exterior&per_page=30&page=${page}`);
            const data = await response.json();
            const urls = data.results.map(r => r.urls.regular);
            unsplashUrls.push(...urls);
        }
        
        console.log(`Fetched ${unsplashUrls.length} unique image URLs from Unsplash.`);

        for (let i = 0; i < properties.length; i++) {
            const randomUrl = unsplashUrls[i % unsplashUrls.length];
            properties[i].photo = randomUrl;
            await properties[i].save();
        }
        
        console.log("Properties updated successfully.");
        mongoose.disconnect();
    } catch (error) {
        console.error(error);
        mongoose.disconnect();
    }
}

updateProperties();
