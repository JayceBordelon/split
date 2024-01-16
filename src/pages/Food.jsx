import React from 'react'
import Menu from "../components/Menu"
import FoodConsole from '../components/FoodConsole'

export default function Food() {
  return (
    <div className="min-h-screen w-full bg-dark-900 text-white">
      <Menu />
      <FoodConsole />
    </div>
  )
}
