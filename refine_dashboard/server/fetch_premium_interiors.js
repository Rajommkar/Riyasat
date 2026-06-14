import * as dotenv from 'dotenv';

dotenv.config();

const rooms = [
    { name: "Living Room", query: "luxury living room interior" },
    { name: "Kitchen", query: "modern luxury kitchen interior" },
    { name: "Bathroom", query: "luxury bathroom interior" },
    { name: "Dining Area", query: "luxury dining room interior" },
    { name: "Gym", query: "home gym equipment luxury" },
    { name: "Backyard", query: "luxury backyard patio" },
    { name: "Garage", query: "luxury garage interior cars" },
    { name: "Master Bedroom", query: "luxury master bedroom interior" },
    { name: "Guest Bedroom", query: "modern bedroom interior" },
    { name: "Pool & Balcony", query: "luxury swimming pool house" }
];

const fetchImages = async () => {
    const results = {};
    for (const room of rooms) {
        try {
            const response = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(room.query)}&per_page=10`);
            const data = await response.json();
            // Map to the direct full-quality URL
            results[room.name] = data.results.map(r => r.urls.regular);
        } catch (e) {
            console.error(`Error fetching ${room.name}:`, e);
        }
    }
    
    // Print the output formatted as a JS object
    console.log("const premiumCuratedImages: Record<string, string[]> = " + JSON.stringify(results, null, 2) + ";");
}

fetchImages();
