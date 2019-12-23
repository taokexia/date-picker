// jest.config.js

module.exports = {
  // setup 文件
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  // 测试之前 使用 babel-jest 转换一下
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  // mock 掉 组件中的 less 或者 css 文件
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__tests__/styleMock.ts'
  }
}