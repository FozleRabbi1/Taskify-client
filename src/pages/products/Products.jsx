import axios from "axios";
import PayPalButtonComponent from "./PayPalButtonComponent";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import SingleProducts from "./SingleProducts"; // Ensure this path is correct

const Products = () => {
  // const { data } = ProductsApi.useGetAllProductsQuery();
  const amount = 20;

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Trigger the backend payment route
  //     const res = await axios.post(`http://localhost:8000/payment`, amount); // Changed to POST

  //     if (res?.data?.approvalUrl) {
  //       const redirectUrl = res.data.approvalUrl; // Corrected key to match server response
  //       window.location.href = redirectUrl; // Redirect user to PayPal for payment
  //     }
  //   } catch (error) {
  //     console.error('Payment initiation error:', error.response);
  //   }
  // };

      // PayPal payments
      const handleCreateOrder = async () => {
        try {
            const { data } = await axios.post('/payment',amount );
            return data.forwardLink;
        } catch (error) {
            console.error('Error creating PayPal order:', error);
        }
    };

    const handleApproveOrder = async () => {
        try {
            const { data: paymentData } = await axios.post('/paypal/execute-payment');
            console.log('Payment approved:', paymentData);
        } catch (error) {
            console.error('Error approving PayPal order:', error);
        }
    };

  return (
    <div>
      <button  className="text-xl m-10 border">Proceed to Payment</button>

      {/* <div className="grid grid-cols-4 gap-10 w-[1400px] mx-auto ">
                {
                    data?.data.map(item => <SingleProducts key={item?._id} item={item} />)
                }
            </div> */}
            
      <div>
        <PayPalScriptProvider options={{ "client-id": 'AeMnBMlrboT2yZ77Ny1Zuwm-UnhJeeMzvE1D1ana1ZetUAzPfo7C-Px41iR4FijH5SN1FHEYrGokg3G2' }}>
          <PayPalButtonComponent amount={amount} handleCreateOrder={handleCreateOrder} handleApproveOrder={handleApproveOrder} ></PayPalButtonComponent>
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Products;
