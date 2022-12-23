
const useSendCmd = () => {
  const send = (sid:string, cmd:string, args: any) => {
    console.log(`execute.${sid}.${cmd}.${args.toString()}`, args)
  }

  return send;
}

export {useSendCmd}