import React from 'react'
import { DatePickerPanelHeader } from './header'
import { DatePickerPanelFooter } from './footer'
import { DatePickerPanelContent } from './content'
import { createPortal } from 'react-dom'

function DatePickerPanel() {
  const getPopupContainer = () => document.body
  return createPortal(
    <div className={`date-picker-panel`}>
      <DatePickerPanelHeader />
      <DatePickerPanelContent />
      <DatePickerPanelFooter />
    </div>,
    getPopupContainer()
  )
}

export default DatePickerPanel