import type { CardProps, TabPaneProps, TabsProps } from 'naive-ui'

export interface TabProps extends TabPaneProps {
  slot: string
}

export interface TabsCardProps {
  value: string | number
  tabs: TabProps[]
  cardProps?: CardProps
  tabsProps?: TabsProps
}
