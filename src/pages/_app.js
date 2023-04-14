import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Layout from '../components/layout';
import { useSSR } from '@nextui-org/react'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const { isBrowser } = useSSR()
  return(
    isBrowser && (
        <Layout componentName={Component.name}>
          <Component {...pageProps} />
        </Layout>
    )
  )
}