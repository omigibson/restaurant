import React from 'react';

const LoginComponent = () => {
    return (
        <div className="login-form">
            <h2>Admin login</h2>
            <form>
              <input type="text" placeholder="Username" name="username" />
              <input type="password" placeholder="Password" name="password" />
              <input type="submit" value="Log in" />
            </form>
        </div>
    );
}
export default LoginComponent;
