import {useState} from 'react';

import Rate, {AndroidMarket} from 'react-native-rate';
import InAppReview from 'react-native-in-app-review';

interface IAppReviews {
  // react-native-rate
  onRate?: () => void;
  rated?: boolean;

  // react-native-in-app-review
  onReview?: () => Promise<void>;
}

export function useInAppReview(useOnRate = true): IAppReviews {
  const [rated, setRate] = useState<boolean>(false);

  const onRate = (): void => {
    console.log('-- onRate running --');

    const options = {
      GooglePackageName: 'com.waraps.hellowarapsapp',
      OtherAndroidURL:
        'https://play.google.com/store/apps/details?id=com.waraps.hellowarapsapp',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL:
        'https://play.google.com/store/apps/details?id=com.waraps.hellowarapsapp',
    };

    try {
      Rate.rate(options, (success, errorMessage) => {
        console.log('first', success, errorMessage);
        if (success) {
          // this technically only tells us if the user successfully went to the Review Page.
          // Whether they actually did anything, we do not know.
          setRate(true);
        }
        if (errorMessage) {
          // errorMessage comes from the native code.
          // Useful for debugging, but probably not for users to view
          console.error(`Example page Rate.rate() error: ${errorMessage}`);
        }
      });
    } catch (error) {
      console.error(`Catch page Rate.rate() error: ${error}`);
    }
  };

  const onReview = async () => {
    console.log('-- onReview running --');

    const lastDateAppReviewed: Date = new Date('2011/02/01'); // date in async storage

    if (lastDateAppReviewed !== null) {
      const Today: Date = new Date();

      // convert dates to numeric values
      const leftTime: number = Math.abs(+Today - +lastDateAppReviewed);
      let leftDays = Math.ceil(leftTime / (1000 * 60 * 60 * 24));

      if (leftDays > 15) {
        InAppReview.RequestInAppReview()
          .then(hasFlowFinishedSuccessfully => {
            // when return true in android it means user finished or close review flow
            console.log('InAppReview in android', hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            console.log(
              'InAppReview in ios has launched successfully',
              hasFlowFinishedSuccessfully,
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
              setRate(true);
              // do something for ios
              // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
          })
          .catch(error => {
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            console.log(error);
          });
      }
    } else {
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          if (hasFlowFinishedSuccessfully) {
            setRate(true);
            console.log('InAppReview: ', hasFlowFinishedSuccessfully);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return useOnRate
    ? {
        // react-native-rate
        onRate,
        rated,
      }
    : {
        // react-native-in-app-review
        onReview,
      };
}
