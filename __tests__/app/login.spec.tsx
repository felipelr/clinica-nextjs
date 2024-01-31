import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import Page from '@/app/(auth)/login/page'

const server = setupServer(
    http.post('/auth', () => {
        // Note that you DON'T have to stringify the JSON!
        return HttpResponse.json({
            user: {
                id: 'abc-123',
                name: 'John Maverick',
            },
        })
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Page', () => {
    render(<Page />)
    expect(screen.getAllByRole('heading')).toBeDefined()
})