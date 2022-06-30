import {useState} from 'react';
import {Platform} from 'react-native';
// import {getVersion} from 'react-native-device-info';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  StatusUpdateEvent,
} from 'sp-react-native-in-app-updates';

const HIGH_PRIORITY_UPDATE = 5; // Arbitrary, depends on how you handle priority in the Play Console

interface IAppState {
  needsUpdate: boolean | null;
  otherData?: NeedsUpdateResponse | null;
  error: string | null;
  statusUpdate: StatusUpdateEvent | null;
}

interface IAppUpdateState {
  state: IAppState;
  checkForUpdates: () => void;
  startUpdating: () => void;
  doInstallUpdate: () => void;
}

export function useInAppUpdate(): IAppUpdateState {
  // const curVersion = getVersion();
  let inAppUpdates = new SpInAppUpdates(true);

  const [state, setState] = useState<IAppState>({
    needsUpdate: null,
    otherData: null,
    error: null,
    statusUpdate: null,
  });

  const checkForUpdates = (): void => {
    inAppUpdates
      .checkNeedsUpdate({
        curVersion: '0.0.8',
        // toSemverConverter: (ver: SemverVersion) => {
        //   // i.e if 400401 is the Android version, and we want to convert it to 4.4.1
        //   const androidVersionNo = parseInt(ver, 10);
        //   const majorVer = Math.trunc(androidVersionNo / 10000);
        //   const minorVerStarter = androidVersionNo - majorVer * 10000;
        //   const minorVer = Math.trunc(minorVerStarter / 100);
        //   const patchVersion = Math.trunc(minorVerStarter - minorVer * 100);
        //   return `${majorVer}.${minorVer}.${patchVersion}`;
        // },
      })
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
    // const {
    //   // status,
    //   bytesDownloaded,
    //   totalBytesToDownload,
    // } = status;
    // do something
    setState({
      ...state,
      statusUpdate: event,
    });
    console.log(`@@ ${JSON.stringify(event)}`);
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
      // @ts-ignore
      // eslint-disable-next-line no-alert
      alert('doesnt look like we need an update');
    }
  };

  const doInstallUpdate = (): void => {
    inAppUpdates.installUpdate();
  };

  return {
    state,
    checkForUpdates,
    startUpdating,
    doInstallUpdate,
  };
}
