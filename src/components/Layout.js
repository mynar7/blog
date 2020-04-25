import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import './layout.css'
import { rhythm, scale } from '../utils/typography'

const Layout = (props) => {
  const [readingMode, setReadingMode] = useState('LIGHT');
  const aTagTransitionStyle = useRef()      
  
  function toggleReadingMode() {
    const body = document.querySelector('body')
    const wrapper = document.querySelector('.wrapper')
    const aTags = document.querySelectorAll('a')
    
    if (!aTagTransitionStyle.current)
      aTagTransitionStyle.current = getComputedStyle(
          document.querySelector('a')
        ).getPropertyValue('transition')

    if (readingMode === 'LIGHT') {
      aTags.forEach(a => a.style.transition = 'none')

			body.style.color = getComputedStyle(document.documentElement)
				.getPropertyValue('--dark-white')
			body.style.backgroundColor = getComputedStyle(document.documentElement)
				.getPropertyValue('--dark-primary')
			wrapper.style.backgroundColor = getComputedStyle(document.documentElement)
				.getPropertyValue('--dark-primary')

      body.classList.remove('banners')
      document.documentElement.style.setProperty('--primaryFaded', 'rgba(73, 109, 177, 0.35)')  
      
			setReadingMode('DARK')
      localStorage.setItem('readingMode', 'DARK')
    } else {
      aTags.forEach(a => a.style.transition = 'none')

			body.style.color = getComputedStyle(document.documentElement)
				.getPropertyValue('--gray')
			body.style.backgroundColor = getComputedStyle(document.documentElement)
				.getPropertyValue('--white')
			wrapper.style.backgroundColor = getComputedStyle(document.documentElement)
				.getPropertyValue('--white')

      body.classList.add('banners')
      document.documentElement.style.setProperty('--primaryFaded', 'rgba(73, 109, 177, 0.2)')  

			setReadingMode('LIGHT')
      localStorage.setItem('readingMode', 'LIGHT')
		}
    setTimeout(() => aTags.forEach(a => a.style.transition = aTagTransitionStyle.current), 250)
	}

  useEffect(() => {
    const mode = localStorage.getItem('readingMode')
    if (mode === 'LIGHT' && readingMode === 'DARK') toggleReadingMode()
    else if (mode === 'DARK' && readingMode === 'LIGHT') toggleReadingMode()
    else document.querySelector('body').classList.add('banners')
  }, [])

	const { location, title, children } = props
	const rootPath = `${__PATH_PREFIX__}/`
	let header
  const readingModeIconStyle = {color: 'var(--white)', cursor: 'pointer'}
	if (location.pathname === rootPath) {
		header = (
      <>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <span style={{...readingModeIconStyle, ...{marginTop: '20px'}}}
          onClick={toggleReadingMode}>
          {readingMode === 'LIGHT' ? '🌙' : '💡'}
        </span>
      </>
		)
	} else {
		header = (
      <>
        <h3
          style={{
            // fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
        <span style={readingModeIconStyle}
          onClick={toggleReadingMode}>
          {readingMode === 'LIGHT' ? '🌙' : '💡'}
        </span>
      </>
		)
	}
	return (
		<div className="wrapper">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        {header}
      </div>
			{children}
			<footer style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
				<span style={{marginBottom: '10px'}}>
				© {new Date().getFullYear()}, Built with
				&nbsp;
				<a href="https://www.gatsbyjs.org">Gatsby</a>,
				&nbsp;
				<a href="https://www.youtube.com/watch?v=HEXWRTEbj1I">Love</a>,
				and <a href="https://cameronsworld.net">Inter-webs</a>.
				&nbsp;
				...<a href="https://teespring.com/stores/tech-jr-store">Buy somethin', will ya?</a>
				</span>
				{location.pathname !== rootPath &&
					<span>
						<Link to="/">Home</Link>
					</span>
				}
			</footer>
		</div>
	)
}

export default Layout
