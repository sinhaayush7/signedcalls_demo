import { useState } from "react"

export const CallForm = ({ call, myref }) => {
  const [cuid, setCuid] = useState("")
  const [context, setContext] = useState("")

  const makecall = (e) => {
    e.preventDefault()
    call({ cuid, context })
  }

  return (
    <div ref={myref} className="m-auto mt-10 sm:mt-0 w-9/12">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" className="text-left" onSubmit={makecall}>
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
                        name="receiver-cuid"
                        id="receiver-cuid"
                        autoComplete="receiver-cuid"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                        required={true}
                        value={cuid}
                        onChange={e => setCuid(e.target.value)}
                        placeholder="receiveremail@clevertap.com"
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @clevertap.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 ">

                <div className="col-span-12 sm:col-span-12">
                  <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                    Context *
                  </label>
                  <input
                    type="text"
                    name="context"
                    id="context"
                    placeholder="this call is regarding..."
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required={true}
                    value={context}
                    onChange={e => setContext(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-5">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Call
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>)
}