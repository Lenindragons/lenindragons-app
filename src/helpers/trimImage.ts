/* eslint-disable no-plusplus */
/* eslint-disable prefer-promise-reject-errors */
export const trimTransparentImage = (url: string) => async () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject('Canvas context not available')
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const { data, width, height } = imageData

      let top = height
      let left = width
      let right = 0
      let bottom = 0

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const alpha = data[(y * width + x) * 4 + 3]
          if (alpha > 0) {
            if (x < left) left = x
            if (x > right) right = x
            if (y < top) top = y
            if (y > bottom) bottom = y
          }
        }
      }

      const trimmedWidth = right - left + 1
      const trimmedHeight = bottom - top + 1

      const trimmedCanvas = document.createElement('canvas')
      const trimmedCtx = trimmedCanvas.getContext('2d')

      if (!trimmedCtx) {
        reject('Trimmed canvas context not available')
        return
      }

      trimmedCanvas.width = trimmedWidth
      trimmedCanvas.height = trimmedHeight

      trimmedCtx.drawImage(
        canvas,
        left,
        top,
        trimmedWidth,
        trimmedHeight,
        0,
        0,
        trimmedWidth,
        trimmedHeight
      )

      const trimmedUrl = trimmedCanvas.toDataURL()
      resolve(trimmedUrl)
    }

    img.onerror = (err) => {
      reject(err)
    }
  })
}
