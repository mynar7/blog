---
title: An Introduction to Testing JavaScript 
date: 2020-07-28T23:00:00-0400
---

Testing is one of those essential subjects that nearly every intro course and bootcamp tends to gracefully skip over. In a way, it makes sense: when you're just starting to learn a new language or framework, you likely don't need to know testing, and it will very likely confuse you. As content-creators, we unfortunately tend to kick the can down the road and let junior developers be confused on the job instead of in our tutorials. 

At my first job, I was placed on a project written in Angular, and along with Angular came TypeScript, Mocha, Protractor, and NGRX. I knew precisely nothing out of that list, and I was incredibly frustrated to have gone from a productive React developer to an incompetent Angular developer. Moreover, I now had to write tests! In TypeScript! It was a frustrating experience that I eventually overcame (I got a few PRs in and then was placed on another project 😅), but I think it would have been a lot smoother if I had some stronger fundamentals or was familiar with at least a few of those technologies.

In the spirit of saving some junior JavaScript developers a little heartache and headache, I wanted to outline some of those fundamentals that I wish I had known prior to starting my first developer job.

```js js-live autorun no-code scripts=mocha!https://cdnjs.cloudflare.com/ajax/libs/mocha/8.0.1/mocha.min.js,chai!https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js,sinon!https://cdnjs.cloudflare.com/ajax/libs/sinon.js/9.0.2/sinon.min.js
mocha.setup({
  ui: "bdd",
  reporter: function (runner) {
    runner.on("pass", (test) => console.log(`✔ ${test.title}`));
    runner.on("fail", (test) => console.log(`❌ ${test.title}`));
  },
  cleanReferencesAfterRun: true
})
window.assert = chai.assert;
```
## What is testing?

Testing is a contract that you write with yourself.

```js js-live scripts=mocha,chai,sinon

const API_ENDPOINT = "https://www.omdbapi.com/?apikey=trilogy&t=";

async function getMovie(title) {
  const res = await fetch(`${API_ENDPOINT}${title}`);
  const data = await res.json();
  if (data.Response === "True") return data;
  else throw new Error(data.Error);
}

// getMovie("the matrix").then(console.log);

describe("getMovie", function() {
  let fetchStub;
  const NOT_FOUND_RESPONSE = {
    Error: "Movie not found!",
    Response: "False"
  };
  const FOUND_MOVIE_RESPONSE = {
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
    Director: "Lana Wachowski, Lilly Wachowski",
    Genre: "Action, Sci-Fi",
    Metascore: "73",
    Plot:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Rated: "R",
    Released: "31 Mar 1999",
    Title: "The Matrix",
    Year: "1999",
    Response: "True"
  };

  beforeEach(function() {
    fetchStub = sinon
      .stub(window, "fetch")
      .resolves({ json: sinon.stub().resolves(FOUND_MOVIE_RESPONSE) });
  });
  afterEach(function() {
    sinon.restore();
  });

  it("Should fetch a movie", async function() {
    const MOVIE_TITLE = "the matrix";
    const data = await getMovie(MOVIE_TITLE);
    assert(fetchStub.calledWith(API_ENDPOINT + MOVIE_TITLE));
    assert.deepEqual(data, FOUND_MOVIE_RESPONSE);
  });

  it("Should reject if movie not found", async function() {
    sinon.restore();
    const fetchStub = sinon
      .stub(window, "fetch")
      .resolves({ json: sinon.stub().resolves(NOT_FOUND_RESPONSE) });

    const MOVIE_TITLE = "the mortrix";

    try {
      const data = await getMovie(MOVIE_TITLE);
      assert(!data);
    } catch (err) {
      assert(fetchStub.calledWith(API_ENDPOINT + MOVIE_TITLE));
      assert(err instanceof Error);
      assert(err.message === NOT_FOUND_RESPONSE.Error);
    }
  });
});
mocha.unloadFiles()
mocha.run();
```

```js js-live scripts=mocha,chai
function add(a, b) {
  return a + b
}

describe('add function', function() {
  it('should add two numbers', function() {
    const result = add(3, 4)
    assert(result === 7)
  })
})

mocha.unloadFiles()
mocha.run()
```
