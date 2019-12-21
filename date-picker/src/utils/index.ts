// 代码很简单，生成一定长度的空数组
export const range = (length: number, defaultValue: any = null) =>
  new Array(length).fill(defaultValue)