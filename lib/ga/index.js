import ReactGA from 'react-ga4';

export const GA_TRACKING_ID = 'G-D7PN7DDTHG'; // Replace with your GA4 Measurement ID

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
