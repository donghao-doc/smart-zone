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

const normalizePath = (path: string) =>
  path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path

const buildBreadcrumbNodes = (
  menuList: MenuApiItem[],
  targetPath: string,
) => {
  const menuMap = new Map<string, BreadNode>()
  const parentMap = new Map<string, string>()

  const walk = (items: MenuApiItem[], parentKey?: string) => {
    for (const item of items) {
      const normalizedKey = normalizePath(item.key)
      const hasVisibleChildren =
        item.children?.some((child) => child.menu !== false) ?? false
      menuMap.set(normalizedKey, {
        key: normalizedKey,
        label: item.label,
        isDirectory: hasVisibleChildren,
      })

      if (parentKey) {
        parentMap.set(normalizedKey, parentKey)
      }

      if (item.children && item.children.length > 0) {
        walk(item.children, normalizedKey)
      }
    }
  }

  walk(menuList)

  const nodes: BreadNode[] = []
  let currentKey = normalizePath(targetPath)
  const visited = new Set<string>()

  while (currentKey && !visited.has(currentKey)) {
    const node = menuMap.get(currentKey)
    if (!node) {
      break
    }
    nodes.push(node)
    visited.add(currentKey)
    currentKey = parentMap.get(currentKey) ?? ''
  }

  return nodes.reverse()
}

function PageBreadCrumb() {
  const menuList = useSelector((state: RootState) => state.system.menuList)
  const location = useLocation()
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname

  const breadList = useMemo(() => {
    const nodes = buildBreadcrumbNodes(menuList, currentPath)
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
