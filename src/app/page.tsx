import Chat from '@/components/Chat';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.backgroundEffects}>
        <div className={styles.glowBlob1} />
        <div className={styles.glowBlob2} />
      </div>
      
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>DM</div>
        </div>
        <h1 className={styles.title}>Diba Makki</h1>
        <p className={styles.subtitle}>Full-Stack Developer | Building AI-driven systems</p>
      </div>

      <Chat />
    </main>
  );
}
