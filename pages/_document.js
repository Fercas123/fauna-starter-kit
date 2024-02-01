import { Html, Head, Main, NextScript } from 'next/document';
import { styles } from './index';
import Link from 'next/link';
import { constants } from '../constants';
import { format } from 'date-fns';
import localeEs from 'date-fns/locale/es/index';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Great+Vibes'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Libre+Baskerville'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Abel'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display'
          rel='stylesheet'
        />
      </Head>
      <body>
        <header className={styles.header}>
          <div className={styles.headerLine}>
            <Link href={'/'}>
              <h1
                className={styles.headerNames}
              >{`${constants.bride} & ${constants.groom}`}</h1>
            </Link>
            <p className={styles.headerEvent}>Nuestra boda</p>
          </div>
        </header>
        <Main />
        <NextScript />
        <footer className={styles.footer}>
          {`${constants.bride} & ${constants.groom} | ${format(constants.date, 'MMMM yyyy', { locale: localeEs })}`}
        </footer>
      </body>
    </Html>
  );
}
