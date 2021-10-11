import Electron from "electron";
import { TobiiProcess } from "tobiiee";
import { GazeData } from "tobiiee/build/GazeData";
export declare class TobiiElectronHelper {
    private tobiiee;
    private window;
    lastGazeTS: number;
    fps: number;
    lastPoint: {
        x: number;
        y: number;
    };
    changeDistanse: number;
    constructor(window: Electron.BrowserWindow, tobiiee: TobiiProcess, fps?: number, changeDistanse?: number);
    pointHandler(point: GazeData): void;
}
//# sourceMappingURL=index.d.ts.map