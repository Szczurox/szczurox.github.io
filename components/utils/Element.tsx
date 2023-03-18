import { ReactElement } from "react";
import { createRef, RefObject } from "react";
import { FileProps } from "../File";
import { Task, TaskProps } from "../Task";
import { Window, WindowProps } from "../Window";

export interface DesktopElement {
  window: WindowProps;
  file: FileProps;
  task: TaskProps;
}

export interface DesktopElementCreator {
  fileName?: string;
  iconPath?: string;
  children?: ReactElement;
  windowNotResizable?: boolean;
  windowDisallowFullscreen?: boolean;
  windowName?: string;
  width?: number;
  height?: number;
}

export const createDesktopElement = (
  args: DesktopElementCreator
): DesktopElement => {
  if (!args.fileName) args.fileName = "FILE";
  if (!args.iconPath) args.iconPath = "/txt-file-icon.svg";
  if (!args.windowName) args.windowName = args.fileName;
  if (!args.width) args.width = 500;
  if (!args.height) args.height = 315;

  const windowRef: RefObject<Window> = createRef();
  const taskRef: RefObject<Task> = createRef();

  return {
    window: {
      title: args.windowName,
      icon: args.iconPath,
      children: args.children ? args.children : <></>,
      taskRef: taskRef,
      resizable: !args.windowNotResizable,
      allowFullscreen: !args.windowDisallowFullscreen,
      width: args.width,
      height: args.height,
    },
    file: {
      name: args.fileName,
      icon: args.iconPath,
      windowRef: windowRef,
    },
    task: {
      name: args.fileName,
      icon: args.iconPath,
      windowRef: windowRef,
    },
  };
};
