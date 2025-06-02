# Configuration Assessment Frontend

This project contains the frontend for the configuration assessment module, built with React, Vite, Tailwind CSS, and Shadcn UI components. The main feature is the `ReportPage` component, which displays device information, a summary of security issues, a findings table with pagination and filters, and remediation recommendations.

## Prerequisites

- **Node.js**: Ensure Node.js (version 16 or later) is installed. Download it from [nodejs.org](https://nodejs.org/) if needed.
- **Git**: Required to clone the repository. Install from [git-scm.com](https://git-scm.com/) if not already installed.

## Setup and Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Cyart-project/configuration-assessment-front.git
   cd configuration-assessment-front
2. Install Dependencies: npm install (This installs all required packages, including React, Vite, Tailwind CSS, and Shadcn UI components.)
3. Run The devlopment server: npm run dev (This starts the Vite development server. You’ll see a URL in the terminal (e.g., http://localhost:5173).)
4. View the App:
Open your browser and navigate to the URL provided (e.g., http://localhost:5173).
You should see the ReportPage component with device info, summary, findings table, and remediation sections.
Project Structure
src/pages/ReportPage.jsx: The main component displaying the security report.
src/components/ui/: Contains Shadcn UI components like Card and DataTable.
public/: Static assets (e.g., images, if any).
tailwind.config.js: Tailwind CSS configuration for custom styles.
Notes
The visual design of ReportPage needs improvement to match the Dashboard.html example. I’ll refine this in the coming week.
If you encounter issues, ensure all dependencies are installed and Node.js is up to date.
Troubleshooting
Error: "Cannot find module": Run npm install again to ensure all dependencies are installed.
Port Conflict: If http://localhost:5173 is in use, Vite will suggest another port (e.g., http://localhost:5174).
undefined