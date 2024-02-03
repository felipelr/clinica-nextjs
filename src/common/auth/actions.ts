'use server'
 
import { userService } from '@/prisma/services/user-service'
import { cookieHelper } from '@/common/helpers/cookieHelper';
import { jwtHelper } from '../helpers/jwtHelper';
import { EnvHelper, EnvVariables } from '../helpers/enviromentHelper/envHelper';
 
export async function authenticate(prevState: string, formData: FormData): Promise<string> {
  try {
    const user = await userService.login(String(formData.get('email')), String(formData.get('password')))
    if(!user) {
      return 'Email e/ou senha inválidos'
    }

    const payload = {
      sub: String(user.idusuario),
      email: `${user.nome} ${user.sobrenome}`,
      createdAt: new Date().toISOString(),
    };
    
    
    const token = await jwtHelper.sign(payload, { exp: '60m'})
    if (!token) {
        return 'Email e/ou senha inválidos'
    }
    
    cookieHelper.set(`${EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_AUTH_TOKEN)}`, token)   
    return 'sucesss' 
  } catch (error) {
    console.log(error)
    return 'Desculpe, ocorreu um erro tente novamente mais tarde'
  }
}