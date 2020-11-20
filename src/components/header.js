import React, { useState, useRef, useEffect } from "react"
import "./header.scss"
import Logo from "../images/halfhalf-logo.png"
import MiniLogo from "../images/halfhalf-logo-mini.png"
import FilterIcon from "../images/filter.png"
import Dropdown from './dropdown'
import {
  DoubleLocationPin,
  LocationPin,
  SearchIcon,
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
  const [showProvinces, setShowProvinces] = useState(data.provinces)

  return (
    <>
      <div className="header-container">
        <img className="logo big" src={Logo} />
        <img className="logo mini" src={MiniLogo} />
        <div className="search-bar">
          <Dropdown
            enableFilter
            list={[
              <>
                <LocationPin />
                พื้นที่ใกล้ฉัน
              </>,
              <>
                <DoubleLocationPin />
                สถานที่ทั้งหมด
              </>,
              ...showProvinces.sort(),
            ]}
            setList={setShowProvinces}
            selected={area}
            setSelected={setArea}
          >
            {area === "พื้นที่ใกล้ฉัน" ? (
              <LocationPin />
            ) : area === "สถานที่ทั้งหมด" ? (
              <DoubleLocationPin />
            ) : (
              ""
            )}
        </Dropdown>
        <Dropdown
          enableSearch
          placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
          setValue={setFilterMerchantName}
          list={data.categories}
          selected={currentCategory}
          setSelected={setCategory}
          itemKey="name"
        />
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
