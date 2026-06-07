/* eslint-disable @next/next/no-img-element */

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function BrandWatermark({ className, style }: Props) {
  return (
    <img
      className={`brand-wm ${className ?? ""}`}
      style={style}
      src="/Base%20Logo%20-%20Dark.png"
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
