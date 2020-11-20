import React, { useState, useEffect } from "react"
import "./filter.scss"
import { DoubleLocationPin, DownArrow, LocationPin } from "./icons"

const Filter = props => {
  const {
    priceLevel,
    setPriceLevel,
    currentCategory,
    setCategory,
    currentSubCategory,
    setSubCategory,
    area,
    setArea,
    data
  } = props
  const [activeDropdown, setActiveDropdown] = useState("")
  const [showProvinces, setShowProvinces] = useState(data.provinces)
  const [filterArea, setFilterArea] = useState(area)

  useEffect(() => {
    setFilterArea(area)
  }, [area])

  const selectDropdown = (target, value) => {
    if (target === "area") {
      setFilterArea(value)
      setArea(value)
    } else if (target === "price") {
      setPriceLevel(value)
    }
    setActiveDropdown("")
  }

  const filterData = target => {
    setShowProvinces(
      data.provinces.filter(value => {
        return value.toLowerCase().includes(filterArea)
      })
    )
  }

  const handleInput = (e) => {
    e.preventDefault()
    setFilterArea(e.target.value)
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
            checked={currentCategory === "ทั้งหมด"}
            name="shop-categories"
            readOnly
          />
          <span className="checkmark"></span>
        </label>
        {data.categories.map((category, index) => {
          return (
            <label
              key={index}
              className="container"
              onClick={() => setCategory(category)}
            >
              {category.name}
              <input
                type="radio"
                checked={currentCategory === category}
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
          {area === "พื้นที่ใกล้ฉัน" ? (
            <LocationPin />
          ) : area === "สถานที่ทั้งหมด" ? (
            <DoubleLocationPin />
          ) : (
            ""
          )}
          <input
            className="dropdown-input"
            placeholder={area}
            value={filterArea}
            onChange={e => handleInput(e)}
          />
          <DownArrow className="down-arrow" />
        </div>
        <ul
          className={`dropdown ${activeDropdown === "area" && "active"}`}
          onBlur={() => setDropdown("")}
        >
          <li
            className={area === "พื้นที่ใกล้ฉัน" ? "selected" : ""}
            onClick={() => selectDropdown("area", "พื้นที่ใกล้ฉัน")}
          >
            <LocationPin /> พื้นที่ใกล้ฉัน
          </li>
          <li
            className={area === "สถานที่ทั้งหมด" ? "selected" : ""}
            onClick={() => selectDropdown("area", "สถานที่ทั้งหมด")}
          >
            <DoubleLocationPin /> สถานที่ทั้งหมด
          </li>
          {showProvinces.sort().map((province, index) => {
            return (
              <li
                className={area === province ? "selected" : ""}
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
            defaultValue={priceLevel === 0 ? "ทั้งหมด" : data.priceRange[priceLevel - 1]}
            readOnly
          />
          <DownArrow className="down-arrow" />
        </div>
        <ul
          className={`dropdown ${activeDropdown === "price" && "active"}`}
          onBlur={() => setDropdown("")}
        >
          <li
            className={priceLevel - 1 === 0 ? "selected" : ""}
            onClick={() => selectDropdown("price", 0)}
          >
            ทั้งหมด
          </li>
          {data.priceRange.map((range, index) => {
            return (
              <li
                className={priceLevel - 1 === index ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("price", index + 1)}
              >
                {range}
              </li>
            )
          })}
        </ul>
      </div>
      {currentCategory !== "ทั้งหมด" && (
        <div className="filter-section">
          ประเภท{currentCategory.name}
          <label
            className="container"
            onClick={() => setSubCategory("ทั้งหมด")}
          >
            ทั้งหมด
            <input
              type="radio"
              checked={currentSubCategory === "ทั้งหมด"}
              name="shop-subcategories"
              readOnly
            />
            <span className="checkmark"></span>
          </label>
          {currentCategory.subcategories.map((subCategory, index) => {
            return (
              <label
                key={index}
                className="container"
                onClick={() => setSubCategory(subCategory)}
              >
                {subCategory}
                <input
                  type="radio"
                  checked={currentSubCategory === subCategory}
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
