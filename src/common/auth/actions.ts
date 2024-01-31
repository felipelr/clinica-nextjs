'use server'
 
import { userService } from '@/prisma/services/user-service'
import { cookieHelper } from '@/common/helpers/cookieHelper'
 
export async function authenticate(prevState: string, formData: FormData): Promise<string> {
  try {
    const user = await userService.login(String(formData.get('email')), String(formData.get('password')))
    if (!user) {
        return 'Email e/ou senha inválidos'
    }
    cookieHelper.set(`${process.env.NEXT_PUBLIC_AUTH_TOKEN}`, JSON.stringify(user))   
    return 'sucesss' 
  } catch (error) {
    return 'Desculpe, ocorreu um erro tente novamente mais tarde'
  }
}