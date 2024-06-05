import { type RemoteModules } from "./types";
export * from "./types";

const mock = {
  pages: [
    {
      name: "about",
      url: "about",
    },
  ],
  components: [],
};

export const fetchRemoteModules: () => Promise<RemoteModules> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const remotes = mock;
      resolve(remotes);
    }, 200);
  });
};
