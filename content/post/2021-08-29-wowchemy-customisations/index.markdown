---
title: Wowchemy customisations
author: Adam J Campbell
date: '2021-09-21'
slug: wowchemy-customisations
categories: []
tags: []
subtitle: ''
summary: ''
authors: []
#draft: false
#lastmod: '2021-08-29T06:35:17+12:00'
featured: no
image:
  caption: ''
  focal_point: 'Center'
  preview_only: no
  alt_text: 'graphic with text: wowchemy customisations'
projects: []

links:
 - name: "code"
   url: https://github.com/campbead/adamcampbell-website-update
   icon_pack: fab
   icon: github
---

I've recently changed this site over to the new [Wowchemy theme](https://wowchemy.com/) (formerly Hugo Academic).  With that change, I've made a few customisations along the way to the theme that I'd like to share.  There are two main resources I used when making this change, first Alison Hill's [Up & running with blogdown in 2021](https://alison.rbind.io/blog/2020-12-new-year-new-blogdown/), which is a great guide for going through the whole process of setting up the Wowchemy site.  Next, I can't highly recommend enough Isabella Benabaye's article [7 Ways You Can Further Customize the Hugo Academic Theme](https://isabella-b.com/blog/hugo-academic-customization/), it gets in-depth into customisations.  I recommend her whole website, it's got a great design that I've drawn lots of inspiration from here.

Let's get into the mods!

## How mods work in Wowchemy
Mods in Wowchemy come in a few different flavours.  

First, there are css-based mods where by adding custom css you change the style of your website.  These mods are achieved by adding css code into `/assets/scss/custom.scss`.

If you want to change the default content of a page this can be achieved using `.html`.  First, locate your theme folder's `/layouts/partials` subfolder within your `~/theme` folder, mine is `~/themes/github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5/layouts/partials`.  In this folder is all the `.html` code used to generate all the little bits of your website.  If you want to mod any of these bits you can copy the relevant `.html` file into your website's `~/layouts/partials`.

Once you've copied a file into your `~/layouts/partials` the Hugo builder will use that file instead of the theme file when building your site.

## Alt Text

Alt text is text that describes an image on your website.  Using alt text improves the accessibility of your website particularly for vision impaired readers.   

There are three types of images on the site where you might need to add alt text: featured image, referenced images, and generated images.

### Feeatured images

I use the portfolio widget to display all my posts.  Unfortunately this widget isn't set up to generate alt text by default.  The relevant code is in the `portfolio_li_card.html` file.  Copy that file from your themes `/themes/../layouts/partials`, to the root `/layouts/partials`.  

Add the following code into that file after the `{{/* Get summary. */}}` section:

```
{{/* Get alt text. */}}
{{ $alt := "" }}
{{ if $item.Params.image.alt_text }}
  {{ $alt = $item.Params.image.alt_text}}
{{ else}}
  {{ $alt = $item.Title }}
{{ end }}
```

Now when you can define alt text using the `alt_text` parameter in the frontmatter for your posts.  :tada:

### R script generated images
One option you have for generating images is having the code to generate the image directly in your R code as a chunk in your rmarkdown.  

The solution for adding alt text to images generated this way is described in this [rstudio forum post](https://community.rstudio.com/t/improve-the-accesibility-of-rmarkdown-created-html-documents/70722/11).  

You'll have to include a chunk at the top of your rmarkdown that helps define some custom knitr code. 

The chunk needs the header:
```
{r setup, include=FALSE}
```

And the body:
```
knitr::opts_chunk$set(
	echo = FALSE,
	message = FALSE,
	warning = FALSE
)
knitr::knit_hooks$set(plot = function(x,options) {
      base = knitr::opts_knit$get('base.url')
      if (is.null(base)) base = ''
      alt = ifelse (is.null(options$alt),"",options$alt)
      cap = ifelse (is.null(options$caption),"",options$caption)
      if (alt != ""){
        sprintf('![%s](%s%s "%s")', cap, base, x, alt)
      } else {
        sprintf('![%s](%s%s)', cap, base, x)  
        }
  })

```

Once you've done that you can include a `caption` tag in your code chunk header to generate alt text.  Here's an example:

```
{r myplot, echo=FALSE, message=FALSE, warning=FALSE, caption='bar graph of number is driving ciations drivers recieve each year in New Zealand. 3.368 million recieve zero, 0.01 million recieve 1, and 0.007 million recieved 2+', noalt=''}
```

### Normal images
You can also include linked images in your rmarkdown posts.  Generating alt text here is the easiest.  

It has the format:  

`![your alt text](link_to_image_file)`

for example:

`![Histrogram distrobution of correct answers during Cash Builder round.](correct_answer_distribution.png)`.

## Aliases
One thing that happened when I upgraded the site from Hugo to Wowchemy is that the addresses of my posts changed.  So if there was a social media post with a link to the old address of a post, the link wouldn't work.  To get around this, I set an alias in the front matter of each post.  

format:
```
aliases:
   - address_of_old_post
```

example:
```
aliases:
   - /post/mostdriversbetterthanaverage/
```
For the alias to be enabled you must make sure that `diasableAliases` is set to `false` in `config.yaml`

```
disableAliases: false
```

Now whenever someone links sends someone to an old post address, they'll be redirected to the new address.  Yay!

## Custom portfolio cards

Other than adding alt text (see above), I made two changes to the portfolio widget: removing the links icons on the card, and changing the hover image.

### Removing card icons

I didn't like all the links to be displayed on the cards.  I removed them by changing the code in `portfolio_li_card.html`.  There I simply commented out the following code section:

```
<!--
      {{ if $has_attachments }}
      <div class="btn-links">
        {{ partial "page_links" (dict "page" $item "is_list" 1) }}
      </div>
      {{ end }}
-->
```
### Changing card hover icon 

I wanted to change the hover icon on the portfolio cards.  I did this by changing `custom.scss` and adding the following: 

```
.card .card-image.hover-overlay::after{
    content: '\f0fc';
}
```

Check out all the icons available at [font awesome](https://fontawesome.com/v6.0/icons?d=gallery&p=1&s=solid&m=free).  Code the unicode for the icon and replace that in the `content` field.

## Custom date format

On my posts, I use both a published date and a last modified date.  I was tried if every time I fixed a typo of something the date that was displayed was the date I last fixed something on the post.  I'd much rather have both dates clearly visible.

To accomplish this I created a copy of `~/themes/github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5/layouts/partials/page_metadata.hmtl` (your exact folder structure may vary) in my `~/layouts/partials` folder.

The section I changed was:

```  
{{ if not (in (slice "event" "page") $page.Type) | and (ne $page.Params.show_date false) }}
  <span class="article-date">
    {{ $date := $page.Lastmod.Format site.Params.date_format }}
    {{ if eq $page.Type "publication" }}
      {{ $date = $page.Date.Format (site.Params.publications.date_format | default "January, 2006") }}
    {{ else }}
      {{ if ne $page.Params.Lastmod $page.Params.Date }}
          {{ i18n "last_updated" }}
      {{ end }}
    {{ end }}
    {{ $date }}
  </span>
  {{ end }}
```

to: 

```
  {{ if not (in (slice "event" "page") $page.Type) | and (ne $page.Params.show_date false) }}

  <span class="article-date"> 
    {{ $Odate := $page.Date.Format site.Params.date_format }}
    {{ if eq $page.Type "publication" }}
      {{ $Odate = $page.Date.Format (site.Params.publications.date_format | default "January, 2006") }}
    {{ end }}
  Published on {{ $Odate }} 
  </span>

  <span class="article-date">
    {{ $date := $page.Lastmod.Format site.Params.date_format }}
    {{ if eq $page.Type "publication" }}
      {{ $date = $page.Date.Format (site.Params.publications.date_format | default "January, 2006") }}
    {{ else }}
      {{ if ne $page.Params.Lastmod $page.Params.Date }}
      <span class="middot-divider"></span>
         {{ i18n "last_updated" }}
         {{ $date }}
      {{ end }}
    {{ end }}
  </span>
  {{ end }}
 
```
I'm not an expert in JavaScript (this is JavaScript right?), but I was able to modify this enough to get the desired results.  It's not 100% perfect because I use the English language for `Published on` rather than using a call to sheet with many translations as is used for last updated.  Oh well.

