import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import Home from "../routes/home";
import Product from "../routes/product";
import Basket from "../routes/basket";
import Order from "../routes/order";
import AdminOrders from "async!../routes/admin/orders";
import AdminViewOrder from "async!../routes/admin/vieworder";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
    window.scrollTo({ top: 0 });
  };

  render() {
    return (
      <div id="app">
        <Header />
        <div class="wrapper">
          <Router>
            <Home path="/" />
            <Basket path="/basket" />
            <Product path="/product/:id" />
            <Order path="/order/:id/:email" />
            <AdminOrders path="/admin/orders" />
            <AdminViewOrder path="/admin/order/:id" />
          </Router>
        </div>
      </div>
    );
  }
}
