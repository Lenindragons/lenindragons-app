/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTheme } from 'styled-components'
import { Controller } from 'react-hook-form'
import { DateRange } from 'react-date-range'
import { DatePickerProps } from './types'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComponent = ({ label, name, control }: DatePickerProps) => {
  const theme = useTheme()
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={[
          { startDate: new Date(), endDate: null, key: 'selection' },
        ]}
        render={({ field }) => (
          <DateRange
            onChange={(item) => field.onChange([item.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={[theme.primary]}
            ranges={field.value}
          />
        )}
      />
    </div>
  )
}

export default DateRangeComponent
