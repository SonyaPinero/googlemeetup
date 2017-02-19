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
          console.log('event err', err);
          return reject(err);
        } else {
          console.log('event err', res.body);
          return resolve(res.body);
        }
      });
  });
}

function getCalendar(accessToken) {
  return new Promise((resolve, reject)=>{
    request
      .get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res)=> {
        if (err) {
          //console.log('calendar err', err)
          return reject(err);
        } else {
          //console.log('calendar res', res)
          return resolve(res)
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

async function updateGoogleCalendar(){
  try {
    const token = await getAccessToken();
    const results = await getCalendar(token);
    console.log(results);
  } catch (e){
    console.log('catch err', e);
  }
}

updateGoogleCalendar();
