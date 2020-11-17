import React, { useState, useEffect } from "react"
import Header from '../components/header'
import CONTENT from '../../public/page-data/data'
import "../styles/global.scss"
import "./index.scss"
import NavigationBar from '../components/navbar'
import Filter from '../components/filter'
import MerchantCard from "../components/merchantCard"

const IndexPage = () => {
  const [data, setData] = useState(CONTENT)
  const [category, setCategory] = useState("ทั้งหมด")
  const [subCategory, setSubCategory] = useState("ทั้งหมด")
  const [area, setArea] = useState("พื้นที่ใกล้ฉัน")
  const [priceLevel, setPriceLevel] = useState(0)
  const [merchants, setMerchants] = useState(data.merchants)

  // const fetchData = async () => {
  //   const response = await fetch("https://panjs.com/ywc18.json")
  //   response.json().then((data) => setData(data))
  // }
  
  // useEffect(() => {
  //   fetchData()
  // }, [])

  const filterMerchant = () => {
    let filteredMerchant = data.merchants
    if (category !== "ทั้งหมด") {
      filteredMerchant = (
        filteredMerchant.filter(merchant => {
          return category.subcategories.includes(merchant.subcategoryName)
        })
      )
    }
    if (subCategory !== "ทั้งหมด") {
      filteredMerchant = (
        filteredMerchant.filter(merchant => {
          return subCategory === merchant.subcategoryName
        })
      )
    }
    if (area !== "สถานที่ทั้งหมด" && area !== "พื้นที่ใกล้ฉัน") {
      filteredMerchant = (
        filteredMerchant.filter(merchant => {
          return area === merchant.addressProvinceName
        })
      )
    }
    if (priceLevel !== 0) {
      console.log(priceLevel)
      filteredMerchant = (
        filteredMerchant.filter(merchant => {
          return priceLevel === merchant.priceLevel
        })
      )
    }
    setMerchants(filteredMerchant)
  }

  useEffect(() => {
    filterMerchant()
  }, [category, subCategory, area, priceLevel])

  useEffect(() => {
    setSubCategory("ทั้งหมด")
  }, [category])

  return (
    <div className="pages">
      <Header area={area} setArea={setArea} provinces={data.provinces} shopCategories={data.categories} setCategory={setCategory} />
      <NavigationBar />
      <div className="result-container">
        <div className="title">ผลการค้นหา {category.name} ทั้งหมด</div>
        <div className="card-filter-container">
          <Filter priceLevel={priceLevel} setPriceLevel={setPriceLevel} area={area} setArea={setArea} currentCategory={category} setSubCategory={setSubCategory} currentSubCategory={subCategory} setCategory={setCategory} shopCategories={data.categories} provinces={data.provinces} priceRange={data.priceRange} />
          <div className="cards-container">
          {
            merchants.map((merchant, index) => {
              return (
                <MerchantCard key={index} merchantData = {merchant} />
              )
            })
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
