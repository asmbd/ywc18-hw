import React, { useState, useEffect } from "react"
import Dropdown from "./dropdown"
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
    data,
  } = props
  const [showProvinces, setShowProvinces] = useState(data.provinces)
  console.log(area)

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
      </div>
      <div className="filter-section">
        ช่วงราคาสินค้า (บาท)
        <Dropdown 
          list={["ทั้งหมด", ...data.priceRange]}
          selected={priceLevel}
          setSelected={setPriceLevel}
          placeholder={"กรุณาเลือก"}
        />
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
