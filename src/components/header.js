import React, { useState, useRef, useEffect } from "react"
import "./header.scss"
import Logo from "../images/halfhalf-logo.png"
import MiniLogo from "../images/halfhalf-logo-mini.png"
import FilterIcon from "../images/filter.png"
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
    setFilterMerchantName,
    data,
    setCategory,
    area,
    setArea,
    setIsOpenSidebar,
    currentCategory
  } = props
  const [activeDropdown, setActiveDropdown] = useState("")
  const [showProvinces, setShowProvinces] = useState(data.provinces)
  const [filterArea, setFilterArea] = useState(area)
  const [filterMerchant, setFilterMerchant] = useState("")

  useEffect(() => {
    setFilterArea(area)
  }, [area])

  const selectDropdown = (target, value) => {
    if (target === "area") {
      setFilterArea(value)
      setArea(value)
    } else if (target === "category") {
      setCategory(value)
    }
    setActiveDropdown("")
  }

  const filterData = () => {
    setShowProvinces(
      data.provinces.filter(value => {
        return value.toLowerCase().includes(filterArea)
      })
    )
  }

  const handleInput = (e, target) => {
    e.preventDefault()
    if (target === "area") {
      setFilterArea(e.target.value)
      filterData()
    } else if (target === "category") {
      setFilterMerchant(e.target.value)
    }
  }

  const search = e => {
    if (e.key === "Enter") {
      setFilterMerchantName(filterMerchant)
      setDropdown("")
    }
  }

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
    <>
      <div className="header-container">
        <img className="logo big" src={Logo} />
        <img className="logo mini" src={MiniLogo} />
        <div className="search-bar">
          <div
            tabIndex="0"
            onBlur={() => setDropdown("")}
            className="dropdown-container"
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
              onChange={e => handleInput(e, "area")}
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
            {data.categories.map((category, index) => {
              return (
                <li
                  className={currentCategory === category ? "selected" : ""}
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
        <button onClick={() => setIsOpenSidebar(true)} className="filter">
          <img src={FilterIcon} />
        </button>
      </div>
    </>
  )
}

export default Header
