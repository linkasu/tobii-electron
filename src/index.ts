import Electron, { IpcRenderer } from "electron";
import { TobiiProcess } from "tobiiee";
import { GazeData } from "tobiiee/build/GazeData";
export class TobiiElectronHelper {
    private tobiiee: TobiiProcess;
    private window: Electron.BrowserWindow;
    constructor(window: Electron.BrowserWindow, tobiiee: TobiiProcess) {
        this.window = window;
        this.tobiiee = tobiiee;
        tobiiee.start()
        tobiiee.on('point', (point: GazeData) => {
            this.pointHandler(point)
        })
    }
    pointHandler(point: GazeData) {
        const rect = this.window.getContentBounds();
        const pointInWindow = {
            x: point.x - rect.x,
            y: point.y - rect.y,
            ts: point.ts
        }
        if (pointInWindow.x < 0 || pointInWindow.y < 0 || pointInWindow.x > rect.width || pointInWindow.y > rect.height) {
            return;
        }

        if (this.window.isFocused()) this.window.webContents.send('point', pointInWindow)

    }
    static addGlobalPointEvent(ipcRenderer: IpcRenderer, document: Document) {
        ipcRenderer.on('point', (_, point) => {

            const event = new CustomEvent("tobii.point", { detail: point })
            document.dispatchEvent(
                event
            )
        })
    }
}