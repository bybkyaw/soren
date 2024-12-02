import React, { useCallback } from 'react';
import Swal from 'sweetalert2';

type AuthMessageProps = {
  type: 'registerSuccess' | 'emailExists' | 'loginSuccess' | null;
  name: string;
  // onClose?: () => void;
};

const AuthMessage: React.FC<AuthMessageProps> = ({ type, name }) => {
  // Memoize the showAuthMessage function to avoid unnecessary re-renders
  const showAuthMessage = useCallback(async () => {
    if (type === 'registerSuccess') {
      await Swal.fire({
        title: 'Registration Successful!',
        text: 'You can now login with your credentials.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // onClose?.();
      // window.location.href = '/'; // Redirect to login page after success
    } else if (type === 'loginSuccess') {
      await Swal.fire({
        title: 'Login Successful!',
        text: `Welcome back, ${name}!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // window.location.href = '/'; // Redirect to home page after success
    } else if (type === 'emailExists') {
      await Swal.fire({
        title: 'Email Already Exists!',
        text: 'This email is already registered. Please use a different one.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }, [type, name]); // Add 'type' and 'name' to the dependencies array

  React.useEffect(() => {
    if (type) {
      showAuthMessage(); // Show message when the component is rendered
    }
  }, [type, showAuthMessage]); // Run effect when 'type' changes or 'showAuthMessage' changes

  return null; // This component does not render any UI
};

export default AuthMessage;



// import React, { useEffect } from 'react';
// import Swal from 'sweetalert2';

// interface AuthMessageProps {
//   type: 'registerSuccess' | 'emailExists' | 'loginSuccess';
//   name?: string;
// }

// const AuthMessage: React.FC<AuthMessageProps> = ({ type, name }) => {
//   useEffect(() => {
//     // Display the message based on the `type` prop
//     switch (type) {
//       case 'registerSuccess':
//         Swal.fire({
//           icon: 'success',
//           title: 'Welcome to Indigo Book Club!',
//           text: "You're successfully registered.",
//           timer: 100000,
//           showConfirmButton: false,
//         });
//         break;

//       case 'emailExists':
//         Swal.fire({
//           icon: 'error',
//           title: 'Sorry!',
//           text: 'Your email has already been registered with us. Please proceed with login!',
//           timer: 100000,
//           showConfirmButton: false,
//         });
//         break;

//       case 'loginSuccess':
//         Swal.fire({
//           icon: 'success',
//           title: `Welcome back, ${name}!`,
//           text: 'You are successfully logged in.',
//           timer: 100000,
//           showConfirmButton: false,
//         });
//         break;

//       default:
//         break;
//     }
//   }, [type, name]);

//   return null;
// };

// export default AuthMessage;




// import React from 'react';
// import './AuthMessage.css';

// interface AuthMessageProps {
//   message: string;
//   closeMessage: () => void;
// }

// const AuthMessage: React.FC<AuthMessageProps> = ({ message, closeMessage }) => {
//   return (
//     <div className="auth-message">
//       <div className="message-content">
//         <p>{message}</p>
//         <button className="close-button" onClick={closeMessage}>Close</button>
//       </div>
//     </div>
//   );
// }

// export default AuthMessage;

