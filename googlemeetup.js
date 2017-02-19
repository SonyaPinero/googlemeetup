import request from 'superagent';
import config from './config';

function getGroupData() {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.meetup.baseURL}/self/groups?&sign=true&fields=tech&key=${config.meetup.key}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('group err', err);
          return reject(err);
        } else {
          console.log('res', res.body);
          return resolve(res);
        }
      });
  });
}

function getEventData(eventId) {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.meetup.baseURL}/2/events?&sign=true&limited_events=False&event_id=${eventId}&photo-host=public&page=20&fields=&order=time&desc=false&status=upcoming&key=${config.meetup.key}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('event err', err);
          return reject(err);
        } else {
          console.log('res', res.body.results);
          return resolve(res);
        }
      });
  });
}

async function updateGoogleCalendar(){
  //getGroupData()
  //getEventData(237784423)
}

updateGoogleCalendar();
