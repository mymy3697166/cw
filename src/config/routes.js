import { Navigation } from '../components/react-native-navigation/src';
import { ViewDiscovery, ViewCategory, ComponentAvatar, ViewDrawer } from '../views';
import { MAINCOLOR } from './constants';

Navigation.registerComponent('Avatar', () => ComponentAvatar);

Navigation.registerComponent('Drawer', () => ViewDrawer)
Navigation.registerComponent('Discovery', () => ViewDiscovery);
Navigation.registerComponent('Category', () => ViewCategory);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: '发现',
      screen: 'Discovery',
      icon: require('../assets/tab_discover.png'),
      title: '发现'
    },
    {
      label: '分类',
      screen: 'Category',
      icon: require('../assets/tab_category.png'),
      title: '分类'
    }
  ],
  drawer: {
    left: {screen: 'Drawer'}
  },
  tabsStyle: {
    tabBarSelectedButtonColor: MAINCOLOR,
    tabBarCenterButtonImage: require('../assets/tab_center.png'),
    tabBarTranslucent: false,
  }
});