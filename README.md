# make.fun TikTok ad — bring-the-humans-03

A 24-second vertical (1080x1920) TikTok ad for make.fun, made for the
bring-the-humans-03 bounty. The video is voiced in Indonesian, uses real
GTA 6 gameplay footage, and ends on make.fun's referral card with the
entrant's own referral code.

Posted video: https://www.tiktok.com/@fadilekoutomoo/video/7710982914271497492

Play code (in the TikTok caption): makefun-barnyard-cobalt-ruby

## How the entry program works

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
bot directory into the output directory, then reads the copy back and
checks it is a JSON object with a non-empty string `url` that starts
with `https://www.tiktok.com/`. It exits non-zero with a clear error if
the copy fails, the JSON does not parse, or the URL is missing or not a
TikTok link — so a broken entry can never pass as valid.

Run it locally with:

    MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
