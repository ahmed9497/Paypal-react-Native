/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import { Buffer } from "buffer";
// global.Buffer = Buffer;

// import { URL, URLSearchParams } from "whatwg-url";
// global.URL = URL;
// global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent(appName, () => App);
