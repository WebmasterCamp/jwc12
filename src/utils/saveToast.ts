import toast from 'react-hot-toast'

export async function saveToast<T>(promise: Promise<T>): Promise<T> {
  return await toast.promise(promise, {
    loading: 'กำลังบันทึกข้อมูล',
    success: 'บันทึกข้อมูลสำเร็จ',
    error: 'บันทึกข้อมูลไม่สำเร็จ',
  })
}
