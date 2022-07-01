/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';

import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  StatusUpdateEvent,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';

interface IAppState {
  needsUpdate: boolean | null;
  otherData?: NeedsUpdateResponse | null;
  error: string | null;
  statusUpdate: StatusUpdateEvent | null;
}

interface IAppUpdateState {
  state: IAppState;
  checkForUpdates?: () => void;
  startUpdating: () => void;
}

const HIGH_PRIORITY_UPDATE = 5; // Arbitrary, depends on how you handle priority in the Play Console

export function useInAppUpdate(): IAppUpdateState {
  const inAppUpdates = new SpInAppUpdates(true);

  const [state, setState] = useState<IAppState>({
    needsUpdate: null,
    otherData: null,
    error: null,
    statusUpdate: null,
  });

  const checkForUpdates = (): void => {
    inAppUpdates
      .checkNeedsUpdate()
      .then((result: NeedsUpdateResponse) => {
        console.log(result);
        setState({
          ...state,
          needsUpdate: result.shouldUpdate,
          otherData: result,
        });
      })
      .catch(error => {
        setState({
          ...state,
          error,
        });
      });
  };

  const onStatusUpdate = (event: StatusUpdateEvent) => {
    setState({...state, statusUpdate: event});
  };

  const startUpdating = (): void => {
    if (state.needsUpdate) {
      let updateOptions: StartUpdateOptions = {};
      if (Platform.OS === 'android' && state.otherData) {
        const {otherData} = state || {
          otherData: null,
        };
        // @ts-expect-error TODO: Check if updatePriority exists
        if (otherData?.updatePriority >= HIGH_PRIORITY_UPDATE) {
          updateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };
        } else {
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
      }
      inAppUpdates.addStatusUpdateListener(onStatusUpdate);
      inAppUpdates.startUpdate(updateOptions);
    } else {
      Alert.alert('Hey ', 'doesnt look like we need an update');
    }
  };

  const doInstallUpdate = (): void => {
    inAppUpdates.installUpdate();
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  useEffect(() => {
    if (state.statusUpdate?.status === IAUInstallStatus.DOWNLOADED) {
      doInstallUpdate();
    }
  }, [state.statusUpdate?.status]);

  useEffect(() => {
    if (state.statusUpdate?.status === IAUInstallStatus.FAILED) {
      Alert.alert(
        `[FAILED]code: ${IAUInstallStatus.FAILED}`,
        `Error: ${state.error}`,
      );
    }
  }, [state.error]);

  return {state, checkForUpdates, startUpdating};
}
