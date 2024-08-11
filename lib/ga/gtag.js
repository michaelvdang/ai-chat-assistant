import ReactGA from 'react-ga4';

export const GA_TRACKING_ID = 'G-D7PN7DDTHG'; // Replace with your GA4 Measurement ID
// export const GA_TRACKING_ID = 'GTM-K8SFZNWK'; // Replace with your GA4 Measurement ID

export const initGA = () => {
  // console.log('ReactGA: ', ReactGA);
  // console.log('ReactGA.initialize: ', ReactGA.initialize)
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = (url) => {
  console.log('logPageView: ', url);
  // Send pageview with a custom path
  ReactGA.send({ hitType: 'pageview', page: url });
  // console.log('logPageView: ', window.location.pathname);
  // ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logOpeningChat = (label) => {
  // Send a custom event
  ReactGA.event({ hitType: 'event', category: 'Chatbot', action: 'openingChat', label: label });
}

export const logClosingChat = (label) => {
  // Send a custom event
  ReactGA.event({ hitType: 'event', category: 'Chatbot', action: 'closingChat', label: label });
}

export const logSendMessage = (label) => {
  ReactGA.event({ hitType: 'event', category: 'API access', action: 'sendMessageAction', label: label });
}