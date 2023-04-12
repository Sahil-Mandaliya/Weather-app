import stormGif from './storm.gif'
import sunnyDay from './sunny.gif'
import night from './night.gif'
import { WiDaySunny,WiDaySunnyOvercast, WiCloudy,WiNightAltCloudy,WiNightRain,WiDayRain, WiDayCloudy,WiNightClear,WiHorizonAlt,WiDayHaze,WiNightFog } from 'react-icons/wi';
import '../components/css/card.css'

export const Storm = stormGif;
export const SunnyDay = sunnyDay;
export const Night = night;

export function getWeatherIcon(condition, isDay) {
    switch(String(condition).toLowerCase()) {
        case 'clear':
            if(isDay === 1) {
                return <WiHorizonAlt className='weather-condition'></WiHorizonAlt>
            } else {
                return <WiNightClear className='weather-condition'></WiNightClear> 
            }
        case 'sunny':
          return <WiDaySunny className='weather-condition'></WiDaySunny>;
        case 'overcast':
            return <WiDaySunnyOvercast className='weather-condition'></WiDaySunnyOvercast>;
        case 'cloudy':
            if(isDay === 1) {
                return <WiCloudy className='weather-condition'></WiCloudy>
            } else {
                return <WiNightAltCloudy className='weather-condition'></WiNightAltCloudy>
            }
        case 'partly cloudy':
            if(isDay === 1) {
                return <WiDayCloudy className='weather-condition'></WiDayCloudy>
            } else {
                return <WiNightAltCloudy className='weather-condition'></WiNightAltCloudy>
            }
        case 'rainy':
        case 'rain':
        case condition.includes('rain') === true ? "rain":"" :
        case condition.includes('rainy') === true ? "rain":"" :
            if(isDay === 1) {
                return <WiDayRain className='weather-condition'></WiDayRain>
            } else {
                return <WiNightRain className='weather-condition'></WiNightRain>
            }
        case 'mist' :
            if(isDay === 1) {
                return <WiDayHaze className='weather-condition'></WiDayHaze>
            } else {
                return <WiNightFog className='weather-condition'></WiNightFog>
            }
        default:
          return <></>;
      }
}