import type { RouteObject } from 'react-router-dom'

import type { MenuApiItem } from '../api/system'
import { componentMap } from './router-map'

export type PatchableRouter = {
  patchRoutes: (routeId: string | null, children: RouteObject[]) => void
}

const registeredPaths = new Set<string>()

const normalizePath = (path: string) => {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

const toChildPath = (path: string) =>
  normalizePath(path).replace(/^\/+/, '')

export const createMenuRoutes = (
  menuList: MenuApiItem[],
  seen: Set<string> = registeredPaths,
) => {
  const routes: RouteObject[] = []

  // 递归遍历菜单，生成对应路由配置
  const walk = (items: MenuApiItem[]) => {
    for (const item of items) {
      const normalizedPath = normalizePath(item.key)
      const element = componentMap[normalizedPath]

      if (element && !seen.has(normalizedPath)) {
        seen.add(normalizedPath)
        routes.push({
          path: toChildPath(normalizedPath),
          element,
        })
      }

      if (item.children && item.children.length > 0) {
        walk(item.children)
      }
    }
  }

  walk(menuList)
  return routes
}

export const addMenuRoutes = (
  router: PatchableRouter,
  menuList: MenuApiItem[],
  parentRouteId: string | null,
) => {
  // 将菜单路由补充到指定父路由下
  const routes = createMenuRoutes(menuList)
  if (routes.length === 0) return
  router.patchRoutes(parentRouteId, routes)
}
