# grunt-run-once

> Run a particular task only once

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to
create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use
Grunt plugins. Once you're familiar with that process, you may install this plugin
with this command:

```shell
npm install grunt-run-once --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with
this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-run-once');
```

## What's it do?

Add `run-once:` to the beginning of your Grunt tasks to have it only
run once. Let's say you have something like:

	grunt.registerTask('default', [
		// compile different types of assets
		'compile:css',
		'compile:js',
		// ...

		// make sure everything is still good:
		'test',
	]);

	grunt.registerTask('test', [
		// if `grunt test` is called directly, we need to make sure
		// the sources are compiled before running the tests:
		'compile:css',
		'compile:js',

		// ok, now run the tests
		'test:run-tests',
	]);

	grunt.registerTask('release', [
		'default',
		'compile:release',
	]);

As you can see, running anything other than `grunt test` will recompile the
assets twice. This can be a lengthy step and will unnecessarily inflate your
build times. Wouldn't it be nice if you could do:

	grunt.registerTask('default', [
		// compile different types of assets
		'run-once:compile:css',
		'run-once:compile:js',
		// ...

		// make sure everything is still good:
		'test',
	]);

	grunt.registerTask('test', [
		// if `grunt test` is called directly, we need to make sure
		// the sources are compiled before running the tests:
		'run-once:compile:css',
		'run-once:compile:js',

		// ok, now run the tests
		'run-once:test:run-tests',
	]);

	grunt.registerTask('release', [
		'default',
		'run-once:compile:release',
	]);

Well, now you can. As `Gruntfile`s get more complicated and have more entry
points, at some point, you need to be able to think about pruning redundant
steps. This approach is more a hack than a comprehensive solution.

## Future Ideas

* `grunt.task.*` helper functions analogous to PHP's `require()`
	and `require_once()`.
* JSON based task list with some way to explicitly list prerequisite tasks.
* Add actual tests.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).

## Release History

* `0.2.1` - Update and [redd up](http://www.thefreedictionary.com/redd+up) documentation
* `0.2.0` - First version that was used in a production environment.
