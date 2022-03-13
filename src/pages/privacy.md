---
is: not creepy
title: privacy
hasCodeBlock: true
---

I strive to provide useful and meaningful content to users of my site. In order to aid me with this goal, I collect small amounts of personally identifiable information. This information is retained for up to a 7 day period, {% comment %}before it is summerized and deleted. For transparency, this summerized data is avalible publicly.{% endcomment %}

## What is collected

Below is an [apache log configuration](https://httpd.apache.org/docs/2.4/logs.html).

```apacheconf
LogFormat %v:%^ %h %^[%d:%t %^] "%r" %s %b "%R" "%u"
```

If you are a human and you don't understand that nonsense, this means that each time you visit a page or otherwise make a request, the following data that could identify you is logged

- The first **two segments** of your **IP**
- The **time of your request**
- The **page visited**
- Your **user agent**
  - **Browser**
  - **OS**

In practice this looks like

```http
boehs.org:443 🚫🚫🚫.🚫🚫.0.0 - - [24/Feb/2022:23:17:06 +0100] "GET /privacy HTTP/2.0" 200 746 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.137 Safari/537.36"
```

## How it's used

This data may be parsed into more data, including but not exclusively:

- Country (via IP)

{% comment %}
It is then represented as aggrate data by graphs publicly. This data is used to improve my services by understanding how they are used, as well as to be transparent.
{% endcomment %}
## Reselling

Your data is never sold, {% comment %}however aggrate data is public.{% endcomment %}

## Data retention

Specific data is stored for up to 7 days. {% comment %}It is than summerized via our logs parser (goaccess) and then the raw data is deleted.{% endcomment %}

## Requesting deletion

For any reason, you may request deletion of your data by emailing *webmaster boehs org*, however it is possible your data has already been deleted due to the retention policy described above.

## Government requests

I reserve the right to provide relevant authorities, governmental bodies, courts or other similar institutions with any information mentioned, as required by law.

Goverments may contact me with requests if and only if required by law. If not required by law, they can fuck off.

## Third party services

By using my website you are also subjecting yourself to the privacy policies of the following services:

- Cloudflare (https://www.cloudflare.com/privacypolicy/)
- Uberspace (https://uberspace.de/en/about/privacy/)

## Contact

Comments, clarifications, questions, suggestions, deletion requests, goverment requests, and other messages as related to this aformented policy should be directed at *webmaster boehs org*. Questions directed to my personal email in relation to this policy will be discarded.