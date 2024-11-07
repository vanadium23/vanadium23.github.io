import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Navbar: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <nav>{children}</nav> : null
}

Navbar.css = `

`

export default (() => Navbar) satisfies QuartzComponentConstructor
