import React from "react"
import "./navbar.scss"

const NavigationBar = () => {
	return (
		<div className="navbar-container">
			<div className="breadcrumb-container">
				<button>หน้าแรก</button>
				<span>/</span>
				<button className="selected">ค้นหา</button>
			</div>
		</div>
	)
}

export default NavigationBar