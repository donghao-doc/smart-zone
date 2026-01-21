import { Menu } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { getMenuList, type MenuApiItem, type MenuItem } from '../../../api/system'
import logo from '../../../assets/logo.png'
import { addMenuRoutes } from '../../../router'
import type { AppDispatch, RootState } from '../../../store'
import { setMenuList } from '../../../store/systemSlice'
import iconMap from './IconMap'

import './menu-nav.scss'

function MenuNav() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const menuList = useSelector((state: RootState) => state.system.menuList)
  const token = useSelector((state: RootState) => state.user.token)

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

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const res = await getMenuList(token)
        console.log('获取菜单列表 res:', res)
        dispatch(setMenuList(res.data))
        // 菜单到达后，动态补充路由
        addMenuRoutes(res.data)
      } catch (error) {
        console.log('menu list fetch error:', error)
      }
    }

    fetchMenuList()
  }, [dispatch, token])

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
