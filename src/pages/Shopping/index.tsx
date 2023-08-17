import React from 'react';
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
import ShoppingWindow from '../../components/ShoppingWindow';

const Shopping: React.FC = ({ navigation }) => {
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
            id: '1',
            name: '【fullofhope希望树】除醛小绿罐除甲醛除异味200g/罐*4空气净化',
            price: '169',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/41BE673F6E73412C96E5CD0DA5B2C41D-6-2.jpg?Expires=1691364709&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=y0lU0IGhRq0zZna6kfSP9uQszQk%3D',
            description:'【一拍激活，除醛去味】.',
          },
          {
            id: '2',
            name: '【凯迪仕Q3VP】智能室内大屏猫眼抓拍对讲指纹密码锁家用防盗智能锁',
            price: '1299',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/8059B8B6D7D0460A9DA3854F3866CA54-6-2.jpg?Expires=1691365003&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=4MhsvXPKqX7Urh2kXbkvXwhvzZk%3D',
            description:'【全新升级，爆款好物】.',
          },
          {
            id: '3',
            name: '【巴黎卡诗】双重洗发水',
            price: '399',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/8A6B56C2BFE7412FB6DD7725742DF2D9-6-2.jpg?Expires=1691364732&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=YC6Xc85TUne5%2B1ouzhwwnsxrvcE%3D',
            description:'【0硅油配方，含氨基酸洗发水，双重功能洗发水】.',
          },
          {
            id: '4',
            name: '【徕芬】高速吹风机 SE*1',
            price: '379',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
            description:'【强劲风速，拒绝高温烘烤】.',
          },
          {
            id: '5',
            name: '【大公鸡管家】油污净1正品600ml+2补品600ml+百洁布1个',
            price: '64.9',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
            description:'【轻松搞定重油污，百年信誉，放心品质】.',
          },
          {
            id: '6',
            name: '【甄选自营】东方甄选牛乳/全麦/椰蓉吐司12片吐司/箱 960g/箱',
            price: '42.9',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
            description:'【椰蓉吐司混合装+牛乳】.',
          },
          {
            id: '7',
            name: '【Kiri】甜心小酪78g*2+乐芝牛小三角涂抹奶酪128g*3+甜心小酪25g*1',
            price: '98',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
            description:'【法国品牌，奶香浓醇】.',
          },
          {
            id: '8',
            name: '【冰泉soyspring】黄豆纯豆浆粉540g*2袋（共60小包）',
            price: '59.8',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
            description:'【0添加糖，只有黄豆】.',
          },
          {
            id: '9',
            name: '【纽仕兰Theland】新西兰原装进口Pure Milk',
            price: '84',
            image: 'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/B161B6F388314E03AC509D2D4353B125-6-2.jpg?Expires=1691365027&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=hYZuMF6NkcN3O76mNAl%2BSA00Ysk%3D',
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
