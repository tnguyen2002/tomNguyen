import type { Track } from "./types";
import { trackCover } from "../lib/media";

/**
 * Albums and soundtracks, resolved from the Spotify links you sent: titles and
 * artists come from Spotify's own entity data, cover art from its CDN at 600px
 * in public/media/tracks/, and `href` points back at the exact album.
 *
 * Tile titles are shortened where the full name is unwieldy:
 *   x  →  x (Deluxe Edition)
 *   Nine Track Mind  →  Nine Track Mind (Deluxe Edition)
 *   Made in the A.M.  →  Made In The A.M. (Deluxe Edition)
 *   Into the Spider-Verse  →  Spider-Man: Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)
 *   Shang-Chi: The Album  →  Shang-Chi and The Legend of The Ten Rings: The Album
 *
 * TODO(tom): no songs yet — that row does not render while the list has none.
 * Send Spotify links and it appears.
 */
export const tracks: Track[] = [
  {
    slug: "gnx",
    title: "GNX",
    artist: "Kendrick Lamar",
    kind: "album",
    cover: trackCover("gnx"),
    href: "https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW",
  },
  {
    slug: "divide",
    title: "÷ (Deluxe)",
    artist: "Ed Sheeran",
    kind: "album",
    cover: trackCover("divide"),
    href: "https://open.spotify.com/album/3T4tUhGYeRNVUGevb0wThu",
  },
  {
    slug: "multiply",
    title: "x",
    artist: "Ed Sheeran",
    kind: "album",
    cover: trackCover("multiply"),
    href: "https://open.spotify.com/album/1xn54DMo2qIqBuMqHtUsFd",
  },
  {
    slug: "night-visions",
    title: "Night Visions",
    artist: "Imagine Dragons",
    kind: "album",
    cover: trackCover("night-visions"),
    href: "https://open.spotify.com/album/6htgf3qv7vGcsdxLCDxKp8",
  },
  {
    slug: "doo-wops-and-hooligans",
    title: "Doo-Wops & Hooligans",
    artist: "Bruno Mars",
    kind: "album",
    cover: trackCover("doo-wops-and-hooligans"),
    href: "https://open.spotify.com/album/1uyf3l2d4XYwiEqAb7t7fX",
  },
  {
    slug: "nine-track-mind",
    title: "Nine Track Mind",
    artist: "Charlie Puth",
    kind: "album",
    cover: trackCover("nine-track-mind"),
    href: "https://open.spotify.com/album/1OSzM1OWqtTnmIJJQpn62Q",
  },
  {
    slug: "made-in-the-am",
    title: "Made in the A.M.",
    artist: "One Direction",
    kind: "album",
    cover: trackCover("made-in-the-am"),
    href: "https://open.spotify.com/album/1gMxiQQSg5zeu4htBosASY",
  },
  {
    slug: "memories-do-not-open",
    title: "Memories...Do Not Open",
    artist: "The Chainsmokers",
    kind: "album",
    cover: trackCover("memories-do-not-open"),
    href: "https://open.spotify.com/album/4JPguzRps3kuWDD5GS6oXr",
  },
  {
    slug: "so-in-love",
    title: "you seem pretty sad for a girl so in love",
    artist: "Olivia Rodrigo",
    kind: "album",
    cover: trackCover("so-in-love"),
    href: "https://open.spotify.com/album/3WZZF72ihlKPZBS4zSsNHl",
  },
  {
    slug: "into-the-spider-verse",
    title: "Into the Spider-Verse",
    artist: "Various Artists",
    kind: "album",
    cover: trackCover("into-the-spider-verse"),
    href: "https://open.spotify.com/album/35s58BRTGAEWztPo9WqCIs",
  },
  {
    slug: "shang-chi",
    title: "Shang-Chi: The Album",
    artist: "88rising",
    kind: "album",
    cover: trackCover("shang-chi"),
    href: "https://open.spotify.com/album/2kAqjStKcwlDD59H0llhGC",
  },
  {
    slug: "f1-the-movie",
    title: "F1: The Movie",
    artist: "Hans Zimmer",
    kind: "soundtrack",
    cover: trackCover("f1-the-movie"),
    href: "https://open.spotify.com/album/4gSjcFEVpPS52oGqEOJGyj",
  },
  {
    slug: "arrow-s1",
    title: "Arrow: Season 1",
    artist: "Blake Neely",
    kind: "soundtrack",
    cover: trackCover("arrow-s1"),
    href: "https://open.spotify.com/album/0Hsit07149488kiRI1UiaJ",
  },
  {
    slug: "the-flash-s1",
    title: "The Flash: Season 1",
    artist: "Blake Neely",
    kind: "soundtrack",
    cover: trackCover("the-flash-s1"),
    href: "https://open.spotify.com/album/0xiJwfDcZRQ77bsbjS9TF5",
  },
  {
    slug: "jujutsu-kaisen-s3",
    title: "Jujutsu Kaisen: Season 3",
    artist: "Yoshimasa Terui",
    kind: "soundtrack",
    cover: trackCover("jujutsu-kaisen-s3"),
    href: "https://open.spotify.com/album/130ALCkyGuUdB8Jly6bXJd",
  },
];
