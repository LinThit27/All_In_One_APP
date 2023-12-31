import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import useFetchData from '../hooks/useFetchData';
import {getAllBlogs} from '../api/apiFunctions';
import {formatDistanceToNow} from 'date-fns';
import BlogHomeHeader from '../components/BlogHomeHeader';
import TimeOutSvg from '../svgs/TimeOutSvg';
import {useFocusEffect} from '@react-navigation/native';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useAppSelector} from '../redux/app/hook';

interface Props extends RootStackScreenProps<'BlogHomeScreen'> {}

const BlogHomeScreen = ({navigation}: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const {
    data: blogData,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useFetchData(['blogs'], getAllBlogs);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  const renderItem = data => {
    return (
      <View
        style={{
          borderWidth: 1,
          minHeight: 430,
          maxHeight: 'auto',
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
          borderRadius: 30,
          borderColor: isDarkTheme
            ? 'rgba(112, 143, 112,0.2)'
            : 'rgba(8, 10, 8,0.1)',
          marginVertical: 10,
          backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
          shadowColor: '#719071',
          elevation: 3.5,
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.1,
          shadowRadius: 40,
        }}>
        <Image
          source={{
            uri: data.picture
              ? `data:image/jpeg;base64,${data.picture}`
              : 'https://images.unsplash.com/photo-1602300991431-27a957a5bcf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGdyZWVufGVufDB8fDB8fHww',
          }}
          style={{
            height: 320,
            width: '100%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        />
        <View
          style={{
            padding: 10,
            minHeight: 170,
            maxHeight: 'auto',
          }}>
          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#090B09',
              marginTop: 8,
              paddingLeft: 3,
              fontSize: 20,
              fontWeight: '700',
              width: '90%',
            }}>
            {data.title}
          </Text>
          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#090B09',
              fontSize: 12,
              paddingLeft: 6,
              marginTop: 5,
              fontWeight: '800',
            }}>
            {data?.updatedAt
              ? `${data.user.name} (${formatDistanceToNow(
                  new Date(data.updatedAt),
                  {
                    addSuffix: true,
                  },
                )})`
              : 'Ivan (N/A)'}
          </Text>

          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#090B09',
              fontWeight: '300',
              lineHeight: 18,
              fontSize: 13,
              marginTop: 12,
              paddingLeft: 8,
              opacity: 0.7,
            }}>
            {data.content.length > 20
              ? `${data.content.slice(0, 90)}..`
              : data.content}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                gap: 16,
                alignItems: 'center',
                opacity: 0.8,
                marginLeft: 8,
              }}>
              <TouchableOpacity>
                <Icon
                  style={{
                    color: isDarkTheme ? '#F4F6F4' : '#15212F',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                  name="thumbs-o-up"></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  style={{
                    color: isDarkTheme ? '#F4F6F4' : '#15212F',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                  name="thumbs-o-down"></Icon>
              </TouchableOpacity>
            </View> */}
            <View style={{alignItems: 'flex-end', width: '100%'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BlogDetail', {blogId: data._id})
                }
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 15,
                  alignItems: 'center',
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  backgroundColor: isDarkTheme ? '#708F70' : '#719071',
                  borderRadius: 30,
                }}>
                <Text style={{color: '#F7F9F7', fontWeight: '800'}}>
                  ReadMore
                </Text>
                <Icon
                  style={{
                    color: isDarkTheme ? '#F4F6F4' : '#F7F9F7',
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                  name="arrow-right"></Icon>
              </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity
            style={{position: 'absolute', top: 3, right: 10, opacity: 0.8}}>
            <Icon
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#15212F',
                fontSize: 28,
                fontWeight: '600',
              }}
              name="bookmark-o"></Icon>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        justifyContent: 'center',
        padding: 13,
        position: 'relative',
      }}>
      <BlogHomeHeader />

      <View
        style={{
          height: 720,
          width: '100%',
          position: 'relative',
          marginTop: 72,
        }}>
        {isLoading && (
          <ActivityIndicator
            size={60}
            style={{marginTop: 300}}
            color={'#719071'}
          />
        )}

        {isError && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 550,
            }}>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#090B09',
                fontSize: 30,
                fontWeight: '700',
                marginBottom: 80,
              }}>
              Connection Time Out ( • ᴖ • )
            </Text>
            <TimeOutSvg />
            <TouchableOpacity
              onPress={() => refetch()}
              style={{
                borderColor: '#719071',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 60,
                padding: 13,
                width: '60%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text
                style={{
                  color: '#719071',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Reload
              </Text>
              <Icon
                style={{
                  color: '#719071',
                  fontSize: 18,
                }}
                name="refresh"></Icon>
            </TouchableOpacity>
          </View>
        )}
        {blogData && !isLoading && !isError && (
          <FlatList
            style={{marginBottom: 60}}
            data={blogData.data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => refetch()}
              />
            }
          />
        )}
      </View>
      <BottomNavigationBar currentPage="BlogHomeScreen" />
    </View>
  );
};

export default BlogHomeScreen;

const styles = StyleSheet.create({});
