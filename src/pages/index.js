import React, { useState, useEffect } from "react"
import Header from "../components/header"
import CONTENT from "../../public/page-data/data"
import "../styles/global.scss"
import "./index.scss"
import NavigationBar from "../components/navbar"
import Filter from "../components/filter"
import MerchantCard from "../components/merchantCard"
import Sidebar from '../components/sidebar'

const IndexPage = () => {
  const [data, setData] = useState(CONTENT)
  const [category, setCategory] = useState("ทั้งหมด")
  const [subCategory, setSubCategory] = useState("ทั้งหมด")
  const [area, setArea] = useState("พื้นที่ใกล้ฉัน")
  const [priceLevel, setPriceLevel] = useState("")
  const [merchants, setMerchants] = useState(data.merchants)
  const [filterName, setFilterMerchantName] = useState("")
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  console.log(area)

  // const fetchData = async () => {
  //   const response = await fetch("https://panjs.com/ywc18.json")
  //   response.json().then((data) => setData(data))
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const filterMerchant = () => {
    let filteredMerchant = data.merchants
    if (filterName !== "") {
      filteredMerchant = filteredMerchant.filter(merchant => {
        return merchant.shopNameTH.toLowerCase().includes(filterName.toLowerCase())
      })
    }
    if (category !== "ทั้งหมด") {
      filteredMerchant = filteredMerchant.filter(merchant => {
        return category.subcategories.includes(merchant.subcategoryName)
      })
    }
    if (subCategory !== "ทั้งหมด") {
      filteredMerchant = filteredMerchant.filter(merchant => {
        return subCategory === merchant.subcategoryName
      })
    }
    if (area !== "สถานที่ทั้งหมด" && area !== "พื้นที่ใกล้ฉัน") {
      filteredMerchant = filteredMerchant.filter(merchant => {
        return area === merchant.addressProvinceName
      })
    }
    if (priceLevel !== 0) {
      filteredMerchant = filteredMerchant.filter(merchant => {
        return priceLevel === merchant.priceLevel
      })
    }

    setMerchants(filteredMerchant)
  }

  useEffect(() => {
    filterMerchant()
  }, [category, subCategory, area, priceLevel, filterName])

  useEffect(() => {
    setSubCategory("ทั้งหมด")
  }, [category])

  return (
    <div className="pages">
      <Sidebar
        isOpen={isOpenSidebar}
        setIsOpen={setIsOpenSidebar}
        priceLevel={priceLevel}
        setPriceLevel={setPriceLevel}
        area={area}
        setArea={setArea}
        category={category}
        setSubCategory={setSubCategory}
        subCategory={subCategory}
        setCategory={setCategory}
        data={data}
      />
      <Header
        data={data}
        area={area}
        setArea={setArea}
        currentCategory={category}
        setCategory={setCategory}
        setFilterMerchantName={setFilterMerchantName}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <NavigationBar />
      <div className="result-container">
        <div className="title">
          ผลการค้นหา {category.name}{" "}
          {priceLevel !== 0 &&
            category !== "ทั้งหมด" &&
            `, ราคา ${data.priceRange[priceLevel - 1]}`}{" "}
          ทั้งหมด
        </div>
        <div className="card-filter-container">
          <div className="filters-container">
            <Filter
              priceLevel={priceLevel}
              setPriceLevel={setPriceLevel}
              area={area}
              setArea={setArea}
              currentCategory={category}
              setSubCategory={setSubCategory}
              currentSubCategory={subCategory}
              setCategory={setCategory}
              data={data}
            />
          </div>
          <div className="cards-container">
            {merchants.length > 0 ? (
              merchants.map((merchant, index) => {
                return <MerchantCard key={index} merchantData={merchant} />
              })
            ) : (
              <div className="not-found">
                <h2>ไม่พบสถานที่ที่คุณกำลังหา</h2>
                ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
