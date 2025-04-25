import * as React from 'react';
import {useNavigation} from '@react-navigation/native';

export interface IRoute {
  transition?: 'push' | 'navigate' | 'goBack';
  screenName: string;
  params?: any;
}

export default {
  preview(panicAttack: IPanicAttack): IRoute {
    return {
      screenName: 'Preview',
      params: {id: panicAttack.id},
    };
  },
  profile(): IRoute {
    return {
      screenName: 'Profile',
    };
  },
  insights(): IRoute {
    return {
      screenName: 'Insights',
    };
  },
  create(): IRoute {
    return {
      screenName: 'PanicAttack',
    };
  },
  manualCreate(): IRoute {
    return {
      screenName: 'ManualPanicAttack',
    };
  },
  copingTips(): IRoute {
    return {
      screenName: 'CopingTips',
    };
  },
  browser(url: string): IRoute {
    return {
      screenName: 'Browser',
      params: {url},
    };
  },
};

export interface INavigation {
  navigate: (screenName: string, params?: any) => void;
  push: (screenName: string, params?: any) => void;
  goBack: () => void;
  addListener: any;
  setOptions: any;
}

export function navigate(navigation: INavigation, to: IRoute) {
  if (to.transition === 'navigate') {
    navigation.navigate(to.screenName, to.params);
  } else if (to.transition === 'goBack') {
    navigation.goBack();
  } else {
    navigation.push(to.screenName, to.params);
  }
}

export function useNavigate() {
  const navigation = useNavigation() as any;

  const fn = React.useCallback(
    (to: IRoute) => {
      navigate(navigation, to);
    },
    [navigation],
  );

  return fn;
}
