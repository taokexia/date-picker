import React, { useState,useCallback } from 'react'
import { DatePickerPanelHeader } from './header'
import { DatePickerPanelFooter } from './footer'
import { DatePickerPanelContent } from './content'
import { createPortal } from 'react-dom'
import { DatePickerProps } from './'
import moment, { Moment } from 'moment'

export interface DatePickerPanelCommonProps
  extends Required<Pick<DatePickerProps, 'prefixCls'>> {}

// Omit Required Pick 等是 TypeScript 提供的工具类型 下面会讲到
export interface DatePickerPanelProps
  extends Omit<DatePickerProps, 'onChange'> {
  // 控制当前面板是显示还是隐藏
  visible: boolean | null
  // 当前面板选中的日期
  selectedDate: Moment | undefined
  // 当前面板选中的日期的回调，触发父级的 onChange 回调
  onSelectedDate?: DatePickerProps['onChange']
  // 清除当前面板选中的日期的回调
  onClearSelectedDate: () => void
  // 当前面板的位置
  position: {
    left: number | string
    top: number | string
  }
  // 要获取面板的位置，就需要用到 ref 通过一个回调将 ref 传给父级
  onGetPanelRef: (ref: RefObject<HTMLDivElement>) => void
}

function DatePickerPanel(props: DatePickerPanelProps) {
  const {
    showToday,
    allowClear,
    getPopupContainer = () => document.body,
    onSelectedDate,
    prefixCls,
    onClearSelectedDate
  } = props

  const [selectedDate, setSelectedDate] = useState<Moment>(() => moment())

  const onAddMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().add(1, 'month'))
  }, [selectedDate])

  const onSubtractMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().subtract(1, 'month'))
  }, [selectedDate])

  return createPortal(
    <div className={`date-picker-panel`}>
      <DatePickerPanelHeader
        selectedDate={selectedDate}
        prefixCls={prefixCls!}
        onAddMonth={onAddMonth}
        onSubtractMonth={onSubtractMonth}
      />
      <DatePickerPanelContent
        prefixCls={prefixCls!}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
      />
      <DatePickerPanelFooter
        prefixCls={prefixCls!}
        showToday={showToday}
        allowClear={allowClear}
        onClearSelectedDate={onClearSelectedDate}
      />
    </div>,
    getPopupContainer()
  )
}

export default DatePickerPanel