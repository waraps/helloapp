// this hook uses to different libs to test the in-app reviews
// just pass a boolean value to test the lib you prefer

import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

import Rate, {AndroidMarket, IConfig} from 'react-native-rate';
import InAppReview from 'react-native-in-app-review';

import differenceInDays from 'date-fns/differenceInDays';

interface IAppReviews {
  rated?: boolean;
  doReview: () => void | Promise<void>;
}

const DUE_DAY: number = 15;
const CURRENT_DATE: Date = new Date();

export function useInAppReview(useOnRate = true): IAppReviews {
  const [rated, setRate] = useState<boolean>(false);
  const [lastReview, setLastReview] = useState<Date>(new Date('2022-09-01')); // this date should be extracted from storage

  const onRate = (): void => {
    console.warn('-- react-native-rate running --');

    try {
      const options: IConfig = {
        GooglePackageName: 'com.waraps.hellowarapsapp',
        OtherAndroidURL:
          'https://play.google.com/store/apps/details?id=com.waraps.hellowarapsapp',
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: true,
        openAppStoreIfInAppFails: true,
        fallbackPlatformURL:
          'https://play.google.com/store/apps/details?id=com.waraps.hellowarapsapp',
      };

      if (lastReview !== null) {
        const leftDays: number = differenceInDays(CURRENT_DATE, lastReview);

        if (leftDays > DUE_DAY) {
          Rate.rate(options, (success, error) => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page.
              // Whether they actually did anything, we do not know.
              setRate(true);
              setLastReview(CURRENT_DATE);
            }
            if (error) {
              // error comes from the native code.
              // Useful for debugging, but probably not for users to view
              console.error(`Example page Rate.rate() error: ${error}`);
            }
          });
        }
      } else {
        Rate.rate(options, (success, error) => {
          if (success) {
            // this technically only tells us if the user successfully went to the Review Page.
            // Whether they actually did anything, we do not know.
            setRate(true);
            setLastReview(CURRENT_DATE);
          }
          if (error) {
            // error comes from the native code.
            // Useful for debugging, but probably not for users to view
            console.error(`Example page Rate.rate() error: ${error}`);
          }
        });
      }
    } catch (error) {
      console.error(`Catch page Rate.rate() error: ${error}`);
    }
  };

  const onReview = async () => {
    console.warn('-- react-native-in-app-review running --');

    try {
      if (lastReview !== null) {
        const leftDays: number = differenceInDays(CURRENT_DATE, lastReview);

        if (leftDays > DUE_DAY) {
          const hasFlowFinishedSuccessfully =
            await InAppReview.RequestInAppReview();

          if (Platform.OS === 'android') {
            // when return true in android it means user finished or close review flow
            console.log('InAppReview in android', hasFlowFinishedSuccessfully);
          }

          if (Platform.OS === 'ios') {
            // when return true in ios it means review flow lanuched to user.
            console.log(
              'InAppReview in ios has launched successfully',
              hasFlowFinishedSuccessfully,
            );
          }

          // 1- you have option to do something ex: (navigate Home page) (in android).
          // 2- you have option to do something ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).
          if (hasFlowFinishedSuccessfully) {
            setRate(true);
            setLastReview(CURRENT_DATE);
          }

          // for android:
          // The flow has finished. The API does not indicate whether the user
          // reviewed or not, or even whether the review dialog was shown. Thus, no
          // matter the result, we continue our app flow.

          // for ios
          // the flow lanuched successfully, The API does not indicate whether the user
          // reviewed or not, or he/she closed flow yet as android, Thus, no
          // matter the result, we continue our app flow.
        }
      } else {
        const hasFlowFinishedSuccessfully =
          await InAppReview.RequestInAppReview();

        if (Platform.OS === 'android') {
          // when return true in android it means user finished or close review flow
          console.log('InAppReview in android', hasFlowFinishedSuccessfully);
        }

        if (Platform.OS === 'ios') {
          // when return true in ios it means review flow lanuched to user.
          console.log(
            'InAppReview in ios has launched successfully',
            hasFlowFinishedSuccessfully,
          );
        }

        if (hasFlowFinishedSuccessfully) {
          setRate(true);
          setLastReview(CURRENT_DATE);
        }
      }
    } catch (error) {
      //we continue our app flow.
      // we have some error could happen while lanuching InAppReview,
      // Check table for errors and code number that can return in catch.
      console.log(error);
    }
  };

  useEffect(() => {
    if (useOnRate) {
      onRate(); // react-native-rate
    } else {
      onReview(); // react-native-in-app-review
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    doReview: useOnRate ? onRate : onReview,
    rated,
  };
}
