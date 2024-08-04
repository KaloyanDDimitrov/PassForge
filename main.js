const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');
const expressApp = require('./server'); // Import the express app

let mainWindow; // Declare with let so it can be reassigned

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.ico'), // Add the icon here
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL('http://localhost:3000'); // Load the express server

  mainWindow.setTitle('PassForge'); // Set the app's title

  mainWindow.on('closed', function () {
    mainWindow = null; // Set mainWindow to null when closed
  });
}

// Custom Menu Template
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About PassForge',
        click() {
          dialog.showMessageBox({
            type: 'info',
            title: 'About PassForge',
            message: 'PassForge',
            detail: `PassForge is a secure password generator with QR code functionality.\n\n` +
            `Developer: K2D (Kaloyan Dimitrov)\n` +
            `GitHub: https://github.com/KaloyanDDimitrov\n\n` +
            `Important: PassForge does not store or save passwords. Once you close the application or lose the password, it cannot be recovered. Please ensure you save your passwords securely.\n\n` +
            `This app is intended for personal use only. No support is provided.\n\n` +
            `License: MIT License - This project is licensed under the MIT License. See the LICENSE file for details.`,
            buttons: ['OK', 'Visit GitHub'],
            noLink: true
          }).then(result => {
            if (result.response === 1) { // 'Visit GitHub' button index
              shell.openExternal('https://github.com/KaloyanDDimitrov');
            }
          });
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

app.on('ready', () => {
  expressApp.listen(3000, () => { // Start the express server
    console.log('Express server running on port 3000');
    createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
