import { configuracionCompleta } from './config/firebase'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router/AppRouter'
import ConfigWarningView from './views/ConfigWarningView'

export default function App() {
  if (!configuracionCompleta) {
    return <ConfigWarningView />
  }

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}