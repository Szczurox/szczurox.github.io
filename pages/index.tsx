import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Window } from "../components/Window";
import Draggable from "react-draggable";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Welcome!</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.desktop}>
            <div className={styles.desktop_icons}>
              <div className={styles.file}>
                <img src="txt-file-icon.svg" className={styles.icon} />
                <div className={styles.file_name}>README</div>
              </div>
            </div>
          </div>
          <Window title="README" icon="txt-file-icon.svg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              ipsum dolor, ultricies hendrerit dignissim in, pretium in orci.
              Mauris euismod lorem sit amet ipsum dapibus, vel euismod massa
              pulvinar. Vestibulum id ullamcorper nunc. Donec rhoncus ex mauris,
              ac consectetur felis hendrerit in. Vestibulum convallis finibus
              aliquet. Pellentesque rhoncus tortor eget neque commodo vehicula
              sed a velit. Suspendisse nec tristique libero. Sed malesuada dui
              vel sapien vestibulum vulputate. Nullam malesuada imperdiet nisi
              eget semper. Ut malesuada augue eu tristique laoreet. In metus
              metus, pulvinar vitae imperdiet quis, convallis quis sem.
            </p>
          </Window>
          <div className={styles.taskbar}></div>
        </main>
      </div>
    </>
  );
}
