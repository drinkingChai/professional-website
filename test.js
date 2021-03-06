var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var testClient = redis.createClient();

testClient.select('profWebsiteTest'.length);
testClient.flushall();

describe('Request to root path', function() {
  it('Returns HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-type', /html/, done);
  });
});

describe('Request all projects', function() {
  it('Returns a 200 status code', function(done) {
      request(app)
        .get('/projects')
        .expect(200, done);
  });
});

describe('Create new projects', function() {
  after(function() {
    testClient.flushall();
  });

  it('Returns a status code of 201', function(done) {
      request(app)
        .post('/projects')
        .type('JSON')
        .send('{"title": "Vagabond Knight", "description": "A Dragon Slaying Riches Taking Knight"}')
        .expect(201, done);
  });
});

describe('Show project info', function() {
  before(function() {
    request(app)
      .post('/projects')
      .type('JSON')
      .send('{"title": "Vagabond Knight", "description": "A Dragon Slaying Riches Taking Knight"}');
  });

  after(function() {
    testClient.flushall();
  });

  it('Returns a status code of 200', function(done) {
    request(app)
      .get('/projects/1')
      .expect(200, done);
  });
});

describe('Deleting projects', function() {
  after(function() {
    testClient.flushall();
  });

  it('Returns a 204 status code', function(done) {
    request(app)
      .post('/projects')
      .type('JSON')
      .send('{"title": "Vagabond Knight", "description": "A Dragon Slaying Riches Taking Knight"}')
      .end(function(error, response) {
        request(app)
          .delete('/projects/1')
          .expect(204, done);
      });
    });
});

describe('Updating projects', function() {
  after(function() {
    testClient.flushall();
  });

  it('Returns a 200 satus code', function(done) {
    request(app)
      .post('/projects')
      .type('JSON')
      .send('{"title": "Vagabond Knight", "description": "A Dragon Slaying Riches Taking Knight"}')
      .end(function(error, response) {
        request(app)
          .put('/projects/2')
          .type('JSON')
          .send('{"title": "Vagabond Knights", "description": "Now a band of knights >:D"}')
          .expect(200, done);
    });
  });
});

//
// End project testing
//
// *****************************************************************************
//
// Start tag testing
//
describe('Request all tags', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/tags')
      .expect(200, done);
  });
});

describe('Create new tags', function() {
  it('Returns a 201 status code', function(done) {
    request(app)
      .post('/tags')
      .type('JSON')
      .send('{"name": "test1"}')
      .expect(201, done);
  });
  it('Returns a 201 status code', function(done) {
    request(app)
      .post('/tags')
      .type('JSON')
      .send('{"name": "test2"}')
      .expect(201, done);
  });
})

describe('Delete a tag', function() {
  it('Returns a 204 status code', function(done) {
    request(app)
      .delete('/tags/test1')
      .expect(204, done);
  })
});
