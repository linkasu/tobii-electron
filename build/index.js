"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TobiiElectronHelper = void 0;
var TobiiElectronHelper = /** @class */ (function () {
    function TobiiElectronHelper(window, tobiiee, fps, changeDistanse) {
        var _this = this;
        if (fps === void 0) { fps = 30; }
        if (changeDistanse === void 0) { changeDistanse = 0; }
        this.lastGazeTS = 0;
        this.lastPoint = { x: 0, y: 0 };
        this.window = window;
        this.tobiiee = tobiiee;
        this.fps = fps;
        this.changeDistanse = changeDistanse;
        tobiiee.start();
        tobiiee.on('point', function (point) {
            _this.pointHandler(point);
        });
    }
    TobiiElectronHelper.prototype.pointHandler = function (point) {
        var rect = this.window.getContentBounds();
        var pointInWindow = {
            x: Math.floor(point.x - rect.x),
            y: Math.floor(point.y - rect.y),
            ts: point.ts
        };
        if (point.ts - this.lastGazeTS < 1000 / this.fps) {
            return;
        }
        this.lastGazeTS = point.ts;
        var distance = Math.sqrt(Math.pow(pointInWindow.x - this.lastPoint.x, 2) + Math.pow(pointInWindow.y - this.lastPoint.y, 2));
        if (distance < this.changeDistanse) {
            return;
        }
        this.lastPoint = {
            x: pointInWindow.x,
            y: pointInWindow.y,
        };
        if (pointInWindow.x < 0 || pointInWindow.y < 0 || pointInWindow.x > rect.width || pointInWindow.y > rect.height) {
            return;
        }
        if (this.window.isFocused())
            this.window.webContents.send('point', pointInWindow);
    };
    return TobiiElectronHelper;
}());
exports.TobiiElectronHelper = TobiiElectronHelper;
//# sourceMappingURL=index.js.map