import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { queryMenu } from '../../api';
import icons, { type Icons } from '../../constants/icons';
import logo from '../../assets/logo.png';
import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function MyNav() {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    queryMenu()
      .then(({ data }) => {
        console.log('查询菜单 res', data);
        const menuItems = data.map(item =>
          getItem(
            item.label,
            item.key,
            icons[item.icon as Icons],
            item.children?.map(child => getItem(child.label, child.key, icons[child.icon as Icons]))
          )
        );
        setItems(menuItems);
      })
      .catch(err => {
        console.log('查询菜单 err', err);
        setItems([]);
      });
  }, []);

  return (
    <div className="layout-nav">
      <div className="nav-logo">
        <img className="nav-logo-img" src={logo} alt="logo" />
        <h1 className="nav-logo-text">智慧园区</h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['/dashboard']} mode="inline" items={items} />
    </div>
  );
}

export default MyNav;
