import { Icon } from './Icon'

export default function RatingStars({ rating, size = 'md', max = 5 }) {
  const sizeMap = { sm: 14, md: 18, lg: 22 }
  const iconSize = sizeMap[size] || 18
  const valor = Math.round(rating)

  return (
    <div className={`rating rating--${size}`} aria-label={`${rating.toFixed(1)} de ${max} estrellas`}>
      {[...Array(max)].map((_, i) => (
        <Icon
          key={i}
          name={i < valor ? 'star' : 'starOutline'}
          size={iconSize}
          className={i < valor ? 'rating__star--filled' : ''}
          aria-hidden
        />
      ))}
    </div>
  )
}