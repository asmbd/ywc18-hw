import React, { useState, useEffect } from "react"
import Header from "../components/header"
import "../styles/global.scss"
import "./index.scss"
import NavigationBar from "../components/navbar"
import Filter from "../components/filter"
import MerchantCard from "../components/merchantCard"
import Sidebar from '../components/sidebar'
import axios from 'axios';

const IndexPage = () => {
  const [data, setData] = useState({
    categories: [],
    provinces: [],
    priceRange: [],
  })
  const [category, setCategory] = useState("ทั้งหมด")
  const [subCategory, setSubCategory] = useState("ทั้งหมด")
  const [area, setArea] = useState("พื้นที่ใกล้ฉัน")
  const [priceLevel, setPriceLevel] = useState("")
  const [merchants, setMerchants] = useState(data.merchants)
  const [filterName, setFilterMerchantName] = useState("")
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [pagination, setPagination] = useState(10)

  useEffect(() => {
    setMerchants(data.merchants)
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://panjs.com/ywc18.json',
      );
      setData(result.data)
    }

    fetchData()
  }, [])

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
    if (priceLevel !== "" && priceLevel !== "ทั้งหมด") {
      const level = data.priceRange.indexOf(priceLevel)
      filteredMerchant = filteredMerchant.filter(merchant => {
        return level + 1 === merchant.priceLevel
      })
    }

    setMerchants(filteredMerchant)
  }

  useEffect(() => {
    filterMerchant()
  }, [category, subCategory, area, priceLevel, filterName])

  const searchResult = () => {
    let resultList = [category.name]
    if (priceLevel !== "ทั้งหมด" && priceLevel !== "") {
      resultList.push(priceLevel)
    }
    if (filterName !== "") {
      resultList.push(filterName)
    }
    return resultList
  }

  return (
    <>
      <Sidebar
        isOpen={isOpenSidebar}
        setIsOpen={setIsOpenSidebar}
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
          ผลการค้นหา{" "}{searchResult().join(" , ")}{" "}ทั้งหมด
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
          {
            merchants &&
            <div className="cards-container">
              {merchants.length > 0 ? (
                merchants.slice(0, pagination).map((merchant, index) => {
                  return <MerchantCard key={index} merchantData={merchant} />
                })
              ) : (
                <div className="not-found">
                  <h2>ไม่พบสถานที่ที่คุณกำลังหา</h2>
                  ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง
                </div>
              )
              }
            {
              merchants && merchants.length - pagination > 1 &&
              <button onClick={() => setPagination(pagination + 10)} className="more-button">ดูเพิ่มเติม</button>
            }
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default IndexPage
