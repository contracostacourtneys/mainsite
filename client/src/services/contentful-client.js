// import createClient directly from Contentful
import {createClient} from 'contentful'

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'x8bmio1z72gj',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: '43bd55625a6f64960d215a703e1def27bcbbdf9a912732b32d153356b1fce40c'
})

export default client