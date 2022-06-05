import { GoogleMap } from './Map'
import { Section } from './Section'

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
      </div>
    </Section>
  )
}
