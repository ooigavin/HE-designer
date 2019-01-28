import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import GuidelinesScreen from './src/Screens/Guidelines/Guidelines';
import RatingScreen from './src/Screens/Rating/Rating';
import SizingScreen from './src/Screens/Sizing/Sizing';
import SideDrawerScreen from './src/Screens/SideDrawer/SideDrawer';

// import configureStore from './src/store/configureStore';

// const store = configureStore();

// Register screens before you can load them
// registerComponent takes 2 arguements the name of the component and the function that returns the jsx
// Navigation.registerComponentWithRedux('awesome-places.FindPlaceScreen', () => FindPlaceScreen, Provider, store);
Navigation.registerComponent('he-designer.SideDrawerScreen', () => SideDrawerScreen);
Navigation.registerComponent('he-designer.SizingScreen', () => SizingScreen);
Navigation.registerComponent('he-designer.RatingScreen', () => RatingScreen);
Navigation.registerComponent('he-designer.GuidelinesScreen', () => GuidelinesScreen);

// Start a App (screen)
Navigation.events().registerAppLaunchedListener(() => {
  Promise.all([
    Icon.getImageSource('ios-menu', 30),
    Icon.getImageSource('ios-information', 30),
    Icon.getImageSource('ios-help-buoy', 30),
    Icon.getImageSource('md-checkbox-outline', 30),
    Icon.getImageSource('ios-move', 30)
  ]).then(sources => {

    const guideTab = {
      children: [{
        component: {
          name: 'he-designer.GuidelinesScreen'
        }
      }],
      options: {
        bottomTab: {
          text: 'Guidelines',
          icon: sources[2],
          testID: 'SECOND_TAB_BAR_BUTTON'
        },
        topBar: {
          title: { text: 'HE Design Guidelines' },
          leftButtons: [
            {
              icon: sources[0],
              id: 'sideDrawerToggle'
            }
          ],
          rightButtons: [
            {
              id: 'infoButton',
              icon: sources[1]
            }
          ]
        }
      }
    }

    const ratingTab = {
      children: [{
        component: {
          name: 'he-designer.RatingScreen'
        }
      }],
      options: {
        bottomTab: {
          text: 'Rating',
          icon: sources[3],
          testID: 'SECOND_TAB_BAR_BUTTON'
        },
        topBar: {
          title: { text: 'Rating Process' },
          leftButtons: [
            {
              icon: sources[0],
              id: 'sideDrawerToggle'
            }
          ],
          rightButtons: [
            {
              id: 'infoButton',
              icon: sources[1]
            }
          ]
        }
      }
    }

    const sizingTab = {
      children: [{
        component: {
          name: 'he-designer.SizingScreen'
        }
      }],
      options: {
        bottomTab: {
          text: 'Sizing',
          icon: sources[4],
          testID: 'SECOND_TAB_BAR_BUTTON'
        },
        topBar: {
          title: { text: 'Sizing Process' },
          leftButtons: [
            {
              icon: sources[0],
              id: 'sideDrawerToggle'
            }
          ],
          rightButtons: [
            {
              id: 'infoButton',
              icon: sources[1]
            }
          ]
        }
      }
    }

    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: 'he-designer.SideDrawerScreen',
              passProps: {
                text: 'This is a left side menu screen'
              },
              id: 'leftSideDrawer'
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: guideTab
                },
                {
                  stack: sizingTab
                },
                {
                  stack: ratingTab
                }
              ]
            }
          } //end of center
        }
      }
    });
  });
});