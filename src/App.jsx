import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import UserData from './components/userData'

function App() {

  return (
    <>
    <Header></Header>
    <ProductCard name="Gaming laptop" description="lorem srtgf gddss" price="1500" picture="https://picsum.photos/id/1/200/300"/>
    <ProductCard name="Apple laptop" description="lorem srtgf gddss" price="1000" picture="https://picsum.photos/id/2/200/300"/>
    </>
      
  )
}

export default App
