import { Question } from './Question'
import { Section } from './Section'

const questions = [
  {
    title: 'ทำเว็บไม่เป็น เข้าค่ายได้ไหม',
    answer:
      'เข้าได้! เพราะค่ายของเรามีถึง 4 สาขา ทั้ง CONTENT (สายเขียน), DESIGN (สายวาด), MARKETING (สายหาเงิน) และ PROGRAMMING (สายเขียนโค้ด) ขอแค่สนใจในสาขาใดสาขาหนึ่งก็สมัครได้แล้ว',
  },
  {
    // NOTE: Wait for
    title: 'ใครที่สามารถสมัครค่ายนี้ได้บ้าง?',
    answer:
      'น้อง ๆ อายุ 15-18 ปีบริบูรณ์ หรือกำลังศึกษาระดับชั้นม.4 - 6 หรือเทียบเท่า รวมถึงผู้ที่เพิ่งจบชั้นม.6 แต่ยังไม่เคยเข้าศึกษาในระดับอุดมศึกษามาก่อน',
  },
  {
    title: 'มีการค้างคืนหรือเปล่า?',
    // TODO: Insert hotel name after confirmation.
    answer:
      'ค่ายของเราเป็นค่าย 3 วัน 2 คืน จัดขึ้นที่คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (IT KMITL) ภายใต้การดูแลของพี่ ๆ ตลอด 24 ชั่วโมง',
  },
  {
    title: 'มีค่าใช้จ่ายมั้ย? ทำไมต้องเก็บค่ายืนยันสิทธิ์?',
    answer:
      'ค่าย JWC ไม่มีค่าใช้จ่ายในการมาเข้าค่าย แต่จะมีการเก็บค่ามัดจำในช่วงยืนยันสิทธิเป็นจำนวน 500 บาท และจะคืนค่ามัดจำให้น้อง ๆ หลังจบค่าย เพื่อเป็นการยืนยันว่าผู้สมัครค่ายจะมาค่ายจริง แต่เราจะคืนเงินให้หลังจบค่าย!',
  },
  {
    title: 'ไม่มีเฟซบุ๊กสมัครได้มั้ย?',
    answer:
      'ไม่ได้ เนื่องจากค่ายของเราใช้เฟซบุ๊กเป็นช่องทางหลักในการเก็บข้อมูลและติดต่อสื่อสารกับผู้สมัคร แอบใบ้ว่าเมื่อติดค่ายแล้วจะมีการดึงเข้ากลุ่มลับของผู้กำหนดโชคชะตาแห่ง JWC ด้วย!',
  },
]

export const FaqSection: React.FunctionComponent = () => {
  return (
    <Section>
      <h2 id="faq" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold text-center">
        คำถามที่พบบ่อย
      </h2>
      {questions.map(({ title, answer }) => (
        <Question key={title} title={title}>
          {answer}
        </Question>
      ))}
    </Section>
  )
}
