import {
  Pledge,
  PledgeDraftSchemaFrontEnd,
} from '../../../models/pledge_models'
import { useQuery } from 'react-query'
import { getAllFriendsById } from '../../apis/friends'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  promise?: PledgeDraftSchemaFrontEnd
  handleSubmit: (promise: Pledge | PledgeDraftSchemaFrontEnd) => void
  
}

function AddPromiseForm(props: Props) {
  const { getAccessTokenSilently } = useAuth0()

  const friendsQuery = useQuery('getAllFriendsById', async () => {
    const token = await getAccessTokenSilently()
    return await getAllFriendsById(token)
  })

  if (friendsQuery.isLoading) {
    return <div>Loading ...</div>
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const promiseName = formData.get('promiseName') as string
    const friendUserId = formData.get('friendUserId') as string
    const promiseDescription = formData.get('promiseDescription') as string
    const dateDue = formData.get('dateDue') as string

    const form = {
      promiseName: promiseName,
      promiseDescription: promiseDescription,
      friendUserId: friendUserId,
      status: 'pending',
      dateDue: dateDue,
    }
    props.handleSubmit(form)
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSave} className="w-80">
        <div className="pb-4">
          <label
            className= "font-bold text-lg text-bold text-slate-50 pb-2"
            htmlFor="promiseName"
          >
            Name
          </label>
          <input
            className="p-2 w-full  bg-slate-950 bg-opacity-50 rounded-lg font-bold text-bold text-pink placeholder-fuchsia-200"
            type="text"
            name="promiseName"
            id="promiseName"
            placeholder="Give your promise a name!"
            required
            defaultValue={props.promise?.promiseName}
          />
        </div>
        <div className="pb-4">
          <label
            className="font-bold text-lg text-bold text-slate-50"
            htmlFor="friendUserId"
          >
            Add a Friend
          </label>
          <select
            className="p-2 w-full text-sm  bg-slate-950 bg-opacity-50 rounded-lg font-bold text-bold text-pink"
            name="friendUserId"
            id="friendUserId"
          >
            <option className="bg-purple">Select a friend</option>
            {friendsQuery?.data?.map((friend) => (
              <option
                className="bg-purple"
                key={friend.friendUserId}
                value={friend.friendUserId}
              >
                {friend.friendName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="text-start align-top place-items-start font-bold text-lg text-slate-50 text-bold"
            htmlFor="promiseDescription"
          >
            Describe your promise
          </label>
          <textarea
            className="p-2 pb-20 w-80 m bg-slate-950 bg-opacity-50 rounded-lg resize-none overflow-wrap-normal font-bold text-bold text-pink placeholder-fuchsia-200"
            name="promiseDescription"
            id="promiseDescription"
            placeholder="What's your promise about?"
            required
            defaultValue={props.promise?.promiseDescription}
          ></textarea>
        </div>
        <div>
          <label
            className="text-start align-top place-items-start font-bold text-lg text-slate-50 text-bold"
            htmlFor="dateDue"
          >
            Date (optional)
          </label>
          <input
            className="p-2 w-full text-sm  bg-slate-950 bg-opacity-50 rounded-lg  font-bold text-bold text-pink"
            type="date"
            name="dateDue"
            id="dateDue"
            defaultValue={'none'}
          />
        </div>
        <div className="flex items-center justify-center pb-36 mt-4">
          <button
            className='className="font-body text-purple bg-pink text-xl hover:bg-darkPink drop-shadow-xl py-1 px-3 p-1 rounded-lg'
            name="New Promise"
          >
            Make A Promise!
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPromiseForm
