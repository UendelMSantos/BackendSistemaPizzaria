import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import { FaSpinner } from 'react-icons/fa';

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean
    children: ReactNode
}


export function Button({...rest} : PropsButton){

    return(
        <button 
        className={styles.button}
        disabled={rest.loading}
        {...rest}
        >
            {rest.loading ? (
                <FaSpinner color='#FFF' size={16}/>
            ):(
                <a className={styles.buttonText}>{rest.children}</a>
            )}

        </button>
    )
}