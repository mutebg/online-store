import { h, Component } from "preact";
import "./style";
import reqAuth from "../reqAuth";
import { ORDER_STATUS } from "../../../../functions/consts";

export class ViewOrder extends Component {
  state = {
    orders: []
  };

  updateOrder = e => {
    this.props.firebase
      .firestore()
      .collection("orders")
      .doc(this.props.id)
      .update({
        status: e.srcElement.value
      });
  };

  componentDidMount() {
    this.props.firebase
      .firestore()
      .collection("orders")
      .doc(this.props.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            order: doc.data()
          });
        } else {
          console.log("No such document!");
        }
      });
  }

  render({ id }, { order }) {
    if (!order) return null;
    const { status } = order;

    return (
      <div>
        <select onChange={this.updateOrder}>
          {ORDER_STATUS.map(item => (
            <option selected={item === status}>{item}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default reqAuth(ViewOrder);
