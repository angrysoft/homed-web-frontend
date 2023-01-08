import { useCallback } from "react";

const useSendCmd = () => {
  const send = useCallback((sid:string, cmd:string, args: any) => {
    const event = {
      'event': `execute.${sid}.${cmd}.${args.toString()}`,
      'args' : [args.toString(), cmd] 
    };
    console.log(event)
    const fetchOptions: any = {
      method:  "POST",
      cache: "no-cache",
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'text/plain'
      },
    };
    
    fetch("/devices", fetchOptions).then((response) => {
      if (!response.ok) {
          console.error("Response error: ", response.status);
        };
    });
  }, []);

  return send;
}

export {useSendCmd}
