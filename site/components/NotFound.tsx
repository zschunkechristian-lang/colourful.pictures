import { Nav } from "./Shell";
import "../styles/fonts.css";
import "../styles/site.css";

/** Shown for unknown URLs (and server errors): the site frame with a short message. */
export function NotFound() {
  return (
    <body>
      <div className="frame">
        <Nav />
        <main className="content">
          <div className="closing" style={{ minHeight: "70lvh" }}>
            <p style={{ margin: 0 }}>
              This page doesn't exist.
              <br />
              <a href="/">Back to the work</a>
            </p>
          </div>
        </main>
      </div>
    </body>
  );
}
