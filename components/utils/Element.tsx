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

export const createDesktopElement = (
  fileName?: string,
  iconPath?: string,
  children?: ReactElement,
  windowName?: string
): DesktopElement => {
  if (!fileName) fileName = "FILE";
  if (!iconPath) iconPath = "txt-file-icon.svg";
  if (!windowName) windowName = fileName;

  const windowRef: RefObject<Window> = createRef();
  const taskRef: RefObject<Task> = createRef();

  return {
    window: {
      title: windowName,
      icon: iconPath,
      children: children ? children : <></>,
      taskRef: taskRef,
    },
    file: {
      name: fileName,
      icon: iconPath,
      windowRef: windowRef,
    },
    task: {
      name: fileName,
      icon: iconPath,
      windowRef: windowRef,
    },
  };
};
