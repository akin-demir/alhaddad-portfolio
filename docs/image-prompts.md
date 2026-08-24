# Project cover image prompts

Working notes for generating project cover art. Tracked in git so we can
retrace or regenerate consistently — **never published**: Astro only serves
`src/pages/` routes and `public/`, so nothing under `docs/` reaches the site.

Cover images are illustrative, not documentary. Deliberately avoid fabricated
UI, invented metrics, or anything that could read as evidence of the work
rather than decoration. Alt text should describe the image honestly, not imply
it is a screenshot of the real system.

## Status

| # | Project | Slug | Generated | Model | Asset |
|---|---------|------|-----------|-------|-------|
| 1 | Enterprise Knowledge Graph | `enterprise-knowledge-graph` | ☐ | — | — |
| 2 | Document Intelligence Suite | `document-intelligence-suite` | ☐ | — | — |
| 3 | Tunnel & Highway Incident Detection | `tunnel-incident-detection` | ☐ | — | — |
| 4 | Rail Crossing Incident Detection | `rail-crossing-detection` | ☐ | — | — |
| 5 | 3D Port Container Scanner | `port-container-scanner` | ☐ | — | — |

## Output requirements

- **Aspect ratio 16:10**, minimum **1600×1000** (cards crop to 16:10; detail
  pages render up to 1280px wide, so smaller sources look soft on retina).
- Midjourney: append `--ar 16:10 --style raw` — `raw` suppresses the default
  stylisation that makes output read as "AI art".
- If a result looks too clinical, add: `slightly imperfect framing, natural
  sensor noise, minor lens vignetting`.

## House style suffix

Append to every prompt below. This is what makes the five read as one set.

```
Shot on a full-frame camera, 35mm lens, f/2.8, natural depth of field.
Muted desaturated palette of deep charcoal, slate blue, and warm amber
accent light. Cinematic low-key lighting, soft volumetric haze, subtle
film grain. Photorealistic, editorial tech-documentary style.
Landscape 16:10 composition with clear negative space in the upper third.
No text, no logos, no watermarks, no UI overlays, no readable numbers,
no people's faces in focus.
```

---

## 1. Enterprise Knowledge Graph

```
A darkened data-center corridor at night, one rack door open with soft
amber indicator LEDs. In the foreground, out-of-focus glass panel with a
faint constellation of interconnected light points and thin lines
suggesting a network graph, reflected in the surface. Depth and layering,
strong bokeh, sense of vast interconnected scale.
```

## 2. Document Intelligence Suite

```
Overhead macro shot of a stack of creased paper invoices and receipts on
a dark matte desk surface, slightly askew, one lit by a narrow band of
warm light as if being scanned. Fine paper texture, visible fibre and
fold shadows. Blurred, illegible print — no readable text. A thin bar of
cool blue light sweeping across the page.
```

## 3. Tunnel & Highway Incident Detection

```
Interior of a road tunnel at night, viewed from a raised camera position.
Sodium-orange tunnel lighting receding into the distance, light vehicle
motion blur, wet asphalt reflections. A traffic monitoring camera housing
mounted on the tunnel wall in the near foreground, sharp against the
blurred depth of the tunnel beyond.
```

## 4. Rail Crossing Incident Detection

```
A level rail crossing at dusk in light rain, barriers lowered, warning
lights glowing red and diffusing in the mist. Steel rails catching the
last light, receding to a vanishing point. A weatherproof monitoring
camera on a pole in the mid-foreground, slightly out of focus. Empty,
tense, still atmosphere.
```

## 5. 3D Port Container Scanner

```
A shipping container passing through an industrial scanning gantry at a
working port, early morning, cool blue light with amber sodium lamps.
Weathered container steel with scuffs and rust streaks, structural gantry
framing the shot. Faint haze, long shadows, industrial scale.
```

---

## Wiring a finished image in

1. Drop the file in `_inbox/` (gitignored) or straight into
   `src/assets/projects/<slug>.<ext>`.
2. Add to the project's frontmatter in `content/projects/<slug>.md`:

   ```yaml
   cover: ../../src/assets/projects/<slug>.png
   coverAlt: <honest description of the image itself>
   ```

3. `npm run build` — the schema validates the path, so a typo fails locally
   rather than shipping a broken page.

Never put a displayed image in `public/` — it skips Astro's optimizer and
ships the full-size original.
