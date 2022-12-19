import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Window, WindowProps } from "../components/Window";
import { File, FileProps } from "../components/File";
import { createRef, RefObject, useEffect, useState } from "react";
import ReadMe from "../components/files/ReadMe";
import { Task, TaskProps } from "../components/Task";

interface Element {
  window: WindowProps;
  file: FileProps;
  task: TaskProps;
}

export default function Home() {
  const readmeWindowRef: RefObject<Window> = createRef();
  const readmeTaskRef: RefObject<Task> = createRef();
  const readme2WindowRef: RefObject<Window> = createRef();
  const readme2TaskRef: RefObject<Task> = createRef();

  const README: Element = {
    window: {
      title: "README",
      icon: "txt-file-icon.svg",
      children: <ReadMe />,
      taskRef: readmeTaskRef,
    },
    file: {
      name: "README",
      icon: "txt-file-icon.svg",
      windowRef: readmeWindowRef,
    },
    task: {
      name: "README",
      icon: "txt-file-icon.svg",
      windowRef: readmeWindowRef,
    },
  };

  const README2: Element = {
    window: {
      title: "README2",
      icon: "txt-file-icon.svg",
      children: <ReadMe />,
      taskRef: readme2TaskRef,
    },
    file: {
      name: "README2",
      icon: "txt-file-icon.svg",
      windowRef: readme2WindowRef,
    },
    task: {
      name: "README2",
      icon: "txt-file-icon.svg",
      windowRef: readme2WindowRef,
    },
  };

  const [elements, setElements] = useState<Element[]>([README, README2]);

  const addElement = (
    fileName?: string,
    iconPath?: string,
    windowName?: string,
    children?: React.ReactNode
  ) => {
    if (!fileName) fileName = "FILE";
    if (!iconPath) iconPath = "txt-file-icon.svg";
    if (!windowName) windowName = fileName;

    const windowRef: RefObject<Window> = createRef();
    const taskRef: RefObject<Task> = createRef();

    setElements([
      ...elements,
      {
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
      },
    ]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.desktop}>
          <div className={styles.desktop_icons}>
            {elements
              ? elements!.map((element) => (
                  <File
                    windowRef={element.file.windowRef}
                    name={element.file.name}
                    icon={element.window.icon}
                  />
                ))
              : null}
          </div>
          <div className={styles.desktop_windows}>
            {elements
              ? elements!.map((element) => (
                  <Window
                    title={element.window.title}
                    icon={element.window.icon}
                    taskRef={element.window.taskRef}
                    ref={element.file.windowRef}
                  >
                    {element.window.children}
                  </Window>
                ))
              : null}
          </div>
        </div>
        <div className={styles.taskbar}>
          {elements
            ? elements!.map((element) => (
                <Task
                  windowRef={element.file.windowRef}
                  name={element.file.name}
                  icon={element.window.icon}
                  ref={element.window.taskRef}
                />
              ))
            : null}
        </div>
      </main>
    </div>
  );
}
