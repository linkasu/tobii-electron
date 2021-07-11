# Tobii-electron

Library for using tobii eye devices in electron

## Usage

### Main process

```js
import { TobiiProcess } from "tobiiee";
import { TobiiElectronHelper } from "tobii-electron";

const tobii = new TobiiProcess()
const window = ...;

const helper = new TobiiElectronHelper(window, electron)
```
### Window process

```js

import { TobiiElectronHelper } from "tobii-electron";

TobiiElectronHelper.addGlobalPointEvent(ipcRendener, document)

 document.addEventListener('tobii.point', (e) => {
        console.log('tobii.point', e.detail);
 });
 
```
