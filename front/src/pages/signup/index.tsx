import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../../public/Logo.svg';
import { Button } from '@/components/ui/Button'

import { Input } from '@/components/ui/Input';

import styles from '@/styles/home.module.scss'
import { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '@/contexts/AuthContext';



export default function Home() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error('Preencha todos os campos')
      return
    }

    setLoading(true)

    let data = {
      name,
      email, 
      password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>
          Pizzaria-Cadastre-se.
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='logoPizzaria' />

        <div className={styles.login}>

          <h1>Cadastre-se</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>

          <Link href="/" className={styles.text}>
            <span >Já possui uma conta? Faça Login.</span>
          </Link>

        </div>
      </div>
    </>
  );
}
