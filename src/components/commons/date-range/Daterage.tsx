/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import styled, { useTheme } from 'styled-components'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { DateRange, DateRangeProps } from 'react-date-range'
import { DatePickerProps } from './types'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { getTimeStampInMiliseconds } from '../../../helpers/format-date'

const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const getDate = (key: string, control: Control<FieldValues, any>) => {
  return control._defaultValues?.dates
    ? getTimeStampInMiliseconds(control._formValues?.dates[0][key])
    : ''
}

const DateRangeComponent = ({ name, control }: DatePickerProps) => {
  const theme = useTheme()

  const start = getDate('startDate', control)
  const end = getDate('endDate', control)

  const defaultValues = [
    {
      startDate: start || new Date(),
      endDate: end || null,
      key: 'selection',
    },
  ]

  const getFieldValues = ({ value }: any) => {
    let ranges = value
    if (value[0]?.startDate?.seconds || value[0]?.endDate?.seconds) {
      ranges = [
        {
          startDate: getTimeStampInMiliseconds(value[0].startDate),
          endDate: getTimeStampInMiliseconds(value[0].endDate),
        },
      ] as DateRangeProps['ranges']
    }

    return ranges
  }

  return (
    <DateRangeContainer>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValues}
        render={({ field }) => {
          return (
            <DateRange
              onChange={(item) => field.onChange([item.selection])}
              moveRangeOnFirstSelection={false}
              rangeColors={[theme?.colors?.primary, theme?.colors?.secondary]}
              color={theme?.colors?.primary}
              onRangeFocusChange={(x) => { console.log(x) }}
              ranges={[getFieldValues(field)[0] || field.value[0]]}
            />
          )
        }}
      />
    </DateRangeContainer>
  )
}

export default DateRangeComponent
