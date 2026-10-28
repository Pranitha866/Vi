import { useState } from "react";

import { D, ALIAS } from "./data.js";
import Diagram from "./diagram.jsx";
import Quiz from "./quiz.jsx";


const TERM_HINT = "Tap a term to see its meaning.";

export default function App() {
  // ---- state: values that change and make the screen update ----
  const [topic, setTopic] = useState("Electric circuit");
  const [L, setL] = useState(0); // 0 = School, 1 = College
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [act, setAct] = useState(0); // which diagram step is active
  const [playing, setPlaying] = useState(false);
  const [tdef, setTdef] = useState(TERM_HINT);

  const d = D[topic];
  const node = d.nodes[act];

  function load(name) {
    setTopic(name);
    setAct(0);
    setPlaying(false);
    setMsg("");
    setTdef(TERM_HINT);
  }

  function search() {
    const v = query.trim().toLowerCase();
    if (!v) return;
    const hit =
      Object.keys(D).find((k) => k.toLowerCase() === v) ||
      Object.keys(ALIAS)
        .filter((k) => v.includes(k))
        .map((k) => ALIAS[k])[0];
    if (hit) return load(hit);
    setMsg("Try: " + Object.keys(D).join(", ") + ".");
  }

  function changeLevel(level) {
    setL(level);
    setTdef(TERM_HINT);
  }

  return (
    <main>
      <h1>VisualVerse</h1>
      <div className="sub">
        Watch a concept move, then check what you learned. <small>React</small>
      </div>

      <div className="row">
        <div className="seg">
          <button className={L === 0 ? "on" : ""} onClick={() => changeLevel(0)}>
            School
          </button>
          <button className={L === 1 ? "on" : ""} onClick={() => changeLevel(1)}>
            College
          </button>
        </div>
      </div>

      <div className="row">
        <input
          type="text"
          placeholder='Type any topic, e.g. "water"'
          aria-label="Topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
      </div>
      <div className="row">
        <button className="go" onClick={search}>Show me</button>
      </div>

      <div className="row">
        {Object.keys(D).map((k) => (
          <button
            key={k}
            className={"chip" + (k === topic ? " on" : "")}
            onClick={() => load(k)}
          >
            {k}
          </button>
        ))}
      </div>

      {msg && <div className="hint">{msg}</div>}

      <section>
        <h2>1. Definition</h2>
        <h3>{topic}</h3>
        <p>{d.def[L]}</p>
      </section>

      {/* key={topic} makes React start this component fresh for each topic */}
      <Diagram
        key={topic}
        d={d}
        L={L}
        act={act}
        setAct={setAct}
        playing={playing}
        setPlaying={setPlaying}
      />

      <section>
        <h2>3. How it works</h2>
        <div className="step">
          Step {act + 1} of {d.nodes.length}: {node.t}
        </div>
        <p>{node.s[L]}</p>
      </section>

      <section>
        <h2>4. Key terms</h2>
        <div className="row">
          {d.terms.map((x) => (
            <button key={x[0]} className="chip" onClick={() => setTdef(x[1 + L])}>
              {x[0]}
            </button>
          ))}
        </div>
        <p className="hint" style={{ marginTop: 0 }}>{tdef}</p>
        <hr />
        <h2>In real life</h2>
        <p>{d.real[L]}</p>
      </section>

      <section>
        <h2>5. Quiz</h2>
        <Quiz key={topic} quiz={d.quiz} />
      </section>
    </main>
  );
}
