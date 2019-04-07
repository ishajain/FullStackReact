import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleStripeToken } from "../actions";
class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 credits for 5 survey emails"
        amount={500}
        token={token => {
          this.props.handleStripeToken(token);
        }}
        stripeKey={process.env.REACT_STRIPE_KEY}
      >
        {/* <a href="#">Add Credits</a> */}
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleStripeToken }
)(Payments);
