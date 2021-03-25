import domExists from './dom-exists';

const getMixpanel = () => {
  if (domExists() && window.mixpanel) {
    // The server is using MP CDN and is responsible for calling init itself
    return window.mixpanel;
  }
  if (domExists() && window.browserMixpanel) {
    // Mixpanel has been initialised by initMixpanel
    return window.browserMixpanel;
  }
  try {
    // if this works the consuming component has added mixpanel-browser
    // and is calling init above with its token
    return require('mixpanel-browser'); // eslint-disable-line global-require
  } catch (error) {
    return null;
  }
};

export default getMixpanel;
