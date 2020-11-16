import React, { useState } from "react"
import Header from '../components/header'
import CONTENT from '../../public/page-data/data'
import "../styles/global.scss"
import NavigationBar from '../components/navbar'

const IndexPage = () => {
  const [data, setData] = useState(CONTENT)
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
      <Header provinces={data.provinces} shopCategories={data.categories} />
      <NavigationBar />
    </>
  )
}

export default IndexPage
