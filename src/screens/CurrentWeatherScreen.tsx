import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../redux/app/hook';
import useFetchData from '../hooks/useFetchData';
import {getCurrentWeather} from '../api/apiFunctions';
import {Image} from 'react-native';

type Props = {};

const CurrentWeatherScreen = (props: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const [selectedCity, setSelectedCity] = useState('Yangon');
  const {data: weatherData} = useFetchData(
    ['current-weather', selectedCity],
    () => getCurrentWeather(selectedCity),
  );

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: isDarkTheme ? '#070907' : '#F4F6F4'}}>
      <Text
        style={{
          color: isDarkTheme ? '#F4F6F4' : '#070907',
          textAlign: 'center',
          fontSize: 28,
          marginTop: 10,
          fontWeight: '600',
        }}>
        Current Weather
      </Text>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 25,
            marginTop: 40,
          }}>
          <Image
            source={{
              uri: `https:${weatherData?.data.current.condition.icon}`,
            }}
            style={{height: 60, width: '5%', borderRadius: 10}}
          />
          <View style={{alignItems: 'flex-start', gap: 6}}>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '700',
                fontSize: 24,
              }}>
              {weatherData?.data.location.name}
            </Text>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '500',
                fontSize: 18,
              }}>
              {weatherData?.data.location.country}
            </Text>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '300',
                fontSize: 14,
              }}>
              {weatherData?.data.location.localtime}
            </Text>
          </View>
          <View style={{marginLeft: 0, alignItems: 'flex-start', gap: 6}}>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '700',
                fontSize: 24,
              }}>
              {weatherData?.data.current.temp_c} C°
            </Text>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '500',
                fontSize: 20,
              }}>
              {weatherData?.data.current.temp_f} F°
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', gap: 10}}>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Condition:{'\n'}
              {weatherData?.data.current.condition.text}
            </Text>

            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#070907',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
              }}>
              Moon phase:{'\n'}
              {weatherData?.data.forecast.forecastday[0].astro.moon_phase}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            marginTop: 30,
            padding: 20,
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-evenly',
            height: 'auto',
          }}>
          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#070907',
              lineHeight: 22,
              fontWeight: '400',
              fontSize: 16,
            }}>
            Sunrise:{'\n'}
            {weatherData?.data.forecast.forecastday[0].astro.sunrise}
          </Text>

          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#070907',
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 22,
            }}>
            Sunset:{'\n'}
            {weatherData?.data.forecast.forecastday[0].astro.sunset}
          </Text>

          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#070907',
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 22,
            }}>
            Moonrise:{'\n'}
            {weatherData?.data.forecast.forecastday[0].astro.moonrise}
          </Text>

          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#070907',
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 22,
            }}>
            Moonset:{'\n'}
            {weatherData?.data.forecast.forecastday[0].astro.moonset}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}>
          {weatherData.data &&
            weatherData?.data.forecast.forecastday[0].hour.map(forecastData => (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 1,
                  backgroundColor: '#708F70',
                  padding: 10,
                  borderRadius: 15,
                }}
                key={forecastData.time_epoch}>
                <Text
                  style={{
                    color: isDarkTheme ? '#F4F6F4' : '#F4F6F4',
                    fontWeight: '600',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  Time:{forecastData.time}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: `https:${forecastData.condition.icon}`,
                    }}
                    style={{height: 60, width: 40, borderRadius: 10}}
                  />
                  <Text
                    style={{
                      color: isDarkTheme ? '#F4F6F4' : '#F4F6F4',
                      fontWeight: '600',
                      fontSize: 16,
                      lineHeight: 22,
                    }}>
                    Condition:{forecastData.condition.text}
                  </Text>
                </View>
                <Text
                  style={{
                    color: isDarkTheme ? '#F4F6F4' : '#F4F6F4',
                    fontWeight: '600',
                    fontSize: 14,
                    textAlign: 'center',

                    lineHeight: 22,
                  }}>
                  {forecastData.temp_c} C° , {forecastData.temp_f} F°
                </Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CurrentWeatherScreen;

const styles = StyleSheet.create({});
