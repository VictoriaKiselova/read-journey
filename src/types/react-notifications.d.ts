declare module "react-notifications" {
  export const NotificationContainer: React.ComponentType<any>;
  export const NotificationManager: {
    info: (
      message: string,
      title?: string,
      timeOut?: number,
      callback?: () => void,
      priority?: boolean
    ) => void;
    success: (
      message: string,
      title?: string,
      timeOut?: number,
      callback?: () => void,
      priority?: boolean
    ) => void;
    warning: (
      message: string,
      title?: string,
      timeOut?: number,
      callback?: () => void,
      priority?: boolean
    ) => void;
    error: (
      message: string,
      title?: string,
      timeOut?: number,
      callback?: () => void,
      priority?: boolean
    ) => void;
  };
}
