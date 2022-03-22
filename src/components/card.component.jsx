import styledComponents from "styled-components"

const CardDiv = styledComponents.div`
  cursor: pointer;

`

export const Card = ({ title, src, onClick }) => (
  <CardDiv onClick={onClick}>
    <div className="group relative">
      <div className="relative w-full h-100 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg" alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." className="w-full h-full object-center object-cover" />
      </div>
      <p className="mt-6 text-base font-semibold text-gray-900">{title}</p>
    </div>
  </CardDiv>
)

export const CardRow = ({ myref, action }) => (
  <div ref={myref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
      <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
        <Card title="I am a caller" onClick={() => action('caller')} />
        <Card title="I am a receiver" onClick={() => action('receiver')} />
      </div>
    </div>
  </div>
)

