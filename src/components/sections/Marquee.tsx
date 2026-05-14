const items = [
  "Web Development",
  "IoT Projects",
  "Automation",
  "System Development",
  "Installations",
  "Machine Learning",
];

export function Marquee() {
  const repeated = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          {repeated.map((item, i) => (
            <span key={i}>
              {item}
              <i className="dot" />
            </span>
          ))}
        </span>
        <span aria-hidden>
          {repeated.map((item, i) => (
            <span key={i}>
              {item}
              <i className="dot" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
