# Experience vertical media

The home page combines three generated illustrative scenes with original road
and rail project media. Scene images and gallery thumbnails live in
`src/assets/verticals/` and are rendered through Astro's image optimizer.
Videos live in `public/files/demos/` and load only when their preview is opened.
No Drive credentials or temporary download links are shipped to the browser.

Copy is editable in `content/verticals.json` for English, German, Turkish and
Arabic. Project names come from the existing localized project collection.
Meeting audio projects retain their R&D label.

## Original sources

- Rail crossing: https://drive.google.com/file/d/1iplKUxAwTOtl7KflHBodBObfNBFHfwQW/view
  `serbia.mp4` → `rail-crossing.mp4` (original, approximately 14 seconds).
- Night junction: https://drive.google.com/file/d/16gKaD_n6S5Bz5Ptjz8NtGp7PD4E-XFVe/view
  `CLIP_20200925-204112_37.png` → `junction-detection.png`.
- Highway tracking: https://drive.google.com/file/d/1VRzxdWMM6WD8rHby0m60qa77mwhBu8Cb/view
  `burucuk01.ogv` → `highway-tracking.mp4` (approximately 5 seconds).
- Highway detection: https://drive.google.com/file/d/1iu_8_y3xNJwFqECfx5VElYSN6ZfCmY-z/view
  `buruncuk-02.ogv` → `highway-detection.mp4` (approximately 5 seconds).

The OGV files were converted to H.264 MP4 with fast-start metadata and no audio.
Posters were extracted from the clips. Source proportions and detection output
are preserved. The generated scenes are labeled illustrative and do not serve
as deployment evidence. The field clips show detection/tracking, not confirmed
ANPR output.

## Motion and accessibility

Scene annotations have finite animations, paused outside the viewport, and are
hidden for reduced-motion preferences. Small screens retain aligned vehicle and plate boxes, while omitting the larger ANPR panel and other scene animations. Gallery previews
use native dialogs with labeled controls, Escape dismissal, focus restoration,
and video pause on close or page navigation. Videos have native playback
controls and do not download until opened.

The transport annotation uses the source image coordinate system and the same
cover crop as the photograph, so vehicle and plate boxes stay aligned when the
scene resizes. ANPR recognition is explicitly labeled as illustrative sample
output. The home page uses verticals in place of the former Selected Work grid.
