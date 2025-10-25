graph TD
    subgraph Client Interaction
        A[User's Browser/App]
    end

    subgraph Server (E-commerce Bookstore Backend)
        subgraph Entry Point
            B[index.ts - Server Initialization & Global Middlewares]
        end

        subgraph Authentication & Authorization (Middlewares)
            C1[middlewares/auth.middleware.ts - Authenticate User (JWT)]
            C2[middlewares/validation.middleware.ts - Validate Request Body/Params]
            C3[Other Middlewares (e.g., Logging, Error Handling)]
        end

        subgraph Routing Layer (routes/)
            D1[routes/user.route.ts]
            D2[routes/book.route.ts]
            D3[routes/cart.route.ts]
            D4[routes/order.route.ts]
            D5[routes/admin.route.ts]
            D6[Other Routes...]
        end

        subgraph Controller Layer (controllers/)
            E1[controllers/user.controller.ts]
            E2[controllers/book.controller.ts]
            E3[controllers/cart.controller.ts]
            E4[controllers/order.controller.ts]
            E5[controllers/admin.controller.ts]
            E6[Other Controllers...]
        end

        subgraph Model Layer (models/)
            F1[models/user.model.ts]
            F2[models/book.model.ts]
            F3[models/cart.model.ts]
            F4[models/order.model.ts]
            F5[Other Models...]
        end

        subgraph Database Abstraction (database/)
            G1[database/connection.ts - Connect to MongoDB]
            G2[database/db-operations.ts - Generic DB Operations (CRUD)]
        end
    end

    subgraph External Services
        H[Payment Gateway API (e.g., Stripe, PayPal)]
        I[Email Service (e.g., SendGrid, Nodemailer)]
    end

    %% Flow Paths
    A -- HTTP Request (e.g., POST /api/register) --> B
    B -->|Use global middlewares| C3
    B --> C1 --> C2 --|If valid & authenticated| D1(User Routes)
    B --> C1 --> C2 --|If valid & authenticated| D2(Book Routes)
    B --> C1 --> C2 --|If valid & authenticated| D3(Cart Routes)
    B --> C1 --> C2 --|If valid & authenticated| D4(Order Routes)
    B --> C1 --> C2 --|If valid & authenticated| D5(Admin Routes)

    D1 --> E1(User Controller: registerUser, loginUser, getUserProfile)
    D2 --> E2(Book Controller: getAllBooks, getBookById, createBook)
    D3 --> E3(Cart Controller: addToCart, getCart, updateCart)
    D4 --> E4(Order Controller: placeOrder, getUserOrders, getOrderDetails)
    D5 --> E5(Admin Controller: manageUsers, manageOrders, manageBooks)

    E1 --> F1(User Model: save, findOne, findByIdAndUpdate) --> G2(DB Operations) --> G1(DB Connection)
    E2 --> F2(Book Model: find, findById, create) --> G2 --> G1
    E3 --> F3(Cart Model: findOne, findByIdAndUpdate, save) --> G2 --> G1
    E4 --> F4(Order Model: save, find, findById) --> G2 --> G1
    E5 --> F1, F2, F3, F4 --> G2 --> G1

    E4 -->|Initiate Payment (if applicable)| H
    E1, E4 -->|Send Welcome/Order Confirmation Email| I

    G1 -- MongoDB Instance --> F1, F2, F3, F4, G2
    H -->|Payment Status Callback| E4(Order Controller)
    I -->|Email Sent Confirmation| E1, E4

    E1, E2, E3, E4, E5 --> J[HTTP Response to Client]
    J --> A

    C1 -->|Authentication Failure| J
    C2 -->|Validation Failure| J
    C3 -->|Error Handling/Logging| J
