import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'

import { Outlet } from 'react-router-dom'
import RegisterButton from './RegisterButton'
import Header from './Header'
import Home from './Home'
import Nav from './Nav'

function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      <div
        className="relative w-screen min-h-screen bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url(/image/background3.webp)' }}
      >
        {isAuthenticated ? (
          <>
            <Header />
            <Outlet />
            <Nav />
          </>
        ) : (
          <>
            <Home />
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </div>
    </>
  )
}

export default App
