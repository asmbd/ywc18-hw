import React, { useState, useEffect } from "react"
import "./filter.scss"
import { DoubleLocationPin, DownArrow, LocationPin } from "./icons"

const Filter = props => {
  const {
    setPriceLevel,
    priceLevel,
    currentCategory,
    currentSubCategory,
    shopCategories,
    provinces,
    priceRange,
    setCategory,
    setSubCategory,
    area,
    setArea,
  } = props
  const [activeDropdown, setActiveDropdown] = useState("")
  const [selectedArea, setSelectedArea] = useState(area)
  const [showProvinces, setShowProvinces] = useState(provinces)
  const [filterArea, setFilterArea] = useState(area)
  const [selectedCategory, setSelectedCategory] = useState(currentCategory)
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    currentSubCategory
  )
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  console.log(currentSubCategory)

  useEffect(() => {
    setSelectedCategory(currentCategory)
  }, [currentCategory])

  useEffect(() => {
    setSelectedSubCategory(currentSubCategory)
  }, [currentSubCategory])

  useEffect(() => {
    setSelectedArea(area)
    setFilterArea(area)
  }, [area])

  const selectDropdown = (target, value) => {
    if (target === "area") {
      setSelectedArea(value)
      setFilterArea(value)
      setArea(value)
    } else if (target === "price") {
      setSelectedPriceRange(value)
      setPriceLevel(value)
    }
    setActiveDropdown("")
  }

  const filterData = target => {
    if (target === "area") {
      setShowProvinces(
        provinces.filter(value => {
          return value.toLowerCase().includes(filterArea)
        })
      )
    }
  }

  const handleInput = (e, target) => {
    e.preventDefault()
    if (target === "area") {
      setFilterArea(e.target.value)
    }
  }

  const setDropdown = target => {
    setActiveDropdown(target)
    if (target === activeDropdown) {
      setActiveDropdown("")
    } else if (target === "area") {
      setFilterArea("")
    }
  }

  useEffect(() => {
    filterData("area")
  }, [filterArea])

  return (
    <div className="filter-container">
      <div className="filter-section">
        ประเภทร้านค้า
        <label className="container" onClick={() => setCategory("ทั้งหมด")}>
          ทั้งหมด
          <input
            type="radio"
            checked={selectedCategory === "ทั้งหมด"}
            name="shop-categories"
            readOnly
          />
          <span className="checkmark"></span>
        </label>
        {shopCategories.map((category, index) => {
          return (
            <label
              key={index}
              className="container"
              onClick={() => setCategory(category)}
            >
              {category.name}
              <input
                type="radio"
                checked={selectedCategory === category}
                name="shop-categories"
                readOnly
              />
              <span className="checkmark"></span>
            </label>
          )
        })}
      </div>
      <div className="filter-section">
        จังหวัด/ใกล้ฉัน
        <div
          className="dropdown-container"
          tabIndex="0"
          onBlur={() => setDropdown("")}
          onClick={() => setDropdown("area")}
        >
          {selectedArea === "พื้นที่ใกล้ฉัน" ? (
            <LocationPin />
          ) : selectedArea === "สถานที่ทั้งหมด" ? (
            <DoubleLocationPin />
          ) : (
            ""
          )}
          <input
            className="dropdown-input"
            placeholder={selectedArea}
            value={filterArea}
            onChange={e => handleInput(e, "area")}
          />
          <DownArrow className="down-arrow" />
        </div>
        <ul
          className={`dropdown ${activeDropdown === "area" && "active"}`}
          onBlur={() => setDropdown("")}
        >
          <li
            className={selectedArea === "พื้นที่ใกล้ฉัน" ? "selected" : ""}
            onClick={() => selectDropdown("area", "พื้นที่ใกล้ฉัน")}
          >
            <LocationPin /> พื้นที่ใกล้ฉัน
          </li>
          <li
            className={selectedArea === "สถานที่ทั้งหมด" ? "selected" : ""}
            onClick={() => selectDropdown("area", "สถานที่ทั้งหมด")}
          >
            <DoubleLocationPin /> สถานที่ทั้งหมด
          </li>
          {showProvinces.sort().map((province, index) => {
            return (
              <li
                className={selectedArea === province ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("area", province)}
              >
                {province}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="filter-section">
        ช่วงราคาสินค้า (บาท)
        <div
          className="dropdown-container"
          tabIndex="0"
          onBlur={() => setDropdown("")}
          onClick={() => setDropdown("price")}
        >
          <input
            className="dropdown-input"
            placeholder="กรุณาเลือก"
            defaultValue={selectedPriceRange === 0 ? "ทั้งหมด" : priceRange[selectedPriceRange - 1]}
            readOnly
          />
          <DownArrow className="down-arrow" />
        </div>
        <ul
          className={`dropdown ${activeDropdown === "price" && "active"}`}
          onBlur={() => setDropdown("")}
        >
          <li
            className={selectedPriceRange - 1 === 0 ? "selected" : ""}
            onClick={() => selectDropdown("price", 0)}
          >
            ทั้งหมด
          </li>
          {priceRange.map((range, index) => {
            return (
              <li
                className={selectedPriceRange - 1 === index ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("price", index + 1)}
              >
                {range}
              </li>
            )
          })}
        </ul>
      </div>
      {selectedCategory !== "ทั้งหมด" && (
        <div className="filter-section">
          ประเภท{selectedCategory.name}
          <label
            className="container"
            onClick={() => setSubCategory("ทั้งหมด")}
          >
            ทั้งหมด
            <input
              type="radio"
              checked={selectedSubCategory === "ทั้งหมด"}
              name="shop-subcategories"
              readOnly
            />
            <span className="checkmark"></span>
          </label>
          {selectedCategory.subcategories.map((subCategory, index) => {
            return (
              <label
                key={index}
                className="container"
                onClick={() => setSubCategory(subCategory)}
              >
                {subCategory}
                <input
                  type="radio"
                  checked={selectedSubCategory === subCategory}
                  name="shop-subcategories"
                  readOnly
                />
                <span className="checkmark"></span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Filter
