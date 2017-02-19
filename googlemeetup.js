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
          console.log('group err', err);
          return reject(err);
        } else {
          console.log('res', res.body);
          return resolve(res.body);
        }
      });
  });
}


async function updateGoogleCalendar(){
  getEventData()
}

updateGoogleCalendar();
