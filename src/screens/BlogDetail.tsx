import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommentSection from '../components/CommentSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import useFetchData from '../hooks/useFetchData';
import {getBlogById} from '../api/apiFunctions';
import {formatDistanceToNow} from 'date-fns';
import BlogHomeHeader from '../components/BlogHomeHeader';
import TimeOutSvg from '../svgs/TimeOutSvg';

interface Props extends RootStackScreenProps<'BlogDetail'> {}

const BlogDetail = ({route, navigation}: Props) => {
  const {blogId} = route.params;
  const {
    data: blogData,
    isError,
    isLoading,
    refetch,
  } = useFetchData([`blog${blogId}`], () => getBlogById(blogId));

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7F9F7',
        justifyContent: 'center',
        padding: 10,
        position: 'relative',
      }}>
      <BlogHomeHeader />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          position: 'absolute',
          top: 60,
          left: 20,
          zIndex: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Icon
          style={{
            color: '#15212F',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
          }}
          name="arrow-left"></Icon>
      </TouchableOpacity>
      {blogData && !isError && !isLoading && (
        <ScrollView style={{width: '100%', marginTop: 50}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#15212F',
                fontSize: 23,
                fontWeight: '800',
                width: '75%',
              }}>
              {blogData?.title}
              {isLoading && 'Loading'}
            </Text>
          </View>
          <View style={{padding: 10, marginTop: 30}}>
            <Image
              source={{
                uri: blogData?.picture
                  ? `data:image/jpeg;base64,${blogData?.picture}`
                  : 'https://plus.unsplash.com/premium_photo-1681487807762-98fbe8a9db5e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{height: 260, width: '100%', borderRadius: 10}}
            />
            <View style={{padding: 6}}>
              <Text
                style={{
                  color: '#15212F',

                  fontWeight: '700',
                  marginTop: 15,
                  fontSize: 20,
                }}>
                {blogData?.title}
                {isLoading && 'Loading'}
              </Text>

              <Text
                style={{
                  color: '#15212F',

                  fontSize: 12,
                  paddingLeft: 6,
                  marginTop: 5,
                  fontWeight: '800',
                }}>
                {blogData?.updatedAt
                  ? `Ivan (${formatDistanceToNow(new Date(blogData.updatedAt), {
                      addSuffix: true,
                    })})`
                  : 'Ivan (N/A)'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity>
                    <Icon
                      style={{
                        fontSize: 24,
                        color: '#090B09',
                      }}
                      name="thumbs-o-up"></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      style={{
                        fontSize: 24,
                        color: '#090B09',
                      }}
                      name="thumbs-o-down"></Icon>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Icon
                    style={{
                      fontSize: 24,
                      color: '#090B09',
                    }}
                    name="bookmark-o"></Icon>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: '#15212F',

                  fontWeight: '400',
                  fontSize: 16,
                  marginTop: 12,
                  paddingLeft: 8,
                  lineHeight: 25,
                }}>
                {blogData?.content}
                {isLoading && 'Loading'}
              </Text>

              <Text
                style={{
                  color: '#15212F',

                  marginTop: 20,
                  textAlign: 'right',
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Thanks for Reading
              </Text>
              <Text
                style={{
                  color: '#15212F',

                  marginTop: 6,
                  textAlign: 'right',
                  fontWeight: '700',
                  fontSize: 12,
                }}>
                Ivan
              </Text>
            </View>
            <CommentSection />
          </View>
        </ScrollView>
      )}

      {isLoading && (
        <ActivityIndicator
          size={60}
          style={{marginTop: 60}}
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
              color: '#090B09',
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
              width: '80%',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Text
              style={{
                color: '#719071',
                textAlign: 'left',
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
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({});
