import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Window, WindowProps } from "../components/Window";
import { File, FileProps } from "../components/File";
import { useEffect, useState } from "react";
import { Task, TaskProps } from "../components/Task";
import CmdElement from "../components/elements/Console";
import ReadMeElement from "../components/elements/ReadMe";
import { UniversalProvider } from "../components/utils/UniversalProvider";

interface Element {
  window: WindowProps;
  file: FileProps;
  task: TaskProps;
}

export default function Home() {
  const [elements, setElements] = useState<Element[]>([
    ReadMeElement,
    CmdElement,
  ]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [menuType, setMenuType] = useState<number>(0);
  const [menuPoint, setMenuPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleWindowZ = (index: number) => {
    elements.forEach((el) => {
      el.file.windowRef.current?.decrementZIndex();
    });

    elements[index].file.windowRef.current?.setZIndex(99 + elements.length);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setMenuPoint({
      x:
        event.pageX < window.innerWidth - (window.innerWidth / 100) * 10
          ? event.pageX
          : event.pageX - window.innerWidth / 10,
      y:
        event.pageY < window.innerHeight - (window.innerHeight / 100) * 10
          ? event.pageY
          : event.pageY - window.innerHeight / 10,
    });

    setMenuOpen(true);
  };

  useEffect(() => {
    const handleClick = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleClick);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleClick);
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={styles.main}
        onContextMenu={(e) => {
          handleContextMenu(e);
        }}
      >
        {menuOpen && (
          <ul
            className={styles.context_menu}
            style={{ top: menuPoint.y, left: menuPoint.x }}
          >
            <li>Context Menu</li>
            <li>Something</li>
            <li>Context Menu</li>
          </ul>
        )}
        <div className={styles.desktop}>
          <div className={styles.desktop_icons}>
            {elements
              ? elements!.map((element) => (
                  <File
                    key={1}
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
                  <UniversalProvider key={1}>
                    <Window
                      title={element.window.title}
                      icon={element.window.icon}
                      taskRef={element.window.taskRef}
                      ref={element.file.windowRef}
                      zIndex={100 + elements.indexOf(element)}
                      onWindowGrab={handleWindowZ}
                    >
                      {element.window.children}
                    </Window>
                  </UniversalProvider>
                ))
              : null}
          </div>
        </div>
        <div className={styles.taskbar}>
          {elements
            ? elements!.map((element) => (
                <Task
                  key={1}
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
