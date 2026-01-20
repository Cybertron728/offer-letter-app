const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs')
        },
        icon: path.join(__dirname, '../public/icon.png')
    });

    if (!app.isPackaged) {
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

// Handle print-to-pdf request from renderer
ipcMain.handle('print-to-pdf', async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);

    try {
        // Generate PDF
        const pdfData = await win.webContents.printToPDF({
            printBackground: true,
            pageSize: 'A4',
            margins: {
                marginType: 'none'
            }
        });

        // Open save dialog
        const { filePath, canceled } = await dialog.showSaveDialog(win, {
            title: 'Save PDF',
            defaultPath: options?.filename || 'document.pdf',
            filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
        });

        if (canceled || !filePath) {
            return { success: false, canceled: true };
        }

        // Write the PDF file
        fs.writeFileSync(filePath, pdfData);

        return { success: true, filePath };
    } catch (error) {
        console.error('PDF generation failed:', error);
        return { success: false, error: error.message };
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
