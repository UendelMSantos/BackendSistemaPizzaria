import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "@/services/apiCliente";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | null>(null)
    const isAuthenticated = !!user; //'!!'converte o state para boleano, basicamente se User estiver vazio, ele será 'false;

    useEffect(() => {

        //Tentar pegar algo no cookie
        const {'@nextauth.token': token} = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id, 
                    name,
                    email
                })
            })
            .catch(() => {
                //Se deu erro, deslogar o user;
                signOut();
            })
        }

    },[])


    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session',{
                email,
                password
            })
            //console.log(response.data);
            const {id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60*60*24*30, // expirar em 1 mês
                path: '/' //Quais caminhos terão acesso ao cookie, nesse caso: Todos

            })

            setUser({
                id,
                name,
                email,
            })

            //Passar para proximas requisiçõs o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com Sucesso!!')

            //Redicrecionar o user para /dashboard
            Router.push('/dashboard')


        }catch(err){
            toast.error("Email ou Senha incorretos")
            console.log('Erro ao acessar', err)
        }
    }

    async function signUp({name, email, password} : SignUpProps){
        try{

            const response = await api.post('/users',{
                name,
                email,
                password
            })

            //console.log("Cadastrado com Sucesso")

            toast.success("Conta criada com sucesso!!!")

            Router.push('/')

        }catch(err){

            toast.error("Erro ao Cadastrar!")

            console.log("Erro ao cadastrar", err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}