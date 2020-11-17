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
    category,
    setSubCategory,
    subCategory,
		setCategory,
		categories,
		provinces,
		priceRange
  } = props
	console.log(category)

  return (
    <div className={`sidebar ${isOpen && "open"}`}>
      <div className="header">
        <button onClick={() => setIsOpen(false)}>
          <LeftArrow />
        </button>
        <h2>กรอกผล</h2>
      </div>
      <div className="content">
        <Filter
          priceLevel={priceLevel}
          setPriceLevel={setPriceLevel}
          area={area}
          setArea={setArea}
          currentCategory={category}
          setSubCategory={setSubCategory}
          currentSubCategory={subCategory}
          setCategory={setCategory}
          shopCategories={categories}
          provinces={provinces}
          priceRange={priceRange}
        />
      </div>
    </div>
  )
}

export default Sidebar
