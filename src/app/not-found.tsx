import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-code">404</span>
      <h1>This node doesn&apos;t exist.</h1>
      <p>The page you&apos;re looking for has been moved, deleted, or never built — but every other node is still running.</p>
      <Link href="/" className="btn btn-primary">
        <span className="dot" /> Back home
      </Link>
    </div>
  );
}
