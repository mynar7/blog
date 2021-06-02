---
title: What's the point of tests?
date: 2021-01-28T23:00:00-0400
---

Testing is one of those essential subjects that nearly every tutorial and course tends to gracefully skip over. This is tragic because as soon as you enter the workforce as a developer, you're going to be expected to write tests. You may even find yourself writing more tests than code. Too many new developers (myself included), walk into their first job blind to testing principles and practices. More than a few develop negative opinions of testing, even learning to resent tests. 

That's not to say tests are a necessary evil. In fact, I've learned to find a lot of comfort in well-written automated tests. Let's discuss some benefits of tests.

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
				if (currentParent) {
					console.log(`${" ".repeat(indent)}${currentParent}`)
					indent += 2
				}
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
				if (currentParent) {
					console.log(`${" ".repeat(indent)}${currentParent}`)
					indent += 2
				}
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

## Tests make maintaining and refactoring code much easier

Let's say for example that you had a function that checks to see if a word is a palindrome (it's the same backwards and forwards):

```js 
function isPalindrome(str) {
	str = str.toLowerCase()
	let strNoPunc = ""
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")
	for(var i = 0; i < str.length; i++) {
		if(letters.indexOf(str[i]) > -1) strNoPunc += str[i]
	}
	let reversed = ""
	for (var i = strNoPunc.length - 1; i >= 0; i--) {
		reversed += strNoPunc[i]
	}
	return reversed === strNoPunc
}
```
You're a hip JavaScript developer and you haven't written a for loop since your code bootcamp, so it takes you some mental overhead to understand what's happening in that function. You know it's working because it has been humming along in your codebase for quite some time before you came across it. Still, you've got some fancy array methods and ES6 you'd like to use to spruce up that function. But how do you do it?

One way is to experiment with `console.log`:

```js js-live autorun
function isPalindrome(str) {
	str = str.toLowerCase()
	let strNoPunc = ""
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")
	for(var i = 0; i < str.length; i++) {
		if(letters.indexOf(str[i]) > -1) strNoPunc += str[i]
	}
	let reversed = ""
	for (var i = strNoPunc.length - 1; i >= 0; i--) {
		reversed += strNoPunc[i]
	}
	return reversed === strNoPunc
}
console.log(isPalindrome('radar'))
console.log(isPalindrome('pasta'))
console.log(isPalindrome('radar!'))
```
Apparently `isPalindrome` returns a boolean and is able to handle special characters. But what about spaces? What about uppercase letters? Does it handle numbers? More importantly, _which one of those cases are important in your codebase?_

That's the rub when it comes to refactoring this function. You know more or less what the function does, but what about all the special edge cases? What if it's fed a non-string? Does it return a boolean or throw an error? Does that matter for your existing code that's using `isPalindrome`?

In an ideal world, you'd have some well-written tests that outline the edge cases of your function:

```js js-live scripts=mocha,chai
function isPalindrome(str) {
	str = str.toLowerCase()
	let strNoPunc = ""
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")
	for(var i = 0; i < str.length; i++) {
		if(letters.indexOf(str[i]) > -1) strNoPunc += str[i]
	}
	let reversed = ""
	for (var i = strNoPunc.length - 1; i >= 0; i--) {
		reversed += strNoPunc[i]
	}
	return reversed === strNoPunc
}

describe('isPalindrome', function() {
	it('should return a boolean', function() {
		expect(typeof isPalindrome('banana')).to.eq('boolean')
	})
	it('should return true for a palindrome', function() {
		expect(isPalindrome('radar')).to.be.true
	})
	it('should return false for non-palindromes', function() {
		expect(isPalindrome('banana')).to.be.false
	})
	it('should ignore special characters', function() {
		expect(isPalindrome('radar!')).to.be.true
	})
	it('should ignore spaces', function() {
		expect(isPalindrome('my gym')).to.be.true
	})
	it('should ignore letter casing', function() {
		expect(isPalindrome('Eva, can I see bees in a cave?')).to.be.true
	})
})

mocha.run()
```

## Tests can be great documentation

Documentation is a perennial pain for most developers. It's so difficult to keep improving software as well as keeping its documentation up to date because essentially the two are related but disconnected. What if you had documentation that read itself and told you when your code and docs were out of sync?

Good news! That's basically what well-written tests do. Let's look at the case titles from the previous section:

```
should return a boolean
should return true for a palindrome
should return false for non-palindromes
should ignore special characters
should ignore spaces
should ignore letter casing
```

Not only do these tests tell the developer _exactly_ how the function is supposed to behave, when you run the tests they **enforce** those rules as well. Including automation that runs these tests before code merges provides a pretty power system to prevent breaking the code.


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
