import React, { useState, useRef, useEffect } from "react"
import "./header.scss"
import Logo from "../images/halfhalf-logo.png"
import {
  DoubleLocationPin,
  DownArrow,
  FoodCategory,
  LocationPin,
  SearchIcon,
  ShopCategory,
} from "./icons"

const Header = props => {
  const {
    filterName,
    setFilterName,
    provinces,
    shopCategories,
    setCategory,
    area,
    setArea,
  } = props
  const categoryPlaceholder =
    "ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
  const [activeDropdown, setActiveDropdown] = useState("")
  const [searchArea, setSearchArea] = useState(area)
  const [showProvinces, setShowProvinces] = useState(provinces)
  const [filterArea, setFilterArea] = useState(area)
  const [selectedCategory, setSelectedCategory] = useState(categoryPlaceholder)
  const [filterMerchant, setFilterMerchant] = useState("")

  useEffect(() => {
    setSearchArea(area)
    setFilterArea(area)
  }, [area])

  const selectDropdown = (target, value) => {
    if (target === "area") {
      setSearchArea(value)
      setFilterArea(value)
      setArea(value)
    } else if (target === "category") {
      setSelectedCategory(value)
      setCategory(value)
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
    } else {
      // setShowCategories(
      //   shopCategories.filter(value => {
      //     return value.name.toLowerCase().includes(filterCategory.toLowerCase())
      //   })
      // )
    }
  }

  const handleInput = (e, target) => {
    e.preventDefault()
    if (target === "area") {
      setFilterArea(e.target.value)
    } else if (target === "category") {
      setFilterMerchant(e.target.value)
    }
  }

  const search = e => {
    if (e.key === "Enter") {
      setFilterName(filterMerchant)
      setDropdown("")
    }
  }

  useEffect(() => {
    filterData("area")
  }, [filterArea])

  useEffect(() => {
    filterData("category")
  }, [filterMerchant])

  const setDropdown = target => {
    setActiveDropdown(target)
    if (target === activeDropdown) {
      setActiveDropdown("")
    } else if (target === "area") {
      setFilterArea("")
    } else if (target === "category") {
      setFilterMerchant("")
    }
  }

  return (
    <div className="header-container">
      <img src={Logo} />
      <div className="search-bar">
        <div
          tabIndex="0"
          onBlur={() => setDropdown("")}
          className="dropdown-container"
          onClick={() => setDropdown("area")}
        >
          {searchArea === "พื้นที่ใกล้ฉัน" ? (
            <LocationPin />
          ) : searchArea === "สถานที่ทั้งหมด" ? (
            <DoubleLocationPin />
          ) : (
            ""
          )}
          <input
            className="dropdown-input"
            placeholder={searchArea}
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
            className={searchArea === "พื้นที่ใกล้ฉัน" ? "selected" : ""}
            onClick={() => selectDropdown("area", "พื้นที่ใกล้ฉัน")}
          >
            <LocationPin /> พื้นที่ใกล้ฉัน
          </li>
          <li
            className={searchArea === "สถานที่ทั้งหมด" ? "selected" : ""}
            onClick={() => selectDropdown("area", "สถานที่ทั้งหมด")}
          >
            <DoubleLocationPin /> สถานที่ทั้งหมด
          </li>
          {showProvinces.sort().map((province, index) => {
            return (
              <li
                className={searchArea === province ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("area", province)}
              >
                {province}
              </li>
            )
          })}
        </ul>
        <input
          onClick={() => setDropdown("category")}
          placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
          value={filterMerchant}
          onChange={e => handleInput(e, "category")}
          onKeyDown={e => search(e)}
          onBlur={() => setDropdown("")}
          tabIndex="0"
        />
        <ul
          className={`dropdown large ${
            activeDropdown === "category" && "active"
          }`}
          onBlur={() => setDropdown("")}
        >
          {shopCategories.map((category, index) => {
            return (
              <li
                className={selectedCategory === category ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("category", category)}
              >
                {category.name === "ร้านค้า OTOP" ? (
                  <ShopCategory />
                ) : (
                  <FoodCategory />
                )}
                {category.name}
              </li>
            )
          })}
        </ul>
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}

export default Header
