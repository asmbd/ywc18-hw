import React, { useState, useRef, useEffect } from "react"
import "./header.scss"
import Logo from "../images/halfhalf-logo.png"
import { DoubleLocationPin, DownArrow, LocationPin, SearchIcon } from "./icons"

const Header = props => {
  const { provinces, shopCategories, setCategory } = props
  const categoryPlaceholder =
    "ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
  const [activeDropdown, setActiveDropdown] = useState("")
  const [searchArea, setSearchArea] = useState("พื้นที่ใกล้ฉัน")
  const [showProvinces, setShowProvinces] = useState(provinces)
  const [showCategories, setShowCategories] = useState(shopCategories)
  const [filterArea, setFilterArea] = useState("พื้นที่ใกล้ฉัน")
  const [selectedCategory, setSelectedCategory] = useState(categoryPlaceholder)
  const [filterCategory, setFilterCategory] = useState("")

  const selectDropdown = (target, value) => {
    console.log(value)
    if (target === "area") {
      setSearchArea(value)
      setFilterArea(value)
    } else if (target === "category") {
      setSelectedCategory(value)
      setCategory(value)
      setFilterCategory(value)
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
      setShowCategories(
        shopCategories.filter(value => {
          return value.name.toLowerCase().includes(filterCategory.toLowerCase())
        })
      )
    }
  }

  const handleInput = (e, target) => {
    e.preventDefault()
    if (target === "area") {
      setFilterArea(e.target.value)
    } else if (target === "category") {
      setFilterCategory(e.target.value)
    }
  }

  useEffect(() => {
    filterData("area")
  }, [filterArea])

  useEffect(() => {
    filterData("category")
  }, [filterCategory])

  const setDropdown = target => {
    setActiveDropdown(target)
    if (target === activeDropdown) {
      setActiveDropdown("")
    }
    else if (target === "area") {
      setFilterArea("")
    } else if (target === "category") {
      setFilterCategory("")
    }
  }

  return (
    <div className="header">
      <img src={Logo} />
      <div className="search-bar">
        <div className="dropdown-container" onClick={() => setDropdown("area")}>
          {searchArea === "พื้นที่ใกล้ฉัน" ? (
            <LocationPin />
          ) : searchArea === "สถานที่ทั้งหมด" ? (
            <DoubleLocationPin />) : ""
          }
          <input
            onBlur={() => setDropdown("")}
            className="dropdown-input"
            placeholder={searchArea}
            value={filterArea}
            onChange={e => handleInput(e, "area")}
          />
          <DownArrow className="down-arrow" />
        </div>
        <ul
          className={`dropdown ${activeDropdown === "area" && "active"}`}
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
          placeholder={selectedCategory}
          value={filterCategory}
          onChange={e => handleInput(e, "category")}
          onBlur={() => setDropdown("")}
        />
        <ul
          className={`dropdown large ${
            activeDropdown === "category" && "active"
          }`}
        >
          {showCategories.map((category, index) => {
            return (
              <li
                className={selectedCategory === category.name ? "selected" : ""}
                key={index}
                onClick={() => selectDropdown("category", category.name)}
              >
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
