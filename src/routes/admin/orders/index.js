import { h, Component } from "preact";
import { Link } from "preact-router/match";

import "./style";
import { formatProduct } from "../../../../functions/helpers";
import reqAuth from "../reqAuth";
import { extractCustomer } from "../../../utils/shiping";
import { ORDER_STATUS } from "../../../../functions/consts";

export class Orders extends Component {
  state = {
    orders: []
  };

  updateOrder = (e, id) => {
    this.props.firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .update({
        status: e.srcElement.value
      });
  };

  componentDidMount() {
    this.props.firebase
      .firestore()
      .collection("orders")
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(doc => {
          orders.push({
            id: doc.id,
            ...doc.data()
          });
        });
        this.setState({
          orders
        });
      })
      .catch(e => console.log(e));
  }

  render(_, { orders }) {
    if (orders.length) {
      return (
        <table class="orders-table">
          <tr>
            <th width="200">ID/Date</th>
            <th>Customer</th>
            <th>Products</th>
            <th width="50">Amount</th>
            <th width="50">View</th>
          </tr>
          {orders.map(order => (
            <OrderRow
              key={order.id}
              {...order}
              updateOrder={this.updateOrder}
            />
          ))}
        </table>
      );
    }
    return <div>Orders...</div>;
  }
}

export default reqAuth(Orders);

const OrderRow = ({
  date,
  id,
  products,
  amount,
  user,
  status,
  updateOrder
}) => (
  <tr>
    <td>
      {id}
      <br />
      <br />
      {date ? date.toLocaleString() : ""}
      <br />
      <br />
      <select onChange={e => updateOrder(e, id)}>
        {ORDER_STATUS.map(item => (
          <option selected={item === status}>{item}</option>
        ))}
      </select>
    </td>
    <td>
      {extractCustomer(user).map(({ key, value }) => (
        <div>
          {key}: {value}
        </div>
      ))}
    </td>
    <td>
      {products.map(p => <ProductRow key={p.id} {...formatProduct(p)} />)}
    </td>
    <td>{amount}</td>
    <td>{/* <Link href={`/admin/order/${id}`}>View</Link> */}</td>
  </tr>
);

const ProductRow = ({ id, name, price, custom }) => (
  <p>
    <div>ID:{id}</div>
    <div>Name:{name}</div>
    <div>Price:{price}</div>
    {custom.map(({ key, value }) => (
      <div>
        {key} : {value}
      </div>
    ))}
    <hr />
  </p>
);
