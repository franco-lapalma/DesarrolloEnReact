import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MoviesListView from '../views/MoviesListView'
import MovieFormView from '../views/MovieFormView'
import MovieDetailView from '../views/MovieDetailView'
import LoginView from '../views/LoginView'
import NotFoundView from '../views/NotFoundView'

export default function AppRouter() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar onSearch={handleSearch} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="/movies" element={<MoviesListView onSearch={handleSearch} searchQuery={searchQuery} />} />
            <Route path="/movies/new" element={<MovieFormView />} />
            <Route path="/movies/:id" element={<MovieDetailView />} />
            <Route path="/movies/:id/edit" element={<MovieFormView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
