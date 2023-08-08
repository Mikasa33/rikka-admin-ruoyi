import { isUndefined } from 'lodash-es'
import { components, layoutComponents, nestComponents, selectComponent } from './components'
import type { ComponentType, FormComponentType, LayoutComponentType, NestComponentType, visibleType } from './types'

export function isLayoutComponent(component: ComponentType | undefined) {
  if (!component)
    return false
  return layoutComponents.has(component as LayoutComponentType)
}

export function isNestComponentType(component: ComponentType | undefined) {
  if (!component)
    return false
  return nestComponents.has(component as NestComponentType)
}

export function isSelectComponent(component: ComponentType | undefined) {
  if (!component)
    return false
  return selectComponent.has(component as FormComponentType)
}

export function getComponent(component: ComponentType | undefined) {
  if (!component)
    return
  return components.get(component)
}

export function isVisible(visible: visibleType | undefined) {
  return isUndefined(visible) || visible === 'visible'
}
