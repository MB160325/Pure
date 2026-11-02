HERO VIDEO (installed)
hero.mp4     1280x408, H.264, no audio, faststart, ~0.6 MB  (desktop + fallback)
hero-sm.mp4  1130x360, H.264, no audio, faststart, ~0.4 MB  (phones)
hero.webm    1280x408, VP9, ~0.4 MB                          (desktop browsers that support it)

To replace: keep the same file names, no audio, under 20 MB (phone file under 8 MB), 1280x720 or smaller.
  ffmpeg -i in.mp4 -an -vf "scale=-2:720,format=yuv420p" -c:v libx264 -crf 24 -r 30 -movflags +faststart hero.mp4
Your web host must support HTTP Range requests (all normal hosts do; iPhone needs this).
Diagnose on a phone: open the page with ?herodebug=1
