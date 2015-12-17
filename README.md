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

This plugin will add a `grunt.task.runOnce()` command that operates the
same as `grunt.task.run()` with the eponymous function: it will only
add tasks if they've not be called in the past.

Let's say you have the following tasks/aliases defined:

| Task          | Description                                            |
|---------------|--------------------------------------------------------|
| `test:qunit`  | Alias: `build:js`, `build:css`, `qunit`                |
| `test:visual` | Alias: `build:js`, `build:css`, `casperjs`             |
| `test`        | Alias: `test:qunit`, `test:visual`                     |

As you can see, if you run `test`, you're effectively building the
JavaScript and CSS twice.

To avoid this problem, with this plugin you can declare the tasks like so:

```js
// ...
grunt.registerTask('test:qunit', function () {
	grunt.task.runOnce(['build:js', 'build:css', 'qunit']);
});
grunt.registerTask('test:visual', function () {
	grunt.task.runOnce(['build:js', 'build:css', 'casperjs']);
});
grunt.registerTask('test', ['test:qunit', 'test:visual']);
// ...
```

So that now when you call the `test` task, it will run the following
(in order):

* `build:js`
* `build:css`
* `qunit`
* `casperjs`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
