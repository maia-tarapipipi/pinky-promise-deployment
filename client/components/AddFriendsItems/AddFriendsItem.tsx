import { useMutation, useQueryClient } from 'react-query'
import { FriendNames } from '../../../models/friends_models'
import { addFriend } from '../../apis/friends'
import { useAuth0 } from '@auth0/auth0-react'
import { FaPlus } from 'react-icons/fa'

interface Props {
  friends: FriendNames[]
}

function AddFriendsItem(props: Props) {
  const { friends } = props
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const addFriendMutation = useMutation(
    async (friendUserId: string) => {
      const token = await getAccessTokenSilently()
      await addFriend(friendUserId, token)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotFriends')
      },
      onError: (error) => {
        console.log('Error adding friend:', error)
      },
    },
  )

  const handleClick = (friendUserId: string) => {
    addFriendMutation.mutate(friendUserId)
  }

  return (
    <>
      <div className="flex flex-col items-center font-bold">
        <h2 className="text-2xl text-slate-50 pb-4">Add a friend!</h2>
        <div className="w-4/5">
          {friends.map((friend) => {
            return (
              <div
                key={friend.friendUserId}
                className="w-full pt-4 pb-4 text-lg text-slate-50 bg-slate-950 bg-opacity-50 rounded-lg flex items-center justify-between mb-4 "
              >
                <div className="flex text-left mx-6">{friend.username}</div>
                <button
                  className="flex flex-initial mx-6"
                  onClick={() => handleClick(friend.friendUserId)}
                  aria-label={`add ${friend.friendName}`}
                >
                  <FaPlus />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AddFriendsItem
