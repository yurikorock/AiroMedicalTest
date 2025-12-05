# Breweries Explorer

**Breweries Explorer** is a React application for browsing and exploring breweries around the world. Users can load brewery lists, view brewery details, mark favorites, and hide selected breweries.

---

## Table of Contents

- [Installation](#installation)
- [Run the App](#run-the-app)
- [Features](#features)
- [API](#api)
- [Technologies](#technologies)
- [Author](#author)

---

## Installation

1. Clone the repository:

```bash
git clone https://git@github.com:yurikorock/AiroMedicalTest.git
```

2. Navigate into the project directory:

```bash
cd breweries-explorer
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

---

## Run the App

```bash
npm start
# or
yarn start
```

The application will be available at:
**http://localhost:3000**

---

## Features

📋 **Browse Brewery List**  
Displays 15 breweries on the screen at a time.

🔄 **Step Navigation (Prev / Next)**  
Navigate through virtual pages of the loaded breweries.

⬇️ **Load More (API Pagination)**  
If the current data is exhausted, the next 50 breweries are fetched from the API.

🔍 **Brewery Details Page**  
View detailed information by brewery ID.

⭐ **Mark / Unmark Favorites**  
Right-click marks a brewery as "favorite".

🗑 **Delete All Favorites**  
Hidden breweries are removed from the list.

👁 **Hidden Breweries Stay Hidden**  
Even after new data is loaded, hidden breweries do not reappear.

---

## API

This application uses the **Open Brewery DB API** to retrieve brewery data.

Example requests:

- Get a list of breweries:  
  `GET https://api.openbrewerydb.org/breweries`

- Get brewery details by ID:  
  `GET https://api.openbrewerydb.org/breweries/{id}`

---

## Technologies

⚛️ **React** — UI and components  
🗂 **Redux Toolkit** — State management and data fetching  
🌐 **React Router** — Application routing  
🌍 **Axios** — HTTP requests  
🎨 **CSS Modules** — Scoped styling  
🧱 **HTML5** — Structural markup  

---

## Author

**Yurii Shaplavskyi**  
GitHub: https://github.com/yurikorock  
Email: yrikorock777@gmail.com
