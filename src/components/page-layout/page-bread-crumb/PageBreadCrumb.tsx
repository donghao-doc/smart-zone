import { Breadcrumb } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import type { MenuApiItem } from '../../../api/system'
import type { RootState } from '../../../store'

const findBreadcrumbLabels = (
  menuList: MenuApiItem[],
  targetPath: string,
) => {
  const walk = (items: MenuApiItem[], parents: string[]): string[] => {
    for (const item of items) {
      const nextParents = [...parents, item.label]
      if (item.key === targetPath) {
        return nextParents
      }

      if (item.children && item.children.length > 0) {
        const result = walk(item.children, nextParents)
        if (result.length > 0) return result
      }
    }

    return []
  }

  return walk(menuList, [])
}

function PageBreadCrumb() {
  const menuList = useSelector((state: RootState) => state.system.menuList)
  const location = useLocation()
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname

  const breadList = useMemo(() => {
    const labels = findBreadcrumbLabels(menuList, currentPath)
    return labels.map((label) => ({ title: label }))
  }, [currentPath, menuList])

  return <Breadcrumb items={breadList} className="mt mb" />
}

export default PageBreadCrumb
