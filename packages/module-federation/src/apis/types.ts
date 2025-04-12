export type RemoteModule = {
  menuName: string;
  menuCode: string;
  id: string;
  sortFlag: string;
  version: string;
  js: {
    id: string;
    url: string;
    version: string;
  }[];
};
