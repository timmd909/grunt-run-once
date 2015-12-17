/*
 * grunt-run-once
 * https://github.com/timmd909/grunt-run-once
 *
 * Copyright (c) 2015 Tim Doerzbacher
 * Licensed under the GPL license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.task.runOnce = function () {
		var things = grunt.task.parseArgs(arguments)
			.map(grunt.task._taskPlusArgs, grunt.task);

		// remove duplicates in `things`
		var uniqueThings = [], thing;
		while (things.length) {
			thing = things.shift();

			var dupes = _.filter(uniqueThings, {
				'nameArgs': thing.nameArgs
			});

			if (dupes.length === 0) {
				uniqueThings.push(thing);
			}
		}

		// append the things if they haven't been added yet to the queue
		uniqueThings = _.filter(uniqueThings, function (thing) {
			var existing = _.filter(grunt.task._queue, {
				'nameArgs': thing.nameArgs
			});
			console.log('Thing: ' + thing.nameArgs, existing);
			return (existing.length === 0);
		});

		// Add in the unique things
		grunt.task.run(_.map(uniqueThings, function (thing) {
			return thing.nameArgs;
		}));

		// keep the gravy chain rolling
		return this;
	};

};
