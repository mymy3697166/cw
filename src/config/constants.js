export const MAINCOLORS = [
  '#725c9e', // 紫色，星期日的颜色
  '#f3715c', // 红色，星期一的颜色
  '#f28d00', // 橙色，星期二的颜色
  '#fcd200', // 黄色，星期三的颜色
  '#15ad66', // 绿色，星期四的颜色
  '#00ebc0', // 青色，星期五的颜色
  '#1e90ff', // 蓝色，星期六的颜色
];
export const MAINCOLOR = MAINCOLORS[new Date().getDay()];

export const Styles = {
  navigatorStyle: {
    navBarNoBorder: true,
    navBarBackgroundColor: MAINCOLOR,
    navBarTextColor: '#fff',
    navBarTitleTextCentered: true,
    navBarButtonColor: '#fff',
    topBarElevationShadowEnabled: false,
    statusBarColor: MAINCOLOR,
    navBarHeight: 44
  },
  noTabBarNavigatorStyle: {
    navBarNoBorder: true,
    navBarBackgroundColor: MAINCOLOR,
    navBarTextColor: '#fff',
    navBarTitleTextCentered: true,
    navBarButtonColor: '#fff',
    topBarElevationShadowEnabled: false,
    statusBarColor: MAINCOLOR,
    navBarHeight: 44,
    tabBarHidden: true
  }
};
