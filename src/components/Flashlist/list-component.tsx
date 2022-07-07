/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, RefreshControl} from 'react-native';

// components
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {SeparatorComponent} from '../Separator';
import {AvatarComponent} from '../Avatar';

// interfaces
import {ICardItem} from '../../screens/List/interfaces';

interface IListComponentProp {
  data?: ICardItem[];
}

interface ICardItemList {
  items?: ICardItem[];
  loading: boolean;
}

export const ListComponent = ({data}: IListComponentProp) => {
  const [horizontalInfo] = useState<ICardItemList>({
    items: data,
    loading: false,
  });
  const [verticalInfo, setVerticalInfo] = useState<ICardItemList>();

  useEffect(() => {
    refreshVertical();
  }, []);

  const refreshVertical = (): void => {
    setVerticalInfo({...verticalInfo, loading: true});
    if (data) {
      setTimeout(() => {
        setVerticalInfo({items: data, loading: false});
      }, 800);
    }
  };

  const renderItemHorizontal = ({item}: ListRenderItemInfo<ICardItem>) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#ccc',
          margin: 2,
          borderRadius: 6,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginRight: 8}}>
          <Text style={{color: '#444', fontSize: 16}}>Item #{item.id}</Text>
          <Text style={{color: '#444', marginRight: 5}}>
            {item.date} - {item.day}
          </Text>
        </View>
        <AvatarComponent
          uri={'https://cdn-icons-png.flaticon.com/512/7285/7285377.png'}
        />
      </TouchableOpacity>
    );
  };

  const renderItemVertical = ({item}: ListRenderItemInfo<ICardItem>) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#ccc',
          margin: 3,
          borderRadius: 6,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: '#444', fontSize: 20}}>Item #{item.id}</Text>
          <Text style={{color: '#444', marginRight: 5}}>
            {item.date} - {item.day}
          </Text>
        </View>
        <AvatarComponent />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SeparatorComponent />
      <FlashList
        data={horizontalInfo?.items || []}
        renderItem={renderItemHorizontal}
        horizontal
        estimatedItemSize={150}
        keyExtractor={(item: ICardItem, index: number) =>
          String(item.id) + index
        }
      />
      <SeparatorComponent />
      <FlashList
        data={verticalInfo?.items || []}
        renderItem={renderItemVertical}
        estimatedItemSize={200}
        keyExtractor={(item: ICardItem, index: number) =>
          String(item.id) + index
        }
        refreshControl={
          <RefreshControl
            refreshing={verticalInfo?.loading || false}
            onRefresh={refreshVertical}
          />
        }
      />
    </>
  );
};
