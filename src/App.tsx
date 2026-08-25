import { Hero } from './app/Hero'
import { Studio } from './app/Studio'
import { Rotation } from './app/Rotation'
import { Rules } from './app/Rules'
import { Method } from './app/Method'
import { Footer } from './app/Footer'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Studio />
        <Rotation />
        <Rules />
        <Method />
      </main>
      <Footer />
    </>
  )
}
