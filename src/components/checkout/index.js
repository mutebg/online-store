import { Text } from "preact-i18n";
import { h, Component } from "preact";
import { getToken, makeTransaction } from "../../utils/cart";
let dropin = require("braintree-web-drop-in");

export default class CheckOut extends Component {
  state = {
    isLoading: true,
    message: ""
  };

  componentDidMount() {
    getToken().then(({ token }) => {
      const { items, total } = this.props;

      let form = document.querySelector("#bakset-form");

      dropin.create(
        {
          authorization: token,
          container: "#dropin-container"
        },
        (createErr, instance) => {
          this.setState({
            isLoading: false
          });

          form.addEventListener("submit", e => {
            e.preventDefault();
            const data = Array.from(new FormData(form).entries()).reduce(
              (prev, next) => {
                prev[next[0]] = next[1];
                return prev;
              },
              {}
            );

            instance.requestPaymentMethod(
              (requestPaymentMethodErr, payload) => {
                // When the user clicks on the 'Submit payment' button this code will send the
                // encrypted payment information in a variable called a payment method nonce
                makeTransaction(payload.nonce, total, items, data).then(
                  result => {
                    instance.teardown(teardownErr => {
                      // TOOD
                    });

                    if (result.success) {
                      this.props.onSuccess(result.order);
                      this.setState({
                        isLoading: false,
                        message: "success"
                      });
                    } else {
                      this.props.onError(result);
                      this.setState({
                        isLoading: false,
                        message: "error"
                      });
                    }
                  }
                );
              }
            );
          });
        }
      );
    });
  }

  render(props, { isLoading, message }) {
    let messageEl = null;
    if (message === "success") {
      messageEl = <div class="alert alert--success">THANKS IS OK</div>;
    } else if (message === "error") {
      messageEl = (
        <div class="alert alert--error">WHAT ? Something is not OK !</div>
      );
    }

    return (
      <div class="CheckOut">
        {/* {messageEl} */}

        <div id="dropin-container" />
        {message !== "success" && (
          <button class="btn btn--full" id="submit-button" disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="btn__icon"
              viewBox="0 0 640 512"
            >
              <path
                color="currentColor"
                d="M616 96H24c-13.255 0-24 10.745-24 24v272c0 13.255 10.745 24 24 24h592c13.255 0 24-10.745 24-24V120c0-13.255-10.745-24-24-24zm-8 224c-35.346 0-64 28.654-64 64H96c0-35.346-28.654-64-64-64V192c35.346 0 64-28.654 64-64h448c0 35.346 28.654 64 64 64v128zm-208-64c0 53.031-35.833 96-80 96-44.186 0-80-42.989-80-96 0-53.021 35.816-96 80-96s80 42.979 80 96z"
              />
            </svg>
            <Text id="finish_order" />
          </button>
        )}
      </div>
    );
  }
}
