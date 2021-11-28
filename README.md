# SEO Cheker

Simple on page [JS SEO checker](https://seo-cheker.github.io/), based on React, Redux and Chai

## Development
```sh
npm i
npm run start
```

## Installation 
Add this code to the page, before closing &lt;body&gt;
```html
<div id="seo-checker"></div>
<script defer="defer" src="https://seo-cheker.github.io/seo-checker.js"></script>
<link href="https://seo-cheker.github.io/seo-checker.css" rel="stylesheet">
```

## Custom config example
```json
[
  {
    "slug": "title",
    "name": "Page title",
    "selector": "title",
    "tests": [
      {
        "slug": "exists",
        "selector": "head > title",
        "name": "The page has title tag",
        "func": "expect(el).to.exist"
      }
    ]
  }
]
```