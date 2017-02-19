import request from 'superagent';
import config from './config';

function meetup() {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.meetup.baseURL}/member/8468875?&sign=true&photo-host=public&page=20&key=${config.meetup.key}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('err', err);
          return reject(err);
        } else {
          console.log('res', res);
          return resolve(res);
        }
      });
  });
}

meetup();
