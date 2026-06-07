"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="notfound">
      <span className="notfound-code" style={{ color: "#ef4444" }}>Error</span>
      <h1>Something went wrong.</h1>
      <p>
        An unexpected error occurred. Try again or email us at{" "}
        <a href="mailto:dahamdissanayake05@gmail.com" style={{ color: "var(--accent)" }}>
          dahamdissanayake05@gmail.com
        </a>
      </p>
      <button className="btn btn-primary" onClick={reset}>
        <span className="dot" /> Try again
      </button>
    </div>
  );
}
