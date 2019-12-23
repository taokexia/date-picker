// __tests__/index.test.tsx

import React from 'react'
import { render, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DatePicker from '../src/components/DatePicker'
import DatePickerPanel from '../src/components/DatePicker/panel'

describe('测试 DatePicker 组件', () => {
  it('DatePicker 组件 的快照需要保持一致', () => {
    const wrapper = render(<DatePicker />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('调用 DatePicker, 渲染 input 框 和 panel 浮层', () => {
    const wrapper = shallow(<DatePicker/>)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find(DatePickerPanel)).toHaveLength(1)
  })

  it('动用 DatePicker, onChange 不应该被执行', () => {
    const onChange = jest.fn()
    shallow(<DatePicker onChange={onChange} />)
    expect(onChange).not.toHaveBeenCalled()
  })
})