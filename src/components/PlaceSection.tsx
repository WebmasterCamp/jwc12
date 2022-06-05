import { GoogleMap } from './Map'
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
  {
    method: 'รถโดยสาร',
    description: 'สาย 143 (รถร่วมบริการ), สาย 1013 (รถร่วมบริการ)',
  },
  {
    method: 'รถสองแถว',
    description: 'ศูนย์การค้าแฮปปี้แลนด์–ตลาดหัวตะเข้',
  },
]

export const PlaceSection: React.FunctionComponent = () => {
  return (
    <Section className="rounded-xl lg:border grid grid-cols-1 lg:grid-cols-2 border-gold lg:w-10/12">
      <div className="hidden lg:block">
        <GoogleMap />
      </div>
      <div>
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
    </Section>
  )
}
