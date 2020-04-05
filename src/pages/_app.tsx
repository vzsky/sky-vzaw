import { AppProps } from 'next/app'
import Head from 'next/head'
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Head>
                <title> my99n </title>
            </Head>
        </>
    )
}

export default MyApp