import type { NextPage } from 'next'
import Head from 'next/head'
import { FollowUsBar } from '../components/FollowUsBar'

const Home: NextPage = () => {
  return (
    <div className="relative bg-black text-white w-full min-h-screen flex items-center sm:justify-center flex-col px-5">
      <Head>
        <title>JWC 12 Landing Page</title>
        <meta name="description" content="JWC" />
      </Head>

      <FollowUsBar className="right-0 top-0 absolute m-3 sm:my-5 sm:mx-10" />

      <div className="max-w-screen-md mt-32 sm:mt-0 w-full">
        <div className="my-10 w-full max-w-lg mx-auto">
          <svg viewBox="0 0 562 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="141" width="280" height="280" fill="white" />
            <path
              d="M2.12972 166.393C2.12972 190.5 18.5226 205.286 43.1119 205.286C68.5047 205.286 84.094 191.625 84.094 166.554V91.5H57.7369V166.393C57.7369 177.643 52.2726 182.946 42.9512 182.946C33.7904 182.946 28.0047 177 28.0047 166.393H2.12972ZM131.486 204H157.522L177.772 128.625H178.415L198.826 204H224.861L253.308 91.5H225.986L209.433 169.446H208.79L188.379 91.5H167.808L147.558 169.446H147.076L130.361 91.5H103.201L131.486 204ZM346.657 166.393C343.443 177.964 335.246 184.071 323.193 184.071C306.318 184.071 296.032 170.893 296.032 147.429C296.032 124.446 306.478 111.107 323.193 111.107C335.246 111.107 343.443 118.018 346.335 129.429H372.853C369.639 105.643 349.389 90.2143 323.193 90.2143C289.925 90.2143 269.353 110.946 269.353 147.429C269.353 184.232 289.764 205.286 323.193 205.286C350.193 205.286 369.96 190.179 373.014 166.393H346.657ZM415.73 204H442.088V91.5H422.32L388.73 104.518V123.804L415.73 113.518V204ZM473.722 204H556.169V182.625H512.133V181.982L534.633 159.804C549.58 145.339 555.687 136.179 555.687 122.196C555.687 104.357 542.347 90.2143 514.222 90.2143C484.008 90.2143 472.919 108.696 472.919 129.429H496.544C496.705 119.304 500.883 109.982 514.222 109.982C525.955 109.982 531.097 116.571 531.097 124.446C531.097 133.125 524.83 139.232 515.347 148.714L473.722 189.214V204Z"
              fill="#80FF1C"
            />
          </svg>
        </div>
        <div className="text-3xl font-bold mx-auto text-center">เราจะกลับมาอีกในอนาคตอันใกล้นี้</div>
        <div className="flex flex-col sm:flex-row gap-5 w-full mt-10">
          <input type="text" placeholder="กรอกอีเมลของคุณ" className="py-2 px-3 rounded-md w-full sm:w-2/3" />
          <button className="bg-green-500 px-5 rounded-md w-full sm:w-1/3 py-2">รับสมัครข่าวสาร</button>
        </div>
        <div className="text-xl font-thin mt-24 text-center mb-10">
          Copyright 2022, Young Webmaster Camp, in associate with Thai Webmaster Association. All right reserved.
        </div>
      </div>
    </div>
  )
}

export default Home
