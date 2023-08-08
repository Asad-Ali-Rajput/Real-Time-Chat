import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeComponent from '@/Components/HomeComponent'
import MessengerUI from '@/Components/Messenger'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      {/* <HomeComponent /> */}
      <MessengerUI />
    </main>
  )
}
