import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { logout } = useAuth0()
  function goTo(link: string) {
    navigate(link)
    setIsDropdownOpen(false)
  }

  function handleLogout() {
    logout()
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full h-20">
        <div className="flex items-center justify-evenly mx-auto font-medium px-10 lg:flex lg:justify-center lg:space-x-20">
          <button
            onClick={() => goTo('/my-promises')}
            className="fa-solid fa-house fa-lg w-16 h-16 bg-pink hover:bg-darkPink rounded-full"
            style={{ color: '#464fa3' }}
          ></button>
          <button
            onClick={() => goTo('/add-promise')}
            className="fa-thin fa-plus fa-2xl w-16 h-16 bg-pink hover:bg-darkPink rounded-full"
            style={{ color: '#464fa3' }}
          ></button>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-16 h-16 bg-pink hover:bg-darkPink rounded-full text-white focus:outline-none"
          >
            <i
              className="fa-solid fa-bars fa-lg ml-0.5"
              style={{ color: '#464fa3' }}
            ></i>
          </button>

          {isDropdownOpen && (
            <div className="fixed right-0  z-10 bottom-24 w-full rounded-lg bg-purple">
              <ul className="text-xl flex flex-col items-center">
                <li className="w-full flex items-center justify-center rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink">
                  <a href="/my-profile">Profile</a>
                </li>
                <li className="w-full flex items-center justify-center rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink">
                  <a href="/my-friends">Friends</a>
                </li>
                <li className="w-full flex items-center justify-center rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink ">
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
