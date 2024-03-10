'use client'

import { AuthenticateState, authenticate } from '@/common/auth/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { redirect } from 'next/navigation'
import ButtonPrimary from '@/components/ui/buttons/button-primary'

type loginPageProps = {
  params: { domain: string }
}

export default function LoginPage({ params }: loginPageProps) {
    const domain = decodeURIComponent(params.domain);
    const initialState: AuthenticateState.State = {
        domain,
        status: '',
        message: ''
    }
    const [state, formAction] = useFormState(authenticate, initialState)

    if (state.status === 'SUCCESS') {
        redirect('/')
    }

    return (
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Bem vindo!
            </h2>
            {state.message && <p className='text-red-500 font-medium'>{state.message}</p>}
            <form action={formAction} className="mt-8 space-y-6">
                <input type="hidden" value={domain} />
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" required />
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-violet-300 dark:focus:ring-violet-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Manter conectado</label>
                    </div>
                    <a href="#" className="ml-auto text-sm text-violet-700 hover:underline dark:text-violet-500">Esqueceu a senha?</a>
                </div>
                <LoginButton />
            </form>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <ButtonPrimary type="submit" className='w-full'>
            {pending ? 'Acessando...' : 'Acessar sua conta'}
        </ButtonPrimary>
    )
}
