import clsx from 'clsx'

import { GoogleMap } from './Map'
import styles from './PlaceSection.module.css'
import { Section } from './Section'

const travelingInfo = [
  {
    method: 'รถไฟสายตะวันออก/ชานเมือง',
    description: 'ลงที่ป้ายหยุดรถไฟพระจอมเกล้าหรือสถานีหัวตะเข้',
  },
  {
    method: 'SA City Line',
    description: ' ลงที่สถานีลาดกระบัง แล้วต่อรถไฟที่สถานีรถไฟลาดกระบัง',
  },
  {
    method: 'รถตู้',
    description: [
      'หมอชิตใหม่-อนุสาวรีย์–พระจอมเกล้าลาดกระบัง',
      'รังสิต-ลาดกระบัง',
      'สาย 50B แฮปปิ้แลนด์-ลาดกระบัง',
      'สาย 50 ห้างซีคอนสแควร์-พระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
      'สายมีนบุรี–ลาดกระบัง',
    ],
  },
]

export const PlaceSection: React.FunctionComponent = () => {
  return (
    <Section className="lg:p-16">
      <div
        className={clsx(
          'grid grid-cols-1 lg:flex lg:border lg:p-8 lg:pt-32 rounded-xl bg-cover bg-no-repeat border-gold w-full',
          styles.placeSection
        )}
      >
        <div className="hidden w-[400px] lg:block lg:-translate-x-32">
          <GoogleMap />
        </div>
        <div className="lg:-translate-x-32 px-4">
          <h2 className="text-3xl font-heading mb-4 font-semibold">สถานที่</h2>
          <h3 className="text-gold font-heading font-semibold">
            คณะเทคโนโลยีสารสนเทศ <br></br> สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          </h3>
          <p className="mb-4">เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ</p>
          <h3 className="text-3xl font-heading mb-4 font-semibold">วิธีการเดินทาง</h3>
          <div>
            {travelingInfo.map((info) => {
              return (
                <div key={info.method}>
                  <span className="text-gold font-semibold">{`${info.method}: `}</span>
                  {typeof info.description === 'string' ? (
                    <span>{info.description}</span>
                  ) : (
                    <ul className="list-disc list-inside">
                      {info.description.map((des) => (
                        <li key={des}>{des}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}