import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname == "/login");
  if(router.pathname == "/login" || router.pathname == "/register"){
    return (
      <>
        <ToastContainer/>
        <Component {...pageProps} />
      
      </>
    )
  }
  return (
    <Layout>
      <ToastContainer/>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
