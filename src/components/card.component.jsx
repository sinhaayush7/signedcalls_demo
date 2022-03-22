import styledComponents from "styled-components"

const CardDiv = styledComponents.div`
  cursor: pointer;
   box-shadow: 5px 4px 12px -4px rgb(0 0 0 / 40%);
   min-height: 300px;
   border-radius: 5px;
`

export const Card = ({ title, onClick }) => (
  <CardDiv onClick={onClick}>
    <div className="group relative">
      <div className="relative w-full h-100 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 lg:aspect-h-1">
        <h1 className="mt-6 text-base  text-gray-900 text-6xl mt-24">{title}</h1>
      </div>
    </div>
  </CardDiv>
)

export const CardRow = ({ myref, action }) => (
  <div ref={myref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-16 lg:max-w-none">
      <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
        <Card title="I am a caller" onClick={() => action('caller')} />
        <Card title="I am a receiver" onClick={() => action('receiver')} />
      </div>
    </div>
  </div>
)

