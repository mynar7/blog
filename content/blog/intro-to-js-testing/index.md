---
title: What's the point of tests?
date: 2021-01-28T23:00:00-0400
---

Testing is one of those essential subjects that nearly every tutorial and course tends to gracefully skip over. In a way, it makes sense: when you're just starting to learn a new language or framework, you don't need to know testing. However, as soon as you enter the workforce as a developer, you're going to be expected to write tests. You may even find yourself writing more tests than code.

```js js-live autorun no-code scripts=mocha!https://cdnjs.cloudflare.com/ajax/libs/mocha/8.0.1/mocha.min.js,chai!https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js,sinon!https://cdnjs.cloudflare.com/ajax/libs/sinon.js/9.0.2/sinon.min.js
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

mocha.setup({
  ui: "bdd",
  reporter: function(runner) {
		let currentSuite
		let currentParent
		let indent = 0
		runner.once(EVENT_RUN_BEGIN, () => {
		})
		runner.on(EVENT_SUITE_BEGIN, (suite) => {
		})
		runner.on(EVENT_SUITE_END, (suite) => {
		  if (suite.root) return
		 	indent = indent - 2 < 0 ? 0 : indent - 2
		})
		runner.on(EVENT_TEST_PASS, (test) => {
			if (currentParent !== test.parent.parent.title) {
				currentParent = test.parent.parent.title
				console.log(`${" ".repeat(indent)}${currentParent}`)
				indent += 2
			}
			if (currentSuite !== test.parent.title) {
				currentSuite = test.parent.title
				console.log(`${" ".repeat(indent)}${currentSuite}`)
				indent += 2
			}

			console.log(`${" ".repeat(indent)}🟢 ${test.title}`)
		});
		runner.on(EVENT_TEST_FAIL, (test) => {
			if (currentParent !== test.parent.parent.title) {
				currentParent = test.parent.parent.title
				console.log(`${" ".repeat(indent)}${currentParent}`)
				indent += 2
			}
			if (currentSuite !== test.parent.title) {
				currentSuite = test.parent.title
				console.log(`${" ".repeat(indent)}${currentSuite}`)
				indent += 2
			}

			console.log(`${" ".repeat(indent)}❌ ${test.title}`)
		});
		runner.once(EVENT_RUN_END, () => {
			indent = 0
			console.log(`${runner.stats.passes}/${runner.stats.passes + runner.stats.failures} tests passing`);
		});
  },
  cleanReferencesAfterRun: true
})
window.assert = chai.assert;
window.expect = chai.expect;
window.mochaRun = mocha.run
mocha.run = function() {
  mocha.unloadFiles()
  window.mochaRun()
}
```
## The purpose of tests

> Why bother writing tests? Isn't that QA's job?

I once heard a frustrated colleague ask a potential QA developer in an interview, "if I have to write my own tests, what the heck do _you_ do?" If you've ever struggled with tests, you might even feel the same way. The value of tests aren't immediately obvious because test code is non-production code--it doesn't contribute to the actual application. It's code for your other code ... _meta_ code.

If you are trying to build something quickly, you may look at tests as an impediment to progress. After all, if you're writing tests you could be spending that time building a new feature. In my previous job the front-end team had 0 tests written for their code. The thought was that front-end tests are brittle, we've made it this far, so why bother? When there was a new release, the team jumped on the freshly deployed production site and poked around looking for bugs. Seems reasonable, except that the application deployed into multiple websites with multiple pages and a team of five was expected to double check every nook and cranny.

More than once, we would get a call from the sales department reporting that the site had issues. What this really meant was that the end users were finding they couldn't complete a transaction or find the item they were looking for, then calling our sales department for assistance. At the end of the day this equated to lost sales and frustrated customers and support staff.

Before I left, I started work on a set of end-to-end tests that could run against the production site. This would 

## Why don't we teach testing?

To the novice, testing might feel optional or even unnecessary. When you're new to coding--especially JavaScript--there's a lot of technology to learn to build compelling software. Testing doesn't directly contribute to the final application. Tests are meta-code: code for your code. It's not surprising that there's a tendency to skip it and just keep building.

The reason introductory tutorials and courses skip or gloss over testing is that at that point in your journey to programming proficiency, your goal is to write as much software as possible. When you're writing one-off apps that you're unlikely to maintain or refactor, tests aren't very useful. The focus is getting your app to work at that point and making plenty of mistakes along the way.

If you're not a novice and you're maybe looking at something like React components and wondering why you weren't taught how to test your front-end code, you've stumbled upon the other unfortunate truth to testing: it's hard.

Testing not only doesn't get any credit for helping the final creation, it also happens to be an incredibly abstract and sometimes difficult thing to wrap your head around. Aside from the technical challenge of testing something like an HTML button's functionality or an API call pulling the correct information out of a database, there's also the question of _what_ to test.

Should you render the whole site to test that button or just render the button and test that? Do you run that test on a fake DOM for speed or slowly on a real automated browser for accuracy? Do you mock your database call or do you spin up a dummy database for your API to reach out to in your tests?

There's a whole _philosophy_ to testing. There's unit tests, integration tests, end-to-end tests, regression tests, smoke tests, and probably more that I don't even know about. Testing is an entire can of worms looming above you on a shelf, casting a shadow over your computer and waiting for the day when you finally have to crack it open and unleash its chaos on your productivity. No wonder we don't teach it in the middle of a tutorial on making buttons in React.

## Why you should learn testing

Don't let the previous section scare you, let this: when you're writing production code at work, you're going to be expected to write tests whether you know how or not. 

```js js-live scripts=mocha,chai
function add(a, b) {
  return a + b
}
describe('outer wrapper', function() {
	describe('add function', function() {
		it('should add two numbers', function() {
			const result = add(3, 4)
			assert(result === 7)
		})
		it('should add two numbers and not fail', function() {
			const result = add(3, 4)
			assert(result === 8)
		})
	})
})

mocha.run()
```
