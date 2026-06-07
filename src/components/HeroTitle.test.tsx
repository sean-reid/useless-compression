import { render, screen } from '@testing-library/react'
import HeroTitle from './HeroTitle'

describe('HeroTitle', () => {
  it('exposes the accessible name "USELESS COMPRESSION"', () => {
    render(<HeroTitle />)
    expect(screen.getByRole('heading', { name: /useless compression/i })).toBeInTheDocument()
  })

  it('renders the visible "LOSS" text that gets struck through', () => {
    render(<HeroTitle />)
    expect(screen.getByRole('heading')).toHaveTextContent(/LOSSLESS COMPRESSION/)
    expect(screen.getByRole('heading')).toHaveTextContent(/USE/)
  })
})
