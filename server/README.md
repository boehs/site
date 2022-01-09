# Server

No, I don't run my own web server! I use `apache` of course, but some pages
will be proxied to this server that is running deno. You can see these pages
in `./routes.ts`.

This server is not done:

1. It's not fault tolerent, it is known to crash randomly.
   1. This can be fixed with try/except and also asserting existance before requesting things
2. Not everything is implemented (use extension TODO tree for vscode)

---

For those wondering, I use `nginx` proxying to `apache` proxying to `deno`.

Just because the site uses little resources on your screen does not mean
that my servers get a field day.

:)
