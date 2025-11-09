import {NavigationContainer} from '@react-navigation/native';
import RetryErrorBoundary from '../component/common/RetryErrorBoundary';
import useAuth from '../hooks/queries/useAuth';
import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';

const RootNavigation = () => {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      <NavigationContainer>
        {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </RetryErrorBoundary>
  );
};

export default RootNavigation;
