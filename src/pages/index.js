import React, { useState } from "react"
import Header from '../components/header'
import CONTENT from '../../public/page-data/data'
import "../styles/global.scss"
import "./index.scss"
import NavigationBar from '../components/navbar'

const IndexPage = () => {
  const [data, setData] = useState(CONTENT)
  const [category, setCategory] = useState("ร้านอาหารและเครื่องดื่ม")
  console.log(data)

  // const fetchData = async () => {
  //   const response = await fetch("https://panjs.com/ywc18.json")
  //   response.json().then((data) => setData(data))
  // }
  
  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <>
      <Header provinces={data.provinces} shopCategories={data.categories} setCategory={setCategory} />
      <NavigationBar />
      <div className="result-container">
        <div className="title">ผลการค้นหา {category} ทั้งหมด</div>
      </div>
    </>
  )
}

export default IndexPage
