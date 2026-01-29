# Angular Smart Home UI

A sophisticated Angular-based dashboard for monitoring and controlling smart home devices. This project features a modular architecture, state-managed data flow, and a seamless "Edit Mode" for full dashboard customization.

## Live Demo

Frontend: [[Link](https://deft-griffin-24aded.netlify.app/)]

Backend: [[Repo](https://github.com/pavelrazuvalau/smart-home-json-server)]

## Tech Stack & Tools

* **Framework:** Angular 18/20+ 
    * *Architecture:* Standalone Components, `inject()`-based dependency injection.
    * *Templates:* Modern control flow syntax (`@if`, `@for`, `@switch`).
* **State Management:** * **NgRx (Store & Effects):** Global state for dashboard configuration and device synchronization.
    * **Angular Signals:** Granular reactive state for UI logic and Edit Mode transitions.
* **Styling & UI:** SCSS (pre-processor), Angular Material components.
* **Forms:** Reactive Forms with complex custom validation (uniqueness, length, and integrity checks).
* **Code Quality:** * **ESLint:** Configured with the `unicorn` plugin.
    * **TypeScript:** Strict mode enabled (zero usage of `any`).

## Local Setup

To run this project locally, you need to set up both the backend and the frontend.

### 1. Backend Service && Frontend
This project uses a custom JSON-server based backend to handle persistence.
* **Repository:** [pavelrazuvalau/smart-home-json-server](https://github.com/pavelrazuvalau/smart-home-json-server)

1. Fork or clone the backend repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install dependencies:
   ```bash
   npm start
   ```
4. Clone the backend repository.
   ```bash
   git clone https://github.com/xsetiqq/Smart-home-UI.git
   ```
5. Install dependencies & Start the development server:
   ```bash
   npm install & ng serve
   ```
   
## Key Implementation Details

* **State Synchronization:** Device state changes are managed through **NgRx Effects**, ensuring that every toggle triggers a `PATCH` request to the backend for persistent updates and immediate UI feedback.
* **Secure Interceptors:** A centralized **HTTP Interceptor** automatically:
    * Attaches `Authorization: Bearer <token>` to all outgoing requests.
    * Detects `401 Unauthorized` responses to clear invalid tokens and redirect users to the `/login` page.
* **Dynamic Layouts:** The UI adaptively renders components based on API-driven metadata, supporting three distinct card layouts: `singleDevice`, `horizontalLayout`, and `verticalLayout`.
* **Navigation Guards:** Secure routing is enforced using **Angular Route Guards**, preventing unauthorized access to dashboards and redirecting anonymous users to the authentication flow.

## Gallery

<img width="1913" height="902" alt="image" src="https://github.com/user-attachments/assets/1e5652d9-1188-45f2-a49c-3bb2cb78e24e" />
<img width="1900" height="902" alt="image" src="https://github.com/user-attachments/assets/0dcf7601-029d-444f-b4f1-c2491e75092d" />
<img width="1908" height="902" alt="image" src="https://github.com/user-attachments/assets/ffa34ee7-44b5-423f-8c2a-4a7d04d3c080" />
<img width="1829" height="870" alt="image" src="https://github.com/user-attachments/assets/2c628615-10d7-49b4-863c-3a91766a58d0" />
<img width="1133" height="524" alt="image" src="https://github.com/user-attachments/assets/2bca3fc4-53e0-4d4b-ac22-3e4e1d8c1447" />
<img width="1414" height="748" alt="image" src="https://github.com/user-attachments/assets/9ec98c96-12a3-43d6-a84e-ba2c9d11ca09" />
<img width="1864" height="910" alt="image" src="https://github.com/user-attachments/assets/7d1a47c3-fc04-437c-b633-312c661804fa" />

