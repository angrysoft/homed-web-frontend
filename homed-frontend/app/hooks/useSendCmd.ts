import { useCallback } from "react";

const useSendCmd = () => {
  const send = useCallback((sid:string, cmd:string, value: any) => {
    const event = {
      'event': `execute`,
      'sid': sid,
      'payload' : {
        name:cmd,
        value: value
      } 
    };
    const fetchOptions: any = {
      method:  "POST",
      cache: "no-cache",
      mode: "no-cors",
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'text/plain'
      },
    };
    console.log(sid, cmd,value)
    
    fetch("http://localhost:8000/devices", fetchOptions).then((response) => {
      if (!response.ok) {
          console.error("Response error: ", response.status);
          //no-cors  state 0
        };
    });
  }, []);

  return send;
}

export {useSendCmd}