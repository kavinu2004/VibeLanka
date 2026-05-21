import Map from '@/components/Map/Map';
import styles from './page.module.css';

export const metadata = {
  title: 'Vibe Lanka — App',
};

export default function AppShell() {
  return (
    <main className={styles.shell}>
      <Map />
    </main>
  );
}
