import credentials from './credentials';

export default {
  meetup: {
    baseURL: 'https://api.meetup.com/',
    key: credentials.meetup.key
  },
  google: {
    scope: 'https://www.googleapis.com/auth/calendar',
    calendarId: 'primary',
    clientId: credentials.google.clientId,
    clientSecret: credentials.google.clientSecret,
    refreshToken: credentials.google.refreshToken
  }
};
