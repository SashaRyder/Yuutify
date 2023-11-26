/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface apiInterface {
    send: (channel: string, data: any) => void;
    receive: <T>(channel: string, data: (data: T) => void) => () => (() => Electron.IpcRenderer) | undefined;
}

interface Window {
    api: apiInterface;
  }