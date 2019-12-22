 // DatePicker/index.tsx
import React, { useCallback, useState, useRef, useEffect } from 'react'
import DatePickerPanel, { DatePickerPanelProps } from './panel'
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

  const inputRef = useRef<HTMLInputElement>(null)
  const [panelRef, setPanelRef] = useState<RefObject<HTMLDivElement>>({
    current: null
  })
   const onGetPanelRef = useCallback((ref) => {
     setPanelRef(ref)
   }, [])
  const [panelVisible, setPanelVisible] = useState<
    DatePickerPanelProps['visible']
  >(null)
  const [panelPosition, setPanelPosition] = useState<
    DatePickerPanelProps['position']
  >({
    top: 0,
    left: 0
  })

  const onClosePanel = useCallback(() => {
    setPanelVisible(false)
  }, [])

  const onClickOutsideHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (
        panelVisible &&
        !inputRef.current?.contains(event.target) &&
        !panelRef.current?.contains(event.target)
      ) {
        onClosePanel()
      }
    },
    [panelVisible, inputRef, panelRef]
  )

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler, false)
    return () => {
      window.removeEventListener('click', onClickOutsideHandler, false)
    }
  }, [onClickOutsideHandler])

  const getPanelPosition = useCallback(() => {
    const { height, top, left } = inputRef.current!.getBoundingClientRect()
    return {
      top: top + height + window.scrollY,
      left
    }
  }, [inputRef.current])

  const onOpenPanel = useCallback(() => {
    setPanelVisible(true)
    setPanelPosition(getPanelPosition())
  }, [])

  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined)
  const onSelectedDate = useCallback(
   (value?: Moment) => {
     setSelectedDate(value)
     props.onChange?.(value)
     onClosePanel()
   },
   [props.onChange]
  )

  const onClearSelectedDate = useCallback(() => {
    setSelectedDate(undefined)
    props.onChange?.(value)
  }, [props.onChange])

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
          ref={inputRef}
          onClick={onOpenPanel}
          value={selectedDate ? selectedDate.format('YYYY/MM/DD') : ''}
        />
      </div>
      <DatePickerPanel
        position={panelPosition}
        visible={panelVisible}
        onGetPanelRef={onGetPanelRef}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        onClearSelectedDate={onClearSelectedDate}
        {...attr}
      />
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