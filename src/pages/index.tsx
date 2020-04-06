import Sky from '../components/sky'

const Home = () => {

    const whenNight = () => {
        console.log('Night, do something next')
    }

    return (
        <Sky whenNight={whenNight}/>
    )
}


export default Home
