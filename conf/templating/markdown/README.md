# Boehs Flavoured Markdown

Boehs.org uses a pretty ugly derivative of markdown that enables a lot of special features. This is an attempt to document it. No features result in runtime javascript execution unless explicitly denoted.

## Blocks

### Code blocks

Code blocks are denoted using the standard triple backticks, with an optional language specifier: \`\`\`language. Languages specifiers enable syntax highlighting using [shiki](https://shiki.matsu.io/).

There are some special language specifiers that produce something other than syntax highlighting:

#### `pintora`

This will use [`Pintora.js`](https://pintorajs.vercel.app/) to render the code block as a diagram. Mermaid.js is not supported, due to a lack of [SSR](https://github.com/mermaid-js/mermaid/issues/3650) support.

#### `js exec`

This evaluates the code block as javascript _at build time_, and displays the return value. The javascript code has access to the following variables:

-   globals:
    -   `window`: Can be used to access a virtual DOM created by `jsdom`.
-   function scoped:
    -   `d3`: The d3 library.
    -   `Plot`: The Observable Plot library.
    -   `h`: An object containing custom helper functions.
        -   `h.read`: An object containing the following functions:
            -   `h.read.csv`: Reads a CSV file.
            -   `h.read.read`: Reads a file. Makes no assumptions about the file format.
            -   `h.read.text`: Reads a text file.

### Produce Details

```
::: details Summary
Content
:::
```

### Produce figure

```
::: figure Figcaption
Figure
:::
```

## Inline

### Wikilinks

```
[[easy]]
```

### Add attributes to block

```
xyz {style="margin-block-end: 0" class="xyz"}
```

## Misc

### Table of contents

```
[[toc]]
```

### Footnotes

```
xyz[^1]

[^1]: abc
```

### Attribution

```
> Quote
> -- Evan Boehs
```

## Boehs Specific

### PenPen

_A fictional character, who is smarter than my dog, penny. She sometimes interjects to add important context about the author, wherever relevant, or to add information that doesn’t fit into the general flow of an article._

Changes styling.

```
> [[PenPen]]'s Note:
```
