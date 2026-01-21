import { Breadcrumb } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import type { MenuApiItem } from '../../../api/system'
import type { RootState } from '../../../store'

type BreadNode = {
  key: string
  label: string
  isDirectory: boolean
}

const findBreadcrumbNodes = (
  menuList: MenuApiItem[],
  targetPath: string,
) => {
  const walk = (items: MenuApiItem[], parents: BreadNode[]): BreadNode[] => {
    for (const item of items) {
      const nextParents = [
        ...parents,
        {
          key: item.key,
          label: item.label,
          isDirectory: Boolean(item.children && item.children.length > 0),
        },
      ]
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
    const nodes = findBreadcrumbNodes(menuList, currentPath)
    return nodes.map((node, index) => {
      const isLast = index === nodes.length - 1
      const canLink = !isLast && !node.isDirectory
      return {
        title: canLink ? <Link to={node.key}>{node.label}</Link> : node.label,
      }
    })
  }, [currentPath, menuList])

  return <Breadcrumb items={breadList} className="mt mb" />
}

export default PageBreadCrumb
