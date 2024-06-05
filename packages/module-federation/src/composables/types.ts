export enum RemoteModuleTypeEnum {
  component = "component", // 远程组件
  page = "page", // 远程页面，使用动态路由添加
}

export type RemoteModuleTypeUnion = keyof typeof RemoteModuleTypeEnum;
