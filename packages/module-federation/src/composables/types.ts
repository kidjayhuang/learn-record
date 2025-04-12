export enum RemoteModuleTypeEnum {
  card = "card", // 远程组件-入口
  route = "route", // 远程页面，使用动态路由添加
}

export type RemoteModuleTypeUnion = keyof typeof RemoteModuleTypeEnum;
