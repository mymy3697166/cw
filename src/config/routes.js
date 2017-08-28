import { Navigation } from '../components/react-native-navigation/src';
import { Discovery, Category } from '../views';
import { MAINCOLOR } from './constants';


Navigation.registerComponent('Discovery', () => Discovery);
Navigation.registerComponent('Category', () => Category);

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
  tabsStyle: {
    tabBarSelectedButtonColor: MAINCOLOR
  }
});