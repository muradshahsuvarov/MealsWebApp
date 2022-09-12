import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass
} from "./styles";

function SearchButtonComponent(props) {
  
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);


  const r_arrow_click = () => {

    console.log('Request went to localhost:5000 ...')

    async function fetchData() {
  
      if (targetRef.current.value == "") {
        props.handleState(null, null);
        return;
      }

      const data = await fetch(`http://a8d24b3ea78a34cb7a573abc1ba5cf31-99778341.us-east-1.elb.amazonaws.com:81/meals/${targetRef.current.value}`, { method: "GET"});
      const data_response = await data.text()
      console.log(`LOG: ${JSON.parse(data_response).message}`)
      if (JSON.parse(data_response).message == null) {

        // Loading Image
        const image_url = `https://pixabay.com/api/?key=29794649-1aed0a6a0551015fc2697e731&q=${targetRef.current.value}&image_type=photo&pretty=true`;
        const image_data = await fetch(image_url, { method: "GET"});
        const image_data_response = await image_data.text()
        const image_hits = JSON.parse(image_data_response).hits
        const image_hits_length = image_hits.length;

        function randomIntFromInterval(min, max) { // min and max included 
          return Math.floor(Math.random() * (max - min + 1)) + min
        }

        const randomly_chosen_meal_index = randomIntFromInterval(0, image_hits_length);
        const randomly_chosen_meal_url = image_hits[randomly_chosen_meal_index].webformatURL;

        props.handleState(data_response, targetRef.current.value, randomly_chosen_meal_url);

      }else{
        props.handleState(data_response, targetRef.current.value, null);
      }
    }

    fetchData();
  }

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput ref={targetRef} showSearchInput={showSearchInput} />
      {showSearchInput ? <IconRightArrow onClick={r_arrow_click} /> : <IconMagnifyingGlass />}
    </Container> 
  );
}

export default SearchButtonComponent;
