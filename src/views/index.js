import ComponentAvatar from './ComponentAvatar';
import ViewDiscovery from './ViewDiscovery';
import ViewCategory from './ViewCategory';
import ViewDrawer from './ViewDrawer';
import AV from 'leancloud-storage';

const appId = 'JO3OJp373W3VEa7DjyfsCtuL-gzGzoHsz';
const appKey = '1G0XACMyjCEIyG9OnBlBS0V7';
AV.init({ appId, appKey });

export { 
  ComponentAvatar,
  ViewDiscovery,
  ViewCategory,
  ViewDrawer
};