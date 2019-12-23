// __tests__/styleMock.ts
// 因为测试不关心具体的 css 样式，所以解析 less 文件的时候直接返回空对象即可
// jest 会在执行测试组件代码的时候，会将所有的 `import 'xx.less'` 替换掉
module.exports = {}