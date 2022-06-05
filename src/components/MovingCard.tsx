import { Parallax } from 'react-scroll-parallax'

import clsx from 'clsx'
import { CSSEffect } from 'parallax-controller'

interface Props {
  angle: number
  variant: 'pg' | 'ct' | 'mk' | 'ds'
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function px(n: number): string {
  return `${n}px`
}

function animationFromAngle(angle: number) {
  const radians = degreesToRadians(90 - angle)
  const translateX = Math.cos(radians) * 1000
  const translateY = -Math.sin(radians) * 1000
  return {
    translateX: [px(-translateX), px(translateX)] as CSSEffect,
    translateY: [px(-translateY), px(translateY)] as CSSEffect,
    rotateZ: [angle, angle] as CSSEffect,
  }
}

export const MovingCard: React.FunctionComponent<Props> = ({ angle = 0, variant }) => {
  const { translateX, translateY, rotateZ } = animationFromAngle(angle)
  return (
    <Parallax
      className="absolute bottom-0 mx-auto left-[50%] right-[50%]"
      translateX={translateX}
      translateY={translateY}
      rotateZ={rotateZ}
      easing="ease"
      onProgressChange={(e) => console.log(e)}
      //   disabled={true}
    >
      <div
        className={clsx(
          'p-4 text-black h-[20rem] aspect-[0.6111]',
          variant === 'pg' && 'bg-pg',
          variant === 'ds' && 'bg-ds',
          variant === 'mk' && 'bg-mk',
          variant === 'ct' && 'bg-ct'
        )}
        // style={{ transform: `rotateZ(${angle}deg)` }}
      >
        <div className="border border-white h-full flex justify-center items-center">
          <picture>
            <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
            <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
            <img
              src="/images/jwc12-logo.png"
              alt="Junior Webmaster Camp 12"
              className="m-auto w-1/2"
            />
          </picture>
        </div>
      </div>
    </Parallax>
  )
}
