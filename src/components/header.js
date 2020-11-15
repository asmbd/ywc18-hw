import PropTypes from "prop-types"
import React from "react"
import "./header.scss"

const Header = (props) => (
  <header>
    <div className="search-bar">
      พื้นที่ใกล้เคียง
      <ul>
        <li>
          กรุงเทพ
        </li>
        <li>
          เชียงใหม่
        </li>
      </ul>
      <input
        placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
       />
      <div>
      
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
