# SEO Cheker

Simple on page [JS SEO checker](https://seo-checker.github.io/), based on React, Redux and Chai

![banner](https://raw.githubusercontent.com/seo-checker/seo-cheker/master/assets/banner-1544x500.png)

## Development
```sh
npm i
npm run start
```

## Installation 
Add this code to the page, before closing &lt;body&gt;
```html
<div id="seo-checker"></div>
<script defer="defer" src="https://seo-checker.github.io/seo-checker.js"></script>
<link href="https://seo-checker.github.io/seo-checker.css" rel="stylesheet">
```

## OR 
Add this code to the page, before closing &lt;body&gt;
```html
<script>
  (function(s,e,o){a=s.body;c=s.createElement("div");c.id=e,a.appendChild(c);h=s.createElement("script");h.src=o+e+".js";a.appendChild(h);k=s.createElement("link");k.href=o+e+".css";k.rel="stylesheet";a.appendChild(k),s.seo=o})(document, "seo-checker", "https://seo-checker.github.io/")
</script>
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