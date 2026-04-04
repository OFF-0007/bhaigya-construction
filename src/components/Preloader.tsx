export default function Preloader() {
  return (
    <div id="preloader" role="status" aria-label="Loading Bhaigya Construction">
      <div className="preloader-logo">
        <span className="preloader-icon">⬡</span>
        <span className="preloader-name">BHAIGYA</span>
      </div>
      <span className="preloader-sub">Construction · Assam</span>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar"></div>
      </div>
      <span className="preloader-text">Crafting Excellence…</span>
    </div>
  );
}
