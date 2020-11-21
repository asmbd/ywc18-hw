import React, { useState, useEffect } from "react"
import { LeftArrow } from "./icons"
import "./sidebar.scss"
import Filter from "./filter"

const Sidebar = props => {
  const {
    isOpen,
    setIsOpen,
    priceLevel,
    setPriceLevel,
    area,
    setArea,
    currentCategory,
    setSubCategory,
    currentSubCategory,
		setCategory,
		data
  } = props
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen)
  const [selectedCategory, setSelectedCategory] = useState(currentCategory)
  const [selectedSubCategory, setSelectedSubCategory] = useState(currentSubCategory)
  const [selectedArea, setSelectedArea] = useState(area)
  const [selectedPriceLevel, setSelectedPriceLevel] = useState(priceLevel)

  const closeSidebar = () => {
    setIsOpen(false)
    setCategory(selectedCategory)
    setSubCategory(selectedSubCategory)
    setPriceLevel(selectedPriceLevel)
    setArea(selectedArea)
  }

  useEffect(() => {
    setIsSidebarOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    setSelectedSubCategory(currentSubCategory)
  }, [currentSubCategory])

  useEffect(() => {
    setSelectedCategory(currentCategory)
  }, [currentCategory])

  useEffect(() => {
    setSelectedArea(area)
  }, [area])

  useEffect(() => {
    setSelectedPriceLevel(priceLevel)
  }, [priceLevel])
  
  return (
    <div className={`sidebar ${isSidebarOpen && "open"}`}>
      <div className="header">
        <button onClick={closeSidebar}>
          <LeftArrow />
        </button>
        <h2>กรอกผล</h2>
      </div>
      <div className="content">
        <Filter
          priceLevel={selectedPriceLevel}
          setPriceLevel={setSelectedPriceLevel}
          area={selectedArea}
          setArea={setSelectedArea}
          currentCategory={selectedCategory}
          setSubCategory={setSelectedSubCategory}
          currentSubCategory={selectedSubCategory}
          setCategory={setSelectedCategory}
          data={data}
        />
      </div>
    </div>
  )
}

export default Sidebar
