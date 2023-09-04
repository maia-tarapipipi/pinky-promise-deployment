import { useNavigate } from 'react-router-dom'
import { FriendNames } from '../../../models/friends_models'

interface Props {
  friends: FriendNames[]
}

function MyFriends(props: Props) {
  const navigate = useNavigate()

  function redirect() {
    navigate('/add-friends')
  }

  return (
    <div>
      <div className="flex mb-8 w-4/5">
        <h2 className="font-bold text-2xl text-slate-50  text-left ml-8 mr-8">
          Friends List
        </h2>
        <div className="font-body text-purple flex items-end text-xl bg-slate-50 hover:bg-darkPink drop-shadow-xl py-1 px-3 p-1 rounded-lg">
          <button onClick={() => redirect()}>Make A Friend!</button>
        </div>
      </div>

      {props.friends.map((friend) => (
        <div
          className="flex justify-center flex-col mt-4 items-center"
          key={friend.friendName + friend.username}
        >
          <p className=" w-full text-slate-50 flex-grow p-4 bg-slate-950 bg-opacity-50 rounded-lg font-bold text-lg">
            {friend.friendName}
          </p>
        </div>
      ))}
    </div>
  )
}
export default MyFriends
