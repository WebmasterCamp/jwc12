import { forwardRef, useRef } from 'react'
import { useParallax } from 'react-scroll-parallax'

export function MovingCards() {
  const card1 = useRef<HTMLDivElement>(null)
  const card2 = useRef<HTMLDivElement>(null)
  const card3 = useRef<HTMLDivElement>(null)
  const card4 = useRef<HTMLDivElement>(null)
  const { ref } = useParallax<HTMLDivElement>({
    onProgressChange: (p) => {
      const angleDistance = getAngleDistance()
      const progress = p * 2 - 1
      const refs = [card1.current!!, card2.current!!, card3.current!!, card4.current!!]
      refs.forEach((ref, i) => {
        const baseAngle = -(i - 1.5) * angleDistance
        const additionalMultiplier = progress * 2
        const angle = baseAngle * (1 + additionalMultiplier)
        ref.style.transform = `rotate(${angle}deg) translateY(-${progress * 1200}px)`
        ref.style.transformOrigin = `50% ${584}px`
      })
    },
  })
  return (
    <>
      <div className="mx-auto min-h-[30vh] relative my-[10vh]" style={{ width: 173 }}>
        <div className="fixed w-[174px]">
          <CardTemplate ref={card1} color="#DC4223" />
          <CardTemplate ref={card2} color="#7423DC" />
          <CardTemplate ref={card3} color="#A1DD40" />
          <CardTemplate ref={card4} color="#1DC5B2" />
        </div>
      </div>
      <div ref={ref} className="absolute top-0 left-0 h-screen w-10" />
    </>
  )
}

function getAngleDistance() {
  const widthFactor = 1 + Math.max(0, window.innerWidth - 375) / 200
  const angleDistance = Math.min(20, widthFactor * 5.9)
  return angleDistance
}

const CardTemplate = forwardRef<HTMLDivElement, { color: string }>(({ color }, ref) => {
  return (
    <div
      ref={ref}
      className="
        absolute w-[174px] h-[284px] rounded-[8px] overflow-hidden
      "
    >
      <svg
        width="174"
        height="284"
        viewBox="0 0 174 284"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="173.107"
          height="283.265"
          transform="matrix(1 0 0 -1 0.220459 283.567)"
          fill={color}
        />
        <rect
          x="1.31141"
          y="-1.31141"
          width="134.975"
          height="245.345"
          rx="7.86848"
          transform="matrix(1 0 0 -1 17.9751 263.295)"
          stroke="url(#paint0_linear_831_4507)"
          strokeWidth="2.62283"
        />
        <foreignObject x="42" y="117" width="90" height="49.3">
          <img src="/images/jwc12-logo.png" className="h-11" alt="" />
        </foreignObject>
        <defs>
          <linearGradient
            id="paint0_linear_831_4507"
            x1="68.7988"
            y1="0"
            x2="68.7988"
            y2="247.968"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E4D0A2" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
})
CardTemplate.displayName = 'CardTemplate'
