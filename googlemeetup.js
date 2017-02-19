import request from 'superagent';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import config from './config';

function getEventData() {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.meetup.baseURL}/self/calendar?&sign=true&fields=tech&key=${config.meetup.key}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('group err', err);
          return reject(err);
        } else {
          console.log('res', res.body);
          return resolve(res.body);
        }
      });
  });
}

function getCalendar() {
  return new Promise((resolve, reject)=>{
    request
      .get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${config.google.accessToken}`)
      .end((err, res)=> {
        if (err) {
          console.log('err', err)
          return reject(err);
        } else {
          console.log('res', res)
          return resolve(res)
        }
      })
  })
}

getCalendar()

// async function updateGoogleCalendar(){
//   //getEventData()
//   insertGoogleEvent();
// }

//updateGoogleCalendar();
