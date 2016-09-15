'use strict';

var grunt = require('grunt'),
		exec = require('child_process').exec;

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports['run-once'] = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	no_options: function (test) {
		test.expect(1);

		exec('grunt run-once', {}, function(error, stdout) {
			var found = stdout.indexOf('`run-once` called without options') > -1;
			test.equal(found, true, 'No options throws error.');
			test.done();
		});
	},
	single_task: function (test) {
		test.expect(1);
		var execString = [
			'grunt',
			'run-once:testmock'
		].join(' ');

		exec(execString, {}, function(error, stdout) {
			var count = stdout.match(/##test##/).length;
			test.equal(count === 1, true, 'Task is only run once');
			test.done();
		});
	},
	multi_task: function (test) {
		test.expect(1);
		var execString = [
			'grunt',
			'run-once:testmock',
			'run-once:testmock',
			'run-once:testmock',
			'run-once:testmock',
			'run-once:testmock'
		].join(' ');

		exec(execString, {}, function(error, stdout) {
			var count = stdout.match(/##test##/).length;
			test.equal(count === 1, true, 'Task is only run once');
			test.done();
		});
	}
};
