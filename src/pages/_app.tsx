import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Global, css } from '@emotion/core'
import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import '../../public/style/style.css'

const Full = () => (
    <Global
        styles={css`
        html,
        body,
        #__next {
            height: 100%;
            margin: 0;
        }
        `}
    />
)
export default ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider>
            <Head>
                <title>my99n</title>
            </Head>
            <CSSReset />
            <Component {...pageProps} />
            <Full />
        </ThemeProvider>
    )
}