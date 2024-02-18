'use server'

import { unstable_cache } from "next/cache";
import { cookieHelper } from '@/common/helpers/cookieHelper';
import { jwtHelper } from '../helpers/jwtHelper';
import { EnvHelper, EnvVariables } from '../helpers/enviromentHelper/envHelper';
import { companyService, userService } from "@/prisma/services";

export async function getSiteData(domain: string) {
  const rootDomain = EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_ROOT_DOMAIN) || ''
  const currentDomain = domain.replace(".localhost:3000", `.${rootDomain}`);
  const subdomain = currentDomain.endsWith(`.${rootDomain}`) ? currentDomain.replace(`.${rootDomain}`, "") : '';

  return await unstable_cache(
    async () => {
      return companyService.getByDomain(rootDomain, subdomain)
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}
 
export async function authenticate(prevState: string, formData: FormData): Promise<string> {
  try {
    const user = await userService.login(String(formData.get('email')), String(formData.get('password')))
    if(!user) {
      return 'Email e/ou senha inválidos'
    }

    const payload = {
      sub: String(user.id),
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    
    
    const token = await jwtHelper.sign(payload, { exp: '60m'})
    if (!token) {
        return 'Email e/ou senha inválidos'
    }
    
    cookieHelper.set(`${EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_AUTH_TOKEN)}`, token)   
    return 'sucesss' 
  } catch (error) {
    console.error(error)
    return 'Desculpe, ocorreu um erro tente novamente mais tarde'
  }
}