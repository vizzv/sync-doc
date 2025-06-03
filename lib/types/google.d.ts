export {};

declare global {
  interface Window {
    google: typeof google;
  }

  const google: {
    accounts: {
      id: {
        initialize: (params: {
          client_id: string;
          callback: (response: { credential: string }) => void;
        }) => void;
        renderButton: (parent: HTMLElement, options: object) => void;
        prompt: () => void;
      };
    };
  };
}
