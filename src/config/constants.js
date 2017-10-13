const baseURL = 'http://192.168.0.207:3000/';
// const baseURL = 'http://192.168.1.153:3000/';
export const URLs = {
  CAPTCHA: `${baseURL}api/captcha`,                                       // 图形验证码
  LOGIN: `${baseURL}api/user/login`,                                      // 登录
  LOGIN_CODE: `${baseURL}api/user/login_code`,                            // 登录验证码
  FAVORITE: `${baseURL}api/user/favorite`,                                // 收藏/取消收藏
  FETCH_HOME: `${baseURL}api/fetch_home`,                                 // 拉取首页数据
  FETCH_WALLPAPERS: `${baseURL}api/wallpaper/fetch`,                      // 拉取壁纸列表
  DOWNLOAD: `${baseURL}api/wallpaper/download`,                           // 下载记录
  FETCH_TAGS: `${baseURL}api/tag/fetch`,                                  // 拉取标签列表
  FETCH_COMMENTS: `${baseURL}api/comment/fetch`,                          // 拉取评论
  CREATE_COMMENT: `${baseURL}api/comment/create`,                         // 发表评论
  DELETE_COMMENT: `${baseURL}api/comment/delete`,                         // 删除评论
};

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
  },
  noNavigatorStyle: {
    tabBarHidden: true,
    navBarHidden: true,
    statusBarHideWithNavBar: true
  }
};
