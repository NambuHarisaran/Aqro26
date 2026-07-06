export default function BrandMark({ className = '', imageClassName = '', showWordmark = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/transparent.png"
        alt="AQRO Studio logo"
        draggable="false"
        className={`block shrink-0 object-contain ${imageClassName}`}
      />
      {showWordmark && (
        <span className="display-tight text-xl tracking-wide">
          AQRO <span className="text-amber">STUDIO</span>
        </span>
      )}
    </span>
  )
}