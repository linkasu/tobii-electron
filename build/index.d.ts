import Electron, { IpcRenderer } from "electron";
import { TobiiProcess } from "tobiiee";
import { GazeData } from "tobiiee/build/GazeData";
export declare class TobiiElectronHelper {
    private tobiiee;
    private window;
    constructor(window: Electron.BrowserWindow, tobiiee: TobiiProcess);
    pointHandler(point: GazeData): void;
    static addGlobalPointEvent(ipcRenderer: IpcRenderer, document: Document): void;
}
//# sourceMappingURL=index.d.ts.map