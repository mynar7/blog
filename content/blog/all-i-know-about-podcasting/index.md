---
title: The Ultimate Guide to Starting a Tech Podcast
date: 2019-07-28T11:30:00-0400
---

I started the [Tech Jr](https://techjr.dev) podcast with my co-host Eddie in April of this year. We haven't been around for very long, but we've had some great success reaching developers in our community and beyond with helpful advice and knowledge.

I've been asked a few times about how to get started with a podcast, what our workflow is, what equipment we use, and generally how we do things for our show. I've also asked a lot of those questions myself and done a lot of research along the way to launching Tech Jr, so I figured it was time to boil that down into a blog post.

I'm going to unload everything I've learned about making a podcast, so buckle up.

Before we start, a hot-take 🔥:

>When I run into an old friend, and I have no idea what they’ve been up to, I just say, “I love your podcast.” Haven’t been wrong yet.

>&mdash; [@fimoculous](https://twitter.com/fimoculous/status/1138182748735246337) June 10, 2019

## Contents:
* [Getting Started:](#essentials)
  * [Offload it all](#option1)
  * [Make your site, offload the rest](#option2)
  * [Do it all yourself](#option3)
    * [Website](#website)
    * [File Hosting](#hosting)
    * [RSS](#rss)
  * [Analytics](#analytics)
  * [Getting Sponsors](#sponsors)
* [Getting Great Audio](#audio)
  * [Picking a Microphone](#mic)
  * [Recording and Editing](#software)
  * [Interviews, Co-hosts, and Voip](#voip)
    * [Zoom](#zoom)
    * [Skype](#skype)
    * [Zencastr](#zencastr)
    * [Local](#local)
* [Producing Great Content](#content)
  * [Picking a Topic](#topic)
  * [Consider your Audience](#audience)
  * [Episode Preparation](#prep)
  * [Staying Organized](#organizing)
* [Promoting the Show](#promote)
  * [Social Media](#social)
  * [Newsletter/Email](#email)
  * [Interviews/Guest Spots](#guestspots)
  * [Ask your Listeners for Help](#ask)
* [Reflections](#reflections)
  * [It's hard work](#hardwork)
  * [It takes time](#patience)
  * [Perseverance](#persevere)
  * [Feedback](#feedback)
* [Parting Words](#credits)

# <a name="essentials"></a> The Essentials:

There's 3 main things you need to have a podcast:
* A place to host your audio files
* An RSS feed
* A website

The website is technically optional, but people will expect you to have one. File hosting and RSS, however, are unavoidable and necessary.

#### A note about the RSS feed:

If you want your show to be on itunes, spotify, google play, and beyond, you're going to need an RSS feed. RSS is just a bunch of xml tags similar to HTML that contains a list of your episodes and information about them like the  title, description, author, and where the audio file lives.

Itunes and other aggregators will consume this feed and use it to list your latest episodes on their platforms. Some will download your episode and host it themselves, while others will point listeners directly to your hosting solution. More importantly though, _other_ platforms will scrape itunes and re-list your show on _their_ platform.

Basically this is all to say that RSS is incredibly important to your show, so do your research before you pick a solution for it.

## What are my options for RSS, a website, and file hosting?

I like to think there's 3 ways to tackle this. Which one you choose depends on how much money you want to pay and how much time you have to spend.

(No judgements from me by the way on whichever you choose. Different strokes and all that.)

<a name="option1"></a>

### Option 1: Pay the premium 💵, move on with your life

If you're just looking to get your show on the air and don't care about the technical details, this is for you. There's some services out there that will absolutely take care of the whole enchilada for you for a monthly fee and provide an RSS feed, website, and file hosting.

[Libsyn](https://libsyn.com/) and [Fireside.fm](https://fireside.fm/) are two common solutions in this space.

<a name="option2"></a>

### Option 2: build the site yourself, pay for hosting.

You can absolutely build your own site and use a service to handle RSS and hosting. [Syntax.fm](https://syntax.fm) has a [Nextjs](https://nextjs.org/) site and uses libsyn for RSS/hosting for example.

There's also [anchor.fm](https://anchor.fm) that will handle hosting and provide some other goodies for you.

This is great if you want a beautiful, custom site but don't care about diving deep into RSS and file hosting.

<a name="option3"></a>

### Option 3: DIY to the max; YOLO baby. 😎

Then there's me. I'm so cheap I've been driving the same '98 civic coupe since college. It turned 21 this year. We've almost hit 200,000 miles together and I've saved many thousands of dollars on car payments. Me and that car are like 🤞.

However, my beautiful, wonderful wife ***hates*** that car. It's tiny and she's claustrophobic. The interior is disintegrating to plastic chemical dust in the Florida heat. It has no A/C. Also, the windshield wiper motor no longer obeys the off switch, so when it rains I have to reach under the dash and jiggle the fuse to enable/disable the wipers.

Basically, I'm willing to suffer a little to save a buck. 🤷‍

I **host my own audio**, **built my own site**, and **create my own RSS feed**.

It was a lot of work, but it saves me 💸💸💸.

<a name="website"></a>

#### DIY Website: Netlify + Gridsome + Markdown

I'm a front-end developer, so of course I made my own site. I used [Gridsome](https://gridsome.org) to build a static site with markdown files for each episode.

I host my site for **free** with [Netlify](https://netlify.com).

With the money saved on monthly website hosting, I splurged the extra two bucks on buying the domain through Netlify as well for free and easy SSL certs (https is important for RSS).

<a name="hosting"></a>

#### DIY File Hosting: Amazon S3

Amazon S3 is about the easiest thing you can do with AWS as a non-DevOps expert. This is as simple as creating a bucket for your show and setting it to be publically accessible. When you upload a file, S3 gives you a URL to access it at.

AWS is great because cloud hosting means your files are being hosted by Amazon, and they're unlikely to experience an outage. It also means you're paying for usage, and not a flat monthly fee. I had something like 1800 requests last month to my audio files, and paid a whopping $2.58.

<a name="rss"></a>

#### DIY RSS: Gridsome plugins / npm

Hmm, what about that pesky RSS feed?

I used a [plugin](https://gridsome.org/plugins/gridsome-plugin-rss) for Gridsome that itself uses an [npm package](https://www.npmjs.com/package/rss) for generating the XML for the RSS feed.


**Note:** If you're not into Vue/Gridsome, [Gatsby](https://gatsby.org) (uses React) has a similar [plugin](https://www.gatsbyjs.org/docs/adding-an-rss-feed/) to get you going. (I built my [blog](https://leewarrick.com/blog) with Gatsby and use the RSS plugin to publish to [Dev.to](https://dev.to/leewarrickjr))

With Gridsome, my episode pages are generated from markdown, and at the top of those markdown files is some meta-information you can set using something called [frontmatter](https://jekyllrb.com/docs/front-matter/). This is where I include stuff like my description, file size, file location, episode length, tags, etc. The RSS plugin reads this during the build step and then runs a function to create the XML tags based on this info.

Itunes is picky about RSS, but you can read about what tags you need [here](https://www.feedforall.com/itune-tutorial-tags.htm), and they have a handy validator which will tell you if your feed is valid when you go to [submit it](https://itunesconnect.apple.com/login?module=PodcastsConnect). Spotify and google will also validate your RSS before you submit, but generally follow the same rules as itunes.

If you want to check your RSS beforehand, there's a number of [helpful](https://castfeedvalidator.com/) [sites](https://podba.se/validate/) for that.

If you want to see a working example, [Tech Jr](https://techjr.dev)'s repo is public and you can see it on [Github](https://github.com/mynar7/techjr). Check out the `gridsome.plugin.js` file for RSS goodness.

<a name="analytics"></a>

### Analytics

If you pay for file hosting through a service like libsyn or anchor, they will usually provide all your analytics in a neat little package with a bow on top.

If you went my route and host your own files, you're not totally lost, however.

AWS offers analytics if you know where to look, and you'll at least get some usage statistics attached to your monthly bill (that's how they charge, after all).

Also, iTunes, Google, and Spotify will all give you analytics through their respective creator dashboards. (How did you think libsyn gets those numbers?)

Lastly, there's sites like [chartable](https://chartable.com) that will aggregate data from those disparate dashboards into something easier to parse. They even offer a free service to proxy your file downloads through their servers to accurately provide download counts.

**Note:** While having analytics _might_ help with getting sponsors for your show, I'd argue it's not really very important in the grand scheme of things. They can be fun to look at, but also something to obsess over or feel bad about if they're not flattering. Their best use is in determining what your audience likes so you can tailor your content accordingly.

<a name="sponsors"></a>

### Sponsors

This is the dream right? Get paid to make your show!

Sponsors could potentially offer you money for ad-spots on the show, sometimes on a cost per mille (CPM) basis. This means a certain amount per thousand listeners per ad-spot.

_Wait, per ***thousand*** listeners?_

Yes. The reality is that you're probably not going to be worrying about sponsors at first, and you may never get sponsored.

Listen, _I like_ money, _you like_ money, and we all gotta eat. But for our show, until it happens, sponsorship cash is a daydream.

It's far from free money, by the way. Making ad spots and negotiating with sponsors is also added workload for you, the content creator. And of course, your fans may not appreciate having to listen to ad spots.

At the end of the day, I make Tech Jr **because I want to** and it's important to me. Helping junior devs is a passion, not a business goal. Hey, if I make a buck along the way, great. If I don't, no sweat. I'm not going to place all my eggs in that basket.

Honestly, podcasting is a great way to telegraph your passion for your niche and establish yourself as an expert in your space. It is impressive on a portfolio or resume, and you end up building a rapport with a lot of great people through interviews. So while there's not necessarily cash benefits to podcasting, there's other value.

That being said, [there are other ways](https://counterweightcreative.co/ultimate-guide-why-podcast-sponsorships-waste-your-time/) to monetize your show. You can set up a paypal page for donations ([Buy me a coffee?](https://paypal.me/leewarrick)), start a patreon, or be your own advertiser for a service or product you sell (swag anyone?).

<a name="audio"></a>

## Making the Audio Files

Audio quality is incredibly important for your show. You've got a few seconds to hook listeners, and if they hear bad audio, you've probably lost them. Nobody wants to hear to background noise, dead air, or people talking through the microphone equivalent of a potato 🥔 (I'm looking at you, built-in laptop mic podcasters).

<a name="mic"></a>

### Choosing a Microphone

It's easiest to handle audio quality upfront as you record as opposed to afterward in post-production. Using an external microphone will help immensely.

This could be its own blog post, but basically there's two main categories of microphones that you'll likely be looking at: **dynamic** and **condenser**.

Here's the short version: A **condenser** (Blue yeti, for example) is going to sound very natural, but also pick up **A LOT** of **background noise**. A **dynamic** mic on the other hand (think AM radio, broadcast, reporters, etc), has an adjusted EQ that makes you sound less natural, but also **eliminates most background noise**.

My recommendation is to get a **dynamic mic** unless you're recording in a studio environment.

There's also a question of using a USB mic or an XLR mic with an external sound card/interface.

Feel free to splurge on whichever, but I've done just fine with a dynamic USB mic.

As for my personal mic, I spent a long time reading microphone reviews before landing on a [Samson Q2U](https://www.amazon.com/Samson-Handheld-Microphone-Recording-Podcasting/dp/B001R747SG/). (This is almost identical to an [Audio Technica ATR-2100](https://www.amazon.com/Audio-Technica-ATR2100-USB-Cardioid-Dynamic-Microphone/dp/B004QJOZS4), by the way.) As a bonus, it also comes with an XLR port if you ever decide to switch to an interface instead of using USB.

My co-host Eddie uses a high-end XLR dynamic mic into an external interface. To my ears, we both sound good.

#### Helpful Mic Accessories

I'd recommend a windscreen (foam/fur ball that covers the business end) **or** pop filter (a screen that deflects air away), and some type of shock mount (some rubber bands that protect from vibrations from your desk/mic stand).

I also got a cheap boom arm that clamps to my desk to hold the mic in a good spot.

All that stuff helps minimize background noise and reduce pops/clicks and breathing sounds that are hard to edit out later. These can be had for cheap, costing maybe 20-30 bucks total.

<a name="software"></a>

### Audio Recording and Editing

Unless you're using [anchor.fm](https://anchor.fm), you're going to need a way to edit and record your audio.

Personally, I'm on Windows, and I use [Audacity](https://www.audacityteam.org/) for both. It's free, there's tons of info/tutorials out there about it, and it works. 🤷‍

There's also [Reaper](https://www.reaper.fm/), which is _not_ free, but has a winrar [price model](https://forlackofabettercomic.tumblr.com/post/26659890193/i-hope-for-all-of-our-sake-that-this-isnt-the) and is awesome.

Other options include Garage band and quicktime on mac, as well as a sleu of other paid DAW (digital audio workstation) programs.

As far as editing goes, applying a smidge of [compression](https://www.youtube.com/watch?v=RfHA4OPfoi8) is nice for evening out your volume, but don't do too much or you'll remove all the dynamics from the audio. You'll [Ben Stein](https://www.youtube.com/watch?v=NP0mQeLWCCo) it. (I use this [plugin](https://theaudacitytopodcast.com/chriss-dynamic-compressor-plugin-for-audacity/) for audacity.)

Mainly, you'll want to silence background noise and cut any dead air (periods of silence) during editing, as well as even out your volume with anyone else's.

Or you can pay someone to edit for you. I know another podcaster that has his own [show](https://productivityintech.transistor.fm/) and makes money on the side [editing](https://productivityintech.com/editing) for others.

<a name="voip"></a>

### Interviews, Co-hosts, and Voip

If your podcast is just you monologuing, feel free to move on. For the rest of us with co-hosts/interview-based shows:

You can either do everything on-site in the same studio/location (a blue yeti might shine here, it has settings for capturing a room), or you're in my boat: you have to record over the internet.

This is a rough spot in podcasting. There's not many great free _or_ paid solutions that can account for internet connection issues and speeds. That being said, here's some options:

<a name="zoom"></a>

#### Zoom

Zoom is free if you've only got two people on the call, and most folks seem to like using it. However, it _was_ recently blasted for having a zero day security exploit, but has since been patched.

With Zoom, if you're on a call with 3 or more people, you'll have to pay for a premium account to go beyond 45 minutes, or else the call will drop at that time limit.

The good news is zoom is able to record your calls and automatically gives you separate audio and video files. (Not separate audio tracks though, and if you talk over each other it will sound wonky)

Also, if you or anyone else on the call has connection issues, you'll get some funky audio to edit.

<a name="skype"></a>

#### Skype

Most people have used skype at some point or already have it installed. Skype is free and unlimited as far as call length, and will let you record the call (as long as everyone clicks ok when you start recording).

Unfortunately, skype exports a single video file, so you'll have to rip the audio off of that (also on a single track).

Doubly unfortunate is that most people seem to despise skype and have uninstalled and forgotten about it. So they may ask you to please use something else.

Of course, if you or anyone else on the call has connection issues, you'll get some funky audio to edit.

<a name="zencastr"></a>

#### Zencastr

[Zencastr](https://zencastr.com/) is a browser-based voip recording app.

Here's how it works: You set up a session through the website, get a link for all parties to click, and once they do, they're taken to the web app as well. Once there, zencastr provides voip and records through the browser, gives you separate tracks, and even uploads them to a google drive folder for you.

When it works, it's fantastic. When it doesn't, your episode is toast 🍞.

They claim to have local backups running, but I've still gotten shortened tracks due to spotty connections.

So, if you or anyone else on the call has connection issues, you'll _still_ get some funky audio to edit.

Luckily we've had backups going in those situations, but if you have to do backups anyway...

<a name="local"></a>

#### Have everyone record locally

This is the most reliable solution we've found for our show. We ask our guests to record their own audio and send it to us afterward. Then, we use one of the aforementioned methods as the backup in case the guest makes a mistake recording or just forgets to send their audio.

Most of our guests have a mic and some recording experience, so we've had good luck so far. For the others we use zencastr and 🙏.

The takeaway here is to just make sure you have a backup plan so you're not recording an episode twice.

<a name="content"></a>

## Producing Great Content

This seems obvious, but you should spend some time making sure what you're saying sounds as good as the audio file it's played from.

<a name="topic"></a>

### Pick a Subject you can Talk about at Length

If you're doing a Tech podcast, you'll probably always have plenty to talk about. In general though, it's good to pick an evergreen subject so you won't struggle to come up with episodes.

If you pick a trendy technology or something with too small of a niche, you may struggle to come up with topics.

<a name="audience"></a>

### Consider your Audience

Be sure to tailor content to your listeners. For example, Syntax knows they have lots of new developers listening to their show, so they almost always explain the things they talk about in simple terms for their audience.

In our case, we're aiming to help early career developers. We try to do the same and provide simple explanations for technical concepts as well as provide career advice geared toward juniors.

The point here is to produce content your audience wants to hear, and not just talk about the things you want to talk about.

<a name="prep"></a>

### Prepare for your Episodes beforehand

I can't stress this one enough.

I write an outline for every episode that we do on our show.

It's usually just bullet points of things I want to touch on or questions I hope to ask, but I'll also re-order those bullet points to group things logically by topic. This really helps keep the episode focused and on topic.

An outline also helps eliminate dead air and "um"s or "uh"s when trying to think of what to say next.

It also helps with interviews. Sometimes your guest may ask for your questions beforehand so they can do their own research and preparation. If you have an outline, you can send that to them prior to the interview.

<a name="organizing"></a>

### Staying Organized

There's a lot to keep track of when podcasting. You've got keep running lists of episode ideas, edits to make, show notes, guests to schedule, etc. It helps to have a system.

I use [trello](https://trello.com) for organizing our episodes, ideas, and keeping track of potential guests.

[Calendly](https://calendly.com) is excellent for allowing guests to schedule a time to be interviewed. I also use google calendar for keeping track of what I need to do and when.

Another tip is to send an email to any potential guests to prepare them for the interview. You can make a draft/template in gmail that covers:
* What you will use to record or what they will need to do to record
* A request to please have a decent quality mic ready
* A reminder to try and find a quiet environment with a good internet connection

When you land an interviewee, make a copy of the draft, tailor it for your guest and send it. You'll save time not having to repeat the same conversation with each guest.

<a name="promote"></a>

## Promoting the Show

I didn't realize I would have to promote my own show when I started.

There's something incredibly off-putting about trying to pitch and sell your own content to the world, but if you don't get listeners, what's the point?

You might be thinking, _"Well, people can subscribe on iTunes and Spotify, and I have an RSS feed, so what else is there to do?"_

There's a lot of podcasts out there, and while I wouldn't say you're _competing_ for listeners, your discoverability on those platforms is, well, limited. So it helps to drive listeners to your show through other means.

I am not an expert at this, but I'll share what I know regardless.

<a name="social"></a>

### Social Media

Find out where your audience is, and then go there and **participate in that community**. When you release a new episode, share it.

The emphasis is because it's much easier to convert any existing followers you have than to build an audience from scratch. Also, simply opening a chat channel and dropping a link is unlikely to net you many listeners and may get you banned.

For Tech, Twitter is huge. Other shows have told me they promote in Facebook groups. I personally post new episodes in slack groups that I am active in.

**Bonus:** When you're sharing, it also helps if you send out a preview snippet a few days before the episode to build excitement. You can upload a clip to [soundcloud](https://soundcloud.com) for free and use that in your tweets. The great thing about this is that soundcloud links are playable in a [tweet](https://twitter.com/TechJrPodcast/status/1148408788661260288)!

<a name="seo"></a>

### SEO

Your website should have proper [schema](https://jsonld.com/) and [metatags](https://css-tricks.com/essential-meta-tags-social-media/) so it's [searchable](https://search.google.com/structured-data/testing-tool/u/0/) and [shareable](https://cards-dev.twitter.com/validator).

It also helps to have transcripts [(Ladybug Devs example)](https://ladybug.dev/episode/web-technologies-were-excited-about/), show notes [(Tech Jr Example)](https://techjr.dev/episodes/2019/travis-neilson-talks-ux-ui-and-the-design-process), or both to help search engines crawl your site (they can't crawl audio) and hopefully point users your way when they're searching.

**Note:** Transcripts are also a thing you really _should_ do so that hearing-impaired folks can get access to your content. There's [ai-powered](https://trint.com) [services](https://otter.ai/) that can help, or you can hire someone.

<a name="email"></a>

### Email and Newsletters

I've noticed a lot of shows have newsletters, so we started our own as well. (Please [subscribe](https://tinyletter.com/leewarrick)!) We use [tinyletter](https://tinyletter.com) which is free up to 1,000 subscribers.

I don't have a lot to say about the efficacy of email marketing, but I know that RSS is a **passive** means of notifying your listeners of new episodes, while sending an email with a link is a much more **active** way of engaging your audience.

I personally try to also include other useful things aside from our latest show in emails. This could be other shows we've had guest spots on or have hosts we've interviewed, articles I've read that are useful, funny tweets, etc.

<a name="guestspots"></a>

### Guest Spots and Interviews

Cross-promotion is a valuable tactic in your arsenal. Other show hosts will likely be practiced guests and can provide some excellent content. We love interviewing and being guests on other shows!

When we interview someone, we add links to that person's podcast, blog, YouTube channel, etc. This helps our fans discover other great material and also helps promote our guests's content. When you're a guest on someone else's show, you'll likely get the same treatment!

**Note:** You might think that netting the biggest fish you can to interview would be your best bet to bootstrap to stardom.

I'm sad to say this isn't always the case.

Successful folks are _incredibly_ busy, and don't always remember to promote their own episodes.

I don't blame them though! I'm incredibly thankful to our more famous guests for even finding the time to let us interview them.

What I _will_ say though, is that our lesser known guests **almost always** promote our show, sometimes even beyond the episode they were on.

So interview the little people! They have great stories to tell and your listeners may appreciate being able to relate to guests with less star-power.

<a name="ask"></a>

### Ask your Listeners to Help

This is another thing I feel weird doing, but I try to ask my listeners to spread the word before and after the show. Something like, _"If you want to support the show, like, subscribe and leave us a review"._

If it feels weird to ask for your audience to help promote... get over yourself and do it anyway 🙃. It's fairly standard practice, and if your listeners made it to the end of an episode, then chances are they enjoyed it enough to help you out and by leaving a review.

I also occasionally throw out some tweets asking for listeners to spread the word by saying something nice about us.

[Repetition](https://www.linkedin.com/pulse/its-nagging-repetition-effective-communication-marton-jojarth/) is key here. So be consistent in asking for reviews, subscribes, etc.

<a name="reflections"></a>

## Reflections

To wrap up, I'd like to add a few personal thoughts and lessons I've learned.

<a name="hardwork"></a>

### It's hard work

You might have thought podcasting was a simple thing to get into before reading this post.

_"I'll just record some stuff and put it out there!"_

Hopefully you realize by now that there's a lot that goes into making the podcasts that you love to listen to. Even shows that aren't your favorite took a lot of effort to produce and create.

I'm really awed by some of the amazing shows out there. After creating Tech Jr, I've come to admire all the time and effort podcasters put into their work.

<a name="patience"></a>

### It takes patience

I've seen shows pop up and instantly become sensations. They get thousands of listeners and sponsor offers overnight, etc.

The thing is, those shows _already had an audience_ that they brought to their new podcast.

It takes years of effort to build a following and establish a presence with credibility. I struggle with being patient, but I try to remind myself that *these things take time*.

<a name="persevere"></a>

### Prepare for the long game

Most shows don't make it very far.

According to [Dan Misener](https://blog.pacific-content.com/podcast-success-a-long-game-fd6522b72752):
> * 12% of podcasts have only published a single episode
> * 6% haven’t made it past two episodes.
> * Half of all podcasts have 14 or fewer episodes.

The longer you're at it and the more episodes you make, the higher your chances of success, so don't give up.

<a name="feedback"></a>

### Feedback

Podcasting feels a little like shouting into the void of space at times. Most people don't leave a review or reach out to say whether or not they like the show.

(To the listeners that _do_ reach out though, you're all Rock Stars 🎸 and we love you.)

We put out about 6 episodes for Tech Jr to little fanfare. It wasn't until I hosted our monthly meetup that I even realized we had listeners.

A few people approached me after the event to shake my hand and tell me how much the show means to them.

It's a really great feeling to get that feedback, so if you enjoy a podcast, leave them a review, tweet about them, or email them something nice to let them know you appreciate the hard work.

<a name="credits"></a>

## Parting Words

If reading this post discouraged you from podcasting, that wasn't my intention.

If you're passionate about it, do it! My aim was to help you succeed by covering all the facets of podcasting you might not have thought about. So I hope this post was helpful and informative. I truly enjoy producing content for Tech Jr, and I hope to be able to continue to do so.

Many thanks to all the other podcasters out there that offer advice and support for our show. And kudos to those podcasters out there that continue to deliver great content.

And of course, thank you, reader, for making it through this lengthy post. 👏😎✨
