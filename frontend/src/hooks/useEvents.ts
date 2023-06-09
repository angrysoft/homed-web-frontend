import { useContext, useEffect} from "react";
import { AppContext } from "../store";


const useEvents = () => {
  const {dispatch} = useContext(AppContext);


  useEffect(() => {
    console.log("init event source")
    const evSource = new EventSource(`http://localhost:8000/events`);
    evSource.onmessage = async (event) => {
      if (!event.data.startsWith('{'))
        return;
      const eventData = JSON.parse(event.data);
      switch(eventData.event) {
        case "deviceList": {
          // loop over existing devie and update 
          break;
        }
        default: {
          dispatch({type:"UPDATE_DEVICE", payload: eventData});
          break;
        }
      }
    }
  }, [dispatch]);

}

export {useEvents};