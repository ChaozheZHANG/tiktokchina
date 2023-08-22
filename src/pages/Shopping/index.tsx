import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import avatar from '../../assets/avatar.png';

import {
  Container,
  Title,
  Header,
  Avatar,
  Username,
  Content,
  Stats,
  Separator,
  StatsText,
  StatsColumn,
  StatsNumber,
  ProfileColumn,
  ProfileEdit,
  ProfileText,
  Bookmark,
} from './styles';
import { useUserEventLogStore, useUserStore } from '../../stores';
import ShoppingWindow from '../../components/ShoppingWindow';

const Shopping: React.FC = ({ navigation }) => {
  const { addEventLog } = useUserEventLogStore();
  const { user } = useUserStore();

  useEffect(() => {
    console.log('Shopping mounted');

    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      console.log('Shopping focused');

      addEventLog({
        id: '1',
        event: 'viewShoppingPage',
        userId: user.id,
        timestamp: Date.now(),
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>Shopping</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <FlatList
        data={[
          {
            id: 'commodity1',
            name: 
            '【fullofhope希望树】除醛小绿罐除甲醛除异味200g/罐*4空气净化',
            price: '169',
            image:
             'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/7664DDDD6FB54409BFEE04ECC4C5B352-6-2.jpg?Expires=1692707154&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=gJw4pN7xkbnBJYP%2FPL0eZKJV%2BZ8%3D',
            description:'【一拍激活，除醛去味】.',
          },
          {
            id: 'commodity2',
            name: 
            '【凯迪仕Q3VP】智能室内大屏猫眼抓拍对讲指纹密码锁家用防盗智能锁',
            price: '1299',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/D39F35F311D9416FA719FC79D69DBDB1-6-2.jpg?Expires=1692707173&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=FCHiB%2FmhG%2FsvoDFwqS66mVbnS8k%3D',
            description:'【全新升级，爆款好物】.',
          },
          {
            id: 'commodity3',
            name: 
            '【巴黎卡诗】双重洗发水',
            price: '399',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/C594ACF84A6E46D583D50B06C2A27B98-6-2.jpg?Expires=1692707201&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=isgNvRKNcQYaN9GZ8elcUAif7Ic%3D',
            description:'【0硅油配方，含氨基酸洗发水，双重功能洗发水】.',
          },
          {
            id: 'commodity4',
            name:
             '【徕芬】高速吹风机 SE*1',
            price: '379',
            image:
             'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/E3DEC1EBDE7944C2A3D016D9E28247F2-6-2.jpg?Expires=1692707217&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=H%2BFns7JSZh8r87flLHeaM3N3QvI%3D',
            description:'【强劲风速，拒绝高温烘烤】.',
          },
          {
            id: 'commodity5',
            name: 
            '【大公鸡管家】油污净1正品600ml+2补品600ml+百洁布1个',
            price: '64.9',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/029A5C4F20A44435B167E6430A5ACA00-6-2.jpeg?Expires=1692707247&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=Y9JI%2Bvu4S8p0zKNY%2FsbRy3YHXzw%3D',
            description:'【轻松搞定重油污，百年信誉，放心品质】.',
          },
          {
            id: 'commodity6',
            name: 
            '【甄选自营】东方甄选牛乳/全麦/椰蓉吐司12片吐司/箱 960g/箱',
            price: '42.9',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/05F141C263BE4DBD978C1A8A3927D9EB-6-2.jpeg?Expires=1692707291&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=7ZtxEpJHRvP2p8s%2Fek8dBnwmw%2FY%3D',
            description:'【椰蓉吐司混合装+牛乳】.',
          },
          {
            id: 'commodity7',
            name: 
            '【Kiri】甜心小酪78g*2+乐芝牛小三角涂抹奶酪128g*3+甜心小酪25g*1',
            price: '98',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/DCB1E7682A9042788EF7D841D60CC5B2-6-2.jpeg?Expires=1692707311&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=D8tWEyOZjd7TDbxG5FP13Lze%2B30%3D',
            description:'【法国品牌，奶香浓醇】.',
          },
          {
            id: 'commodity8',
            name: 
            '【冰泉soyspring】黄豆纯豆浆粉540g*2袋（共60小包）',
            price: '59.8',
            image:
             'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/7FD038693A7646B393EC7910C2CA2DD6-6-2.jpeg?Expires=1692707333&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=Lks5BWwOKuVKMwYMjUsGUdXt3v0%3D',
            description:'【0添加糖，只有黄豆】.',
          },
          {
            id: 'commodity9',
            name: 
            '【纽仕兰Theland】新西兰原装进口Pure Milk',
            price: '84',
            image: 
            'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/0C901922A43A4CBAA30303224D1DB121-6-2.jpeg?Expires=1692707355&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=6i53C5QNo0b9JUoFvtdknyYqQTY%3D',
            description:'【青草草饲，营养高度】.',
          },

        ]}
        renderItem={({ item }) => (
          <ShoppingWindow product={item} navigation={navigation} />
        )}
      />
    </Container>
  );
};

export default Shopping;
