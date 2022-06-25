import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

const Announcement: React.FC = () => {
  return (
    <div>
      <div className="h-[72px] w-[146px] m-10">
        <Logo />
      </div>
      <Container maxWidth="3xl">
        <h1 className="text-center text-3xl text-white font-bold mb-8">
          ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์
        </h1>
        <div className="bg-white rounded-md w-full p-5 sm:p-8 md:p-10 text-black">
          <h2 className="text-lg font-bold mb-4">ขั้นตอนต่อไป</h2>
          <p className="mb-6">
            การสัมภาษณ์จะจัดขึ้นใน วันอังคารที่ 28 มิถุนายน 2565 ผ่านทางโปรแกรม Zoom ตั้งแต่เวลา xx
            - xx ขอให้น้องๆ
          </p>
          <h2 className="text-lg font-bold mb-4">สิ่งที่ต้องเตรียมก่อนการสัมภาษณ์</h2>
          <ol className="list-decimal ml-6">
            <li>เช็คเวลาสัมภาษณ์ของตนเอง</li>
            <li>เตรียม Portfolio หรือผลงานต่างๆ (ถ้ามี)</li>
            <li>สัมภาษณ์</li>
          </ol>
        </div>

        {/* Branch selection */}
        <h1 className="text-center text-3xl text-white font-bold mb-8 mt-16">โปรดเลือกสาขา</h1>
      </Container>
    </div>
  )
}

export default Announcement
