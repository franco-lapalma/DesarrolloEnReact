import React from 'react';
import Tarjeta from './Tarjeta';
import './App.css';

const tarjetasData = [
  {
    nombre: 'Ana García',
    profesion: 'Diseñadora Gráfica',
    imagen: 'https://randomuser.me/api/portraits/women/44.jpg',
    descripcion: 'Apasionada por el diseño y la creatividad, con experiencia en branding y ilustración digital.'
  },
  {
    nombre: 'Carlos López',
    profesion: 'Desarrollador Web',
    imagen: 'https://randomuser.me/api/portraits/men/32.jpg',
    descripcion: 'Especialista en aplicaciones web full-stack con foco en rendimiento y accesibilidad.'
  },
  {
    nombre: 'María Fernández',
    profesion: 'Fotógrafa',
    imagen: 'https://randomuser.me/api/portraits/women/28.jpg',
    descripcion: 'Especialista en retrato y fotografía de eventos, con un estilo único y emotivo.'
  }
];

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Mi tarjeta de presentación</h1>
      </header>
      <main className='cards-container'>
        {tarjetasData.map((tarjeta, index) => (
          <Tarjeta key={index} {...tarjeta} />
        ))}
      </main>
    </div>
  );
}

export default App;
