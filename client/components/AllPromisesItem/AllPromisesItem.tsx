import { PledgeFrontEnd } from '../../../models/pledge_models'
import { useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
interface Props {
  promises: PledgeFrontEnd[]
}

function AllPromisesItem(props: Props) {
  const navigate = useNavigate()
  const { promises } = props

  function redirectToDetailsPage(promiseId: number) {
    navigate(`/promises/${promiseId}`)
  }

  return (
    <div>
      <h2 className="font-bold text-slate-50 text-2xl pb-4">Your Promises</h2>

      <div className="flex flex-col gap-4">
        {promises.map((promise) => {
          return (
            <div key={promise.promiseId} className="flex font-bold">
              <div className="max-md:w-[80%] md:w-[90%] p-2 text-slate-50 truncate bg-slate-950 bg-opacity-50  rounded-l-lg  text-lg">
                <div className="truncate overflow-hidden whitespace-nowrap">
                  {promise.promiseName}
                  <br />
                  <span className="text-fuchsia-200">{promise.friendName}</span>
                </div>
              </div>
              <div className="flex items-center justify-center max-md:w-[20%] md:w-[10%] text-slate-50 bg-slate-950 bg-opacity-50 rounded-r-lg">
                <button
                  onClick={() => redirectToDetailsPage(promise.promiseId)}
                  aria-label="promise detail page"
                >
                  <FaAngleRight size={30} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllPromisesItem
