import React, { useState, useRef, useEffect } from "react"
import "./dropdown.scss"
import { DoubleLocationPin, DownArrow, FoodCategory, LocationPin, ShopCategory } from "./icons"

const Dropdown = (props) => {
	const {
		list,
		setList,
		selected,
		setSelected,
		setValue,
		enableFilter,
		enableSearch,
		placeholder,
		itemKey,
		children
	} = props
	const [toggle, setToggle] = useState(false)
	const [filter, setFilter] = useState(selected)
	
	useEffect(() => {
		setFilter(selected)
	}, [selected])

	const filterData = (e) => {
    setFilter(e.target.value)
		setList(
      list.filter(value => {
        return value.toLowerCase().includes(filter)
      })
    )
  }

	const toggleDropdown = () => {
		setToggle(!toggle)
		setFilter("")
	}

	const selectDropdown = (value) => {
		setToggle(false)
		setSelected(value)
		setFilter(value)
  }

	const onEnter = (e) => {
		if (e.key === "Enter") {
      setValue(filter)
			toggleDropdown()
    }
	}
	
	return (
		<>
			<div
				className="dropdown-container"
				tabIndex="0"
				onClick={toggleDropdown}
				onBlur={() => setToggle(false)}
			>
				{children}
				{
					enableFilter ? 
						<input
							className="dropdown-input"
							placeholder={selected}
							value={filter}
							onChange={e => filterData(e)}
						/>
					: enableSearch ? 
						<input
							className="dropdown-input"
							placeholder={placeholder}
							onKeyDown={onEnter}
							onChange = {(e) => setFilter(e.target.value)}
						/> : <input
							className="dropdown-input"
							placeholder={placeholder}
							defaultValue={selected}
							readOnly
						/>
				}
				<DownArrow className="down-arrow" />
			</div>
			<ul
				className={`dropdown ${toggle && "active"}`}
				onBlur={() => setToggle(false)}
			>
				{list.map((item, index) => {
					const itemValue = (item.props && item.props.children[1]) || item
					return (
						<li
							className={selected === itemValue ? "selected" : ""}
							key={index}
							onClick={() => selectDropdown(itemValue)}
						>
							{enableSearch && (item[itemKey] === "ร้านค้า OTOP" ? (
									<ShopCategory />
								) : (
									<FoodCategory />
							))}
							{itemKey ? item[itemKey] : item}
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default Dropdown
