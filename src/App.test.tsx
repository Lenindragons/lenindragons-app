import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('Rebders hello world', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World')
  })
})
