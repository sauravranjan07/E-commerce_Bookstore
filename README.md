# 📚 E-commerce Bookstore

## Project Overview

This is a robust and scalable E-commerce platform built specifically for an online **Bookstore**. The backend is constructed using **TypeScript** and leverages a modern, modular architecture, following the standard layered pattern (Routes, Controllers, Models) to ensure separation of concerns, maintainability, and efficient request handling.

The application is deployed live at: [e-commerce-bookstore-gilt.vercel.app](https://e-commerce-bookstore-gilt.vercel.app)

***

## 🛠️ Core Functionalities

The platform provides a comprehensive set of features for both customers and potential administrators.

### 1. User Management & Authentication

| Functionality | Description |
| :--- | :--- |
| **Sign Up/Registration** | Allows new users to create an account. |
| **Login/Sign In** | Authenticates returning users using credentials. |
| **Session Management** | Uses authentication tokens (e.g., JWT) for securing protected routes (`middlewares` folder). |
| **User Profile** | Ability to view and update personal information and shipping addresses. |

### 2. Book & Catalog Management

| Functionality | Description |
| :--- | :--- |
| **View Catalog** | Display a list of all available books (products). |
| **Product Detail View** | View detailed information for a single book (ISBN, author, summary, price, etc.). |
| **Search & Filtering** | Allows users to search by title, author, or filter by genre, price range, and language. |
| **Admin CRUD** | Endpoints for Administrators to manage (**C**reate, **R**ead, **U**pdate, **D**elete) book records. |

### 3. Shopping Cart & Order Management

| Functionality | Description |
| :--- | :--- |
| **Add/Update Cart** | Add a book/quantity or modify items in the cart. |
| **Checkout Process** | Collects shipping details and initiates the payment process (external gateway integration). |
| **Place Order** | Finalizes the transaction and creates a new order record. |
| **Order History** | Allows authenticated users to view and track all past orders. |

***

