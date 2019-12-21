import React from 'react'
import cls from 'classnames'

export function DatePickerPanelHeader() {
  const panelHeaderPrefixCls = 'date-picker'
  return (
    <div className={cls(panelHeaderPrefixCls)}>
      <span className={cls(`${panelHeaderPrefixCls}-selected-date`)}>
        <span className={cls(`${panelHeaderPrefixCls}-selected-date-year`)}>
          x年
        </span>
        <span className={cls(`${panelHeaderPrefixCls}-selected-date-month`)}>
          x月
        </span>
      </span>
      <span className={cls(`${panelHeaderPrefixCls}-switch`)}>
        <span className={cls(`${panelHeaderPrefixCls}-switch-group`)}>
          前
        </span>
        <span className={cls(`${panelHeaderPrefixCls}-switch-group`)}>
          后
        </span>
      </span>
    </div>
  )
}