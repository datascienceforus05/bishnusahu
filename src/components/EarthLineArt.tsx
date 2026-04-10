export default function EarthLineArt() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 900"
        className="earth-line-art absolute -bottom-[410px] -right-[220px] h-[980px] w-[980px] opacity-35"
      >
        <g fill="none" stroke="rgba(201,168,108,0.26)" strokeWidth="1.15">
          <circle cx="600" cy="450" r="330" />
          <ellipse cx="600" cy="450" rx="330" ry="250" />
          <ellipse cx="600" cy="450" rx="330" ry="150" />
          <ellipse cx="600" cy="450" rx="250" ry="330" />
          <ellipse cx="600" cy="450" rx="170" ry="330" />
          <path d="M270,450 C370,360 470,320 600,320 C730,320 830,360 930,450" />
          <path d="M270,450 C370,540 470,580 600,580 C730,580 830,540 930,450" />
          <path d="M300,355 C430,430 760,430 900,555" />
          <path d="M300,555 C430,480 760,480 900,355" />
        </g>
      </svg>
    </div>
  );
}
