import { useContext, FormEvent, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../public/Logo.svg';
import { Button } from '../components/ui/Button'

import { Input} from '@/components/ui/Input';
import styles from '../styles/home.module.scss'

import { AuthContext } from '@/contexts/AuthContext';
import { canSSRGuest } from '@/utils/canSSRGuest';


export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoanding] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      alert("PREENCHA OS DADOS")
      return;
    }

    setLoanding(true)

    let data = {
      email,
      password,
    }

    await signIn(data)

    setLoanding(false)
  }

  return (
    <>
      <Head>
        <title>
          Pizzaria-Login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='logoPizzaria'/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            > 
              Acessar
            </Button>
          </form>

          <Link href="/signup" className={styles.text}>
            <span>Não possui uma conta? Cadastre-se</span>
          </Link>

        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props:{}
  }
})
