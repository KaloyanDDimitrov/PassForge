# PassForge

**PassForge** is a secure password generator that creates random, secure passwords and generates QR codes for easy copying. The app is built using Electron, allowing it to run as a standalone desktop application for Windows.

## Features

- Generate secure, random passwords of customizable length.
- Generate QR codes for easy copying of passwords on mobile devices.
- Simple and intuitive user interface.
- Customizable settings via an in-app menu.
- Portable, single-executable distribution.

## Important Notes

- **PassForge does not store or save passwords.** Once you close the application or lose the password, it cannot be recovered. Please ensure you save your passwords securely.
- This app is intended for personal use only. No support is provided.

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/KaloyanDDimitrov/PassForge.git
cd PassForge
```

### Install Dependencies

After cloning the repository, install the necessary dependencies:

```bash
npm install
```

This will install all the required packages, including Electron and other dependencies.

### How to Test
To run the application in a development environment:

```bash
npm start
```

This command will start the Express server and launch the Electron application. The application window will open, and you can start generating passwords and QR codes.

### How to Build

To build the application into a single portable .exe file for Windows:

```bash
npm run dist
```

This command will package the application using Electron Builder and generate a portable executable in the dist/ directory. The output file will be named PassForge.exe (or similar) and can be distributed directly.

### How to Generate a Password

- Launch the PassForge application.
- Enter the desired length of your password in the input field.
- Click the "Generate Password" button.
A pop-up will appear showing the generated password and a QR code.
You can manually copy the password or scan the QR code with your mobile device to copy it to your clipboard.

## About
- Developer: K2D (Kaloyan Dimitrov)
- GitHub: KaloyanDDimitrov

This app is intended for personal use only. No support is provided.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

```vbnet
This text is ready to be copied into your `README.md` file. It covers all the essential details about your project, including how to install, test, build, and use PassForge.
```