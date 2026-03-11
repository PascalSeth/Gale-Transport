import React from 'react'
import Hero from './components/Hero'
import AboutUs from './components/About'
import ContactUs from './components/ContactUs'
import WhatWeDo from './components/WhatWeDo'

function Page() {
  return (
    <div>
      <Hero/>
      <WhatWeDo/>
      <AboutUs/>
      <ContactUs/>
    </div>
  )
}

export default Page
