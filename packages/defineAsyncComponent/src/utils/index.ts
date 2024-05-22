/**
 * 加载远端+解析组件
 * @param componentName
 */
export const loadAsyncComponent = async (componentName: string) => {
  if (import.meta.env.VITE_ENV === "local") {
    if (import.meta.env.VITE_LOCAL_COMPONENT_BASE_URL) {
      const path = componentName.split("async-components/")[1].split(".vue")[0];
      const remoteUrl = `${
        import.meta.env.VITE_LOCAL_COMPONENT_BASE_URL
      }${path}.js`;
      return loadRemoteComponent(remoteUrl);
    }
    return loadLocalComponent(componentName);
  }

  return loadRemoteComponent(componentName);
};

export const loadLocalComponent = (componentName: string) => {
  return import(/* @vite-ignore */componentName);
};

export const loadRemoteComponent = async (remoteUrl: string) => {
  const response = await fetch(remoteUrl);
  const scriptText = await response.text();
  let Component: any = "";
  try {
    const scriptStr = scriptText.replace("export default", "");
    Component = new Function("return " + scriptStr)();
    console.log(Component);
  } catch (e) {
    console.error(e);
  }
  return Component;
};
