// import { Card, CardContent, Typography, IconButton, CardMedia, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { loadStripe } from "@stripe/stripe-js"; 

// const Cart = () => {
//   const [food, setFood] = useState([]);


//   const stripePromise = loadStripe("pk_test_51Q5V3WBwumoaS32NuX4SIhowmt0yc9lmbsEESR3N3m6edR80wOCJP5pDPkegBB15khePa6P0kjGYlndwU18xrtxC00qFRp31cX");
//   // const handleCheckout = async () => {
//   //   const response = await fetch("https://localhost:3000/create-checkout-session", {
//   //     method: "POST",
//   //     headers : {
//   //       "Content-Type": "application/json",
//   //     },
//       // body: JSON.stringify({
//         // items: Object.entries(food).map(([key, item]) => ({
//         //   name: item.name,
//         //   price: item.price,
//         //   quantity: item.quantity
//         // }))
//   //     })
//   //   });

//   //   const session = await response.json();
//   //   console.log("session id: ", session.id);

//   //   const stripe = await stripePromise;
//   //   console.log("Promise: ", stripe);
//   //   const { error } = await stripe.redirectToCheckout({
//   //     sessionId: session.id,
//   //   });

//   //   if(error){
//   //     console.log("Stripe checkout error: ", error);
//   //   }
//   // }
//   const handleCheckout = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/create-checkout-session', { // Update with the correct URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // cartItems: cart, // Assuming cart contains the cart data
//           items: Object.entries(food).map(([key, item]) => ({
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity
//           })),
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       console.log('Checkout response:', data);
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   // Fetch cart items from localStorage
//   const getCartItems = () => {
//     const data = localStorage.getItem('cart');
//     console.log(data);
//     if (data) {
//       setFood(Object.values(JSON.parse(data))); // Convert the object to an array
//     }
//   };

//   const updateCartAndNotify = (updatedCart) => {
//     const cartObject = updatedCart.reduce((obj, item) => {
//       obj[item.name] = item;
//       return obj;
//     }, {});
//     localStorage.setItem('cart', JSON.stringify(cartObject));
//     window.dispatchEvent(new Event('cartUpdated'));
//   };

//   // Delete item from cart
//   const handleDelete = (itemName) => {
//     const updatedCart = food.filter((item) => item.name !== itemName);
//     setFood(updatedCart);
//     updateCartAndNotify(updatedCart);
//   };

//   const clear_cart = () => {
//     localStorage.removeItem('cart');
//     setFood([]);
//     window.dispatchEvent(new Event('cartUpdated'));
//   }

//   useEffect(() => {
//     getCartItems();
//   }, []); 

//   return (
//     <div style={{ marginTop: "25px" }}>
//       <Typography variant="h4" style={{ textAlign: "center" }}>Your Cart</Typography>
//       <div className="menu__items__list" style={{textAlign:'center', color: "rgb(97, 97, 97)"}}>
//         {
//           food.length>0?
//           food.map((item)=>{
//             return(
//               <Card key={item.name}  sx={{ maxWidth: 345 }} className="menu__items__card">
//                 <CardContent>
//                 <CardMedia component="img" height="200" image={item.img} alt="green iguana"/>
//                   <Typography variant='h5' sx={{paddingTop:2}}>{item.name}</Typography>
//                   <Typography variant="caption">Category: {item.typeofcourse}</Typography><br />
//                   <Typography variant='caption'>Price: ₹{item.price}</Typography><br/>
//                   <Typography variant="caption" sx={{paddingBottom:2}}>Quantity:{item.quantity}</Typography><br/>
//                   <Typography variant="caption">Total:{item.quantity * item.price}</Typography><br/>
//                 </CardContent>
//                   <IconButton color="secondary" aria-label="delete" onClick={()=> handleDelete(item.name)}>
//                     <DeleteIcon />
//                   </IconButton>
//               </Card>
//             )
//           }):
//           <Typography variant="h5" sx={{ color: 'grey.700' }}>Your cart is empty.</Typography>
//         }
//       </div>
//       {food.length>0 && (
//         <>
//       <hr style={{margin: "0 5vw", color:"grey.700"}} />
//       <div style={{margin: "3vh 5vw"}}>
//         <Typography variant="h5" style={{display:"flex",justifyContent:"end"}}>Grand Total: {
//           food.reduce((total,item) => total+ (item.quantity * item.price),0)
//         }</Typography>
//         <div style={{textAlign:"center",margin:"2vh 0"}}>
//           <Button variant="contained" style={{margin:"2vh 0"}} color="error" onClick={clear_cart}> CLEAR CART </Button><br/>
//           <Button variant="contained" onClick={handleCheckout}>CHECKOUT</Button>
//         </div>
//       </div>
//       </>)}
//     </div>
//   );
// };

