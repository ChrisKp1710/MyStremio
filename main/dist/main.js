import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
// Supporto per __dirname in moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow = null;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false, // Per sicurezza
        },
    });
    const appUrl = isDev
        ? 'http://localhost:3000' // Usa il server Next.js in sviluppo
        : `file://${path.join(__dirname, '../out/index.html')}`; // Usa la build statica di Next.js
    mainWindow.loadURL(appUrl);
};
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
