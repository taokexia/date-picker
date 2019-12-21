import React from 'react'
import DatePickerPanel from './panel'
import cls from 'classnames'
import { Moment } from 'moment'
import './index.less'

export interface DatePickerProps {
  prefixCls?: string
  getPopupContainer?: () => HTMLElement
  onChange?: (value?: Moment | undefined) => void
  showToday?: boolean
  allowClear?: boolean
  className?: string
  popupContainerClassName?: string
  style?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  value?: Moment
  defaultValue?: Moment
}

export default function DatePicker(props: DatePickerProps) {
  const { placeholder, disabled, defaultValue, value, ...attr } = props
  const { prefixCls } = props
  return (
    <>
      <div className={`${prefixCls}-input-wrapper`}>
        <input
          type="text"
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={cls(`${prefixCls}-input`, {
            [`${prefixCls}-input-disabled`]: disabled
          })}
        />
      </div>
      <DatePickerPanel {...attr} />
    </>
  )
}

DatePicker.defaultProps = {
 prefixCls: 'date-picker',
 getPopupContainer: () => document.body,
 showToday: true,
 allowClear: true,
 disabled: false
} as DatePickerProps