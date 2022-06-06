import { useEffect, useLayoutEffect, useState } from 'react'

import clsx from 'clsx'

import { Container } from '../Container'
import styles from './styles.module.css'

const DURATION = 3450 // 3.450 sec

export const Loading = () => {
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    setShow(true)
  }, [])

  if (!show) return null

  return (
    <Container maxWidth="sm" className="min-height-screen flex items-center justify-center">
      <LoadingAnimation className="w-60 h-60" />
    </Container>
  )
}

export function LoadingAnimation({ className }: { className?: string }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    const id = setInterval(() => {
      setActive((active) => !active)
    }, DURATION)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <svg
      viewBox="0 0 412 412"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx([className, active && styles.active])}
    >
      <path
        d="M205.81 411.62C178.029 411.62 151.068 406.176 125.7 395.447C113.501 390.291 101.742 383.904 90.739 376.472C79.844 369.113 69.5898 360.652 60.279 351.341C50.9682 342.03 42.5071 331.776 35.1478 320.881C27.7164 309.878 21.3291 298.119 16.1733 285.92C5.44388 260.544 0 233.591 0 205.81C0 178.029 5.44388 151.068 16.1733 125.7C21.3291 113.501 27.7164 101.742 35.1478 90.739C42.5071 79.844 50.9682 69.5899 60.279 60.2791C69.5898 50.9683 79.844 42.5071 90.739 35.1478C101.742 27.7164 113.501 21.3292 125.7 16.1733C151.076 5.44393 178.029 0 205.81 0C233.591 0 260.551 5.44393 285.92 16.1733C298.119 21.3292 309.878 27.7164 320.881 35.1478C331.776 42.5071 342.03 50.9683 351.341 60.2791C360.652 69.5899 369.113 79.844 376.472 90.739C383.904 101.742 390.291 113.501 395.447 125.7C406.176 151.076 411.62 178.029 411.62 205.81C411.62 233.591 406.176 260.552 395.447 285.92C390.291 298.119 383.904 309.878 376.472 320.881C369.113 331.776 360.652 342.03 351.341 351.341C342.03 360.652 331.776 369.113 320.881 376.472C309.878 383.904 298.119 390.291 285.92 395.447C260.544 406.176 233.591 411.62 205.81 411.62V411.62ZM205.81 1.21696C178.187 1.21696 151.4 6.62488 126.175 17.2967C114.056 22.4237 102.361 28.7677 91.4231 36.1631C80.5929 43.4793 70.4035 51.89 61.1431 61.1432C51.8827 70.4036 43.4792 80.5857 36.1631 91.4231C28.7749 102.361 22.4309 114.056 17.2966 126.175C6.63203 151.4 1.21692 178.187 1.21692 205.81C1.21692 233.433 6.62483 260.22 17.2966 285.445C22.4237 297.572 28.7677 309.259 36.1631 320.197C43.4792 331.027 51.8899 341.216 61.1431 350.477C70.4035 359.737 80.5857 368.141 91.4231 375.457C102.361 382.845 114.056 389.189 126.175 394.323C151.4 404.988 178.187 410.403 205.81 410.403C233.433 410.403 260.22 404.995 285.445 394.323C297.572 389.196 309.259 382.852 320.197 375.457C331.027 368.141 341.216 359.73 350.477 350.477C359.737 341.224 368.141 331.034 375.457 320.197C382.845 309.259 389.189 297.564 394.323 285.445C404.995 260.22 410.403 233.433 410.403 205.81C410.403 178.187 404.995 151.4 394.323 126.175C389.196 114.048 382.852 102.361 375.457 91.4231C368.141 80.5929 359.73 70.4036 350.477 61.1432C341.216 51.8828 331.034 43.4793 320.197 36.1631C309.259 28.7749 297.564 22.4309 285.445 17.2967C260.22 6.62488 233.426 1.21696 205.81 1.21696V1.21696Z"
        fill="#E4D0A2"
        className={styles['svg-elem-1']}
      ></path>
      <path
        d="M205.81 385.661C181.528 385.661 157.974 380.908 135.802 371.525C125.145 367.018 114.869 361.437 105.249 354.942C95.722 348.511 86.7713 341.116 78.6342 332.979C70.4971 324.842 63.109 315.884 56.6713 306.364C50.1761 296.751 44.5954 286.468 40.0876 275.811C30.712 253.639 25.9521 230.085 25.9521 205.803C25.9521 181.522 30.7048 157.967 40.0876 135.796C44.5954 125.138 50.1761 114.862 56.6713 105.242C63.109 95.7152 70.4971 86.7644 78.6342 78.6274C86.7713 70.4903 95.7292 63.1022 105.249 56.6645C114.862 50.1693 125.145 44.5885 135.802 40.0808C157.974 30.7051 181.528 25.9453 205.81 25.9453C230.092 25.9453 253.646 30.6979 275.818 40.0808C286.475 44.5885 296.751 50.1693 306.371 56.6645C315.898 63.095 324.849 70.4903 332.986 78.6274C341.123 86.7644 348.511 95.7224 354.949 105.242C361.444 114.855 367.025 125.138 371.532 135.796C380.908 157.967 385.668 181.522 385.668 205.803C385.668 230.085 380.915 253.639 371.532 275.811C367.025 286.468 361.444 296.744 354.949 306.364C348.518 315.891 341.123 324.842 332.986 332.979C324.849 341.116 315.891 348.504 306.371 354.942C296.758 361.437 286.475 367.018 275.818 371.525C253.646 380.901 230.092 385.661 205.81 385.661V385.661ZM205.81 27.1695C181.694 27.1695 158.298 31.8933 136.278 41.2041C125.692 45.6831 115.481 51.2206 105.933 57.6726C96.4709 64.0599 87.5778 71.4048 79.4983 79.4843C71.4117 87.5709 64.0739 96.4641 57.6867 105.919C51.2346 115.467 45.6971 125.678 41.2181 136.264C31.9001 158.284 27.1835 181.68 27.1835 205.796C27.1835 229.912 31.9073 253.308 41.2181 275.328C45.6971 285.914 51.2346 296.124 57.6867 305.673C64.0739 315.135 71.4189 324.028 79.4983 332.108C87.585 340.194 96.4781 347.532 105.933 353.919C115.481 360.371 125.692 365.909 136.278 370.388C158.298 379.706 181.694 384.422 205.81 384.422C229.926 384.422 253.322 379.699 275.342 370.388C285.928 365.909 296.139 360.371 305.687 353.919C315.149 347.532 324.042 340.187 332.122 332.108C340.208 324.021 347.546 315.128 353.933 305.673C360.385 296.124 365.923 285.914 370.402 275.328C379.72 253.308 384.436 229.912 384.436 205.796C384.436 181.68 379.713 158.284 370.402 136.264C365.923 125.678 360.385 115.467 353.933 105.919C347.546 96.4569 340.201 87.5637 332.122 79.4843C324.035 71.3976 315.142 64.0599 305.687 57.6726C296.139 51.2206 285.928 45.6831 275.342 41.2041C253.322 31.8861 229.926 27.1695 205.81 27.1695V27.1695Z"
        fill="#E4D0A2"
        className={styles['svg-elem-2']}
      ></path>
      <path
        d="M205.81 272.634C196.787 272.634 188.038 270.87 179.793 267.385C171.836 264.022 164.685 259.198 158.55 253.062C152.415 246.927 147.59 239.777 144.227 231.82C140.742 223.582 138.978 214.825 138.978 205.803C138.978 196.78 140.742 188.031 144.227 179.786C147.59 171.829 152.415 164.678 158.55 158.543C164.685 152.408 171.836 147.583 179.793 144.22C188.031 140.735 196.787 138.971 205.81 138.971C214.833 138.971 223.582 140.735 231.827 144.22C239.784 147.583 246.934 152.408 253.07 158.543C259.205 164.678 264.029 171.829 267.392 179.786C270.878 188.023 272.642 196.78 272.642 205.803C272.642 214.825 270.878 223.574 267.392 231.82C264.029 239.777 259.205 246.927 253.07 253.062C246.934 259.198 239.784 264.022 231.827 267.385C223.589 270.87 214.833 272.634 205.81 272.634V272.634ZM205.81 140.188C196.953 140.188 188.362 141.923 180.268 145.344C172.455 148.649 165.441 153.38 159.414 159.407C153.387 165.434 148.656 172.448 145.351 180.261C141.93 188.348 140.195 196.938 140.195 205.803C140.195 214.667 141.93 223.25 145.351 231.344C148.656 239.157 153.387 246.171 159.414 252.198C165.441 258.225 172.455 262.956 180.268 266.262C188.355 269.682 196.946 271.418 205.81 271.418C214.674 271.418 223.258 269.682 231.352 266.262C239.165 262.956 246.178 258.225 252.206 252.198C258.233 246.171 262.964 239.157 266.269 231.344C269.689 223.258 271.425 214.667 271.425 205.803C271.425 196.938 269.689 188.355 266.269 180.261C262.964 172.448 258.233 165.434 252.206 159.407C246.178 153.38 239.165 148.649 231.352 145.344C223.265 141.923 214.674 140.188 205.81 140.188Z"
        fill="#E4D0A2"
        className={styles['svg-elem-3']}
      ></path>
      <path
        d="M205.81 303.67C192.596 303.67 179.778 301.085 167.717 295.98C156.066 291.047 145.596 283.99 136.609 275.004C127.622 266.017 120.565 255.547 115.632 243.895C110.527 231.827 107.942 219.009 107.942 205.802C107.942 192.596 110.527 179.771 115.632 167.71C120.565 156.058 127.622 145.588 136.609 136.601C145.596 127.615 156.066 120.558 167.717 115.625C179.786 110.52 192.603 107.935 205.81 107.935C219.016 107.935 231.841 110.52 243.903 115.625C255.554 120.558 266.024 127.615 275.011 136.601C283.998 145.588 291.054 156.058 295.987 167.71C301.093 179.778 303.678 192.596 303.678 205.802C303.678 219.009 301.093 231.834 295.987 243.895C291.054 255.547 283.998 266.017 275.011 275.004C266.024 283.99 255.554 291.047 243.903 295.98C231.834 301.085 219.016 303.67 205.81 303.67ZM205.81 109.159C192.762 109.159 180.11 111.715 168.192 116.756C156.685 121.624 146.352 128.594 137.473 137.466C128.594 146.344 121.631 156.678 116.763 168.185C111.722 180.102 109.166 192.754 109.166 205.802C109.166 218.851 111.722 231.51 116.763 243.42C121.631 254.927 128.601 265.261 137.473 274.139C146.352 283.018 156.685 289.981 168.192 294.849C180.11 299.89 192.762 302.446 205.81 302.446C218.858 302.446 231.517 299.89 243.428 294.849C254.935 289.981 265.268 283.011 274.147 274.139C283.025 265.261 289.989 254.927 294.857 243.42C299.897 231.503 302.454 218.851 302.454 205.802C302.454 192.754 299.897 180.102 294.857 168.185C289.989 156.678 283.018 146.344 274.147 137.466C265.268 128.587 254.935 121.624 243.428 116.756C231.51 111.715 218.858 109.159 205.81 109.159V109.159Z"
        fill="#E4D0A2"
        className={styles['svg-elem-4']}
      ></path>
      <path
        d="M206.422 0.597656H205.198V139.576H206.422V0.597656Z"
        fill="#E4D0A2"
        className={styles['svg-elem-5']}
      ></path>
      <path
        d="M103.744 27.7864L102.684 28.3984L172.173 148.757L173.233 148.145L103.744 27.7864Z"
        fill="#E4D0A2"
        className={styles['svg-elem-6']}
      ></path>
      <path
        d="M28.4006 102.669L27.7886 103.729L148.147 173.219L148.759 172.158L28.4006 102.669Z"
        fill="#E4D0A2"
        className={styles['svg-elem-7']}
      ></path>
      <path
        d="M139.583 205.19H0.60498V206.415H139.583V205.19Z"
        fill="#E4D0A2"
        className={styles['svg-elem-8']}
      ></path>
      <path
        d="M148.151 238.388L27.7925 307.877L28.4046 308.937L148.763 239.448L148.151 238.388Z"
        fill="#E4D0A2"
        className={styles['svg-elem-9']}
      ></path>
      <path
        d="M172.156 262.808L102.667 383.167L103.727 383.779L173.216 263.42L172.156 262.808Z"
        fill="#E4D0A2"
        className={styles['svg-elem-10']}
      ></path>
      <path
        d="M206.422 272.022H205.198V411.001H206.422V272.022Z"
        fill="#E4D0A2"
        className={styles['svg-elem-11']}
      ></path>
      <path
        d="M239.45 262.844L238.39 263.456L307.879 383.815L308.939 383.203L239.45 262.844Z"
        fill="#E4D0A2"
        className={styles['svg-elem-12']}
      ></path>
      <path
        d="M263.468 238.385L262.856 239.445L383.215 308.934L383.827 307.874L263.468 238.385Z"
        fill="#E4D0A2"
        className={styles['svg-elem-13']}
      ></path>
      <path
        d="M411.008 205.19H272.03V206.415H411.008V205.19Z"
        fill="#E4D0A2"
        className={styles['svg-elem-14']}
      ></path>
      <path
        d="M383.205 102.668L262.847 172.157L263.459 173.217L383.817 103.728L383.205 102.668Z"
        fill="#E4D0A2"
        className={styles['svg-elem-15']}
      ></path>
      <path
        d="M307.845 27.7372L238.356 148.096L239.417 148.708L308.906 28.3492L307.845 27.7372Z"
        fill="#E4D0A2"
        className={styles['svg-elem-16']}
      ></path>
      <path
        d="M161.243 165.687C161.243 165.687 165.78 167.336 169.697 173.111C173.614 178.886 178.979 174.35 182.688 178.267C186.403 182.184 192.171 191.675 194.029 190.847C195.887 190.019 194.029 182.854 188.664 178.296C183.3 173.73 186.396 162.389 186.396 162.389C186.396 162.389 188.211 172.132 194.728 176.647C201.244 181.162 198.357 185.59 198.465 188.168C198.566 190.746 201.043 188.269 201.561 183.113C202.08 177.957 204.24 173.111 200.632 168.474C197.025 163.836 199.869 153.625 202.677 149.398C202.677 149.398 198.883 161.77 204.449 165.485C210.015 169.201 207.128 177.446 207.027 180.543C206.926 183.639 206.436 187.967 207.869 188.175C209.295 188.384 212.802 184.978 212.6 180.132C212.392 175.286 214.249 170.13 220.025 164.456C220.025 164.456 215.589 172.809 216.827 177.864C218.066 182.919 216.309 188.384 213.731 189.925C211.153 191.474 213.731 190.336 213.731 190.336C213.731 190.336 223.942 187.967 226.721 182.501C229.508 177.036 228.781 170.54 243.838 164.765C243.838 164.765 234.146 171.469 231.978 181.162C229.811 190.854 220.118 191.474 219.189 194.57C218.26 197.666 220.939 197.767 222.595 197.458C224.244 197.148 228.27 195.708 230.74 191.891C233.217 188.075 239.193 187.355 243.32 188.593C247.446 189.832 236.414 187.254 233.418 193.029C230.43 198.804 226.203 200.864 221.868 201.281C217.54 201.692 220.219 203.341 222.797 202.829C225.375 202.311 228.882 205.926 232.9 205.926C236.918 205.926 239.294 200.979 247.539 201.08C255.792 201.18 259.19 205.307 261.048 205.926C262.906 206.545 251.457 201.843 245.789 206.617C240.115 211.391 232.381 211.802 227.845 209.533C223.308 207.265 220.831 208.605 220.73 209.843C220.629 211.082 222.898 213.76 225.677 214.07C228.464 214.38 234.65 212.832 239.085 216.13C243.521 219.428 244.652 222.834 246.718 222.834C246.718 222.834 244.241 223.763 238.264 219.428C232.281 215.1 231.049 220.666 226.613 219.219C222.178 217.779 221.868 215.921 220.939 216.432C220.01 216.95 221.04 221.689 222.689 224.475C224.338 227.262 226.916 229.84 230.012 230.459C233.109 231.079 237.537 230.769 240.014 233.966C242.491 237.163 242.801 245.718 242.801 245.718C242.801 245.718 239.914 237.675 235.478 236.026C231.042 234.377 225.785 234.895 222.999 232.317C220.212 229.739 215.985 222.005 214.026 220.976C212.067 219.946 211.859 220.767 211.967 222.834C212.075 224.9 214.026 230.049 216.402 230.877C218.772 231.705 222.696 237.271 220.629 245.725C220.629 245.725 220.939 237.891 214.545 233.556C208.15 229.228 209.799 226.542 208.978 224.483C208.15 222.423 207.329 223.345 206.919 225.001C206.508 226.65 203.621 233.253 205.169 237.891C206.717 242.528 213.623 250.471 204.139 262.223C204.139 262.223 207.848 255.317 203.52 245.517C199.192 235.723 197.543 233.455 199.912 227.68C202.281 221.905 201.461 220.047 198.674 222.625C195.887 225.203 197.025 235.414 193.928 238.503C190.832 241.599 186.713 245.826 186.713 245.826C186.713 245.826 191.97 239.122 191.041 232.937C190.112 226.751 197.025 221.386 194.238 221.595C191.451 221.804 184.956 224.274 182.688 227.161C180.419 230.049 182.479 241.599 166.702 245.106C166.702 245.106 176.603 240.361 176.704 232.008C176.804 223.655 181.449 220.947 189.334 217.858C197.219 214.761 189.644 212.133 184.769 213.22C179.894 214.301 180.592 226.6 162.885 221.185C162.885 221.185 172.628 221.955 174.716 217.469C176.804 212.983 182.061 208.655 187.476 208.036C192.891 207.416 176.574 203.6 167.911 205.818C159.249 208.036 157.938 212.831 150.355 207.877C150.355 207.877 156.462 209.706 159.558 205.818C162.655 201.922 173.867 200.532 182.22 200.532C190.573 200.532 183.458 196.745 180.29 196.514C177.121 196.284 169.46 198.372 166.14 191.949C166.14 191.949 169.546 196.665 178.129 193.879C186.713 191.092 187.563 196.277 187.872 193.18C188.182 190.084 181.456 182.119 176.43 181.191C171.404 180.262 169.827 180.348 166.658 174.227C163.49 168.106 161.582 166.133 161.243 165.694V165.687Z"
        fill="#E4D0A2"
        className={styles['svg-elem-17']}
      ></path>
      <path
        d="M316.488 118.73C316.423 118.73 316.351 118.73 316.286 118.715C315.487 118.607 314.926 117.865 315.041 117.066L315.509 113.696L309.057 113.041C308.661 112.998 308.301 112.803 308.056 112.486C307.811 112.177 307.703 111.773 307.761 111.385L308.229 108L301.755 107.28C301.366 107.237 301.006 107.035 300.761 106.726C300.516 106.416 300.416 106.02 300.466 105.624L300.934 102.239L294.46 101.519C293.661 101.433 293.078 100.706 293.171 99.9063C293.258 99.107 293.985 98.5237 294.784 98.6173L302.749 99.503C303.138 99.5462 303.498 99.7478 303.742 100.057C303.987 100.367 304.088 100.763 304.038 101.159L303.57 104.544L310.043 105.264C310.432 105.307 310.792 105.509 311.037 105.818C311.282 106.128 311.383 106.524 311.332 106.92L310.864 110.29L317.316 110.945C317.712 110.988 318.072 111.183 318.317 111.5C318.562 111.809 318.67 112.213 318.612 112.601L317.936 117.477C317.835 118.211 317.208 118.737 316.488 118.737V118.73Z"
        fill="#E4D0A2"
        className={styles['svg-elem-18']}
      ></path>
      <path
        d="M308.798 124.36C308.733 124.36 308.661 124.36 308.596 124.346C307.797 124.238 307.235 123.496 307.35 122.697L307.818 119.327L301.366 118.672C300.97 118.628 300.61 118.434 300.365 118.117C300.121 117.807 300.013 117.404 300.07 117.015L300.538 113.631L294.065 112.911C293.676 112.868 293.316 112.666 293.071 112.356C292.826 112.047 292.725 111.651 292.776 111.255L293.244 107.87L286.77 107.15C285.971 107.064 285.387 106.336 285.481 105.537C285.567 104.738 286.295 104.155 287.094 104.248L295.058 105.134C295.447 105.177 295.807 105.379 296.052 105.688C296.297 105.998 296.398 106.394 296.347 106.79L295.879 110.175L302.353 110.895C302.742 110.938 303.102 111.139 303.347 111.449C303.591 111.759 303.692 112.155 303.642 112.551L303.174 115.921L309.626 116.576C310.022 116.619 310.382 116.814 310.627 117.131C310.872 117.44 310.98 117.844 310.922 118.232L310.245 123.107C310.144 123.842 309.518 124.368 308.798 124.368V124.36Z"
        fill="#E4D0A2"
        className={styles['svg-elem-19']}
      ></path>
      <path
        d="M332.654 169.691C329.774 169.691 326.858 168.92 324.222 167.307C323.531 166.882 323.315 165.982 323.74 165.298C324.165 164.607 325.065 164.391 325.749 164.816C331.985 168.639 340.172 166.673 343.989 160.437C344.414 159.746 345.314 159.53 345.998 159.955C346.689 160.38 346.905 161.28 346.48 161.964C343.427 166.94 338.098 169.691 332.647 169.691H332.654Z"
        fill="#E4D0A2"
        className={styles['svg-elem-20']}
      ></path>
      <path
        d="M330.365 183.207C330.141 183.207 329.911 183.156 329.702 183.048C328.982 182.681 328.701 181.803 329.068 181.082C331.041 177.23 334.39 174.378 338.502 173.046C342.613 171.721 346.999 172.074 350.851 174.047C351.571 174.414 351.852 175.293 351.485 176.013C351.118 176.733 350.239 177.014 349.519 176.647C346.365 175.034 342.765 174.738 339.395 175.826C336.024 176.913 333.281 179.253 331.661 182.407C331.402 182.911 330.89 183.207 330.357 183.207H330.365Z"
        fill="#E4D0A2"
        className={styles['svg-elem-21']}
      ></path>
      <path
        d="M340.741 181.572C340.122 181.572 339.546 181.176 339.344 180.549L333.713 162.72C333.468 161.949 333.893 161.129 334.663 160.884C335.434 160.639 336.255 161.064 336.5 161.834L342.131 179.664C342.376 180.434 341.951 181.255 341.18 181.5C341.036 181.543 340.885 181.565 340.741 181.565V181.572Z"
        fill="#E4D0A2"
        className={styles['svg-elem-22']}
      ></path>
      <path
        d="M338.79 241.901C337.141 241.901 335.333 241.829 333.375 241.678C327.484 241.224 322.386 240.266 322.17 240.223C321.378 240.072 320.859 239.308 321.003 238.516C321.155 237.724 321.918 237.199 322.71 237.35C322.761 237.357 327.888 238.322 333.619 238.761C343.348 239.51 346.74 238.171 347.899 237.307C348.569 236.803 348.691 236.32 348.727 236.003C348.864 234.635 348.583 233.663 347.87 233.036C346.099 231.474 341.922 232 340.604 232.302C339.82 232.482 339.035 231.992 338.847 231.207C338.667 230.423 339.157 229.638 339.942 229.45C340.612 229.292 346.596 228.01 349.8 230.833C350.801 231.712 351.931 233.375 351.636 236.291C351.499 237.616 350.815 238.776 349.649 239.647C347.64 241.145 343.996 241.901 338.783 241.901H338.79Z"
        fill="#E4D0A2"
        className={styles['svg-elem-23']}
      ></path>
      <path
        d="M343.074 256.267C341.807 256.267 340.395 255.958 338.847 255.346C337.054 254.633 335.715 253.754 335.657 253.718C334.98 253.272 334.8 252.364 335.247 251.695C335.693 251.018 336.6 250.838 337.27 251.284C338.487 252.084 342.138 253.985 344.341 253.135C345.234 252.796 345.832 251.983 346.178 250.658C346.257 250.348 346.314 249.851 345.861 249.146C345.076 247.929 342.368 245.495 332.985 242.794C327.462 241.203 322.321 240.317 322.27 240.31C321.471 240.173 320.938 239.417 321.075 238.625C321.212 237.826 321.968 237.293 322.76 237.43C322.976 237.466 328.089 238.344 333.763 239.979C341.627 242.24 346.523 244.789 348.309 247.561C349.094 248.785 349.332 250.11 349 251.399C348.59 252.962 347.632 255.007 345.378 255.871C344.673 256.138 343.902 256.274 343.067 256.274L343.074 256.267Z"
        fill="#E4D0A2"
        className={styles['svg-elem-24']}
      ></path>
      <path
        d="M296.974 305.378C292.099 305.378 288.131 301.41 288.131 296.535C288.131 291.66 292.099 287.692 296.974 287.692C301.849 287.692 305.816 291.66 305.816 296.535C305.816 301.41 301.849 305.378 296.974 305.378ZM296.974 290.609C293.712 290.609 291.054 293.266 291.054 296.528C291.054 299.79 293.712 302.447 296.974 302.447C300.236 302.447 302.893 299.79 302.893 296.528C302.893 293.266 300.236 290.609 296.974 290.609Z"
        fill="#E4D0A2"
        className={styles['svg-elem-25']}
      ></path>
      <path
        d="M300.164 318.382C299.401 318.382 298.76 317.792 298.709 317.014L297.816 303.642C297.766 302.836 298.371 302.137 299.177 302.087C299.984 302.029 300.682 302.641 300.733 303.448L301.626 316.82C301.676 317.626 301.071 318.325 300.265 318.375C300.229 318.375 300.2 318.375 300.164 318.375V318.382Z"
        fill="#E4D0A2"
        className={styles['svg-elem-26']}
      ></path>
      <path
        d="M317.036 301.9H317L303.599 301.59C302.792 301.569 302.151 300.899 302.173 300.092C302.194 299.286 302.857 298.645 303.671 298.667L317.072 298.976C317.878 298.998 318.519 299.667 318.497 300.474C318.476 301.266 317.828 301.9 317.036 301.9Z"
        fill="#E4D0A2"
        className={styles['svg-elem-27']}
      ></path>
      <path
        d="M230.631 330.653C228.096 330.653 226.397 330.372 226.203 330.344C225.403 330.207 224.87 329.451 225.007 328.659C225.144 327.859 225.9 327.326 226.692 327.463C226.88 327.492 239.042 329.422 247.208 322.005C247.805 321.465 248.727 321.508 249.274 322.106C249.814 322.703 249.771 323.625 249.174 324.172C243.125 329.667 235.405 330.653 230.631 330.653V330.653Z"
        fill="#E4D0A2"
        className={styles['svg-elem-28']}
      ></path>
      <path
        d="M231.546 351.823C231.114 351.823 230.682 351.629 230.394 351.261C229.897 350.628 230.012 349.706 230.646 349.209C231.093 348.863 241.663 340.748 253.797 343.758C254.582 343.952 255.057 344.745 254.863 345.529C254.668 346.314 253.876 346.79 253.091 346.595C242.362 343.931 232.54 351.434 232.439 351.513C232.173 351.722 231.856 351.823 231.539 351.823H231.546Z"
        fill="#E4D0A2"
        className={styles['svg-elem-29']}
      ></path>
      <path
        d="M237.314 348.511C236.63 348.511 236.025 348.036 235.881 347.337L232.245 329.313C232.086 328.521 232.597 327.751 233.39 327.592C234.182 327.434 234.952 327.945 235.111 328.737L238.747 346.761C238.905 347.553 238.394 348.324 237.602 348.482C237.501 348.504 237.408 348.511 237.314 348.511Z"
        fill="#E4D0A2"
        className={styles['svg-elem-30']}
      ></path>
      <path
        d="M246.2 346.121C245.523 346.121 244.911 345.646 244.767 344.954L241.066 327.082C240.9 326.29 241.411 325.519 242.204 325.353C242.996 325.188 243.766 325.699 243.932 326.491L247.633 344.364C247.799 345.156 247.287 345.926 246.495 346.092C246.395 346.114 246.294 346.121 246.2 346.121Z"
        fill="#E4D0A2"
        className={styles['svg-elem-31']}
      ></path>
      <path
        d="M162.259 338.682C158.673 338.682 155.756 335.765 155.756 332.179C155.756 328.593 158.673 325.677 162.259 325.677C165.845 325.677 168.761 328.593 168.761 332.179C168.761 335.765 165.845 338.682 162.259 338.682ZM162.259 328.608C160.286 328.608 158.68 330.213 158.68 332.186C158.68 334.159 160.286 335.765 162.259 335.765C164.232 335.765 165.838 334.159 165.838 332.186C165.838 330.213 164.232 328.608 162.259 328.608Z"
        fill="#E4D0A2"
        className={styles['svg-elem-32']}
      ></path>
      <path
        d="M115.676 307.754C112.09 307.754 109.173 304.838 109.173 301.251C109.173 297.665 112.09 294.749 115.676 294.749C119.262 294.749 122.178 297.665 122.178 301.251C122.178 304.838 119.262 307.754 115.676 307.754ZM115.676 297.68C113.703 297.68 112.097 299.286 112.097 301.259C112.097 303.232 113.703 304.838 115.676 304.838C117.649 304.838 119.255 303.232 119.255 301.259C119.255 299.286 117.649 297.68 115.676 297.68Z"
        fill="#E4D0A2"
        className={styles['svg-elem-33']}
      ></path>
      <path
        d="M176.509 347.259C172.923 347.259 170.007 344.342 170.007 340.756C170.007 337.17 172.923 334.254 176.509 334.254C180.095 334.254 183.012 337.17 183.012 340.756C183.012 344.342 180.095 347.259 176.509 347.259ZM176.509 337.185C174.536 337.185 172.93 338.791 172.93 340.764C172.93 342.737 174.536 344.342 176.509 344.342C178.482 344.342 180.088 342.737 180.088 340.764C180.088 338.791 178.482 337.185 176.509 337.185Z"
        fill="#E4D0A2"
        className={styles['svg-elem-34']}
      ></path>
      <path
        d="M183.775 336.061C183.624 336.061 183.465 336.039 183.314 335.989C182.911 335.852 182.601 335.557 182.443 335.197C182.075 334.664 180.11 332.403 176.675 330.588C172.023 328.133 166.788 327.528 161.121 328.788C160.336 328.961 159.551 328.464 159.378 327.679C159.205 326.894 159.702 326.109 160.487 325.937C166.104 324.684 171.404 325.094 176.235 327.146C180.513 328.968 183.163 331.582 184.099 332.626C184.927 333.541 185.445 334.21 185.157 335.067C184.956 335.679 184.38 336.068 183.768 336.068L183.775 336.061ZM182.385 334.138C182.335 334.297 182.313 334.441 182.313 334.578C182.313 334.434 182.342 334.282 182.385 334.138Z"
        fill="#E4D0A2"
        className={styles['svg-elem-35']}
      ></path>
      <path
        d="M171.778 348.043C170.525 348.043 169.136 347.942 167.638 347.676C162.467 346.761 157.808 344.205 153.783 340.093C153.221 339.517 153.229 338.588 153.805 338.026C154.381 337.465 155.31 337.472 155.871 338.048C159.933 342.203 164.649 344.55 169.884 345.026C173.751 345.378 176.632 344.55 177.229 344.313C177.561 344.097 177.978 344.017 178.389 344.125C179.166 344.327 179.642 345.126 179.433 345.911C179.202 346.79 178.403 347.063 177.208 347.38C176.293 347.625 174.342 348.043 171.771 348.043H171.778ZM176.79 344.766C176.718 344.882 176.653 345.018 176.61 345.177C176.646 345.026 176.711 344.889 176.79 344.766Z"
        fill="#E4D0A2"
        className={styles['svg-elem-36']}
      ></path>
      <path
        d="M102.556 310.764C102.404 310.764 102.246 310.764 102.095 310.749C99.8337 310.576 97.9831 309.151 96.5933 306.522C95.3187 304.103 95.1387 301.791 96.0748 299.66C98.1415 294.929 105.047 293.035 105.342 292.956C105.364 292.956 105.378 292.949 105.4 292.941C108.223 292.308 113.17 290.558 114.401 288.585C114.689 288.124 114.668 287.8 114.61 287.569C114.02 285.092 110.974 285.481 110.844 285.503C110.045 285.611 109.303 285.056 109.195 284.257C109.087 283.458 109.641 282.716 110.441 282.608C112.45 282.334 116.497 282.867 117.447 286.9C117.706 288.001 117.512 289.118 116.871 290.14C114.617 293.741 107.078 295.562 106.07 295.793C104.428 296.239 99.9849 298.004 98.7536 300.841C98.1919 302.137 98.3287 303.548 99.1856 305.161C100.086 306.868 101.115 307.746 102.325 307.84C105.198 308.063 108.9 304.009 109.973 302.569C110.455 301.921 111.37 301.784 112.018 302.267C112.666 302.749 112.803 303.664 112.32 304.312C112.27 304.376 111.06 305.997 109.274 307.581C106.898 309.698 104.637 310.764 102.563 310.764H102.556Z"
        fill="#E4D0A2"
        className={styles['svg-elem-37']}
      ></path>
      <path
        d="M65.6438 253.618C65.1326 253.618 64.6285 253.344 64.362 252.862C63.9732 252.156 64.2253 251.263 64.9309 250.874C65.1542 250.752 67.6097 249.398 70.9725 247.871C70.2236 247.893 69.554 247.9 68.9491 247.886C66.7816 247.835 64.7077 247.562 64.2324 245.941C64.0812 245.423 64.1533 244.854 64.4485 244.35C64.7221 243.882 65.1974 243.054 68.7474 241.599C68.193 241.599 67.6745 241.578 67.1992 241.549C65.255 241.426 62.9219 241.074 62.1586 239.389C61.8777 238.769 61.8777 238.1 62.173 237.502C62.9579 235.896 65.4854 235.277 70.0796 234.161C75.7971 232.771 83.6246 230.863 87.3258 226.549C87.8515 225.937 88.7732 225.865 89.3853 226.391C89.9974 226.917 90.0694 227.838 89.5438 228.45C85.2304 233.477 76.8773 235.514 70.7709 236.998C69.0643 237.416 66.8968 237.941 65.6583 238.409C66.8032 238.661 69.3163 238.87 74.6954 238.323C79.2824 237.855 83.5886 237.063 83.6318 237.055C84.4095 236.911 85.1584 237.416 85.324 238.186C85.4896 238.957 85.0144 239.727 84.2439 239.914C84.2007 239.921 80.1897 240.915 75.9988 242.19C71.8943 243.436 69.6404 244.343 68.409 244.948C69.7772 245.027 72.2039 244.984 76.4812 244.53C79.0016 244.264 81.4211 243.925 83.0269 243.688C83.711 243.551 84.3807 243.45 85.0287 243.385C85.8137 243.306 86.5266 243.86 86.6274 244.645C86.7354 245.43 86.1953 246.157 85.4176 246.28C85.396 246.28 84.6687 246.402 83.5094 246.575C76.186 248.03 66.4647 253.387 66.3567 253.445C66.1335 253.567 65.8887 253.632 65.651 253.632L65.6438 253.618Z"
        fill="#E4D0A2"
        className={styles['svg-elem-38']}
      ></path>
      <path
        d="M87.7292 237.919C87.0235 237.919 86.4403 237.422 86.2962 236.767C86.0946 236.256 83.0126 229.184 73.7666 229.897C69.8493 230.2 68.3371 231.107 67.9843 231.489C68.4667 231.993 70.7278 232.994 75.4948 232.806C76.3013 232.77 76.9782 233.404 77.0142 234.211C77.043 235.017 76.4166 235.694 75.6101 235.73C72.7225 235.845 70.2237 235.572 68.3803 234.945C65.5575 233.987 65.0535 232.461 65.0031 231.633C64.9311 230.437 65.6295 227.586 73.5434 226.981C79.5201 226.52 83.3871 228.846 85.5761 230.869C87.9453 233.066 89.1838 235.672 89.1838 236.457C89.1838 237.242 88.5285 237.919 87.722 237.919H87.7292Z"
        fill="#E4D0A2"
        className={styles['svg-elem-39']}
      ></path>
      <path
        d="M72.7726 181.262C72.6502 181.262 72.535 181.248 72.4126 181.219C71.6277 181.018 71.1596 180.225 71.354 179.441L72.7726 173.874C71.1956 174.429 69.1649 174.681 67.019 173.788C65.1036 172.989 63.577 170.929 63.1378 168.546C62.6697 165.989 63.5122 163.462 65.4637 161.611C67.5159 159.667 70.4395 159.062 73.0895 160.034C74.328 160.488 75.3722 161.222 76.1859 162.158L77.5684 157.24C77.7845 156.462 78.591 156.009 79.3687 156.225C80.1464 156.441 80.6 157.247 80.384 158.025L77.9069 166.86C77.7196 167.537 77.0788 167.977 76.3803 167.919C75.6818 167.861 75.1201 167.321 75.0481 166.623C74.8465 164.808 73.7448 163.368 72.0957 162.77C70.4683 162.173 68.7401 162.533 67.4799 163.728C65.8093 165.312 65.8453 167.091 66.0182 168.013C66.2774 169.41 67.1487 170.67 68.1496 171.087C71.1812 172.355 74.0328 169.892 74.0616 169.863C74.5441 169.438 75.2426 169.381 75.7898 169.712C76.3371 170.043 76.6035 170.699 76.4451 171.318L74.1984 180.153C74.0328 180.816 73.4351 181.255 72.7798 181.255L72.7726 181.262Z"
        fill="#E4D0A2"
        className={styles['svg-elem-40']}
      ></path>
      <path
        d="M77.9646 182.58C77.835 182.58 77.7054 182.566 77.5757 182.53C76.798 182.313 76.3444 181.507 76.5532 180.729L82.602 158.867C82.818 158.09 83.6245 157.636 84.4022 157.845C85.1799 158.061 85.6336 158.867 85.4247 159.645L79.376 181.507C79.196 182.155 78.6055 182.58 77.9646 182.58V182.58Z"
        fill="#E4D0A2"
        className={styles['svg-elem-41']}
      ></path>
      <path
        d="M110.599 122.97C110.239 122.97 109.872 122.833 109.591 122.567C109.476 122.452 106.653 119.773 103.801 116.453C103.117 115.654 102.512 114.919 101.972 114.228C101.375 113.559 100.856 112.968 100.489 112.529C99.0775 110.851 95.5778 110.03 94.3465 109.857C93.5472 109.742 92.9927 109 93.1079 108.201C93.2231 107.402 93.9576 106.847 94.7569 106.955C95.045 106.998 96.4924 107.214 98.1558 107.798C97.8461 106.818 97.8677 106.235 97.8749 105.904C97.9109 104.86 98.3214 103.981 99.0631 103.362C99.8264 102.728 100.784 102.469 101.835 102.628C102.455 102.721 103.117 102.959 103.83 103.348C103.369 101.864 103.398 100.942 103.528 100.287C103.722 99.3007 104.277 98.5302 105.126 98.0765C107.049 97.054 109.274 97.7957 111.737 100.294C113.537 102.116 115.265 104.601 116.792 106.79C117.822 108.266 119.233 110.289 119.744 110.599C120.752 111.189 121.609 111.341 122.358 111.067C123.647 110.599 124.504 108.907 124.72 108.295C124.994 107.539 125.829 107.135 126.585 107.409C127.341 107.675 127.744 108.503 127.478 109.267C127.356 109.62 126.182 112.774 123.381 113.811C122.279 114.214 120.5 114.43 118.275 113.134C117.274 112.55 116.201 111.06 114.394 108.467C112.932 106.372 111.276 103.996 109.656 102.354C108.842 101.526 107.344 100.208 106.502 100.662C106.458 100.683 106.422 100.705 106.394 100.849C106.3 101.331 106.307 103.355 110.289 109.288C110.462 109.49 110.635 109.706 110.808 109.915C113.422 113.112 115.438 116.172 115.517 116.295C115.942 116.943 115.791 117.807 115.164 118.268C114.545 118.729 113.667 118.628 113.17 118.03C113.062 117.901 110.549 114.883 108.093 111.269C108.05 111.197 107.999 111.132 107.956 111.067C105.472 108.143 102.944 105.745 101.396 105.515C101.087 105.472 100.986 105.551 100.928 105.601C100.878 105.645 100.799 105.709 100.791 105.99C100.748 107.344 102.217 109.771 104.262 112.399C107.049 115.524 111.607 120.443 111.665 120.5C112.205 121.076 112.183 121.976 111.622 122.531C111.341 122.812 110.966 122.956 110.592 122.956L110.599 122.97Z"
        fill="#E4D0A2"
        className={styles['svg-elem-42']}
      ></path>
      <path
        d="M181.449 73.0463C180.83 73.0463 180.254 72.6502 180.052 72.0238L177.662 64.4412H167.883C167.076 64.4412 166.421 63.7859 166.421 62.9794C166.421 62.1729 167.076 61.5176 167.883 61.5176H178.734C179.375 61.5176 179.937 61.928 180.131 62.5401L182.846 71.1453C183.091 71.9158 182.659 72.7366 181.888 72.9815C181.744 73.0247 181.593 73.0463 181.449 73.0463V73.0463Z"
        fill="#E4D0A2"
        className={styles['svg-elem-43']}
      ></path>
      <path
        d="M163.541 85.2956C163.245 85.2956 162.943 85.2019 162.684 85.0147C162.028 84.5395 161.884 83.6249 162.36 82.9697L177.554 62.1157C178.029 61.4605 178.943 61.3164 179.599 61.7917C180.254 62.267 180.398 63.1815 179.923 63.8368L164.729 84.6907C164.441 85.0867 163.994 85.2884 163.548 85.2884L163.541 85.2956Z"
        fill="#E4D0A2"
        className={styles['svg-elem-44']}
      ></path>
      <path
        d="M174.241 81.5724C173.939 81.5724 173.629 81.4788 173.37 81.2844L162.676 73.2985C162.028 72.8161 161.899 71.9015 162.381 71.2535C162.864 70.6054 163.778 70.4758 164.426 70.9582L175.119 78.9441C175.768 79.4265 175.897 80.341 175.415 80.9891C175.127 81.3708 174.687 81.5796 174.241 81.5796V81.5724Z"
        fill="#E4D0A2"
        className={styles['svg-elem-45']}
      ></path>
      <path
        d="M234.455 87.1459C234.189 87.1459 233.915 87.1315 233.634 87.1099C232.828 87.0379 232.237 86.325 232.309 85.5185C232.381 84.712 233.094 84.1215 233.901 84.1935C237.249 84.496 239.82 81.9252 242.311 79.4409C242.383 79.3689 242.455 79.2969 242.527 79.2249C242.21 76.4669 242.448 73.3345 242.664 70.5261C242.794 68.7979 242.988 66.3208 242.815 65.2046C242.261 65.6439 241.102 66.8465 239.157 70.1013C237.609 72.6792 236.378 75.2139 236.363 75.2355C236.054 75.862 235.348 76.1933 234.671 76.0061C233.994 75.826 233.541 75.1923 233.591 74.4939C233.908 69.9573 234.037 64.4701 233.692 63.5052C233.389 62.7563 232.619 62.6915 232.468 62.6843H232.489V59.7607C233.548 59.7607 235.564 60.3224 236.407 62.4251C236.788 63.3756 236.853 65.8167 236.81 68.3299C239.834 63.3468 241.433 62.3891 242.498 62.1226C243.219 61.9426 243.931 62.065 244.508 62.4755C246.128 63.6348 245.912 66.4648 245.58 70.7494C245.436 72.6 245.278 74.7171 245.3 76.6901C246.956 75.4228 248.742 74.6523 250.816 75.2067C252.4 75.6316 253.602 76.6109 254.294 78.0439C255.05 79.6137 255.086 81.594 254.38 83.207C253.804 84.532 252.645 85.5617 251.125 86.1162C249.498 86.7066 247.69 86.6418 246.272 85.9361C244.839 85.2232 243.91 84.0279 243.312 82.5517C240.986 84.8128 238.164 87.1243 234.462 87.1243L234.455 87.1459ZM245.652 80.269C245.977 81.7164 246.567 82.8397 247.568 83.3438C248.266 83.6895 249.246 83.711 250.117 83.3942C250.873 83.1206 251.442 82.6381 251.694 82.062C251.997 81.3708 252.097 80.2618 251.651 79.3329C251.334 78.6848 250.801 78.2527 250.052 78.0511C248.727 77.6983 247.417 78.5984 245.645 80.269H245.652Z"
        fill="#E4D0A2"
        className={styles['svg-elem-46']}
      ></path>
    </svg>
  )
}
