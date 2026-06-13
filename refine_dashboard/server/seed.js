import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Property from './mongodb/models/property.js';
import User from './mongodb/models/user.js';

dotenv.config();

const dummyPhotos = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjU0NzZ8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eXxlbnwwfHx8fDE3MTAxNjUyNDR8MA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjU0NzZ8MHwxfHNlYXJjaHwyfHxwcm9wZXJ0eXxlbnwwfHx8fDE3MTAxNjUyNDR8MA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjU0NzZ8MHwxfHNlYXJjaHwzfHxwcm9wZXJ0eXxlbnwwfHx8fDE3MTAxNjUyNDR8MA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjU0NzZ8MHwxfHNlYXJjaHw0fHxwcm9wZXJ0eXxlbnwwfHx8fDE3MTAxNjUyNDR8MA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjU0NzZ8MHwxfHNlYXJjaHw1fHxwcm9wZXJ0eXxlbnwwfHx8fDE3MTAxNjUyNDR8MA&ixlib=rb-4.0.3&q=80&w=1080'
];

const propertyTypes = ['apartment', 'villa', 'farmhouse', 'condos', 'townhouse', 'duplex', 'studio', 'chalet'];
const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA'];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        let user = await User.findOne();
        if (!user) {
            user = await User.create({
                name: 'Seed Admin',
                email: 'admin@seed.com',
                avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            });
            console.log('Created dummy user');
        } else if (!user.avatar) {
            user.avatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        }

        const propertiesToInsert = [];
        for (let i = 0; i < 50; i++) {
            const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const photo = dummyPhotos[Math.floor(Math.random() * dummyPhotos.length)];
            const price = Math.floor(Math.random() * 900000) + 100000; 

            propertiesToInsert.push({
                title: `Beautiful ${type.charAt(0).toUpperCase() + type.slice(1)} in ${location}`,
                description: `This is a fantastic ${type} located in the heart of ${location}. It features modern amenities, spacious rooms, and a wonderful neighborhood perfect for families or individuals.`,
                propertyType: type,
                location: location,
                price: price,
                photo: photo,
                creator: user._id
            });
        }

        const createdProperties = await Property.insertMany(propertiesToInsert);
        const propertyIds = createdProperties.map(p => p._id);

        user.allProperties.push(...propertyIds);
        await user.save();

        console.log('Successfully seeded 50 properties');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
