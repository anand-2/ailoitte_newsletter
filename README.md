# NextNews - Next.js News Website
Welcome to the NextNews project repository! This is a complete, responsive news application built with Next.js that fetches and displays real-time news articles from NewsAPI.org.

This project was completed as a Full-Stack Developer assignment for Ailoitte Technologies and demonstrates proficiency in modern web development frameworks, API integration, routing, and unit testing.

# ✨ Features
The application provides a robust user experience with the following key features:

Top Headlines: Displays the latest trending news on the homepage upon load.

Category Filtering: Easily browse news by popular categories (e.g., Business, Technology, Sports).

Search Functionality: Users can search for specific articles using keywords.

Pagination: Implemented for seamless browsing of article results across different pages.

News Details Page: Dynamic routing is used to show a detailed view of the selected article.

Responsive UI: The application is fully responsive and optimized for both desktop and mobile devices.

Robust Error Handling: Displays user-friendly messages for API errors and loading states.

Unit Testing: Comprehensive unit tests written using Jest and React Testing Library cover core functionality, API calls, and component interactions.

# 🛠️ Tech Stack
This project leverages a modern and efficient tech stack:

Framework: Next.js (React)

Used for Server-Side Rendering (SSR) and Static Generation for performance.

Styling: Tailwind CSS

For utility-first, rapid, and responsive styling.

State Management: React Hooks (useState, useEffect, useContext)

API Calls: Axios / Fetch API

To interact with the external NewsAPI.

Testing: Jest and React Testing Library

For component and logic testing.

Environment Variables: .env.local

To securely store the NewsAPI Key.

# 🖼️ Screenshots
<img width="944" height="472" alt="home" src="https://github.com/user-attachments/assets/bc1bdcf1-b3a5-4ea2-b30c-ed5d732c7df5" />
<img width="943" height="416" alt="search" src="https://github.com/user-attachments/assets/8381cf0f-af17-4426-8018-46d1a6d52f7a" />
<img width="941" height="470" alt="detail page" src="https://github.com/user-attachments/assets/0d6d87af-aba1-4099-ac44-d51f3bc6d531" />


# 🚀 Getting Started
Follow these steps to get a copy of the project up and running on your local machine.

Prerequisites
You must have Node.js and npm (or yarn/pnpm) installed.

Installation
Clone the repository:

```bash
git clone [YOUR_REPOSITORY_URL]
```
Install dependencies:

```bash
npm install
# or yarn install
```
Setup Environment Variables:

Sign up for a free API key at NewsAPI.org.

Create a file named .env.local in the root directory.

Add your API key to the file:

Code snippet

NEXT_PUBLIC_NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE
Run the development server:

```bash
npm run dev
# or yarn dev
```
The application will be accessible at http://localhost:3000.

# 🧪 Running Tests
Unit tests are a core part of this project, ensuring reliability and correctness.

To execute all tests, run the following command:

```bash
npm test
# or yarn test
```
Key Areas Covered by Tests:
API Mocking: Verifies successful and error responses from the NewsAPI service.

Component Rendering: Ensures the HeadlineCard, NewsList, and Search components render correctly.

User Interactions: Tests the functionality of the search input, category selection, and pagination clicks.

State Management: Checks the proper display of loading and error states.
