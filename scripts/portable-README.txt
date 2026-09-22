ALOHA FIBER - website
Independent Authorized Retailer of Aloha Broadband
===================================================

HOW TO VIEW IT
--------------
Unzip this folder anywhere, then double-click  index.html

That is all. No installation, no server, no internet connection needed.
Every file the site uses is inside this folder and is referenced by a
relative path, so it runs straight from your desktop.

All the links work, including the eight legal pages.


HOW TO PUT IT ONLINE
--------------------
Upload the CONTENTS of this folder (not the folder itself) to your web root
- public_html, httpdocs, an S3 bucket, Netlify, or any static host.

There is no build step and no server-side code. Relative paths work on a web
server exactly as they do locally.


WHAT IS IN HERE
---------------
  index.html                 The main page
  privacy.html               ) The eight legal pages
  disclaimer.html            )
  cookies.html               )
  tcpa.html                  )
  trademarks.html            )
  marketing-policy.html      )
  service-fulfillment.html   )
  pci-dss.html               )
  404.html                   Not-found page
  images/                    Photography (full size + smaller phone versions)
  _next/                     Stylesheets, scripts and fonts

Do not rename or move the _next or images folders. The pages look for them
by name, next to the HTML files.


ABOUT THE SITE
--------------
  - Works from 320px phone width up to desktop
  - Phones are served smaller images automatically, about a third of the
    weight, and a lighter version of the background effects
  - Respects the operating system's "reduce motion" setting
  - The ZIP availability checker runs entirely in the browser. It does not
    send anything anywhere


TWO THINGS TO CHANGE BEFORE THIS GOES LIVE
------------------------------------------
1. THE PHONE NUMBER is (808) 555-0142, a placeholder from the range reserved
   for fictional use. It appears in the header, the hero, every plan button
   and the footer. Replace it before publishing.

2. THE LEGAL PAGES are complete drafts, not legal advice. Have them reviewed,
   and fill in the entity name, postal address and privacy contact.

Both are edited in the source project and rebuilt. Editing these HTML files
by hand means changing the same text in several places.
