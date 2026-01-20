import { Menu } from 'antd'
import { useState } from 'react'

import logo from '../../../assets/logo.png'

import './menu-nav.scss'

function MenuNav() {
  const [menuList, setMenuList] = useState([])

  function handleMenuClick() {}
  
  return (
    <div className='menu-nav'>
      <div className='logo'>
        <img src={logo} alt="" width={18}/>
        <h1>朋远智慧园区</h1>
      </div>

      <Menu
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        theme="dark"
        items={menuList}
        onClick={handleMenuClick}
        selectedKeys={[location.pathname]}
      />
    </div>
  )
}

export default MenuNav