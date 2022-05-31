import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import clsx from 'clsx'

import { DocumentLayout } from '@/layouts/document'
import { ContentWrapper } from '@/layouts/document/components/ContenWrap'
import { SectionTitle } from '@/layouts/document/components/SectionTitle'

const Page: NextPage = () => {
  return (
    <DocumentLayout>
      <NextSeo title="นโยบายคุ้มครองข้อมูลส่วนบุคคล" />
      <div>
        <SectionTitle title="PRIVACY POLICY" subtitle="นโยบายคุ้มครองข้อมูลส่วนบุคคล" />
        <ContentWrapper>
          <h2>ข้อมูลส่วนบุคคล คืออะไร?</h2>
          <p>
            ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวตนบุคคลนั้นได้
            ไม่ว่าทางตรงหรือทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ
          </p>

          <h2>ลักษณะข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</h2>
          <ul>
            เราจะเก็บรวบรวมข้อมูลส่วนบุคคลดังต่อไปนี้
            <li>ข้อมูลที่บ่งชี้ตัวตน อาทิ ชื่อ วันเกิด อายุ สัญชาติ</li>
            <li>ข้อมูลช่องทางการติดต่อ อาทิ ที่อยู่ สถานที่ติดต่อ เบอร์โทร อีเมล</li>
            <li>ข้อมูลบัญชี อาทิ รายละเอียดการชำระเงิน</li>
            <li>
              ข้อมูลส่วนตัว อาทิ ชื่อบัญชีผู้ใช้ ความสนใจของท่านที่มีต่อบริการต่าง ๆ ของผู้ให้บริการ
            </li>
            <li>
              ข้อมูลทางเทคนิค อาทิ Google Analytics, Facebook Pixels, Hotjar
              หมายเลขระบุตำแหน่งคอมพิวเตอร์ (IP Address) ข้อมูลการเข้าระบบ ข้อมูลการใช้งาน และ
              การตั้งค่า (log)
            </li>
          </ul>

          <h2>แหล่งที่มาของข้อมูลส่วนบุคคล</h2>
          <ul>
            เราได้รับข้อมูลส่วนบุคคลของท่านจาก 2 ช่องทาง ดังนี้
            <li>
              เราได้รับข้อมูลส่วนบุคคลจากท่านโดยตรง
              โดยเราจะเก็บรวบรวมข้อมูลส่วนบุคคลของท่านจากการยินยอมเข้าร่วมโครงการ ดังนี้
            </li>
            <ol>
              <li>เมื่อท่านลงทะเบียนบัญชีเพื่อเข้าร่วมโครงการ</li>
              <li>เมื่อท่านยินยอมรับข้อมูลข่าวสารจากสมาคมผู้ดูแลเว็บไทย</li>
              <li>จากการเก็บข้อมูลการใช้เว็บไซต์ของท่านผ่านบราวเซอร์คุกกี้</li>
              <li>
                จากการติดต่อสอบถามของท่าน หรือผ่านการโต้ตอบทางอีเมลหรือ ช่องทางการสื่อสารอื่น ๆ เช่น
                โทรศัพท์ เพื่อที่ผู้ให้บริการสามารถติดต่อท่านกลับได้
              </li>
              <li>
                เมื่อท่านเข้าสู่ระบบบัญชีผู้ใช้บนเว็บไซต์ของเรา หรือแอพพลิเคชันอื่น ๆ ที่เกี่ยวข้อง
                อาทิ เฟสบุ๊ค
              </li>
            </ol>
            <li>
              เราได้รับข้อมูลส่วนบุคคลของท่านมาจากบุคคลที่สาม Facebook Login
              โดยได้รับข้อมูลเมื่อท่านสมัครระบบหรือเข้าใช้งานระบบผ่านช่องทางของบุคคลที่สาม
            </li>
          </ul>

          <h2>วัตถุประสงค์ในการประมวลผลข้อมูล</h2>
          <ul>
            <li>
              เราจัดเก็บข้อมูลส่วนบุคคลของท่านเพื่อประโยชน์ในการจัดฐานข้อมูลในการวิเคราะห์
              และเสนอสิทธิประโยชน์ตามความสนใจของท่าน
            </li>
            <li>
              เราจัดเก็บข้อมูลส่วนบุคคลเพื่อยืนยันตัวตนว่าท่านเป็นผู้เดียวในการเข้าถึงบัญชีของท่าน
            </li>
            <li>
              เราจัดเก็บข้อมูลส่วนบุคคลของท่านเพื่อวิจัยการตลาดและบริหารความสัมพันธ์ระหว่างผู้
              ให้บริการและผู้ใช้บริการ
            </li>
            <li>
              เราจัดเก็บข้อมูลส่วนบุคคลของท่านเพื่อปฏิบัติตามข้อกฎหมาย และระเบียบบังคับใช้ของรัฐ
            </li>
            <li>
              เราจัดเก็บข้อมูลส่วนบุคคลของท่านเพื่อปฏิบัติตามกฎระเบียบที่ใช้บังคับกับผู้บริการ
              รวมถึงการยินยอมให้ผู้ให้บริการสามารถโอนข้อมูลส่วนบุคคลให้แก่กลุ่มธุรกิจและพันธมิตรของผู้ให้บริการ
              ผู้ประมวลผลข้อมูล หรือหน่วยงานใด ๆ ที่มีสัญญากับผู้ให้บริการ
            </li>
          </ul>

          <h2>การประมวลผลข้อมูลส่วนบุคคล</h2>
          <ul>
            เมื่อได้รับข้อมูลส่วนบุคคลจากท่านแล้ว เราจะดำเนินการดังนี้
            <li>
              เก็บรวบรวมโดยมีการบันทึกในระบบคอมพิวเตอร์ ที่ใช้บริการ ได้แก่ Google Cloud Platform,
              Firebase, Airtable
            </li>
            <li>
              เราจะใช้ข้อมูลส่วนบุคคลของท่านที่ได้เก็บรวบรวมมาในการดำเนินของสมาคมตามวัตถุประสงค์ที่ระบุไว้ในหัวข้อ
              “วัตถุประสงค์ในการประมวลผลข้อมูล”
            </li>
          </ul>

          <h2>การแบ่งปันข้อมูล</h2>
          <p>
            เราใช้ผู้ให้บริการภายนอกเพื่อดำเนินการกับข้อมูลส่วนบุคคลของท่านในนามของเราเท่านั้น
            การดำเนินการนี้เพื่อจุดประสงค์ที่ระบุไว้ในแถลงการณ์ความเป็นส่วนตัวนี้ ยกตัวอย่างเช่น
            การเก็บสถิติการใช้งาน การวิเคราะห์ หรือส่งข้อมูลการตลาด
            ผู้ให้บริการเหล่านี้มีภาระผูกพันตามข้อตกลงการรักษาความลับและไม่ได้รับอนุญาตให้ใช้ข้อมูลส่วนบุคคลของท่านเพื่อจุดประสงค์ของผู้ดำเนินการเองหรือเพื่อจุดประสงค์อื่น
          </p>

          <h2>การเก็บรักษาและระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล</h2>

          <ul>
            <b>การเก็บรักษาข้อมูลส่วนบุคคล</b>
            ผู้ควบคุมทำการเก็บรักษาข้อมูลส่วนบุคคลของท่าน ดังนี้
            <li>ข้อมูลส่วนบุคคลที่ทางสมาคมจัดเก็บจะอยู่ในลักษณะของ Hard Copy และ Soft Copy</li>
            <li>
              ข้อมูลส่วนบุคคลจะถูกจัดเก็บไว้ในเครื่องมืออุปกรณ์ของคณะดำเนินงานภายใต้การดูแลของสมาคมผู้ดูแลเว็บไทย
              ได้แก่ คอมพิวเตอร์ โทรศัพท์มือถือ รวมถึงมีการเก็บข้อมูลในบนระบบคอมพิวเตอร์ ซึ่งได้แก่
              Google Cloud Platform, Firebase
            </li>
            <li>
              ระยะเวลาจัดเก็บ เป็นไปตามหัวข้อ &quot;ระยะเวลาในการประมวลผลข้อมูลส่วนบุคคล&quot;
            </li>
          </ul>

          <h2>Data Retention Period</h2>

          <table className="w-full table-auto">
            <thead className="bg-gray-300">
              <th className="w-2/12 border px-5 py-3 text-center lg:w-1/12">ลำดับที่</th>
              <th className="w-auto border px-5 py-3 text-center">
                ประเภท / รายการข้อมูลส่วนบุคคล
              </th>
              <th className="w-3/12 border px-5 py-3 text-center lg:w-2/12">ระยะเวลาประมวลผล</th>
            </thead>
            <tbody>
              {[
                [1, 'ข้อมูลที่บ่งชี้ตัวตน อาทิ ชื่อ อายุ สัญชาติ วันเกิด อายุ', '1 ปี'],
                [2, 'ข้อมูลช่องทางการติดต่อ อาทิ ที่อยู่ สถานที่ติดต่อ เบอร์โทร อีเมล', '1 ปี'],
                [3, 'ข้อมูลบัญชี อาทิ รายละเอียดการชำระเงิน และบัญชีธนาคาร', '1 ปี'],
                [4, 'ข้อมูลทางธุรกรรม อาทิ ประวัติการรับบริการต่าง ๆ ประวัติการซื้อขาย', '1 ปี'],
                [
                  5,
                  'ข้อมูลส่วนตัว อาทิ ชื่อบัญชีผู้ใช้ รหัสผ่าน การสั่งซื้อ ความสนใจของท่านที่มีต่อบริการต่างๆของผู้ให้บริการ',
                  '1 ปี',
                ],
                [
                  6,
                  'ข้อมูลทางการตลาด อาทิ ความพึงพอใจของท่านต่อบริการที่ได้รับ และความเห็นต่อการให้บริการของบุคลากร',
                  '1 ปี',
                ],
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {item.map((itemDetail, i) => (
                    <td
                      className={clsx(
                        'border px-5 py-3',
                        i === 0 || i === 2 ? 'text-center' : null
                      )}
                      key={`${index}-${i}`}
                    >
                      {itemDetail}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2>สิทธิของเจ้าของข้อมูล</h2>
          <ul>
            ท่านมีสิทธิในการดำเนินการ ดังต่อไปนี้
            <li>
              สิทธิในการได้รับแจ้ง (right to be informed):
              ท่านมีสิทธิที่จะได้รับแจ้งเมื่อข้อมูลส่วนบุคคลของท่านถูกจัดเก็บ รวมถึงรายละเอียดต่าง ๆ
              ที่เกี่ยวข้อง อาทิ วิธีการจัดเก็บและระยะเวลาการจัดเก็บ
            </li>
            <li>
              สิทธิในการเพิกถอนความยินยอม (right to withdraw consent):
              ท่านมีสิทธิในการเพิกถอนความยินยอมในการประมวลผลข้อมูลส่วนบุคคลที่ท่านได้ให้ความยินยอมกับเราได้
              ตลอดระยะเวลาที่ข้อมูลส่วนบุคคลของท่านอยู่กับเรา
            </li>
            <li>
              สิทธิในการเข้าถึงข้อมูลส่วนบุคคล (right of access):
              ท่านมีสิทธิในการเข้าถึงข้อมูลส่วนบุคคลของท่านและขอให้เราทำสำเนาข้อมูลส่วนบุคคลดังกล่าวให้แก่ท่าน
              รวมถึงขอให้เราเปิดเผยการได้มาซึ่งข้อมูลส่วนบุคคลที่ท่านไม่ได้ให้ความยินยอมต่อเรา
            </li>
            <li>
              สิทธิในการแก้ไขข้อมูลผู้สมัครให้ถูกต้อง (right to rectification):
              ท่านมีสิทธิในการขอให้เราแก้ไขข้อมูลที่ไม่ถูกต้องหรือเพิ่มเติมข้อมูลที่ไม่สมบูรณ์
            </li>
            <li>
              สิทธิในการลบข้อมูลส่วนบุคคล (right to erasure):
              ท่านมีสิทธิในการขอให้เราทำการลบข้อมูลของท่านด้วยเหตุบางประการได้
            </li>
            <li>
              สิทธิในการระงับการใช้ข้อมูลส่วนบุคคล (right to restriction of processing):
              ท่านมีสิทธิในการระงับการใช้ข้อมูลส่วนบุคคลของท่านด้วยเหตุบางประการได้
            </li>
            <li>
              สิทธิในการให้โอนย้ายข้อมูลส่วนบุคคล (right to data portability):
              ท่านมีสิทธิในการโอนย้ายข้อมูลส่วนบุคคลของท่านไปให้แก่ผู้ควบคุมข้อมูลรายอื่นหรือตัวท่านเองด้วยเหตุบางประการได้
            </li>
            <li>
              สิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคล (right to object):
              ท่านมีสิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคลของท่านด้วยเหตุบางประการได้
            </li>
          </ul>
          <p>
            ท่านสามารถติดต่อมายังเจ้าหน้าที่ DPO หรือเจ้าหน้าที่ฝ่ายควบคุมข้อมูลของเราได้
            เพื่อดำเนินการยื่นคำร้องขอดำเนินการตามสิทธิข้างต้นได้ (รายละเอียดการติดต่อปรากฏในหัวข้อ
            “ช่องทางการติดต่อ” ด้านล่างนี้) หรือ ท่านสามารถศึกษารายละเอียดเงื่อนไข
            ข้อยกเว้นการใช้สิทธิต่าง ๆ ได้ที่ แนวปฏิบัติเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
            (TDPG2.0) และ เว็บไซต์กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม{' '}
            <a href="http://www.mdes.go.th">http://www.mdes.go.th</a>
          </p>
          <p>
            ทั้งนี้ ท่านไม่จำเป็นต้องเสียค่าใช้จ่ายใด ๆ ในการดำเนินตามสิทธิข้างต้น โดยเราจะพิจารณา
            และแจ้งผลการพิจารณาคำร้องของท่านภายใน 30 วันนับแต่วันที่เราได้รับคำร้องขอดังกล่าว
          </p>

          <h2>การยื่นคำร้องเพื่อการจัดการข้อมูลส่วนบุคคล</h2>
          <p>
            หากท่านมีความประสงค์ในการยื่นคำร้องเรียนเพื่อจัดการข้อมูลส่วนบุคคลของท่าน
            ซึ่งรวมไปถึงการขอเข้าถึงข้อมูลส่วนบุคคล การแก้ไขข้อมูลส่วนบุคคล
            การขอเพิกถอนการยินยอมให้ข้อมูลส่วนบุคคล และการส่งความคิดเห็นต่อการบริการ
            ท่านสามารถติดต่อได้ทางเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลตามรายละเอียดในหัวข้อ
            “ช่องทางการติดต่อ”
          </p>

          <h2>กิจกรรมส่งเสริมการตลาด</h2>
          <p>
            ในระหว่างการใช้บริการ เราจะส่งข้อมูลข่าวสารเกี่ยวกับกิจกรรมทางการตลาด และการส่งเสริม
            การตลาด ผลิตภัณฑ์ การให้บริการ ที่เราคิดว่าท่านอาจสนใจเพื่อประโยชน์ในการให้บริการกับ
            ท่านอย่างเต็มประสิทธิภาพ หากท่านได้ตกลงที่จะรับข้อมูลข่าวสารดังกล่าวจากเราแล้ว
            ท่านมีสิทธิ ยกเลิกความยินยอมดังกล่าวได้ทุกเมื่อ
            โดยท่านสามารดำเนินการยกเลิกความยินยอมในการรับแจ้งข้อมูล
            ข่าวสารได้โดยสามารถติดต่อมาได้ผ่านทางที่อยู่อีเมล{' '}
            <a href="mailto:jwc@webmaster.or.th">jwc@webmaster.or.th</a>
          </p>
        </ContentWrapper>
      </div>
    </DocumentLayout>
  )
}

export default Page
