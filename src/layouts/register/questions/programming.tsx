import { Form, InputType } from '../types'
import { buildYupObject } from './utils'

export const programmingQuestions: Form = {
  name: 'programming',
  inputs: [
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            น้อง ๆ ได้รับการไหว้วานจากแม่หมอคนหนึ่งให้ทำเว็บไซต์ส่วนตัวให้กับแม่หมอคนนั้น
            โดยมีดีไซน์ของเว็บไซต์ตามด้านบน ซึ่งน้อง ๆ
            จะใช้เทคโนโลยีอะไรก็ได้ในการสรรค์สร้างเว็บนั้นขึ้นมา หลังจากน้องทำเว็บไซต์เสร็จแล้ว
            ให้น้องทำการ Deploy และส่ง URL มาทางช่องด้านล่าง (หรือถ้าหากน้องไม่สามารถ Deploy
            ได้ให้ทำการ Zip ไฟล์และส่งเป็นลิงก์ไปยังไฟล์นั้น)
            ในส่วนของที่เป็นรูปภาพและแผนที่สามารถใส่รูปภาพใดก็ได้มาแทนที่
          </p>
          <a href="https://drive.google.com/file/d/1DRD-MegyLieFAIvDkgw60WmYozYr65CV/view?usp=sharing">
            แบบ Desktop
          </a>
          <a href="https://drive.google.com/file/d/1DRD-MegyLieFAIvDkgw60WmYozYr65CV/view?usp=sharing">
            แบบ Mobile
          </a>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            แม่หมอต้องการให้น้อง ๆ สังเกตภาพด้านบนนี้ เมื่อเห็นภาพนี้แล้วเห็นโอกาสอะไร
            ถ้าคิดธุรกิจมาได้อยากทำธุรกิจอะไร พร้อมให้เหตุผล
          </p>
          <a href="https://www.scg.com/sdsymposium/2020/wp-content/uploads/2020/10/IMG_9567.jpg / ที่มาของภาพ: https://www.scg.com/sdsymposium/2020/pillar/%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%A2%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D/">
            รูปอยู่ตรงนี้
          </a>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            แม่หมออยากให้ลองยกตัวอย่างเว็บไซต์หรือแอปพลิเคชันที่ชอบ และอยากลองสร้างขึ้นมาบ้าง
            พร้อมบอกเหตุผลว่า ทำไมถึงอยากทำเว็บไซต์หรือแอปพลิเคชันนั้น
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
  ],
}

export const programmingQuestionSchema = buildYupObject(programmingQuestions)
