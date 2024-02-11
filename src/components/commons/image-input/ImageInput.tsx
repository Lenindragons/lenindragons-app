/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import { Button } from '@mui/material'
import { useState, useRef, ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

interface ImageInputProps {
  onImageSelected: (file: any) => void
  image?: string | null
}

const FileContainer = styled.div`
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 8px;
  margin: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;

  &:hover {
    border-color: #000;
  }
`

const ImageInputComponent = ({
  onImageSelected,
  image = null,
}: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image)
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
    <FileContainer>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={(input) => (inputRef.current = input)}
      />
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Imagem Selecionada"
            style={{ maxWidth: '100px' }}
          />
        ) : (
          <>Imagem para a Capa</>
        )}
      </div>

      <Button variant="outlined" onClick={() => inputRef.current?.click()}>
        Selecionar Imagem
      </Button>
    </FileContainer>
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
            image={field.field.value || null}
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
