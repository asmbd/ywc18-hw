import React from "react"
import parse from 'html-react-parser';
import "./merchantCard.scss"
import Parking from "../images/ที่จอดรถ.png"
import Alcohol from  "../images/จำหน่ายเครื่องดื่มแอลกอฮอล์.png"
import LiveMusic from "../images/ดนตรีสด.png"
import Delivery from "../images/บริการจัดส่งอาหาร.png"
import Reservation from "../images/รับจองล่วงหน้า.png"
import CreditCard from "../images/รับบัตรเครดิต.png"
import Pet from "../images/สามารถนำสัตว์เลี้ยงเข้าได้.png"

const FacilitiesIcon = {
  ที่จอดรถ: Parking,
  จำหน่ายเครื่องดื่มแอลกอฮอล์: Alcohol,
  ดนตรีสด: LiveMusic,
  บริการจัดส่งอาหาร: Delivery,
  รับจองล่วงหน้า: Reservation,
  รับบัตรเครดิต: CreditCard,
  สามารถนำสัตว์เลี้ยงเข้าได้: Pet
}

const MerchantCard = props => {
  const { merchantData } = props

  const priceLevel = () => {
    let priceFormat = []
    for (let level = 0; level < merchantData.priceLevel; level++) {
      priceFormat.push(<span key={level} className="active">฿</span>)
    }
    if (merchantData.priceLevel < 4) {
      for (let level = 4; level > merchantData.priceLevel; level--) {
        priceFormat.push(<span key={level}>฿</span>)
      }
    }
    return priceFormat
  }

  return (
    <div className="card-container">
      <div className="image-container" style={{backgroundImage: `url(${merchantData.coverImageId})`}} />
      <div className="card-details-container">
        <div className="header">
          <div className="title-container">
            <div className="title">{merchantData.shopNameTH}</div>
            {merchantData.isOpen !== "N/A" && (
              <div
                className={`status ${merchantData.isOpen === "Y" && "open"}`}
              >
                {merchantData.isOpen === "Y" ? "เปิดอยู่" : "ปิดแล้ว"}
              </div>
            )}
          </div>
          <span>
            {merchantData.subcategoryName} <span className="line">|</span> {priceLevel()} <span className="line">|</span>
            {merchantData.addressDistrictName}{" "}
            {merchantData.addressProvinceName}
          </span>
        </div>
        <div className="highlight-text">{parse(merchantData.highlightText)}</div>
        {merchantData.recommendedItems && (
          <span className="active"><b>{
						merchantData.categoryName === "ร้านอาหาร" ? "เมนูแนะนำ: " : "สินค้าแนะนำ: "
					}</b>{merchantData.recommendedItems.join(", ")}</span>
        )}
        <div className="facilities-container">
          {merchantData.facilities.map((facility, index) => {
            return (
              <div className="facility-icon" key={index}><img src={FacilitiesIcon[facility]} /></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MerchantCard
