// Smoke test: run every artifact across the full progress range and assert no
// non-finite vertex data. A NaN position silently blanks geometry at runtime
// with no console error, so this is the cheapest way to catch it.
import { REGISTRY } from '../src/lib/scene/artifacts';

let bad = 0;
for (const [name, make] of Object.entries(REGISTRY)) {
  const a = make();
  for (let i = 0; i <= 20; i++) a.update(i / 20, i * 0.37);

  let n = 0;
  let nan = 0;
  a.group.traverse((o: any) => {
    const pos = o.geometry?.attributes?.position;
    if (!pos) return;
    for (let k = 0; k < pos.array.length; k++) {
      n++;
      if (!Number.isFinite(pos.array[k])) nan++;
    }
  });
  if (nan) bad++;
  console.log(`  ${name.padEnd(11)} verts=${String(n).padStart(6)}  ${nan ? `NaN x${nan}` : 'ok'}`);
  a.dispose();
}
console.log(bad ? `FAIL: ${bad} artifact(s) produced NaN` : 'PASS: all artifacts finite');
if (bad) process.exit(1);
