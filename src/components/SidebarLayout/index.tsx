import * as React from 'react'
import { useState, useEffect } from 'react'
import 'decentraland-ui/dist/themes/alternative/light-theme.css'
import { Footer } from 'decentraland-ui/dist/components/Footer/Footer'
import { Page } from 'decentraland-ui/dist/components/Page/Page'
import { Section } from 'decentraland-ui/dist/components/Section/Section'
import { Navbar } from 'decentraland-ui/dist/components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar'
import ResponsiveSidebar from '../../components/ResponsiveSidebar'
import categories from '../../mocks/categories.json'
import './style.scss'
import { Tabs } from 'decentraland-ui/dist/components/Tabs/Tabs'

export type Props = {
  children?: JSX.Element[] | JSX.Element // verify type
}

export default function SidebarLayout({ children }: Props) {
  const [sidebarCategory, setSidebarCategory] = useState<string>('')
  const [sidebarCategoryProps, setSidebarCategoryProps] = useState<any>(null)

  useEffect(() => {
    let path = location.pathname

    if (process.env.GATSBY_PUBLIC_URL !== '/') {
      const originUrl = new URL(process.env.GATSBY_PUBLIC_URL)
      path = path.replace(originUrl.pathname, '')
    }

    const value = path.split('/')[1]

    const categoryProps = categories.data.find((item) => {
      return item.url.toLowerCase() === '/' + value
    })

    const category = categoryProps ? value : 'player'

    setSidebarCategory(category)
    setSidebarCategoryProps(categoryProps)
  }, [sidebarCategory])

  return (
    <>
      <Navbar isFullscreen activePage="docs" />
      <Page className="container-full-height">
        <Tabs>
          {categories.data.map((item) => {
            return (
              <Tabs.Tab active={ '/' + sidebarCategory === item.url}>
                <a href={item.url}>{item.title}</a>
              </Tabs.Tab>
            )
          })}
        </Tabs>
        <Section className="flex section-no-margin container-full-height">
          {sidebarCategory && (
            <Sidebar category={sidebarCategory} properties={sidebarCategoryProps ?? categories.data[0]} />
          )}
          {sidebarCategory && (
            <ResponsiveSidebar category={sidebarCategory} properties={sidebarCategoryProps ?? categories.data[0]} />
          )}
          {children}
        </Section>
      </Page>
      <Footer isFullWidth />
    </>
  )
}
