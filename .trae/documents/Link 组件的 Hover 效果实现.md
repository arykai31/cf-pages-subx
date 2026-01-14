1. 创建 `link.tsx` 组件文件，使用 cva 定义 Link 组件的样式变体，包括品牌标识的 hover 效果
2. 在 `link.tsx` 中实现 Link 组件，支持 asChild 属性，类似于 Button 组件
3. 将 Header.tsx 中的 Link 组件替换为自定义的 Link 组件
4. 确保自定义 Link 组件支持所有 React Router Link 的属性

通过这种方式，我们可以将 Header.tsx 中的 hover 效果封装到一个可复用的 Link 组件中，其他地方也可以使用相同的效果，保持项目样式的一致性和可维护性。