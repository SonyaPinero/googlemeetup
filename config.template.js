import credentials from './credentials';

export default {
  meetup: {
    baseURL: 'https://api.meetup.com/2',
    key: credentials.meetup.key
  },
  google: {
    baseURL: 'https://www.googleapis.com/calendar/v3',
    key: credentials.google.key
  }
};
