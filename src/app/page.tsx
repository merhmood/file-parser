import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.file}>
        <p>Sheets file parser -</p>{" "}
        <a href="/file-upload" className={styles.file_link}>
          {" "}
          check it out
        </a>
      </div>
      <div className={styles.file}>
        <p>Image file parser -</p>{" "}
        <a href="/image-upload" className={styles.file_link}>
          {" "}
          check it out
        </a>
      </div>
    </main>
  );
}
