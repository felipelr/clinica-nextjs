'use server'

import { unstable_cache } from "next/cache";
import { cookieHelper } from '@/common/helpers/cookieHelper';
import { jwtHelper } from '../helpers/jwtHelper';
import { EnvHelper, EnvVariables } from '../helpers/enviromentHelper/envHelper';
import { userService } from "@/prisma/factories/user-service-factory";
import { companyService } from "@/prisma/factories/company-service-factory";

export namespace AuthenticateState {
  export type State = {
    domain: string
    status: '' | 'SUCCESS' | 'ERROR'
    message: string
  }
}

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

export async function authenticate(prevState: AuthenticateState.State, formData: FormData): Promise<AuthenticateState.State> {
  try {
    const user = await userService.login(String(formData.get('email')), String(formData.get('password')))
    if (!user) {
      return {
        domain: prevState.domain,
        status: 'ERROR',
        message: 'Email e/ou senha inválidos'
      }
    }

    const userDomain = `${user.domain.subdomain}.${user.domain.domain}`
    if (userDomain !== prevState.domain) {
      return {
        domain: prevState.domain,
        status: 'ERROR',
        message: 'Email e/ou senha inválidos'
      }
    }

    const payload = {
      sub: String(user.id),
      email: user.email,
      createdAt: new Date().toISOString(),
    };


    const token = await jwtHelper.sign(payload, { exp: '60m' })
    if (!token) {
      return {
        domain: prevState.domain,
        status: 'ERROR',
        message: 'Email e/ou senha inválidos'
      }
    }

    cookieHelper.set(`${EnvHelper.getVariable(EnvVariables.NEXT_PUBLIC_AUTH_TOKEN)}`, token)
    return {
      domain: prevState.domain,
      status: 'SUCCESS',
      message: ''
    }
  } catch (error) {
    console.error(error)
    return {
      domain: prevState.domain,
      status: 'ERROR',
      message: 'Desculpe, ocorreu um erro tente novamente mais tarde'
    }
  }
}