import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/[domain]/(auth)/login/page'

vi.mock('react-dom', () => ({
    useFormState: vi.fn((fn: () => void, state: string) => ''),
    useFormStatus: vi.fn(() => ({ pending: false }))
}))

test('should render LoginPage component', () => {
    render(<Page params={{ domain: 'test.localhost:3000' }} />)
    const title = screen.getByRole("heading", { level: 2, name: 'Bem vindo!' })
    expect(title).toBeDefined()
})