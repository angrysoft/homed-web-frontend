import { useCallback } from "react";

interface IEvent {
  event: string,
  sid: string,
  payload: {[key:string]: string}
}

const useSendEvent = () => {
  const send = useCallback((event: IEvent) => {
    const fetchOptions: any = {
      method:  "POST",
      cache: "no-cache",
      mode: "no-cors",
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'text/plain'
      },
      credentials: 'include'
    };
    
    fetch("/api/v1/devices", fetchOptions).then((response) => {
      if (!response.ok) {
          console.error("Response error: ", response.status);
        };
    });
  }, []);

  return send;
}

export {useSendEvent}
