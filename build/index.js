"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TobiiElectronHelper = void 0;
var TobiiElectronHelper = /** @class */ (function () {
    function TobiiElectronHelper(window, tobiiee) {
        var _this = this;
        this.window = window;
        this.tobiiee = tobiiee;
        tobiiee.start();
        tobiiee.on('point', function (point) {
            _this.pointHandler(point);
        });
    }
    TobiiElectronHelper.prototype.pointHandler = function (point) {
        var rect = this.window.getContentBounds();
        var pointInWindow = {
            x: point.x - rect.x,
            y: point.y - rect.y,
            ts: point.ts
        };
        if (pointInWindow.x < 0 || pointInWindow.y < 0 || pointInWindow.x > rect.width || pointInWindow.y > rect.height) {
            return;
        }
        if (this.window.isFocused())
            this.window.webContents.send('point', pointInWindow);
    };
    TobiiElectronHelper.addGlobalPointEvent = function (ipcRenderer, document) {
        ipcRenderer.on('point', function (_, point) {
            var event = new CustomEvent("tobii.point", { detail: point });
            document.dispatchEvent(event);
        });
    };
    return TobiiElectronHelper;
}());
exports.TobiiElectronHelper = TobiiElectronHelper;
//# sourceMappingURL=index.js.map