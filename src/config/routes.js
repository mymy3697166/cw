import { MAINCOLOR, ViewDiscovery, ViewTag, ComponentAvatar, ViewDrawer, ViewWallpaperList, ViewWallpaper, ViewLogin, ViewComment, Navigation } from '../';

export function registerRoutes() {
  Navigation.registerComponent('Avatar', () => ComponentAvatar);

  Navigation.registerComponent('Drawer', () => ViewDrawer)
  Navigation.registerComponent('Discovery', () => ViewDiscovery);
  Navigation.registerComponent('Tag', () => ViewTag);
  Navigation.registerComponent('WallpaperList', () => ViewWallpaperList);
  Navigation.registerComponent('Wallpaper', () => ViewWallpaper);
  Navigation.registerComponent('Login', () => ViewLogin);
  Navigation.registerComponent('Comment', () => ViewComment);

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
        screen: 'Tag',
        icon: require('../assets/tab_tag.png'),
        title: '分类'
      }
    ],
    drawer: {
      left: {screen: 'Drawer'},
      disableOpenGesture: true
    },
    tabsStyle: {
      tabBarSelectedButtonColor: MAINCOLOR,
      tabBarCenterButtonImage: require('../assets/tab_center.png'),
      tabBarTranslucent: false,
      forceTitlesDisplay: true
    },
    appStyle: {
      tabBarSelectedButtonColor: MAINCOLOR,
      tabBarTranslucent: false
    }
  });
}