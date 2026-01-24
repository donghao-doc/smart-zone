import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import type { MenuApiItem, MenuItem } from '../../../api/system'
import logo from '../../../assets/logo.png'
import type { RootState } from '../../../store'
import iconMap from './IconMap'

import './menu-nav.scss'

function MenuNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const menuList = useSelector((state: RootState) => state.system.menuList)

  function handleMenuClick({ key }: { key: string }) {
    navigate(key)
  }

  const mapMenuItems = (items: MenuApiItem[]): MenuItem[] =>
    items.map((item) => {
      const baseItem: MenuItem = {
        key: item.key,
        label: item.label,
        icon: typeof item.icon === 'string' ? iconMap[item.icon] : undefined,
      }

      if (item.children && item.children.length > 0) {
        return {
          ...baseItem,
          children: mapMenuItems(item.children),
        } as MenuItem
      }

      return baseItem
    })

  const menuItems = mapMenuItems(menuList)
  const selectedKey = location.pathname === '/' ? '/dashboard' : location.pathname
  
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
        items={menuItems}
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}

export default MenuNav
