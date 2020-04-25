---
title: 'Understanding Unix Permissions, chmod, and ls -la'
date: 2020-04-25T12:00:00-0400
---

![A picture of a train terminal in Japan by Andrew Leu (https://unsplash.com/photos/fWZ1-EEYzPM). This article is not about this kind of terminal.](./terminal.jpg)

_Whoa! Lee, Why are you writing about terminal commands? I thought this was a front-end blog?_

Listen. I contain multitudes. Plus, you're gonna run across a permissions issue at some point regardless of where you hang out in the stack, so why not learn a little about what's going on here?

Cool? Cool. Let's roll.

## Why can't I run this script!?

Let's say you're wanting to run a certain script on your computer. Maybe you downloaded it from somewhere or copied it over from stack overflow. Maybe you wrote your own script, who knows? Let's say you have a cool script like this one:

```bash
#!/bin/bash

echo "Have a great day!"
```

So you jump into your terminal and run `./my-script.sh` and you're greeted with:

```
$ ./my-script.sh
permission denied: ./my-script.sh
```

So you jump onto stack overflow, search 'run script permission denied' or something, and you get a terse answer in the way of `chmod 744 <filename>`. So you copy that into your terminal and run it, not really worrying about the mysteries of Unix:

```
$ chmod 744 ./my-script.sh
$ ./my-script.sh
Have a nice day!
```

Satisfied, you go about your business, feeling appropriately greeted by your terminal.

However, deep in the back of your subconscious, you've unknowingly unleashed a tiny code demon. This tiny demon waits until you're showering or about to fall asleep--basically when you're finally finding that peaceful zen state that's so hard to channel--and it whispers a question into your brain: _"What does that command do?"_

For a moment, you wonder why you're not more familiar with Unix, doubt yourself and your abilities, and then pack those feelings back down into pandora's box and go about your day.

## Where did my dotfiles go?

If you've been programming for a minute, you're probably worked with dotfiles. Maybe your project has a `.env` file for API keys, or maybe you colossally destroyed a git history and decided that obliterating the `.git` folder in your project is the last option you've got left.

In any case, you jump into your terminal and run your trusty `ls` command.

```
$ ls
work stuff morestuff not_file_you_want.js
```

_Fiddlesticks! Where's my file? It shows up in vscode, why isn't it here!?_

One more trip to stack overflow and you get `ls -la` as your green checked answer, which gives you this:

```
$ ls -la
drwxr-xr-x 15 you  you   4096 Apr 24 11:16 .
drwxr-xr-x  3 root root  4096 Mar 30 12:09 ..
-rw-r--r--  1 you  you     38 Apr 24 11:04 .mydotfile
drwxr-xr-x  9 you  you   4096 Apr 16 09:50 work
drwxr-xr-x  9 you  you   4096 Apr 13 09:50 stuff
drwxr-xr-x  9 you  you   4096 Apr 11 09:50 morestuff
-rw-r--r--  1 you  you     38 Apr 24 11:04 not_file_you_want.js
```

Success! There's my dot file that's appropriately named `.mydotfile`. But that little demon in your mind chimes in... "_What are all those letters and dashes at the beginning?_"

_ARGH!_ Impostor syndrome! Doubt! Fear! **The dark side!**

You ask yourself, _Why am I so bad at using computers!?_

## Learn Unix permissions and banish your doubt demons!

Let's first talk about that weird little string of letters and dashes.

```
-rw-r--r--  1 you  you     38 Apr 24 11:04 .mydotfile
```

That string of `-rw-r-r--r--` is a list of permissions for that file! More on the meaning of that in a second.

The other information from left to right is the number of links to that file (1), owner, group owner, file size (38), date/time last modified, and the file name.

Now, what about that letter/dash nonsense?

```
-rw-r--r--
```

This is actually a grouping of 4 subsets of information.

```
type | owner | group | everyone else
------------------------------------
-    | rw-   | r--   | r--
```

For the type, the dash signifies that this is just a regular ol' file. You'll see `d` to signify directories and `l` for links, and might even see different colors in your terminal to highlight those types of files.

The rest of the columns have three more bits of info, which are specific permissions for each subset of users on the system. 'Owner' is the creator of the file, 'group' is the group of users that owner belongs to, and the last section is every other user on the system.

As for the letters themselves, they signify (r)ead (w)rite and e(x)ecute. So for the example above we have:


```
type | owner | group | everyone else
------------------------------------
-    | rw-   | r--   | r--
file | read/ | read  | read
       write
```
This means you (the owner) can read and write to the file, but other users can only read the file.

Here's another set of permissions you'll often see on directories:

```
type     | owner    | group    | everyone else
------------------------------------------
d        | rwx      | r-x      | r-x
directory| read/    | read/    | read/
           write/     execute    execute
           execute
```

This means you (again, the owner) can do it all, but others can read and `cd` into the directory.

## Changing Permissions

Great! So now you know what all those crazy letters mean. But how about changing them?

Let's look at our example directory from above when we ran `ls -la`:

```
$ ls -la
drwxr-xr-x 15 you  you   4096 Apr 24 11:16 .
drwxr-xr-x  3 root root  4096 Mar 30 12:09 ..
-rw-r--r--  1 you  you     38 Apr 24 11:04 .mydotfile
drwxr-xr-x  9 you  you   4096 Apr 16 09:50 work
drwxr-xr-x  9 you  you   4096 Apr 13 09:50 stuff
drwxr-xr-x  9 you  you   4096 Apr 11 09:50 morestuff
-rw-r--r--  1 you  you     38 Apr 24 11:04 not_file_you_want.js
```

Let's say we wanted to change the permissions of the `not_file_you_want.js` file and add execute permissions for the owner.

To do this, we'll use the `chmod` command:

```
$ chmod u+x not_file_you_want.js
```

Here the `u+x` part may trip you up, but take another look. It's saying (u)ser + e(x)ecute, or add execute permissions to the user.

What about more granular permissions? What if we wanted to remove all permissions from any other users?

We can be ultra specific with `chmod`:

```
$ chmod u=rwx,g-rwx,o-rwx not_file_you_want.js
```

So this command says (u)ser permissions should equal (r)ead, (w)rite, and e(x)ecute. Remove all permissions from the group, and remove all permissions from all other users.

## Binary Shortcuts

![A blue and grey sign with the number 2 on it. Photo by Sonny Ravesteijn (https://unsplash.com/photos/xyxjKdpUg4I)](./two.jpg)

So now you can explicitly set whatever file permissions you want. But that little brain demon might still be screaming about our first stack overflow answer.

```
$ chmod 744 ./my-script.sh
```

What the heck does 744 mean?

This is actually shorthand for `-rwxr--r--`. Each number represents a user subset. The first number (7) is user, the middle is group, and the last is all other users, just like we showed in our breakdown earlier: `rwx | r-- | r--`.

Each number is actually a binary representation of the three permissions combined. Let's look at just the user permissions:

```
2^2     | 2^1     | 2^0
read    | write   | execute
---------------------------
1       | 1       | 1
```

Here we're indicating we want all three permissions (rwx), so we add 2^2, 2^1, 2^0 together to get 7.

For the other groups:

```
2^2     | 2^1     | 2^0
read    | write   | execute
---------------------------
1       | 0       | 0
```
We only count 2^2 which is equal to 4 for the group and others permissions, which combined with our 7 gives us 744.

Here's some other common permission examples:

```
777 = 111 111 111 = rwxrwxrwx
666 = 110 110 110 = rw-rw-rw-
644 = 110 100 100 = rw-r--r--
600 = 110 000 000 = rw-------
```

Pretty wild right?

So now when you see this command:

```
$ chmod 700 my-file.sh
```

You know that means you're giving the user all permissions and removing all permissions from everyone else. Look at you go, you little Linux Guru 😎.

## Parting Thoughts

Special Thanks to my colleague Clay Benson for explaining this to me on a conference call. I have stared at those little strings of `rwx` for _years_ without bothering to look up what they signify, just chalking it up to terminal magic and resiging myself to ignorance. I was actually stunned at how logical the design of Unix file permissions actually is, and the byte math absolutely floored me when I learned it and inspired me to write this post.

The next time you do some stack overflow linux wizardry, do a little research and you might surprise yourself with how much you learn. I know I will.
