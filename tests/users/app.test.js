import build from '../../app.js';
import { test } from 'tap';

test('requests the "/" route', { timeout: 60000 }, async t => { // Adjusting timeout to 60 seconds
  const app = await build();

  const response = await app.inject({
      method: "GET",
      url: "/"
  })
  t.equal(response.statusCode, 200)
  t.same(JSON.parse(response.body), { message: "Hello World" })
  t.end();
});

test('requests the "/users" route', { timeout: 60000 }, async t => { // Adjusting timeout to 60 seconds
  const app = await build();

  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users'
  });
  console.log('this is the response', response.statusCode);
  t.equal(response.statusCode, 200, 'returns a status code of 200');
  t.end();
});

