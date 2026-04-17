export default function Preloader() {
  return (
    <div id="preloader" role="status" aria-label="Loading Bhaigya Construction">
      <div className="preloader-logo">
        <img src="/BGC.jpeg" alt="Bhaigya Construction Logo" style={{ height: '50px', width: 'auto', borderRadius: '4px', marginBottom: '8px' }} />
      </div>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar"></div>
      </div>
      <span className="preloader-text">Crafting Excellence…</span>
    </div>
  );
}
