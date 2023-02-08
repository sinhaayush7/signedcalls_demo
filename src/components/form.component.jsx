import { useState } from "react"
import {  scAccountId, scApikey } from "../utils/constants";


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


const generateRandomCuid = () => (
  randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
)

/**
 * 
 * @returns 
 */
export const AuthForm = ({ submitFn, connected, disconnect }) => {
  const [cuid, setCuid] = useState(generateRandomCuid)

  
  const submit = (e) => {
    e.preventDefault();
    if (!connected) {
      submitFn({
        cuid: cuid,
        accountId: scAccountId,
        apikey: scApikey,
        ctAccId: "ZWW-WWW-WW4Z",
        ctRegion: "in1"
      })
    } else {
      disconnect()
    }
  }

  return (
    <>
      <div className="m-auto mt-10 sm:mt-0 w-5/12 pt-20">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" className="text-left" onSubmit={submit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid gap-6 mb-6">
                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="cuid" className="block text-sm font-medium text-gray-700">
                      Cuid
                    </label>
                    <div>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="cuid"
                          id="cuid"
                          autoComplete="cuid"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                          required={true}
                          value={cuid}
                          onChange={e => setCuid(e.target.value)}
                          placeholder="your name without special characters"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {
                  connected ? <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  >
                    Disconnect
                  </button> : <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Connect
                  </button>
                }

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}