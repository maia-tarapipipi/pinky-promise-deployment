import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { FaPlus } from 'react-icons/fa'
import { FaHouse, FaBars } from 'react-icons/fa6'

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
            className="flex justify-center items-center w-16 h-16 bg-pink hover:bg-darkPink rounded-full"
            aria-label="home"
          >
            <FaHouse size={25} color="#464fa3" />
          </button>
          <button
            onClick={() => goTo('/add-promise')}
            className="flex justify-center items-center w-16 h-16 bg-pink hover:bg-darkPink rounded-full"
            aria-label="add promise"
          >
            <FaPlus size={25} color="#464fa3" />
          </button>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-center items-center w-16 h-16 bg-pink hover:bg-darkPink rounded-full"
            aria-label="dropdown"
          >
            <FaBars size={25} color="#464fa3" />
          </button>

          {isDropdownOpen && (
            <div className="w-full fixed right-0 z-10 bottom-24 rounded-lg bg-purple">
              <div className="text-xl text-center">
                <div className="rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink">
                  <a href="/my-profile" aria-label="Profile">
                    Profile
                  </a>
                </div>
                <div className="rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink">
                  <a href="/my-friends" aria-label="Friends">
                    Friends
                  </a>
                </div>
                <div className="rounded-lg px-4 py-6 text-slate-50  hover:bg-darkPink ">
                  <button onClick={handleLogout}>Log out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
