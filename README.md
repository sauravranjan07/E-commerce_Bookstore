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

## ⚙️ Architectural Flowchart: Request from Start to End (Robust Version)

The application follows a structured API flow, where a request passes through distinct layers (Middlewares → Routes → Controllers → Models → Database).

### Visual Representation of the Request Flow

```mermaid
graph TD
    subgraph Server_Backend ["E-commerce Bookstore Backend"]
        subgraph Entry_Point ["Entry Point"]
            B["index.ts: Server Init & Global Middlewares"]
        end

        subgraph Middlewares ["Authentication & Authorization"]
            C1["Auth Middleware (JWT)"]
            C2["Validation Middleware"]
        end

        subgraph Routing ["Routing Layer"]
            D3("routes/cart.route.ts")
        end

        subgraph Controllers ["Controller Layer"]
            E3["controllers/cart.controller.ts\n(Business Logic)"]
        end

        subgraph Models ["Model Layer"]
            F3["models/cart.model.ts\n(Data Schema/Interface)"]
        end

        subgraph Database ["Database Abstraction"]
            G1["Database Connection"]
            G2["DB Operations (CRUD)"]
        end

        A[User's Browser/App] -->|HTTP Request: POST /api/cart| B
        B --> C1
        C1 -->|If Authenticated| C2
        C2 -->|If Valid Input| D3
        D3 --> E3
        E3 -->|Call Model Method| F3
        F3 -->|DB Query/Update| G2
        G2 --> G1
        G2 -->|Return Data| F3
        F3 -->|Return Cart Object| E3
        E3 -->|HTTP Response (200 OK)| J[Client Response]
        C1 -->|Auth Failure (401)| J
        C2 -->|Validation Failure (400)| J
    end

    style A fill:#f9f,stroke:#333
    style B fill:#f9f,stroke:#333
    style J fill:#f9f,stroke:#333
