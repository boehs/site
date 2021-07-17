# Data we collect

Hey, We don't track you anywhere nor store cookies on your browser. We still collect a bit of data though so we can improve our website and understand better what our readers want.

## How it works

When you visit a page on our site, your browser makes a request to `boehs.io/anal?url={url}`. That page collects and stores some data in a private `sqlite` database. 

## What data is collected

* Time of visit, in `unixtimestamp` format.
* Page visited
* Your *very* approximated location (somewhere in an area of 3767 miles!) (Note our API provider may process your IP in different ways, not connected to your visit here)
* Your IP hashed using `sha256`, meaning we have no idea what it is and no way to find out (Read about why below!)

## Why do we collect this data?

* Time of visit is used to know our site's peak hours, and to understand how long you spend around here
* Page visited is for obvious reasons. What pages do the best?
* Your location is only used to understand where our site is most popular.
* Your IP hash is your user-id, if you will. It shows us how many pages people visit, and the amount of time you spend on the site. Additionally, if you choose to opt out of collection, we will use this hash to figure out what data to destroy

## Escape

### Option One

Not interested in helping me out? That's cool, I respect it. Upon getting a request, I will do the following at once

1. Destroy all data connected to you that is on my server
2. Create an entry in your browser's local storage instructing me not to request `boehs.io/anal`

To do this, open your browser's developer console by doing the correct command for your system (Google it if you don't know!) and write `donttrackme()`, than hit `ENTER`. We will read your IP, and delete all entries with it's hash.

If your IP has changed since your first visit, Due to the limited ways we track you you must write an email to `secure@boehs.io` containing SHA256 hashes of all the IPs you have had. I will manually delete the data

### Option Two

We respect your browser's `Do Not Track` setting. If it is enabled already, we have not and will not collect any data. 
