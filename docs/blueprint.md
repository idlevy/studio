# **App Name**: Command Pal

## Core Features:

- Command Saving: Allow users to save frequently used commands with custom labels and categories.
- Global Hotkey Activation: Implement a global hotkey (e.g., Ctrl+W) to activate the app, regardless of the current application in focus.
- Fuzzy Search: Implement a fuzzy search algorithm that intelligently filters commands as the user types, suggesting matches based on the first few letters.
- Command Execution: Provide a button or hotkey to quickly copy the selected command to the clipboard or execute it directly in the system terminal (tool using LLM reasoning if it needs user confirmation based on safety parameters before execution).
- Category Assignment: Categorize the different command (e.g., git, kubectl)
- Command Grouping: Allow the users to create groups based on commands or group the commands based on its function
- UI Customization: Enable basic UI customization options, such as light/dark theme toggle, to enhance user experience.

## Style Guidelines:

- Background color: Dark background using a desaturated purple-blue (#282C34) to reduce eye strain in a desktop environment.
- Primary color: Vibrant violet (#A076F9) for main interactive elements.
- Accent color: Contrasting yellow-orange (#FFC04D) to draw attention to key actions and status notifications.
- Body and headline font: 'Inter', a grotesque-style sans-serif font for clear and modern readability.
- Use a set of minimalistic icons, using the primary color, to represent each command category or saved action.
- Maintain a simple, intuitive, single-window layout. The search bar should be prominent.
- Use subtle animations for command suggestions and transition in the app