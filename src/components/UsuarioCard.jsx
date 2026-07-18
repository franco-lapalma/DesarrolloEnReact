import './UsuarioCard.css'

function UsuarioCard({ usuario }) {
  return (
    <li className="usuario-card">
      <div className="card-header">
        <div className="avatar">
          <span className="inicial">{usuario.name.charAt(0)}</span>
        </div>
        <div className="header-info">
          <h3 className="nombre">{usuario.name}</h3>
          <span className="id">#{usuario.id}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <path d="M22 6l-10 7L2 6"/>
          </svg>
          <div className="info-content">
            <span className="info-label">Email</span>
            <a href={`mailto:${usuario.email}`} className="info-value">{usuario.email}</a>
          </div>
        </div>
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <div className="info-content">
            <span className="info-label">Teléfono</span>
            <span className="info-value">{usuario.phone}</span>
          </div>
        </div>
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <div className="info-content">
            <span className="info-label">Web</span>
            <a href={`http://${usuario.website}`} target="_blank" rel="noopener noreferrer" className="info-value">{usuario.website}</a>
          </div>
        </div>
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 21h-2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            <path d="M12 17v4"/>
            <path d="M8 21h8"/>
            <path d="M12 3v4"/>
            <path d="M8 3h8"/>
            <path d="M3 9h4"/>
            <path d="M17 9h4"/>
          </svg>
          <div className="info-content">
            <span className="info-label">Empresa</span>
            <span className="info-value">{usuario.company?.name}</span>
          </div>
        </div>
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <div className="info-content">
            <span className="info-label">Dirección</span>
            <span className="info-value">
              {usuario.address?.street}, {usuario.address?.suite}<br/>
              {usuario.address?.city} - {usuario.address?.zipcode}
            </span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{usuario.address?.city}</span>
        </div>
      </div>
    </li>
  )
}

export default UsuarioCard