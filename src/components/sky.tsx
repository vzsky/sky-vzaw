import { useState } from 'react'
import { Flex, Box } from "@chakra-ui/core";
import Draggable from 'react-draggable'
import { Prop, Image } from './utils'

const config = {
    floatSize : 150,
    cloudInitPos : 50,
    cloudMinWidth : 200,
    cloudMaxWidth : 300,
    sun : 'sun.gif',
    moon : 'moon.png',
    cloud1 : {x:250, y:70},
    cloud2 : {x:-350, y:120},
}

const Float = (props:Prop) => (
    <Box 
        flex={`0 0 ${config.floatSize}px`}
    >
        <Image name={props.type}/>
    </Box>
)

const Cloud = (props:Prop) => {

    return (
        <Draggable
            axis="x"
            handle={`.cloud${props.id}`}
            defaultPosition={{x: props.initPos.x, y: props.initPos.y}}
            scale={1.5}
            {...props}
        >
            <Box 
                width='100%'
                minW={`${props.minW}px`}
                maxW={`${props.maxW}px`}
                className={`cloud${props.id}`}
            >
                <Image name={`cloud${props.id+1}.gif`} />
            </Box>
        </Draggable>
    )
}

const Clouds = (props:Prop) => {
    return (
        <>
            <Cloud id={1} minW={props.minW} maxW={props.maxW} initPos={config.cloud1}/>
            <Cloud id={2} minW={props.minW} maxW={props.maxW} initPos={config.cloud2}/>
        </>
    )
}

const StaticSky = (props:Prop) => {
    let background:string
    let Element:JSX.Element
    
    if (props.mode === 'night') {
        background = 'gray.500'
        Element = <Float type={config.moon} />
    }
    else {
        background = 'blue.100'
        Element = <Float type={config.sun} />
    }

    return (
        <Flex
            width='100%'
            height = "100%"
            p={5}
            overflow='hidden'
            bg={background}
        >
            {Element}
            <Cloud id={0} minW={config.cloudMinWidth} maxW={config.cloudMaxWidth} initPos={props.cloudInitPos} onDrag={props.onDragCloud}/>
            <Clouds minW={config.cloudMinWidth} maxW={config.cloudMaxWidth} />
        </Flex>
    )
}

export default (props:Prop) => {

    const {floatSize, cloudInitPos} = config

    const [skyTime, setSkyTime] = useState('day')
    const [cloudPos, setCloudPos] = useState(cloudInitPos)

    const onDragCloud = (e:any, ui:any) => {
        setCloudPos(ui.x)
        if (cloudPos <= -floatSize && skyTime !== 'night') {
            setSkyTime('night')
            props.whenNight()
        }
    }

    return (
        <StaticSky
            mode={skyTime}
            onDragCloud={onDragCloud} 
            cloudInitPos={{x:cloudInitPos, y:0}}
        />
    )
}