import 'ui-library/styles/common.scss';
import 'ui-library/styles/index.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
