import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export const ParticlesWidget = () => {
  const particlesInit = async (main: any) => {
    // console.log(main)
    await loadFull(main)
  }

  const particlesLoaded = async (container: any) => {
    // console.log(container)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="absolute top-0 left-0 h-full w-full"
      options={{
        particles: {
          color: {
            value: '#E4D0A2',
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 20,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'image',
            options: {
              image: {
                src: '/images/particle-star.svg',
                replaceColor: true,
                height: 100,
                width: 100,
              },
            },
          },
          size: {
            value: { min: 1, max: 20 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
