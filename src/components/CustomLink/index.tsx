import React from 'react'
import './style.scss'

function removeAppend(url, location) {
  let newHref = url

  const assetPrefix = process.env.GATSBY_ASSET_PREFIX
  console.log(assetPrefix, 'prefix')
  if (url.startsWith(assetPrefix)) {
    console.log('entra')
    newHref = url.slice(assetPrefix.length)
  }

  console.log(assetPrefix, 'el prefix')
  console.log(url, 'old ref')
  console.log(newHref, 'new ref')

  // sanitize url for anchors if someone enters an ending slash

  const { origin, pathname } = location
  if (url.startsWith('#')) {
    if (pathname.endsWith('/')) {
      newHref = `${origin}${pathname.slice(0, -1)}${url}`
    }
  }

  return newHref
}

export default function CustomLink(props: any) {
  const { href, children, id, location } = props

  // this is a temporal workaround, see https://github.com/gatsbyjs/gatsby/issues/21462

  return (
    // Conditional rendering to account for anchors with no href
    <>
      {href ? (
        <a className="blog-link" href={removeAppend(href, location)} id={id && id} target="_blank">
          {children}
        </a>
      ) : (
        id && (
          <a className="blog-link" id={id}>
            {children}
          </a>
        )
      )}
    </>
  )
}
