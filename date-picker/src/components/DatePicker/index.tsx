import React from 'react'
import DatePickerPanel from './panel'

export default function DatePicker() {
  return (
    <>
      <div>
        <input type="text" placeholder="请选择日期" readOnly />
      </div>
      <DatePickerPanel />
    </>
  )
}