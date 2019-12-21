import React from 'react'
import cls from 'classnames'

export function DatePickerPanelFooter() {
  const panelFooterPrefixCls = `date-picker`

  return (
    <div className={cls(panelFooterPrefixCls)}>
      <div className={cls(`${panelFooterPrefixCls}-today`)}>今天</div>
      <div className={cls(`${panelFooterPrefixCls}-clear`)}>清除</div>
    </div>
  )
}