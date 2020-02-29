import React from 'react'
import { Event as CalIcon} from '@material-ui/icons'
import { ThemeProvider } from '@material-ui/core'
import {DatePicker} from '@material-ui/pickers'
import {datePickerOverride} from '../helpers/themeOverrides'

const SuccotashDatePicker = ({value, name, showToday, dateChangeAction, className, clearable}) => <ThemeProvider theme={datePickerOverride}>
    <span className={className}>
        <CalIcon />
        <DatePicker 
            value={value}
            minDate={'2015-01-01'}
            onChange={dateChangeAction}
            name={name}
            showTodayButton={showToday}
            clearable={clearable}
            animateYearScrolling /> 
    </span>
</ThemeProvider>

export default SuccotashDatePicker