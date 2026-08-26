export default function Skeleton({ className = '', style, variant = 'text', lines = 1 }) {
  const baseStyle = {
    background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px',
    ...style,
  }

  if (variant === 'poster') {
    return (
      <div className={`skeleton skeleton--poster ${className}`} style={{ aspectRatio: '2/3', borderRadius: '8px', overflow: 'hidden', ...style }}>
        <div style={{ ...baseStyle, width: '100%', height: '100%' }} />
      </div>
    )
  }

  if (variant === 'backdrop') {
    return (
      <div className={`skeleton skeleton--backdrop ${className}`} style={{ aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', ...style }}>
        <div style={{ ...baseStyle, width: '100%', height: '100%' }} />
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <article className={`skeleton skeleton--card ${className}`} style={{ ...style }}>
        <div style={{ aspectRatio: '2/3', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem' }}>
          <div style={{ ...baseStyle, width: '100%', height: '100%' }} />
        </div>
        <div style={{ ...baseStyle, width: '60%', height: '1.25rem', marginBottom: '0.5rem' }} />
        <div style={{ ...baseStyle, width: '40%', height: '1rem' }} />
      </article>
    )
  }

  return (
    <div className={`skeleton ${className}`} style={{ ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ ...baseStyle, height: '1rem', width: i === lines - 1 ? '70%' : '100%', marginBottom: lines > 1 && i < lines - 1 ? '0.5rem' : 0 }} />
      ))}
    </div>
  )
}