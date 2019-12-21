// DatePicker/content.tsx
import React, { useMemo, useCallback } from 'react'
import moment from 'moment'
import cls from 'classnames'
import { DatePickerPanelCommonProps } from './panel'
import { DatePickerProps } from './'
import { range } from '../../utils'

interface DatePickerPanelContentProps extends DatePickerPanelCommonProps {
  selectedDate: moment.Moment
  onSelectedDate?: DatePickerProps['onChange']
}

type SelectedMonthType = 'prev' | 'current' | 'next'
const CALENDAR_HEADERS = ['一', '二', '三', '四', '五', '六', '日']
const WEEKDAY = 7
const COLUMN = 6

export function DatePickerPanelContent(props: DatePickerPanelContentProps) {
  const { prefixCls, selectedDate: selectedDateFromProps } = props
  const panelContentPrefixCls = useMemo(() => `${prefixCls}-panel-content`, [
    prefixCls
  ])

  // 当前选中的月份
  const cloneSelectedDate = useMemo(() => selectedDateFromProps.clone(), [
    selectedDateFromProps
  ])
  // 当前选中的哪一天 （用于高亮显示）
  const selectedDate = useMemo(() => cloneSelectedDate.date(), [
    cloneSelectedDate
  ])
  // 选中的这个月有多少天
  const selectedMonthVisibleDays = useMemo(
    () => cloneSelectedDate.daysInMonth(),
    [cloneSelectedDate]
  )
  // 选中的这个月第一天 （用于这一天放在星期几的位置去渲染）
  const selectedDateFirst = useMemo(() => cloneSelectedDate.date(1), [
    cloneSelectedDate
  ])
  // 上个月显示的天数
  const prevMonthVisibleDays = useMemo(
    () => selectedDateFirst.isoWeekday() - 1,
    [selectedDateFirst]
  )
  // 上一个月有多少天
  const prevMonthDays = useMemo(
    () =>
      cloneSelectedDate
        .clone()
        .subtract(1, 'month')
        .daysInMonth(),
    [cloneSelectedDate]
  )

  // 下个月显示的天数
  const nextMonthVisibleDays = useMemo(
    () => COLUMN * WEEKDAY - selectedMonthVisibleDays - prevMonthVisibleDays,
    [selectedMonthVisibleDays, prevMonthVisibleDays]
  )

  const onSelectedDate = useCallback(
    (originSelectedDate: number) => (type: SelectedMonthType) => () => {
      let selectedDate = cloneSelectedDate.date(originSelectedDate)
      switch (type) {
        case 'prev':
          selectedDate = selectedDate.subtract(1, 'month')
          break
        case 'next':
          selectedDate = selectedDate.add(1, 'month')
          break
      }
      props.onSelectedDate?.(selectedDate)
    },
    [cloneSelectedDate]
  )

  return (
    <div className={cls(panelContentPrefixCls)}>
      <div className={cls(`${panelContentPrefixCls}-header`)}>
        {CALENDAR_HEADERS.map((day) => (
          <span
            className={cls(
              `${panelContentPrefixCls}-header-day`,
              `${prefixCls}-day-title`
            )}
            key={day}
          >
            {day}
          </span>
        ))}
      </div>
      <div>
        {range(prevMonthVisibleDays).map((_, index) => {
          const currentDate = prevMonthDays - prevMonthVisibleDays + index + 1
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${panelContentPrefixCls}-prev-month`
              )}
              key={`prev-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('prev')}
            >
              {currentDate}
            </span>
          )
        })}
        {range(selectedMonthVisibleDays).map((_, index) => {
          const currentDate = index + 1
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${prefixCls}-current-month`,
                {
                  [`${prefixCls}-selected-date`]: selectedDate === currentDate
                }
              )}
              key={`current-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('current')}
            >
              {currentDate}
            </span>
          )
        })}
        {range(nextMonthVisibleDays).map((_, index) => {
          const currentDate = index + 1
          return (
            <span
              className={cls(
                `${panelContentPrefixCls}-date`,
                `${panelContentPrefixCls}-next-month`
              )}
              key={`next-month-date-${index}`}
              onClick={onSelectedDate(currentDate)('next')}
            >
              {currentDate}
            </span>
          )
        })}
      </div>
    </div>
  )
}