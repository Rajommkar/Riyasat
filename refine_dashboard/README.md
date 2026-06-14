# Riyasat - Real Estate Dashboard

![Riyasat Banner](https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png)

**Riyasat** is a professional, full-stack Real Estate Management Dashboard built to streamline property and agent management. Built with a modern tech stack, it provides a seamless and responsive user experience for administrators and agents.

## 🌟 Features

- 📊 **Comprehensive Dashboard**: View total revenue, property referrals, and key metrics via interactive charts (ApexCharts).
- 🏢 **Property Management**: Complete CRUD operations for properties. Includes pagination, sorting (e.g., price), and filtering.
- 🧑‍💼 **Agent Management**: View and manage real estate agents, including dedicated agent profile pages.
- 🎨 **Modern UI/UX**: Built with Material-UI (MUI) and tailored with a clean, responsive layout.
- 🌗 **Dark & Light Mode**: Built-in context to toggle seamlessly between dark and light themes.
- 🔐 **Authentication**: Integrated Google Authentication via Refine's Auth Provider.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Core Tooling**: [Refine](https://refine.dev/) (Rapid development of internal tools)
- **UI Framework**: [Material-UI (MUI)](https://mui.com/)
- **Charts**: ApexCharts
- **Routing**: React Router
- **Language**: TypeScript

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Image Storage**: Cloudinary (for property images and avatars)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajommkar/riyasat.git
   cd riyasat
   ```

2. **Setup the Server:**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory and add your environment variables:
     ```env
     MONGODB_URL=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Setup the Client:**
   ```bash
   cd ../client
   npm install
   ```
   - Create a `.env` file in the `client` directory and add necessary variables (e.g., Google Client ID if applicable).
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Open the App:**
   Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```text
riyasat/
├── client/                 # React frontend powered by Refine
│   ├── src/
│   │   ├── components/     # Reusable UI components (charts, forms, cards)
│   │   ├── contexts/       # React contexts (e.g., ColorMode for Dark/Light theme)
│   │   ├── pages/          # Dashboard, Properties, Agents, Login, Profile pages
│   │   └── utils/          # Helper functions and validators
│   └── package.json        # Client dependencies
│
└── server/                 # Node.js + Express backend API
    ├── controllers/        # Request handlers for properties and users
    ├── mongodb/            # Mongoose models and DB connection logic
    ├── routes/             # Express API routes
    └── package.json        # Server dependencies
```

## 📜 Scripts Overview

- **Client**:
  - `npm run dev`: Starts the Vite development server.
  - `npm run build`: Compiles TypeScript and builds for production.
- **Server**:
  - `npm start`: Starts the Express server using Nodemon for hot-reloading.

## 📄 License

This project is licensed under the MIT License.
