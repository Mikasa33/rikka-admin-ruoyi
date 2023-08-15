import { isUndefined } from 'lodash-es'
import { components, layoutComponents, nestComponents, selectComponent } from './components'
import type { IComponentType, IFormComponentType, ILayoutComponentType, INestComponentType, IVisibleType } from './types'

export function isLayoutComponent(component: IComponentType | undefined) {
  if (!component)
    return false
  return layoutComponents.has(component as ILayoutComponentType)
}

export function isNestComponentType(component: IComponentType | undefined) {
  if (!component)
    return false
  return nestComponents.has(component as INestComponentType)
}

export function isSelectComponent(component: IComponentType | undefined) {
  if (!component)
    return false
  return selectComponent.has(component as IFormComponentType)
}

export function getComponent(component: IComponentType | undefined) {
  if (!component)
    return
  return components.get(component)
}

export function isVisible(visible: IVisibleType | undefined) {
  return isUndefined(visible) || visible === 'visible'
}
