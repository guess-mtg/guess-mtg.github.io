import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Layout from '../src/components/layout';
import Head from 'next/head'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout componentName={Component.name}>
      <Head>
        <title>GuessMTG</title>
        <meta name="description" content="Guess the name of the 'Magic, The Gathering' card of the day!" />
        <meta property="og:title" content="GuessMTG - Wordle" />
        <meta property="og:image" content="https://instagram.fldb1-1.fna.fbcdn.net/v/t51.2885-19/277247889_1325386221205931_6828213806774211948_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fldb1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=KvhNxiOZAvAAX8U1rtv&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfBWnw4x4QeO66fSobVNZVz0Mb7RUt4sp7xJpOWkAPs6Rw&oe=63666559&_nc_sid=6136e7" />
        <meta property="og:description" content="Guess the name of the 'Magic, The Gathering' card of the day" />
        <meta property="og:url" content="https://www.guessmtg.com/" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}