Hero background video (home page)
=================================
Put these files in this folder and the home page uses them automatically:

  hero.mp4      1280x720, H.264, no audio, under 20 MB   (laptops)
  hero-sm.mp4   720x406 or smaller, H.264, under 8 MB    (phones)
  hero.webm     optional VP9 version                      (laptops, even smaller)

The page protects itself: a file that is too big, too high-resolution (4K), cannot be played, or makes the
device drop frames is skipped and the photo stays. Nothing breaks, but the video will not show.

To see exactly why the video is or is not playing, open the site with  ?herodebug=1  at the end of the address,
for example  https://your-site.com/?herodebug=1  and read the green box at the bottom of the screen.

Convert your own file with HandBrake (free): preset "Fast 720p30", tick "Web Optimized", set Audio to none,
Quality RF 27. Or with ffmpeg:

  ffmpeg -i source.mp4 -an -r 30 -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart hero.mp4
  ffmpeg -i source.mp4 -an -r 30 -vf "scale=720:-2"  -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart hero-sm.mp4
  ffmpeg -i source.mp4 -an -r 30 -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 36 hero.webm
