import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';

function Home() {
  const [checkUser, setCheckUser] = useState();
  const { user } = useAuth();
  // console.log('the user:', user, user.uid);

  const checkUserExist = () => {
    getSingleUser(user.uid).then(setCheckUser);
  };

  useEffect(() => {
    checkUserExist();
  }, [user.uid]);

  console.log('checking user from db:', checkUser);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hip Hop Pizza and Wings!</h1>

      <br />
      {Array.isArray(checkUser) && checkUser.length > 0 ? (
        <>
          {/* <p>Please Register</p> */}
          <h3>Welcome, {checkUser[0].name}! </h3><p>Number of orders: {checkUser[0].orders.length}</p>

          <Link href="/Orders/orders" passHref>
            <Button variant="success" className="mb-2">View Orders</Button>
          </Link>
          <Link href="/Orders/createOrder" passHref>
            <Button className="mb-2">Create New Order</Button>
          </Link>
          <Link href="/revenue" passHref>
            <Button variant="warning">View Revenue</Button>
          </Link>

        </>
      ) : (
        <>
          {/* <h3>Hello {checkUser[0].name}! </h3><p>Your Bio: {user.bio}</p> */}
          <p>Please Register</p>
        </>
      ) }

      {/* <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button> */}
    </div>
  );
}

export default Home;
