
import { AuthForm } from "../components/form.component";
import * as DirectCallSDK from '../libs/directcall-sdk'
import clevertap from '../libs/ct-sdk'
import { useRef, useState } from "react";
import { CallForm } from "../components/callform.component";
import { CardRow } from "../components/card.component";
export const EntryPage = () => {

  const [dcClient, setDcClient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [showCaller, setShowCaller] = useState(false)
  const [showReceiver, setShowReceiver] = useState(false)
  const [cuid, setCuid] = useState("")
  const cardRef = useRef(null)
  const callerRef = useRef(null)
  const receiverRef = useRef(null)



  // signin and validate the options
  const onSubmit = (initOptions) => {
    setCuid(initOptions.cuid)
    clevertap.privacy.push({ optOut: false })
    clevertap.privacy.push({ useIP: false })
    clevertap.init(initOptions.ctAccId)
    DirectCallSDK.init({
      ...initOptions,
      clevertap
    }).then(res => {
      setDcClient(res)
      setIsConnected(res.isEnabled())
      // scroll to card row section
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }).catch(err => console.log(err))
  }


  const showCallerOrReceiver = (type) => {
    console.log("hit")
    if (type === 'caller') {
      setShowCaller(true)
      setShowReceiver(false)
      callerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      setShowReceiver(true)
      setShowCaller(false)
      receiverRef.current.scrollIntoView({
        behavior: 'smooth', block: 'center'
      })
    }
  }

  const makecall = ({ cuid, context }) => {
    dcClient.call(cuid, context).then(res => console.log(res)).catch(err => console.log(err))
  }
  // disconnects the sdk
  const disconnect = () => {
    dcClient.disconnect()
    setIsConnected(false)
  }

  return (
    <>
      <h1 className="text-4xl	mt-6">Welcome To Direct Call</h1>
      <AuthForm submitFn={onSubmit} connected={isConnected} disconnect={disconnect} />
      <div className={isConnected ? "block" : "hidden"}>
        <CardRow myref={cardRef} action={showCallerOrReceiver} />
      </div>
      <div className={showCaller ? "block" : "hidden"}>
        <CallForm myref={callerRef} call={makecall} />
      </div>
      <h1 className={`text-4xl pb-6 ${showReceiver ? "block" : "hidden"}`} ref={receiverRef}>Please ask the caller to call you at <i>{cuid}</i></h1>

    </>
  )
}