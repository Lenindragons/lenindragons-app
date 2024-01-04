import { format } from 'date-fns'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const normalizeFileName = (name: string) => {
  const withoutSpaces = name.replace(/\s+/g, '-')
  const normalized = withoutSpaces
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s.-]/g, '')
    .toLowerCase()

  return normalized
}

const saveImageGetURL = async (file: File) => {
  const storage = getStorage()
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
  const name = normalizeFileName(file.name)
  const imageRef = ref(storage, `images/image_${timestamp}_${name}`)
  const snapshot = await uploadBytes(imageRef, file)
  return getDownloadURL(snapshot.ref)
}

export default saveImageGetURL
