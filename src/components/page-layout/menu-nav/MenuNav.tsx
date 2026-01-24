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

  const getParentKeys = (
    items: MenuApiItem[],
    targetKey: string,
    parents: string[] = [],
  ): string[] | null => {
    for (const item of items) {
      if (item.key === targetKey) {
        return parents
      }

      if (item.children && item.children.length > 0) {
        const match = getParentKeys(item.children, targetKey, [
          ...parents,
          item.key,
        ])
        if (match) {
          return match
        }
      }
    }

    return null
  }

  const menuItems = mapMenuItems(menuList)
  const selectedKey = location.pathname === '/' ? '/dashboard' : location.pathname
  const defaultOpenKeys = getParentKeys(menuList, selectedKey) ?? []
  const menuKey = `${selectedKey}-${menuList.length}`
  
  return (
    <div className='menu-nav'>
      <div className='logo'>
        <img src={logo} alt="" width={18}/>
        <h1>朋远智慧园区</h1>
      </div>

      <Menu
        key={menuKey}
        mode="inline"
        theme="dark"
        items={menuItems}
        onClick={handleMenuClick}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}

export default MenuNav
