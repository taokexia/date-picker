//  DatePicker/panel.tsx
import React, { RefObject, useCallback, useRef, useState, useEffect } from 'react'
import { DatePickerPanelHeader } from './header'
import { DatePickerPanelFooter } from './footer'
import { DatePickerPanelContent } from './content'
import { createPortal } from 'react-dom'
import { DatePickerProps } from './'
import moment, { Moment } from 'moment'
import cls from 'classnames'

export interface DatePickerPanelCommonProps
  extends Required<Pick<DatePickerProps, 'prefixCls'>> {}

export interface DatePickerPanelProps
  extends Omit<DatePickerProps, 'onChange'> {
  visible: boolean | null
  selectedDate: Moment | undefined
  onSelectedDate?: DatePickerProps['onChange']
  onClearSelectedDate: () => void
  position: {
    left: number | string
    top: number | string
  }
  onGetPanelRef: (ref: RefObject<HTMLDivElement>) => void
}

function DatePickerPanel(props: DatePickerPanelProps) {
  const {
    showToday,
    allowClear,
    getPopupContainer = () => document.body,
    prefixCls,
    position,
    popupContainerClassName,
    visible: panelVisible,
    selectedDate: selectedDateFromProps
  } = props

  const onSelectedDate = useCallback((value: moment.Moment | undefined) => {
     setSelectedDate(() => {
       props.onSelectedDate?.(value)
       return value || moment()
     })
   }, [props.onSelectedDate])

   const onSelectToday = useCallback(() => {
     onSelectedDate(moment())
   }, [onSelectedDate])

   const onClearSelectedDate = useCallback(() => {
     onSelectedDate(undefined)
     props.onClearSelectedDate()
   }, [onSelectToday])

  useEffect(() => {
    setSelectedDate(selectedDateFromProps || moment())
  }, [selectedDateFromProps])
  const [selectedDate, setSelectedDate] = useState<Moment>(() => moment())
  const panelRef = useRef<HTMLDivElement>(null)
  // 将当前的 panel ref 传递给父组件
  useEffect(() => {
    props.onGetPanelRef(panelRef)
  }, [panelRef])

  const onAddMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().add(1, 'month'))
  }, [selectedDate])

  const onSubtractMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().subtract(1, 'month'))
  }, [selectedDate])

  const { left, top } = position

  return createPortal(
    <div
      className={cls(`${prefixCls}-panel`, popupContainerClassName, {
        [`${prefixCls}-open`]: panelVisible,
        [`${prefixCls}-close`]: !panelVisible,
        [`${prefixCls}-no-animate`]: panelVisible === null
      })}
      style={{ left, top }}
      ref={panelRef}
    >
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
        onSelectToday={onSelectToday}
        onClearSelectedDate={onClearSelectedDate}
      />
    </div>,
    getPopupContainer()
  )
}

export default DatePickerPanel