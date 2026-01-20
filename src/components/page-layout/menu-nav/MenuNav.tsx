import { Menu } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getMenuList } from '../../../api/system'
import logo from '../../../assets/logo.png'
import type { AppDispatch, RootState } from '../../../store'
import { setMenuList } from '../../../store/systemSlice'

import './menu-nav.scss'

function MenuNav() {
  const dispatch = useDispatch<AppDispatch>()
  const menuList = useSelector((state: RootState) => state.system.menuList)
  const token = useSelector((state: RootState) => state.user.token)

  function handleMenuClick() {}

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const res = await getMenuList(token)
        console.log('获取菜单列表 res:', res)
        dispatch(setMenuList(res.data))
      } catch (error) {
        console.log('menu list fetch error:', error)
      }
    }

    fetchMenuList()
  }, [dispatch, token])
  
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
