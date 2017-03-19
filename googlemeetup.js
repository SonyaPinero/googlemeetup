import request from 'superagent';
import config from './config';

function getEventData() {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.meetup.baseURL}/self/calendar?&sign=true&fields=tech&key=${config.meetup.key}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          //console.log('event err', err);
          return reject(err);
        } else {
          //console.log('event err', res.body);
          return resolve(res.body);
        }
      });
  });
}

function getAccessToken(){
  return new Promise((resolve, reject)=>{
    request
      .post(`https://www.googleapis.com/oauth2/v4/token`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(`client_id=${config.google.clientId}`)
      .send(`client_secret=${config.google.clientSecret}`)
      .send(`refresh_token=${config.google.refreshToken}`)
      .send(`grant_type=refresh_token`)
      .end((err, res)=> {
        if (err) {
          //console.log('token err', err)
          return reject(err);
        } else {
          //console.log('token res', res.body.access_token)
          return resolve(res.body.access_token);
        }
      });
  });
}

function getCalendarData(accessToken) {
  return new Promise((resolve, reject)=>{
    request
      .get(`https://www.googleapis.com/calendar/v3/calendars/${config.google.calendarId}/events`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res)=> {
        if (err) {
          //console.log('calendar err', err)
          return reject(err);
        } else {
          //console.log('calendar res', res)
          return resolve(res.body)
        }
      });
  });
}

function insertCalendarEvent(accessToken, meetupEvent) {
  const formatEvent = {
    'summary': meetupEvent.name,
    'location': meetupEvent.venue ? meetupEvent.venue.address_1 : '',
    'description': meetupEvent.description,
    'start': {
      'dateTime': new Date(meetupEvent.time).toISOString()
    },
    'end': {
      'dateTime': new Date(meetupEvent.time).toISOString()
    }
  }
  return new Promise((resolve, reject)=>{
    request
      .post(`https://www.googleapis.com/calendar/v3/calendars/${config.google.calendarId}/events`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(formatEvent)
      .end((err, res)=> {
        if (err) {
          console.log('calendar err', err)
          return reject(err);
        } else {
          console.log('Event inserted!')
          return resolve(res)
        }
      });
  });
}

function timer(ms){
  return new Promise((resolve, reject)=>{
    setTimeout(resolve, ms);
  });
};

async function updateGoogleCalendar(){
  try {
    const meetupData = await getEventData();
    const token = await getAccessToken();
    const calendarData = await getCalendarData(token);

    const newEvents = meetupData.filter((event, idx) => {
      if (calendarData.items[idx] === undefined) return event;
      if (event.name !== calendarData.items[idx].summary &&
        event.venue.address_1 !== calendarData.items[idx].location &&
        new Date(event.time).toLocaleString() !== new Date(calendarData.items[idx].start.dateTime).toLocaleString()) {
          return event;
      }
    });

    (async function(){
      for(let i = 0; i < newEvents.length; i++){
        await insertCalendarEvent(token, newEvents[i]);
        await timer(10000)
      }
    }());

  } catch (e){
    console.log('catch err', e);
  }
}

updateGoogleCalendar();
