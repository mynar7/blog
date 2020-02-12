---
title: How far can a JavaScript developer get with Machine Learning in 3 months?
date: 2020-02-09T12:00:00-0400
---

![Robot Playing Piano by Franck V on Unsplash: https://unsplash.com/photos/U3sOwViXhkY](./pianobot.jpg)

Machine Learning and Artificial Intelligence have been huge buzzwords in the Tech industry for [quite some time](https://towardsdatascience.com/google-trends-on-data-science-160146fea72a). Hearing them might make you picture self-driving cars or chat bots in your head and leave you wondering what kind of programming goes into those projects. AI in particular has been the stuff of science fiction for so long that it's hard not to be curious about it now that we're seeing real life projects surface in the news.

But what do those terms really mean? A cursory search of any of them will undoubtedly leave you separating science from marketing before you get to any valuable information. I've spent the past few months learning and researching Machine Learning and the Data Science field, so I know how difficult it can be to drill through the buzz and hype. This article is about that experience and how far I was able to get as a humble JavaScript developer.

Before we get started though, I want to kick things off with my favorite quote about Machine Learning and AI:

> Difference between machine learning and AI:
>
> If it is written in Python, it's probably machine learning
>
> If it is written in PowerPoint, it's probably AI

--[Matt Velloso on Twitter](https://twitter.com/matvelloso/status/1065778379612282885)

## I thought Machine Learning was only for geniuses (and I'm no genius)

I first started working with Machine Learning (ML) early on in my developer career when working with a team that was doing text-recognition work. My job was to create a front-end application that let users send documents to the backend for parsing.

Python is the main squeeze when it comes to ML/AI work for a lot of reasons, so I thought I wouldn't get much exposure to any ML work as a front-end JavaScript developer. However, I ended up tangling with ML quite a bit. Text Recognition models are pretty picky about input, so I ended up using JavaScript implementations of Python libraries to pre-process documents in the browser to match backend processes. I found out that ML libraries also had JS implementations. Not only could you use trained models to predict data in the browser, but you could create and train models there as well.

While it was awesome to see that JavaScript can really do all the things, Machine Learning is a specialized field that has massive foundations in calculus and statistics. So while I felt competent in my JavaScript abilities, I am definitely incompetent when it comes to higher level math I haven't touched since college. Because of the heavy maths involved in ML, I figured the whole field was beyond me as a humble front-end developer. When I moved off of that project at work, I deemed ML beyond me and forgot about it for a while.

## You don't need to be a Mathematician to try your hand at Machine Learning

![Pic of someone doing some math. May or may not be ML-related. Looks hard. Photo by Science in HD on https://unsplash.com/photos/aYxQrt5J6jM](./mathguy.jpg)

_(Pictured: What I thought all Data Scientists looked like before this journey.)_

While I wrote off ML, I still wanted to learn Python. I also run a [meetup](https://www.meetup.com/orlando-juniors/), so I decided to get some workshops together to teach the community (and myself) Python. I reached out to the [local Python User Group](https://www.meetup.com/OrlandoPython), and the organizer Michael DuPont and I got together and planned out a series of talks and workshops. Michael would teach, and I would book the venues.

The workshops were awesome, and we were also able to [record them for YouTube](https://www.youtube.com/playlist?list=PL5XS6NAljuIyolJIaZjwoMHmBW2oHsr-G). That experience taught me a lot about Python and its ecosystem, but also some interesting lessons about Machine Learning.

At the [end of the intro talk](https://youtu.be/pTtT8qHj_nc?t=3832), Michael introduced [TPOT](https://epistasislab.github.io/tpot/), an automated ML tool, and used it to train a model to predict housing prices in Boston. This was fascinating to me because what TPOT does is take data and figure out how to make a model and train it on its own. It essentially cut out all the math and statistics for you. This planted the seed in my head that maybe, just maybe, being a developer is enough to get your feet wet with ML.

## Using JavaScript for Machine Learning

I also run a [podcast](https://techjr.dev), and through that I ended up meeting [Gant Laborde](https://twitter.com/GantLaborde), a JavaScript developer with a passion for data science. We interviewed Gant about [Machine Learning in JavaScript](https://techjr.dev/episodes/2019/machine-learning-with-java-script-gant-laborde-teaches-us-tensorflow-js), and really dug into how to get started with ML.

Gant also revealed that he was working on a [JavaScript Machine Learning course](https://academy.infinite.red/p/beginning-machine-learning-with-tensorflow-js). This piqued my interest because almost all ML tutorials focus exclusively on Python. After we were finished recording, I offered myself up as a guinea pig for Gant's course, and he graciously sent my co-host and I copies of the course to try out ourselves.

Shortly after, Gant released a [free intro to Machine Learning course](https://academy.infinite.red/p/ai-demystified-free-5-day-mini-course). Naturally I signed up for that too.

The main course is meant to take 3 weeks, and the intro course is meant to be a 5-day course. It took me about 3 months to work through both courses. My completion time ballooned past the projected 4 weeks for both courses because of my busy schedule, but also because I truly wanted to grasp the material and give myself every chance to learn everything that Gant had poured into the course.

So I took my time ⏳, drank many cups of coffee ☕, and wrote a **lot** of code 👨‍💻.

Let's talk about what I've learned 🧙‍♂️.

## Machine Learning is really about prediction 🔮

The general intro course was a fantastic intro to Machine learning. It taught me that ML is really about boiling a data set down to numbers, analyzing a huge group of those numbers, and then being able to predict outcomes when given data it hasn't seen before. It also taught me about the types of Machine Learning and their applications in real life.

The Machine Learning and Data Science that we deal with are more about **Artificial Narrow Intelligence (ANI)** than **Artificial General Intelligence (AGN)**. AGN is the stuff of science fiction: robots that can function like humans and make decisions for themselves, SkyNet, etc. ANI is about focusing on a specific problem or question. Some examples of ANI include figuring out if a picture is of a cat or a dog, predicting sales numbers based on historical data, or detecting when a person's eyes are open from a video feed.

But how does an algorithm learn to answer those questions?

In the example of the Boston Housing data, the data set has a bunch of features like location, crime rate, proximity to schools, etc. that the computer analyzes alongside the price of the home. An ML algorithm will read thousands of those data points to be able to approximate a home price based on those features.

Think about a line from your middle school math classes. There's a formula that will tell you what x and y coordinates will fall on that line with 100% accuracy. Let's say our line has a formula of `y = x`. Using that formula, we could very easily figure out if a set of coordinates are on that line, right? If you have points `(0, 0)`, `(1, 1)` and `(2, 2)`, you know that as long as they're equal, they live on the line.

But how would Machine Learning approach this problem? Imagine you didn't have a formula that could tell you with 100% accuracy whether a point was on the line or not. How could ML help?

To solve this with ML, you would feed your model thousands of coordinates that are labeled as on or off the specified line. After doing a lot of math and burning a lot of processing time, you'd have a model that could tell you with a certain confidence (a percentage) how likely any given point is to exist on that line.

Seems pretty straight forward, right? Feed an algorithm a bunch of data and let it guess about data it hasn't seen.

[This joke tweet](https://twitter.com/jebbery/status/995491957559439360) is a great summary of ML:

> Machine Learning Job Interview:

> Me: I'm an expert in machine learning

> Interviewer: What's 9 + 10?

> Me: It's 3.

> Interviewer: Not even close. It's 19.

> Me: It's 16.

> Interviewer: Wrong. Its still 19

> Me: It's 18.

> Interviewer: No, it's 19.

> Me: It's 19.

> Interviewer: You're hired.

## Types of Machine Learning

I've only experimented with **supervised** learning so far. The examples we've talked about have all involved **supervised** learning, meaning we are telling the algorithm what to look for and giving it examples with features to learn from. Supervised learning is fairly simple to wrap your head around, but there's more methods and applications of ML out there.

Two examples of different ML methods are **unsupervised** and **reinforcement** learning. In **unsupervised** learning, you give the algorithm a data set that's unlabeled and let it discover and classify things on its own. With **reinforcement** learning, where the algorithm learns how to accomplish tasks through good or bad outcomes. [Think of a computer learning to beat a mario level](https://youtu.be/qv6UVOQ0F44) as an example.

## What's so hard about Machine Learning?

The inner-workings (calculus and linear algebra 💀) of training a model are abstracted away from us by ML frameworks like TensorFlow. So what's the big deal with Data Science?

Most of the work done by data scientists is involved in **preparing the data**. When we interviewed [Data Scientist Amelia Bennett on our podcast](https://techjr.dev/episodes/2019/what-is-data-science-with-amelia-bennett), she described herself as a high-paid data janitor, and described data science itself as a "21st century dirty job".

Lots of the work in data science is in choosing what features (data points) to feed models and what to ignore. There's also a lot of work involved in converting data into forms that an ML algorithm can use.

If you've ever wondered how ML work evolved into computer vision, text recognition, natural language processing, the answer is math. Images, sounds, and text can all be translated to numbers and fed into ML models. The job of the data scientist is to not only select the data, but convert it. In computer vision for example, this means converting images to arrays of pixels (RGB and location) that the algorithm can use for training. Natural language processing involves describing soundwaves using math--taking frequency and pitch numbers over time intervals to identify spoken words.