import { useState, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export default function SearchBar({ onBuscar, placeholder = 'Buscar películas...' }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onBuscar(value)
    }, 300)
  }

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const clear = () => {
    setQuery('')
    onBuscar('')
    inputRef.current?.focus()
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <div className={`search-bar ${focused ? 'search-bar--focused' : ''} ${query ? 'search-bar--has-value' : ''}`}>
      <label htmlFor="search" className="visually-hidden">Buscar</label>
      <Icon name="search" className="search-bar__icon" size={20} aria-hidden />
      <input
        ref={inputRef}
        id="search"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="search-bar__input"
        autoComplete="off"
      />
      {query && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={clear}
          aria-label="Limpiar búsqueda"
        >
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  )
}