// export default Cart;

import { Card, CardContent, Typography, IconButton, CardMedia, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { loadStripe } from "@stripe/stripe-js"; 

const Cart = () => {
  const [food, setFood] = useState([]);


  const stripePromise = loadStripe("pk_test_51Q5V3WBwumoaS32NuX4SIhowmt0yc9lmbsEESR3N3m6edR80wOCJP5pDPkegBB15khePa6P0kjGYlndwU18xrtxC00qFRp31cX");
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: Object.entries(food).map(([key, item]) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      })
    });

    const session = await response.json();
    console.log("session id: ", session.id);

    const stripe = await stripePromise;
    console.log("Promise: ", stripe);
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if(error){
      console.log("Stripe checkout error: ", error);
    }
  }

  // Fetch cart items from localStorage
  const getCartItems = () => {
    const data = localStorage.getItem('cart');
    if (data) {
      setFood(Object.values(JSON.parse(data))); // Convert the object to an array
    }
  };

  const updateCartAndNotify = (updatedCart) => {
    const cartObject = updatedCart.reduce((obj, item) => {
      obj[item.name] = item;
      return obj;
    }, {});
    localStorage.setItem('cart', JSON.stringify(cartObject));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Delete item from cart
  const handleDelete = (itemName) => {
    const updatedCart = food.filter((item) => item.name !== itemName);
    setFood(updatedCart);
    updateCartAndNotify(updatedCart);
  };

  const clear_cart = () => {
    localStorage.removeItem('cart');
    setFood([]);
    window.dispatchEvent(new Event('cartUpdated'));
  }

  useEffect(() => {
    getCartItems();
  }, []); 

  return (
    <div style={{ marginTop: "25px" }}>
      <Typography variant="h4" style={{ textAlign: "center" }}>Your Cart</Typography>
      <div className="menu__items__list" style={{textAlign:'center', color: "rgb(97, 97, 97)"}}>
        {
          food.length>0?
          food.map((item)=>{
            return(
              <Card key={item.name}  sx={{ maxWidth: 345 }} className="menu__items__card">
                <CardContent>
                <CardMedia component="img" height="200" image={item.img} alt="green iguana"/>
                  <Typography variant='h5' sx={{paddingTop:2}}>{item.name}</Typography>
                  <Typography variant="caption">Category: {item.typeofcourse}</Typography><br />
                  <Typography variant='caption'>Price: ₹{item.price}</Typography><br/>
                  <Typography variant="caption" sx={{paddingBottom:2}}>Quantity:{item.quantity}</Typography><br/>
                  <Typography variant="caption">Total:{item.quantity * item.price}</Typography><br/>
                </CardContent>
                  <IconButton color="secondary" aria-label="delete" onClick={()=> handleDelete(item.name)}>
                    <DeleteIcon />
                  </IconButton>
              </Card>
            )
          }):
          <Typography variant="h5" sx={{ color: 'grey.700' }}>Your cart is empty.</Typography>
        }
      </div>
      {food.length>0 && (
        <>
      <hr style={{margin: "0 5vw", color:"grey.700"}} />
      <div style={{margin: "3vh 5vw"}}>
        <Typography variant="h5" style={{display:"flex",justifyContent:"end"}}>Grand Total: {
          food.reduce((total,item) => total+ (item.quantity * item.price),0)
        }</Typography>
        <div style={{textAlign:"center",margin:"2vh 0"}}>
          <Button variant="contained" style={{margin:"2vh 0"}} color="error" onClick={clear_cart}> CLEAR CART </Button><br/>
          <Button variant="contained" onClick={handleCheckout}>CHECKOUT</Button>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default Cart;