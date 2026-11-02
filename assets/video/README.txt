Hero background video (home page)
=================================
Put these files in this folder and the home page uses them automatically:

  hero.mp4      1280x720, H.264, no audio      (desktop)
  hero-sm.mp4   720x406 or smaller, H.264      (phones, saves data)
  hero.webm     optional VP9 version           (smaller on modern browsers)

If the files are missing the page simply keeps the photo, so nothing breaks.
Visitors with "reduce motion" or data-saver turned on, or on a very slow connection, see the photo instead.

Convert your own file with ffmpeg (8-15 seconds, a seamless loop works best):

  ffmpeg -i source.mp4 -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart hero.mp4
  ffmpeg -i source.mp4 -an -vf "scale=720:-2"  -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart hero-sm.mp4
  ffmpeg -i source.mp4 -an -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 36 hero.webm
