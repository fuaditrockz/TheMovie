import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import LogRocket from '@logrocket/react-native';
LogRocket.init('szwgrv/the-movie')

AppRegistry.registerComponent(appName, () => App);
