import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('routing', () => {
  it('renders the home page at /', () => {
    renderWithRouter('/')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it('navigates via the nav bar', async () => {
    renderWithRouter('/')
    await userEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass('active')
  })

  it('shows 404 for unknown routes', () => {
    renderWithRouter('/does-not-exist')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
