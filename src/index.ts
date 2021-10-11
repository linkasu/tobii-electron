import Electron, { IpcRenderer } from "electron";
import { TobiiProcess } from "tobiiee";
import { GazeData } from "tobiiee/build/GazeData";
export class TobiiElectronHelper {
    private tobiiee: TobiiProcess;
    private window: Electron.BrowserWindow;
    lastGazeTS: number = 0;
    fps: number;
    constructor(window: Electron.BrowserWindow, tobiiee: TobiiProcess, fps=30) {
        this.window = window;
        this.tobiiee = tobiiee;
        this.fps = fps;
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
        if (point.ts - this.lastGazeTS < 1000 / this.fps) {
            return;
        }
        this.lastGazeTS = point.ts;
        if (pointInWindow.x < 0 || pointInWindow.y < 0 || pointInWindow.x > rect.width || pointInWindow.y > rect.height) {
            return;
        }

        if (this.window.isFocused()) this.window.webContents.send('point', pointInWindow)

    }

}