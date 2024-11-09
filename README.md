E-Commerce Frontend Project

  This is a frontend e-commerce application built with React and FakeAPI APIs to simulate real-world features like user authentication, product browsing, categories, and a dynamic shopping cart. This project uses modern tools and libraries to ensure efficient development and a smooth user experience.

Features
  
  1. User Registration and Login

    API: Utilizes FakeAPI for user registration and login functionality.
  
    Form Validation: Formik is used for form management, with YUP schema validation.
  
    Token Management: Implements context for handling and sharing the user's authentication token across the application.
  
  3. Product Page
  
    API Integration: Fetches products using the FakeAPI getProduct API.
  
    React Query: Used for fetching and caching data, improving performance by reducing redundant API calls.
  
    Carousel Design: Uses react-slick to create a smooth product carousel.
  
  4. Categories Page
  
    Dynamic Categories: Retrieves product categories and products based on selected categories via FakeAPI.
  
    Efficient Data Fetching: Uses React Query to manage data fetching and caching, enhancing the application's responsiveness.
  
  5. Shopping Cart
  
    Cart Context: A dedicated context is used for managing the cart's state, allowing users to add, update, and remove products.
  
    APIs: FakeAPI APIs are integrated to handle add-to-cart, update, and remove actions.
  
    User-Specific Cart: Retrieves the user's cart based on their ID, with data shared across the project using context.
  
  6. Navigation and Routing
  
    React Router: Enables seamless navigation across different pages within the app.
  
    Protected Routes: Prevents access to certain features without authentication.
  
  7. Offline Detection

    React Detect Offline: Monitors network status and adjusts the UI to inform users when they are offline.
  
  9. Styling and UI Components
  
    Bootstrap: Provides a responsive grid system and pre-styled components like the navbar.
  
    Font Awesome: Used for icons across the app.
  
    React Load Spinner: Displays a loading spinner for enhanced user feedback.
  
    React Hot Toaster: Provides stylish toast notifications for success, error, and information messages.


  Technologies Used:
  
    React.js

    FakeAPI for mock backend APIs

    Formik and YUP for form handling and validation

    React Query for data fetching and caching

    React Slick for carousel functionality

    React Router for navigation

    React Detect Offline for network status monitoring

    Bootstrap for layout and UI components

    Axios for API requests  

    Font Awesome for icons

    React Load Spinner for loading animations

    React Hot Toaster for toast notifications
