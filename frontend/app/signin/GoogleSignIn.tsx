"use client";

import { useEffect, useState } from "react";

export function GoogleSignIn() {
  const [lib, setLib] = useState(<></>);

  useEffect(() => {
    setLib(
      <script src="https://accounts.google.com/gsi/client" async></script>,
    );
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="/api/v1/gsi"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_black"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      {lib}
    </>
  );
}
