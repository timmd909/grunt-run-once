/*
 * grunt-run-once
 * https://github.com/timmd909/grunt-run-once
 *
 * Copyright (c) 2015 Tim Doerzbacher All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in
 * the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

module.exports = function(grunt) {

	var _ = require('lodash');

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
