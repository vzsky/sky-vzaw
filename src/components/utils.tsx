export type Prop = {[x:string]:any}
import { Image as ChakraImage } from "@chakra-ui/core";
import { useState, useEffect } from 'react'

export const Image = (props:Prop) => (
        <ChakraImage
            width="100%"
            src={`assets/${props.name}.png`}
            alt={props.name}
            onDragStart={(e) => {
                e.preventDefault();
            }}
        />
)

export const useWindowSize = () => {
    const isClient = typeof window === 'object';
  
    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    useEffect(() => { 
        if (!isClient) {
        return;
    }
      
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return windowSize;
  }