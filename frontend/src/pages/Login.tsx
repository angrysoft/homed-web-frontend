import React from 'react';


interface ILoginProps {

  children?: JSX.Element | JSX.Element[];
}


const Login:React.FC<ILoginProps> = (props:ILoginProps) => {
  return (
    <div className="grid justify-center content-center bg-background h-screen text-onBackground">
      
      <div id="g_id_onload"
         data-client_id="877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com"
         data-login_uri="http://localhost:3000/auth"
         data-auto_prompt="true"
         data-auto_select="true"
      >
      </div>
      <div className="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>
    </div>
  );
};

export {Login};
