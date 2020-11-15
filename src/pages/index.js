import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Header from '../components/header'
import CONTENT from '../../public/page-data/data'

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
      <Header provinces={data.provinces} />
    </>
  )
}

export default IndexPage
