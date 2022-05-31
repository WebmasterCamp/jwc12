import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { DocumentLayout } from '@/layouts'
import { SectionTitle } from '@/layouts/document/SectionTitle'
import { ContentWrapper } from '@/layouts/document/components/ContenWrap'

const Page: NextPage = () => {
  return (
    <DocumentLayout>
      <NextSeo title="นโยบายคุกกี้" />
      <div>
        <SectionTitle title="COOKIE POLICY" subtitle="นโยบายคุกกี้" />
        <ContentWrapper>
          <h2>Cookies คืออะไร ?</h2>
          <p>
            Cookies คือ text files ที่อยู่ในคอมพิวเตอร์ของท่าน ใช้เพื่อจัดเก็บรายละเอียดข้อมูล log
            การใช้งานอินเตอร์เน็ตของท่าน หรือ พฤติกรรมการเยี่ยมชมเว็บไซต์ของท่าน
            ท่านสามารถศึกษารายละเอียด เพิ่มเติมของ Cookies ได้จาก{' '}
            <a href="https://www.allaboutcookies.org/">https://www.allaboutcookies.org/</a>
          </p>
          <h2>เราใช้ Cookies อย่างไร ?</h2>
          <p>
            เราจะจัดเก็บข้อมูลการเข้าเยี่ยมชมเว็บไซต์จากผู้เข้าเยี่ยมชมทุกรายผ่าน Cookies หรือ
            เทคโนโลยีที่ใกล้เคียง และเราใช้ Cookies
            เพื่อประโยชน์ในการพัฒนาประสิทธิภาพในการเข้าถึงบริการของเราผ่านระบบอินเตอร์เน็ต
            รวมถึงพัฒนาประสิทธิภาพในการใช้งานเว็บไซต์ โดยจะใช้เพื่อกรณี ดังต่อไปนี้
          </p>
          <ul>
            <li>
              เพื่อให้ท่านสามารถเข้าสู่ระบบบัญชีของท่านในเว็บไซต์ของเราได้อย่างต่อเนื่อง และปลอดภัย
            </li>
            <li>
              เพื่อศึกษาพฤติกรรมการใช้งานและเยี่ยมชมเว็บไซต์ของท่าน
              เพื่อปรับเนื้อหาให้ตรงกับความสนใจ และสามารถตอบสนองความต้องการของท่านมากขึ้น
            </li>
            <li>
              เพื่อศึกษาพฤติกรรมของผู้เยี่ยมชมเว็บไซต์โดยรวม และนำไปพัฒนาให้สามารถใช้งานได้ง่าย
              รวดเร็ว และมีประสิทธิภาพยิ่งขึ้น
            </li>
          </ul>

          <h2>ประเภทของ Cookies ที่เราใช้</h2>
          <ul>
            เว็บไซต์ของเราประกอบไปด้วย Cookies ดังต่อไปนี้
            <li>
              Functionality Cookies: คุกกี้ประกอบการทำงานของเว็บไซต์
              ถูกใช้ในการจดจำสิ่งที่ท่านเลือกหรือตั้งค่าบนเว็บไซต์
              รวมถึงการนำเสนอข้อมูลที่ตรงความต้องการ เฉพาะบุคคลมากขึ้น เช่น ชื่อบัญชีผู้ใช้ ภาษา
              ฟ้อนต์ และรูปแบบเว็บไซต์
            </li>
            <li>
              Advertising Cookies: คุกกี้สำหรับการโฆษณา
              ใช้ในการจดจำสิ่งที่ท่านเคยเยี่ยมชมและรวมถึงลักษณะการใช้เว็บไซต์ของท่าน
              เพื่อนำเสนอสินค้า บริการ หรือ สื่อโฆษณาที่เกี่ยวข้องและตรงกับความสนใจของท่าน
              และใช้เพื่อการประเมินประสิทธิผลของแคมเปญโฆษณาต่าง ๆ
            </li>
            <li>
              Strictly Necessary Cookies: คุกกี้ทางเทคนิค
              เป็นประเภทคุกกี้ที่มีความจำเป็นต่อการใช้งานเว็บไซต์ทำให้ท่านสามารถเข้าถึงข้อมูลได้อย่างทั่วถึงและปลอดภัย
            </li>
            <li>
              Performance Cookies: คุกกี้เพื่อวัดผลการทำงานของเว็บไซต์
              คุกกี้ประเภทนี้จะจัดเก็บข้อมูลของผู้เข้าชมเว็บไซต์แบบไม่ระบุตัวตน
              และนำมาวิเคราะห์จำนวนและพฤติกรรมของผู้เข้าชม
              เพื่อปรับปรุงเว็บไซต์ให้มีประสิทธิภาพและตรงกับความต้องการของผู้ใช้มากขึ้น
            </li>
            <li>
              Third-party Cookies: คุกกี้บุคคลที่สาม
              คุกกี้ชนิดนี้จะถูกกำหนดใช้โดยผู้บริการซึ่งเป็นบุคคลที่สาม อาทิ Google Analytics,
              Facebook Pixels, Hotjar
            </li>
          </ul>

          <h2>การตั้งค่าคุกกี้</h2>
          <ul>
            ท่านสามารถตั้งค่าเพื่อปฏิเสธการใช้การคุกกี้ในบราวเซอร์ของท่านได้
            โดยมีขั้นตอนในการจัดการดังนี้:
            <br />
            <span>สำหรับผู้ใช้ระบบซาฟารี (Safari)</span>
            <ul>
              <li>เข้าแอพพลิเคชั่นซาฟารีและเลือก “การตั้งค่า”</li>
              <li>
                เลือก “ความเป็นส่วนตัว” และจัดการข้อมูลการใช้คุกกี้ตามความต้องการของท่านดังนี้
              </li>
              <ol>
                <li>
                  เลือก “ป้องกันไม่ให้ติดตามข้ามไซต์” เพื่อยกเลิกตัวติดตามใช้คุกกี้และข้อมูลเว็บไซต์
                </li>
                <li>
                  เลือก “ปิดกั้นคุกกี้ทั้งหมด”
                  เพื่อปิดกั้นไม่ให้เว็บไซต์บุคคลที่สามและผู้โฆษณาจัดเก็บข้อมูลต่าง ๆ
                  ไว้บนเครื่องคอมพิวเตอร์ของคุณ
                </li>
                <li>
                  เลือก “จัดการข้อมูลเว็บไซต์”
                  เพื่อดูว่าเว็บไซต์ใดบ้างที่จัดเก็บคุกกี้และข้อมูลของท่าน
                </li>
              </ol>
            </ul>
            <span>สำหรับผู้ใช้กูเกิ้ลโครม (Google Chrome)</span>
            <ul>
              <li>เข้าระบบกูเกิ้ลโครมในคอมพิวเตอร์ และเลือก “การตั้งค่า” ด้านขวาบน</li>
              <li>เลือก “ขั้นสูง” ด้านล่าง</li>
              <li>เลือก “การตั้งค่าและความปลอดภัย”</li>
              <li>เลือก “การตั้งค่าเว็บไซต์”</li>
              <li>คลิก “คุกกี้”</li>
              <li>
                หากต้องการยกเลิกการใช้คุกกี้ เลือก
                “ปิดการอนุญาตให้เว็บไซต์บันทึกและอ่านข้อมูลคุกกี้”
              </li>
            </ul>
            <span>สำหรับผู้ใช้ Internet Explorer</span>
            <ul>
              <li>เมื่อเข้าระบบ Internet Explorer เลือก “การตั้งค่า”</li>
              <li>หากต้องการลบข้อมูลคุกกี้:</li>
              <ol>
                <li>เลือก “ความปลอดภัย”</li>
                <li>เลือก “ลบประวัติการเรียกดู”</li>
                <li>เลือก “คุกกี้และข้อมูลเว็บไซต์” และกด “ลบ”</li>
              </ol>
              <li>หากต้องการลบข้อมูลคุกกี้:</li>
              <ol>
                <li>เลือก “เครื่องมือ”</li>
                <li>เลือก “ตัวเลือกอินเทอร์เน็ต”</li>
                <li>เลือก “ความเป็นส่วนตัว”</li>
                <li>กด “ขั้นสูง” และเลือกให้อนุญาตหรือบล็อกคุกกี้</li>
              </ol>
            </ul>
          </ul>

          <h2>นโยบายคุ้มครองข้อมูลส่วนบุคคลของเว็บไซต์อื่น</h2>
          <p>
            นโยบายความเป็นส่วนตัวฉบับนี้
            ใช้เฉพาะสำหรับการให้บริการของเราและการใช้งานเว็บไซต์ของเราเท่านั้น
            หากท่านได้กดลิงก์ไปยังเว็บไซต์อื่น แม้จะผ่านช่องทางในเว็บไซต์ของเราก็ตาม
            ท่านจะต้องศึกษาและปฏิบัติตามนโยบายความเป็นส่วนตัวที่ปรากฏในเว็บไซต์นั้น ๆ
            แยกจากของเว็บไซต์ของเราอย่างสิ้นเชิง
          </p>

          <h2>การเปลี่ยนแปลงนโยบายคุ้มครองข้อมูลส่วนบุคคล</h2>
          <p>
            เราจะทำการพิจารณาทบทวนนโยบายความเป็นส่วนตัวเป็นประจำเพื่อให้สอดคล้องกับแนวทางการปฏิบัติ
            และกฎหมายข้อบังคับที่เกี่ยวข้อง ทั้งนี้หากมีการเปลี่ยนแปลงนโยบายความเป็นส่วนตัว
            เราจะแจ้งให้ท่านทราบด้วยการปรับเปลี่ยนข้อมูลลงในเว็บไซต์ของเราโดยเร็วที่สุด
            ปัจจุบันนโยบายความเป็นส่วนตัวถูกทบทวนครั้งล่าสุดเมื่อ 04/09/2020 และจะมีผลตั้งแต่วันที่
            07/09/2020
          </p>

          <h2>ช่องทางการติดต่อ</h2>
          <span>
            <b>Data Controller</b>
            <br />
            ชื่อ: สมาคมผู้ดูแลเว็บไทย
            <br />
            สถานที่ติดต่อ: อาคารอุตสาหกรรมซอฟต์แวร์ปาร์ค เลขที่ 99/23 ถ.แจ้งวัฒนะ ต.คลองเกลือ
            อ.ปากเกร็ด จ.นนทบุรี 11120
          </span>
          <ul>
            <b>ช่องทางการติดต่อ:</b>
            <li>
              อีเมล: <a href="mailto:jwc@webmaster.or.th">jwc@webmaster.or.th</a>
            </li>
            <li>
              เว็บไซต์: <a href="https://webmaster.or.th">https://webmaster.or.th</a>
            </li>
          </ul>

          <h2>ข้อมูลส่วนบุคคลที่จะทำการประมวลผล</h2>
          <p>
            รายละเอียดปรากฏตามนโยบายคุ้มครองข้อมูลส่วนบุคคล หัวข้อ “ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม”
            และ “ระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล” วัตถุประสงค์และฐานในการประมวลผลข้อมูล
            รายละเอียดปรากฏตามนโยบายคุ้มครองข้อมูลส่วนบุคคล หัวข้อ “วัตถุประสงค์ในการประมวลผลข้อมูล”
            เราดำเนินการประมวลผลข้อมูลส่วนบุคคลของท่านภายใต้ฐาน ดังต่อไปนี้
          </p>
          <ul>
            <li>
              ความยินยอม ตามที่ท่านได้ให้ความยินยอมเมื่อสมัครใช้บริการ
              ทั้งนี้หากท่านประสงค์จะถอนความยินยอม ท่านสามารถดำเนินการได้ดังนี้
              ท่านสามารถแจ้งเพิกถอนความยินยอมในการให้ใช้หรือเปิดเผยข้อมูลในวัตถุประสงค์หรือลักษณะใด
              ๆ ที่ได้ระบุไว้ข้างต้นได้ตลอดเวลา
              รวมถึงการร้องขอให้ลบหรือทำให้ข้อมูลส่วนบุคคลเป็นนิรนามได้
              โดยติดต่อเจ้าหน้าที่ป้องกันข้อมูลส่วนบุคคลซึ่งระบุเอาไว้ด้านบน
              แนวทางการถอนความยินยอมประกอบไปด้วย:
            </li>
            <ul>
              <li>ช่องทางอิเล็กทรอนิกส์ อาทิ อีเมล หรือ Facebook Fanpage</li>
              <li>แจ้งผ่านวาจา อาทิ โทรศัพท์ หรือ ต่อหน้าคณะผู้จัด</li>
            </ul>
          </ul>
          <p>
            โดยเมื่อคณะผู้จัดได้รับคำร้องของท่านแล้ว
            จะทำการส่งต่อให้แก่ฝ่ายบริหารจัดการข้อมูลเพื่อดำเนินการในขั้นตอนต่อไป
            ทั้งนี้การถอนความยินยอมจะไม่ส่งผลกระทบต่อการประมวลผลข้อมูลส่วนบุคคลที่ท่านได้ให้ความยินยอมไปแล้วโดยชอบด้วยกฎหมาย
            นอกจากนี้ผลกระทบจากการถอนความยินยอม มีดังนี้
          </p>
          <p>
            หากท่านได้แจ้งเพิกถอนความยินยอมในการให้ใช้หรือเปิดเผยข้อมูลส่วนบุคคล
            ทางบริษัทอาจไม่สามารถให้บริการหรือดำเนินการซื้อขายสินค้าแก่ท่าน
            บริษัทมีสิทธิตามกฎหมายและขอสงวนไว้ซึ่งสิทธิดังกล่าว
          </p>
          <p>
            ทั้งนี้ทางผู้ให้บริการไม่สามารถเก็บข้อมูลส่วนบุคคลของท่านหากไม่ได้รับการยินยอม
            เว้นแต่เพื่อวัตถุประสงค์ต่อไปนี้
          </p>
          <ul>
            <li>
              เพื่อผลประโยชน์สำคัญจำเป็น เพื่อระงับหรือป้องกันอันตรายต่อชีวิต สุขภาพ
              หรือร่างกายของบุคคล
            </li>
            <li>เพื่อจัดทำเอกสารทางประวัติศาสตร์ จดหมายเหตุ การวิจัยหรือสถิติ</li>
            <li>เพื่อการปฎิบัติตามพันธะสัญญาซึ่งเจ้าของข้อมูลส่วนบุคคลเป็นคู่สัญญา</li>
            <li>
              เพื่อดำเนินงานตามระเบียบหรือกฎหมายของภาครัฐ หรือการใช้อำนาจรัฐของผู้ควบคุมส่วนบุคคล
            </li>
            <li>
              เพื่อประโยชน์โดยชอบด้วยกฎหมายของผู้ให้บริการ ผู้ควบคุมข้อมูลส่วนบุคคล
              หรือนิติบุคคลอื่น
              เว้นแต้ประโยชน์ดังกล่าวมีความสำคัญน้อยกว่าสิทธิขั้นพื้นฐานในการให้ข้อมูลส่วนบุคคล
            </li>
            <li>เพื่อประโยชน์สาธารณะของผู้ควบคุมข้อมูลส่วนบุคคล</li>
          </ul>
          <h2>แหล่งที่มาของข้อมูลส่วนบุคคล</h2>
          <ul>
            เราได้รับข้อมูลส่วนบุคคลของท่าน จากกรณีดังนี้
            <li>
              เมื่อท่านได้เข้าถึงหรือใช้บริการเว็บไซต์ของเรา ลงทะเบียน หรือสมัครบัญชีผู้ใช้กับเรา
            </li>
            <li>
              เมื่อท่านส่งแบบฟอร์ม รวมถึงแบบฟอร์มการสมัครหรือแบบฟอร์มอื่น ๆ
              ที่เกี่ยวข้องกับโครงการของเรา ไม่ว่าจะเป็นรูปแบบออนไลน์หรือรูปแบบเอกสาร
            </li>
            <li>
              เมื่อท่านทำข้อตกลงใด ๆ
              หรือให้เอกสารหรือข้อมูลอื่นใดที่เกี่ยวข้องกับการติดต่อระหว่างท่านกับเรา
              หรือเมื่อท่านสมัครเข้าร่วมโครงการ ฯ กับเรา
            </li>
            <li>
              เมื่อท่านติดต่อกับเรา เช่น ผ่านทางโทรศัพท์ จดหมาย การประชุม
              การติดต่อผ่านเว็บไซต์สื่อทางสังคม และอีเมล
            </li>
            <li>
              เมื่อท่านใช้บริการเว็บไซต์ของเรา ซึ่งรวมถึงแต่ไม่จำกัดเพียง การใช้ผ่านคุกกี้
              ซึ่งเราอาจปรับใช้เมื่อท่านได้เข้าถึงเว็บไซต์
            </li>
            <li>เมื่อท่านแสดงความคิดเห็นหรือส่งคำร้องเรียนแก่เรา</li>
            <li>เมื่อท่านลงทะเบียนเข้าร่วมเป็นผู้สมัครโครงการ ฯ</li>
            <li>เมื่อท่านเข้าเยี่ยมชมหรือใช้เว็บไซต์ของเรา</li>
            <li>เมื่อท่านเชื่อมต่อบัญชีของท่านกับเว็บไซต์ของเรา</li>
            <li>เมื่อท่านส่งข้อมูลส่วนบุคคลของท่านให้แก่เราด้วยเหตุผลใดก็ตาม</li>
          </ul>

          <h2>การประมวลผลข้อมูลส่วนบุคคล</h2>
          <p>รายละเอียดปรากฏตามนโยบายคุ้มครองข้อมูลส่วนบุคคล หัวข้อ “การประมวลผลข้อมูลส่วนบุคคล”</p>

          <h2>การเก็บรักษาข้อมูลส่วนบุคคล</h2>
          <p>
            รายละเอียดปรากฏตามนโยบายคุ้มครองข้อมูลส่วนบุคคล หัวข้อ “การเก็บรักษาข้อมูลส่วนบุคคล”
          </p>

          <h2>สิทธิของเจ้าของข้อมูล</h2>
          <p>รายละเอียดปรากฏตามนโยบายคุ้มครองข้อมูลส่วนบุคคล เรื่อง “สิทธิของเจ้าของข้อมูล”</p>
        </ContentWrapper>
      </div>
    </DocumentLayout>
  )
}

export default Page
