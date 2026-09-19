import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/routes/routes'

export function renderWithRouter(initialPath = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] })
  return { router, ...render(<RouterProvider router={router} />) }
}
