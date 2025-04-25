export interface RouteUI {
  id: number;
  path: string;
  title: string;
  icon: any;
}

export interface Toast {
  type: string;
  title: string;
  message: string;
  duration: number;
}

export interface UIState {
  checking: boolean;
  step: number;
  email: string;
  code: string;
  refreshTechnicians: boolean;
  toast: Toast | null;
  dialog: IDialog | null;
}

export interface Menu {
  id: number;
  name: string;
  path: string;
}

export interface IDialog {
  icon: string;
  title: string;
  message: string;
  handleAccept: (...args: any[]) => any | Promise<any>;
  handleCancel: (...args: any[]) => any | Promise<any>;
}
