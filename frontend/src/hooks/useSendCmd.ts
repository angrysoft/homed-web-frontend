
const useSendCmd = () => {
  const send = (sid:string, cmd:string, args: any) => {
    console.log(`execute.${sid}.${cmd}.${args.toString()}`, args)
    const fetchOptions: any = {
      method:  "POST",
      cache: "no-cache",
      body: `execute.${sid}.${cmd}.${args.toString()}`,
      headers: {
        'Content-Type': 'text/plain'
      },
    };
    
    fetch("/devices", fetchOptions).then((response) => {
      if (!response.ok) {
          console.error("Response error: ", response.status);
        };
    });
  }

  return send;
}

export {useSendCmd}
