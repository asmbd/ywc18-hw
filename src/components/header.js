import React, { useState, useRef, useEffect } from "react"
import "./header.scss"
import Logo from "../images/halfhalf-logo.png"
import { DoubleLocationPin, DownArrow, LocationPin, SearchIcon } from "./icons"

const Header = props => {
  const { provinces } = props
  const ref = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState("")
  const [searchArea, setSearchArea] = useState("พื้นที่ใกล้ฉัน")
  const [showProvinces, setShowProvinces] = useState(provinces)
  const [filterArea, setFilterArea] = useState("")
  const [category, setCategory] = useState("")

  console.log(searchArea)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActiveDropdown("");
      setFilterArea(searchArea);
    }
  };

  useEffect(() => {
    if (activeDropdown !== "") {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  });

  const selectArea = target => {
    setSearchArea(target)
    setFilterArea("")
    setActiveDropdown("")
  }

  const filterData = () => {
    setShowProvinces(provinces.filter((value) => {
      return value.toLowerCase().includes(filterArea)
    }))
  }

  const handleInput = (e) => {
    e.preventDefault()
    setFilterArea(e.target.value)
  }

  useEffect(() => {
    filterData()
  }, [filterArea])

  const setDropdown = target => {
    setActiveDropdown(target)
    setFilterArea("")
  }

  return (
    <div className="header">
      <img src={Logo} />
      <div className="search-bar">
        <div className="dropdown-container" onClick={() => setDropdown("select-area")}>
          <input
            className="dropdown-input"
            placeholder={searchArea}
            value={filterArea}
            onChange={(e) => handleInput(e)}
          />
          <DownArrow />
        </div>
        <ul
          ref={ref} className={`dropdown ${activeDropdown === "select-area" && "active"}`}
        >
          <li
            className={category === "พื้นที่ใกล้ฉัน" ? "selected" : ""}
            onClick={() => selectArea("พื้นที่ใกล้ฉัน")}
          >
            <LocationPin /> พื้นที่ใกล้ฉัน
          </li>
          <li
            className={searchArea === "สถานที่ทั้งหมด" ? "selected" : ""}
            onClick={() => selectArea("สถานที่ทั้งหมด")}
          >
            <DoubleLocationPin /> สถานที่ทั้งหมด
          </li>
          {showProvinces.sort().map((province, index) => {
            return (
              <li
                className={searchArea === province ? "selected" : ""}
                key={index}
                onClick={() => selectArea(province)}
              >
                {province}
              </li>
            )
          })}
        </ul>
        <input placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป" />
        <ul
          ref={ref} className={`dropdown ${activeDropdown === "select-category" && "active"}`}
        >
          <li
            className={searchArea === "พื้นที่ใกล้ฉัน" ? "selected" : ""}
            onClick={() => selectArea("พื้นที่ใกล้ฉัน")}
          >
            <LocationPin /> พื้นที่ใกล้ฉัน
          </li>
          <li
            className={searchArea === "สถานที่ทั้งหมด" ? "selected" : ""}
            onClick={() => selectArea("สถานที่ทั้งหมด")}
          >
            <DoubleLocationPin /> สถานที่ทั้งหมด
          </li>
          {showProvinces.sort().map((province, index) => {
            return (
              <li
                className={searchArea === province ? "selected" : ""}
                key={index}
                onClick={() => selectArea(province)}
              >
                {province}
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
