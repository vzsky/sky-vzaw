import { useState } from 'react'
import { Flex, Box, Image } from "@chakra-ui/core";
import Draggable from 'react-draggable'

type Prop = {[x:string]:any}

const StaticCloud = (props:Prop) => (
    <Box 
        width='100%'
        minW='150px'
        maxW='500px'
        {...props}
    >
        <Image 
            src="assets/cloud.png" 
            alt="Cloud" 
            onDragStart={(e) => {
                e.preventDefault();
            }}
        />
    </Box>
)

const Sun = (props:Prop) => (
    <Box 
        width={props.width}
    >
        <Image
            src="assets/sun.png"
            alt="Sun"
            onDragStart={(e) => {
                e.preventDefault();
            }}
        />
    </Box>
)

const Cloud = (props:Prop) => {

    return (
        <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{x: props.initPos, y: 0}}
            position={null}
            scale={1.5}
            {...props}
        >
             <div className='handle'>
                <StaticCloud />
            </div>
        </Draggable>
    )
}

const StaticSky = (props:Prop) => (
    <Flex
        height = "100%"
        backgroundColor={props.mode==='night'?'gray.500':'blue.200'}
        p={5}
        style={{overflow:'hidden'}}
    >
        <Sun width={props.sunSize}/>
        <Cloud initPos={props.cloudInitPos} onDrag={props.onDragCloud}/>
    </Flex>
)

export const Sky = (props:Prop) => {

    const sunSize = 200
    const cloudInitPos = 100

    const [skyTime, setSkyTime] = useState('day')
    const [cloudPos, setCloudPos] = useState(cloudInitPos)

    const onDragCloud = (e, ui) => {
        console.log(skyTime)
        setCloudPos(ui.x)
        if (cloudPos <= -sunSize) setSkyTime('night')
        else setSkyTime('day')
    }

    return (
                <>
                    <StaticSky
                        mode={skyTime}
                        sunSize={sunSize}
                        onDragCloud={onDragCloud} 
                        cloudInitPos={cloudInitPos}
                    />
                </>

    )
}