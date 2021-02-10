---
title: The arguments against open source (and why they are wrong)
date: 2021-02-09T06:06:00.000Z
description: "Open source has existed for as long as code has existed, but until
  now it has remained in the shadows. This is now changing. Here is why you
  should switch to open source 🙌 "
tags:
  - Code
  - Development
  - FOSS
draft: false
---
A few weeks ago, I was taking to a developer on discord. He had mentioned he was working on a bot for his server, and when I expressed interest he invited me to his server so that I could see it in action. I was impressed - it was a rather unique idea, and I was interested to see how it worked. Naturally, I asked him for the source code, and I was met with a instant no. He had no intention of selling it, nor distributing it beyond his server, but was rather worried about exploitation as well as reuse without attribution. This is a fairly common concern, among others, that prevents so many developers from publishing their code. As a major advocate for FOSS software, I thought I should clear up some misconceptions about making your code open, and share some reasons why you should.

# Myths and misconceptions

## Myth one: open source software can’t make money

This is not true. Many open source projects turn a profit, commonly by two different ways. Donations, and distributing precompiled programs for a price andor offering your software as a service (ie: hosting). I go into some more detail on some methods below.

### Saas

Saas, or software as a service, is a common model offered by open source products as a way to make money. In this model, code is openly shared, but a likely slightly modified version is shared by the foundation. This appeals to normal consumers who might not have the technical expertise or inforstrucure to host or configure the product them selves. This means that you get all the benefits of open source, while still making a profit similar to a normal business. Let’s be honest, if someone could host a server themselves, they would not be looking at paid offerings like your product to do it if they can themselves.

Some examples of open source products using this model

* write.as
* ghost

### Selling precompiled code.

Your product not web based? No problem. This option is not unlike the sass route, but for desktop products. Essentially, this follows the same principle of appealing to the normal consumer while also making a profit, and getting the benefits that come with open source. **who said you needed to make getting the code together easy**? Open source does not mean you host the file in the GitHub releases and offer extensive build scripts and guides, it just means it’s... open (although if your interested in getting outside support, a compilation guide for developers is needed). This means that most people looking to use your software will pay to use it, but the people interested in learning how it works and improving it do not get turned away. A win win. 🥇 

Some examples of open source products using this model

* Aesprite

### Offering additional content... for a price 

No... I don’t mean only making the demo version open source, although people do that too (more below), but rather selling product guides, content for your product, etc to turn a profit. People feel they are supporting you while getting stuff in return. It has worked for major open source products like the blender foundation (blender cloud) - so why not for you?

### Why not.... ask?

You knew it was coming at some point. Asking for donations.... the horror, but the reason people do it is because it WORKS! (Crazy thought I know). GitHub sponsorships, PayPal, patron, etc are all great ways to get some extra mula from your loyal supporters. Pretty much all major open source foundations do this, including

* The Linux foundation
* Gimp
* Blender
* LibreOffice
* Inkscape 

### And finally - the semi open source

There are a few ways to pull this off, if you really want to

**make the code open source** - well no shit Sherlock... but what if I told you you could exclude the assets? That leaves out images, 3D models, etc. it means that the code is open to be viewed and modified, but not used. This works great for video games especially, like [space engineers 🚀 ](https://github.com/KeenSoftwareHouse/SpaceEngineers).

**it’s only partially open**. Fine dude, you win. Keep some stuff for the people who pay, but keep the basics open. Please.

## Myth two: Open source means I won’t get the respect for what I MADE!

You need to stop thinking this way. You made the code, you get ALL the respect for the code YOU wrote. Deal. The repository is under your name, and it’s yours. Yey.

No but for real, this is a real issue but not a big one, open source generally means free to distribute, so people might pass it off as theirs. Here is the thing. **it NEVER works out**. Chances are whatever they are doing won’t pick up steam. There are better options, so no one will use the second one, when the first one was around for longer and is probably better in some way. Even if it does pickup steam, it will come out it was copied, and people forget about it. They then go to you. Free publicity. People generally are nice, so it rarely happens.

If you are really worried, check out the [apache 2.0 license](https://infra.apache.org/licensing-howto.html). It has a caviot that if someone is using your code in a different product they must include a NOTICE file containing whatever you want in a readable place, copycats be gone, unless they are illegal copy cats! 🐱.

## Myth 3: If my code is open, it will be exploited.

This is the hardest reason to point out the flaw in, but honestly, if people want to exploit your product, they will. Closed source won’t stop them - only slow them. You won’t be sharing your apps credentials, only the base code, so that does not need to be worried about. Most people are honest, so if they see a issue while viewing your code they will fix or report it. By contrast almost everyone searching for exploits in closed source software is wanting to abuse them. in the end - it pays off. 

If you are really worried about exploitation, try implementing a permission system that locks your programs theroreticly destructive functions for use only by you.

If they do manage to find a issue, just roll back the server if needed, patch the exploit, and boom. No more issue. If they find a exploit in your code, good for them, enjoy the ban hammer 🔨.

# So why make your code open?

We went over why the nots are nots (uhh), but why SHOULD you really do it?

## Be recognized for not just WHAT you made, but HOW you made it

In rare cases do I look at a product and think: “Hey! Whoever made this is super smart!”. It’s not that I think your not smart, but it’s the code where the talent really shows. It’s so common where I get blown away by the smart coding and methods of achieving things people use. This appreciation can only be reached by going open. Also, employers love it 😍 !

## It’s free labor 

No seriously. By going open harness the power of the internet... for free. Everyone contributes, everyone brings new ideas to the table - some you might not have even thought about! 

# Ok bye 👋 

It’s late and I am tired of writing. If you have any thoughts on this post, let me know, it’s my first real post. If this convinced you, stay tuned for “The basics of going open”... coming soon 🔜
