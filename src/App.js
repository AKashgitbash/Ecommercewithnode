import logo from './logo.svg';
import './App.css';
import Category from './components/category/category'
import DisplayALL from './components/category/DisplayALL'
import Displayformat from './components/category/Displayformat'
import Brand from './components/brand/Brands'
import Displaybrand from './components/brand/Displaybrand'
import Model from "./components/model/Model"
import Displaymodule from "./components/model/Displaymodule"
import Product from "./components/product/product"
import Displayproduct from "./components/product/displayproduct"
import   {BrowserRouter as Router,Route} from "react-router-dom"
import AdminLogin from "./components/Admin/AdminLogin"
import Dashboard from "./components/Admin/Dashboard"
import DashboardList from "./components/Admin/DashboardList"
import ProductPictureInterface from "./components/ProductPicture/ProductPictureInterface"
import DisplayProductPicture  from "./components/ProductPicture/DisplayProductPicture"
import MainPage from './components/ClientView/MainPage'
import Footer from './components/ClientView/Footer'
import Home from './components/ClientView/Home'
import Qtyspinner from './components/ClientView/Qtyspinner'
import ListProducts from './components/ClientView/ListProducts'
import SproductView from './components/ClientView/SproductView'
import State from './components/StateCityArea/State/State'
import ShowCart  from './components/ClientView/ShowCart'
import SignInClient from './components/ClientView/SignInClient'
import Main from './components/StateCityArea/Main'
import  AllDisplay from './components/StateCityArea/AllDisplay'
import ShowCartWithAddress from './components/ClientView/ShowCartWithAddress'
import SignInUserForm from './components/ClientView/SignInUserForm'
import PaymentGateway from './components/ClientView/PaymentGateway';



function App(props) {
  return (<div>
      <Router>
      <Route exact strict component={Category} path='/CategoryInterface' history={props.history}/>
      <Route exact strict component={Brand} path='/BrandInterface' history={props.history}/>
      <Route exact strict component={Displaybrand} path='/DisplayBrand' history={props.history}/>
      <Route exact strict component={Displayformat} path='/DisplayCategory' history={props.history}/>
      <Route exact strict component={Model} path='/ModelInterface' history={props.history}/>
      <Route exact strict component={Displaymodule} path='/DisplayModel' history={props.history}/>
      <Route exact strict component={Product} path='/ProductInterface' history={props.history}/>
      <Route exact strict component={Displayproduct} path='/DisplayProduct' history={props.history}/>
      <Route exact strict component={AdminLogin} path='/AdminLogin' history={props.history}/>
      <Route exact strict component={Dashboard} path='/Dashboard' history={props.history}/>
      <Route exact strict component={DashboardList} path='/DashboardList' history={props.history}/>
      <Route exact strict component={ProductPictureInterface} path='/ProductPictureInterface' history={props.history}/>
      <Route exact strict component={DisplayProductPicture} path='/DisplayProductPicture' history={props.history}/>
      <Route exact strict component={MainPage} path='/MainPage' history={props.history}/>
      <Route exact strict component={Footer} path='/Footer' history={props.history}/> 
      <Route exact strict component={Home} path='/Home' history={props.history}/>
      <Route exact strict component={Qtyspinner} path='/Qtyspinner' history={props.history}/>
      <Route exact strict component={ListProducts} path='/ListProducts' history={props.history}/>
      <Route exact strict component={SproductView} path='/SproductView/:pid' history={props.history}/>
      <Route exact strict component={State} path='/State' history={props.history}/>
      <Route exact strict component={ShowCart} path='/ShowCart' history={props.history}/>
      <Route exact strict component={Main} path='/Main' history={props.history}/>
      <Route exact strict component={AllDisplay} path='/AllDisplay' history={props.history}/>
      <Route exact strict component={SignInClient} path='/SignInClient' history={props.history}/>
      <Route exact strict component={SignInUserForm} path='/SignInUserForm' history={props.history}/>
      <Route exact strict component={ShowCartWithAddress} path='/ShowCartWithAddress' history={props.history}/>
      <Route exact strict component={PaymentGateway} path='/PaymentGateway' history={props.history}/>
      </Router>
      {/* <Dashboard/>  */}
    </div>
  ); 
}

export default App;
