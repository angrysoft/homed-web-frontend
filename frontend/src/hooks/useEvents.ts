import { useContext, useEffect} from "react";
import { AppContext } from "../store";


const useEvents = () => {
  const {dispatch} = useContext(AppContext);


  useEffect(() => {
    console.log("init event source")
    const evSource = new EventSource(`http://localhost:8000/events`);
    evSource.onmessage = async (event) => {
      if (event.data.startsWith('{')) {
        dispatch({type:"UPDATE_DEVICE", payload: JSON.parse(event.data)});
      }
    }
  }, [dispatch]);

}

export {useEvents};