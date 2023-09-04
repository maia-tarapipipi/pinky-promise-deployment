import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { PledgeFrontEnd } from '../../../models/pledge_models'

interface Props {
  promise: PledgeFrontEnd
  handleResolvePromise: (status: string) => void
}

function Promise(props: Props) {
  const { promiseName, promiseDescription, friendName, dateCreated } =
    props.promise

  return (
    <div className=" font-bold p-4">
      <h1 className="flex items-center justify-between text-slate-50 p-2 text-2xl">
        <span>{promiseName}</span>
        <span className="text-base text-fuchsia-200">{dateCreated}</span>
      </h1>

      <p className="p-2 text-xl text-fuchsia-200">{friendName}</p>

      <p className="text-slate-50 p-2 ">{promiseDescription}</p>

      <div className="flex justify-center items-center pt-5">
        <button
          onClick={() => props.handleResolvePromise('broken')}
          className="p-2"
        >
          <img
            src="/promiseBroken.svg"
            alt="Promise Broken!"
            className="flex items-center"
          />
          <span className="text-slate-50 ">
            Promise <br /> Broken!
          </span>
        </button>

        <button
          onClick={() => props.handleResolvePromise('kept')}
          className="p-2"
        >
          <img src="/promiseKept.svg" alt="Promise Kept!" />
          <span className="text-slate-50  ">
            Promise <br /> Kept!
          </span>
        </button>
      </div>

      <div className="flex justify-center mx-2 pt-4">
        <FacebookShareButton
          url={`https://pinky-promise.onrender.com`}
          title={`Check out my promise with, ${friendName}!`}
          hashtag="#PinkyPromise"
          name="Facebook Share Button"
        >
          <FacebookIcon className="mx-2" size={40} borderRadius={50} />
        </FacebookShareButton>
        <TwitterShareButton
          title={`Check out my promise with, ${friendName}!`}
          url={`${window.location.href}/my-promises/`}
          hashtags={['PinkyPromise']}
          name="Twitter Share Button"
        >
          <TwitterIcon className="mx-2" size={40} borderRadius={50} />
        </TwitterShareButton>
      </div>
    </div>
  )
}

export default Promise
