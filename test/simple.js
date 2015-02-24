
var assert = require('assert');
var resolveEnv = require('..');

var cases = [
  ['Simple test', 'Simple test', {}],
  ['Hello $NAME!', 'Hello world!', { NAME: 'world' }],
  ['[ $a1, $a2 ]', '[ 4, 8 ]', { a1: '4', a2: '8' }],
  ['http://$HOST:$PORT/', 'http://google.com:80/', { HOST: 'google.com', PORT: '80' }],
  ['${BIRD}s', 'Birds', { BIRD: 'Bird' }],
  ['${PART1}${PART2}', 'AB', { PART1: 'A', PART2: 'B' }],
  ['http://$HOST:$PORT$PATH?$QUERY', 'http://google.com:80/search?q=hello',
    { HOST: 'google.com', PORT: '80', PATH: '/search', QUERY: 'q=hello' }],
  ['mongodb://$DB_PORT_27017_TCP_ADDR:$DB_PORT_27017_TCP_PORT', 'mongodb://127.0.0.1:27017',
    { DB_PORT_27017_TCP_ADDR: '127.0.0.1', DB_PORT_27017_TCP_PORT: '27017' }]
];

describe('resolveEnv', function () {

  cases.forEach(function (info) {
    it('should resolve ' + info[0], function () {

      var origEnv = process.env;
      process.env = info[2];

      var actual = resolveEnv(info[0]);
      process.env = origEnv;

      assert.equal(actual, info[1]);

    });
  });

});
