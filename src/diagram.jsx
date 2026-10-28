import { useEffect, useMemo, useRef, useState } from "react";

const HINT = "Tap a part of the diagram to learn about it.";

// Works out the path length and where each step sits along the path
function geometry(d) {
  const ns = d.nodes;
  const pts = d.pts || ns.map((n) => [n.x, n.y]);
  const segs = pts.map((p, i) => {
    const m = pts[(i + 1) % pts.length];
    return Math.hypot(m[0] - p[0], m[1] - p[1]);
  });
  const total = segs.reduce((a, b) => a + b, 0);
  const at = [0];
  let run = 0;
  segs.forEach((s) => { run += s; at.push(run / total); });
  const cum = ns.map((n, i) => at[n.p !== undefined ? n.p : i]);
  const pathD = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join("") + "Z";
  return { pts, segs, total, cum, pathD };
}

// Finds the (x, y) of the moving dot for a fraction 0..1 of the path
function pointAt(g, frac) {
  let target = frac * g.total;
  for (let i = 0; i < g.pts.length; i++) {
    if (target <= g.segs[i] || i === g.pts.length - 1) {
      const a = g.pts[i];
      const b = g.pts[(i + 1) % g.pts.length];
      const k = g.segs[i] ? Math.min(1, target / g.segs[i]) : 0;
      return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k };
    }
    target -= g.segs[i];
  }
  return { x: g.pts[0][0], y: g.pts[0][1] };
}

export default function Diagram({ d, L, act, setAct, playing, setPlaying }) {
  const g = useMemo(() => geometry(d), [d]);
  const [t, setT] = useState(0);        // dot position along the path (0..1)
  const [speed, setSpeed] = useState(1);
  const [info, setInfo] = useState(HINT);
  const tRef = useRef(0);
  const speedRef = useRef(1);
  const svgRef = useRef(null);
  speedRef.current = speed;

  // Jump to a step
  function go(i) {
    const n = g.cum.length;
    const a = (i + n) % n;
    setAct(a);
    tRef.current = g.cum[a];
    setT(g.cum[a]);
  }

  // Animation loop: runs only while "playing" is true
  useEffect(() => {
    if (!playing) return;
    let raf;
    let last = performance.now();
    const loop = (ts) => {
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      tRef.current = (tRef.current + dt * 0.08 * speedRef.current) % 1;
      setT(tRef.current);
      let a = 0;
      g.cum.forEach((c, i) => { if (tRef.current >= c) a = i; });
      setAct(a);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, g, setAct]);

  // Circuit only: close the switch and light the bulb while playing
  useEffect(() => {
    const s = svgRef.current;
    if (!s) return;
    const arm = s.querySelector("#arm");
    const bulb = s.querySelector("#bulb");
    if (arm) {
      arm.setAttribute("y2", playing ? 200 : 176);
      arm.setAttribute("x2", playing ? 225 : 215);
    }
    if (bulb) bulb.setAttribute("fill", playing ? "#f5d24a55" : "none");
  }, [playing, d]);

  const pos = pointAt(g, t);

  return (
    <section>
      <h2>2. Diagram</h2>
      <svg ref={svgRef} viewBox="0 0 400 260" role="img" aria-label="Animated diagram">
        <path
          d={g.pathD}
          fill="none"
          className={d.deco ? undefined : "wire"}
          stroke={d.deco ? "none" : undefined}
        />

        {d.deco ? (
          <g dangerouslySetInnerHTML={{ __html: d.deco }} />
        ) : (
          d.nodes.map((n) => (
            <g key={n.l}>
              <circle cx={n.x} cy={n.y} r="16" fill="#111923" stroke="#8a93a6" strokeWidth="3" />
              <text
                x={n.x}
                y={n.y + (n.y < 130 ? -24 : 34)}
                textAnchor="middle"
                style={{ fontSize: "13px" }}
              >
                {n.l}
              </text>
            </g>
          ))
        )}

        {d.nodes.map((n, i) => {
          const w = n.bw || 70;
          const h = n.bh || 52;
          const cw = Math.max(w, 50);
          const ch = Math.max(h, 50);
          return (
            <g key={"hit" + n.l}>
              {i === act && (
                <rect className="hl" x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx="10" />
              )}
              <rect
                className="pt"
                fill="transparent"
                x={n.x - cw / 2}
                y={n.y - ch / 2}
                width={cw}
                height={ch}
                onClick={() => { go(i); setInfo(n.l + ": " + n.s[L]); }}
              />
            </g>
          );
        })}

        <circle id="dot" r="7" cx={pos.x} cy={pos.y} />
      </svg>

      <div className="dots">
        {d.nodes.map((n, i) => (
          <i key={n.l} className={i === act ? "on" : ""} onClick={() => go(i)} />
        ))}
      </div>

      <div className="ctl">
        <button disabled={act === 0} onClick={() => { setPlaying(false); go(act - 1); }}>
          Back
        </button>
        <button className="go" onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={() => { setPlaying(false); go(act + 1); }}>Next</button>
      </div>

      <div className="spd">
        Speed
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
        />
        <b>{speed}x</b>
      </div>

      <p className="hint">{info}</p>
    </section>
  );
}
