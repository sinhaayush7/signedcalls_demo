
import { AuthForm } from "../components/form.component";
import { initSignedCall } from '../libs/clevertap-signedcall.module'
import clevertap from 'clevertap-web-sdk'
import { useRef, useState } from "react";
import { CallForm } from "../components/callform.wrapper";
import { CardRow } from "../components/card.component";
import { useStateWithCB } from "../hooks/useStateWithCallback";
import { generateCuid } from "../utils/cuid.generator";
import image from '../Logo.svg'
export const EntryPage = () => {
  clevertap.privacy.push({ optOut: false })
  clevertap.privacy.push({ useIP: false })
  clevertap.init("ZWW-WWW-WW4Z", "in1")
  const [dcClient, setDcClient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [showCaller, setShowCaller] = useStateWithCB(false, () => {
    callerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  const [showReceiver, setShowReceiver] = useStateWithCB(false, () => {
    receiverRef.current.scrollIntoView({
      behavior: 'smooth', block: 'center'
    })
  })
  const [cuid, setCuid] = useState(generateCuid(7))
  const cardRef = useRef(null)
  const callerRef = useRef(null)
  const receiverRef = useRef(null)


  // signin and validate the options
  const onSubmit = (initOptions) => {
    console.log("hit on connect")
    setCuid(initOptions.cuid)
    try {
      
      console.log({initOptions})
      // console.log(clevertap, DirectCallSDK)
      initSignedCall({
        ...initOptions,
        clevertap
      }).then(res => {
        window.signedCallClient = res
        setDcClient(res)
        setIsConnected(res.isEnabled())
        // scroll to card row section

        cardRef.current.scrollIntoView({
          behavior: 'smooth', block: 'center'
        })
      }).catch(err => console.log(err))

    } catch (err) {
      console.log(err)

    }

  }


  const showCallerOrReceiver = (type) => {
    if (type === 'caller') {
      setShowCaller(true)
      setShowReceiver(false)
    } else {
      setShowReceiver(true)
      setShowCaller(false)

    }
  }

  const makecall = ({ cuid, context }) => {
    dcClient.call(cuid, context, {
      receiver_image: "https://logos-world.net/wp-content/uploads/2021/08/Byjus-Logo.png",
    }).then(res => console.log(res)).catch(err => console.log(err))
  }
  // disconnects the sdk
  const disconnect = () => {
    dcClient.logout()
    setIsConnected(false)
    setShowReceiver(false)
    setShowCaller(false)
  }

  return (
    <>
      <img src={image} style={{"display": "block", "margin": "9rem auto 0px auto"} } alt="" />
      <h1 className="text-6xl pt-4 mb-10">Signed Calls</h1>
      <AuthForm submitFn={onSubmit} connected={isConnected} disconnect={disconnect}/>
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



