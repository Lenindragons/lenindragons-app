/* eslint-disable no-return-assign */
import { useState, useRef, ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ImageInputProps {
  onImageSelected: (file: any) => void
}

const ImageInputComponent = ({ onImageSelected }: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files[0]) {
      const file = files[0]
      setSelectedImage(URL.createObjectURL(file))
      onImageSelected(file)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={(input) => (inputRef.current = input)}
      />
      <button type="button" onClick={() => inputRef.current?.click()}>
        Selecionar Imagem
      </button>
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Imagem Selecionada"
            style={{ maxWidth: '100px' }}
          />
        </div>
      )}
    </div>
  )
}

const ImageInput = ({ control, name }: any) => {
  const { setValue } = useForm()
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={(field) => {
        return (
          <ImageInputComponent
            onImageSelected={async (file) => {
              field.field.onChange(file)
              setValue('image', file)
            }}
          />
        )
      }}
    />
  )
}

export default ImageInput
