#!/usr/bin/env bash
#
# Encode a screen recording into a web-ready looping demo + poster frame.
#
#   ./scripts/encode.sh ~/Desktop/raw.mov felix          # whole clip
#   ./scripts/encode.sh ~/Desktop/raw.mov felix 3 12     # 12s starting at 0:03
#
# Writes public/media/<slug>.mp4 and public/media/<slug>.jpg, then tells you the
# one line to add to src/data/projects.ts.

set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: $0 <input.mov> <slug> [start-seconds] [duration-seconds]" >&2
  exit 64
fi

IN=$1
SLUG=$2
START=${3:-0}
DURATION=${4:-12}

command -v ffmpeg >/dev/null || {
  echo "ffmpeg not found — install it with: brew install ffmpeg" >&2
  exit 69
}
[ -f "$IN" ] || { echo "no such file: $IN" >&2; exit 66; }

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT_DIR"

MP4="$OUT_DIR/$SLUG.mp4"
JPG="$OUT_DIR/$SLUG.jpg"

# -ss before -i is a fast input seek.
# -pix_fmt yuv420p is REQUIRED for Safari/iOS; without it the video plays in
#   Chrome and shows black in Safari.
# -2 keeps the height even, which yuv420p requires.
# +faststart moves the moov atom to the front so playback can start before the
#   file finishes downloading.
# -an strips audio; these play muted, so it is dead weight.
ffmpeg -hide_banner -loglevel warning -y \
  -ss "$START" -t "$DURATION" -i "$IN" \
  -vf "scale=1280:-2:flags=lanczos,fps=30" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 27 -preset slow -tune stillimage \
  -movflags +faststart -an \
  "$MP4"

# Poster frame. Half a second in, to skip any black lead-in — this still is what
# most visitors actually see, so pick a timestamp that looks good.
ffmpeg -hide_banner -loglevel warning -y \
  -ss 0.5 -i "$MP4" -frames:v 1 -q:v 3 "$JPG"

echo
echo "wrote:"
ls -lh "$MP4" "$JPG" | awk '{print "  " $9 "  " $5}'
echo
echo "budget: mp4 <= 1.5 MB, poster <= 120 KB."
echo "  over? re-run with a higher -crf (30) or scale=960:-2 in this script."
echo
echo "now add to src/data/projects.ts on the \"$SLUG\" project:"
echo "  visual: video(\"$SLUG\", \"<describe what the clip shows>\"),"
echo "and make sure \`video\` is imported from ../lib/media."
