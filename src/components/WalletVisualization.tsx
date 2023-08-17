import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { useWalletStore } from '../stores';

const WalletVisualization: React.FC = ({ balance }: { balance?: number }) => {
  const { virtualBalance } = useWalletStore();

  const balanceUsed = balance || virtualBalance;

  function DrawMoney(): JSX.Element[] {
    const images: JSX.Element[] = [];
    for (let i = 0; i < balanceUsed / 100; i += 1) {
      images.push(
        <Image
          key={i}
          style={{
            width: 30,
            height: 30,
          }}
          source={{
            uri:
              'https://outin-4c183069335e11eeb6c100163e024c6a.oss-cn-shanghai.aliyuncs.com/image/default/3646A8CF15D6497AA6829A6FC2626AC3-6-2.png?Expires=1691363607&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=3GRuvXD%2Fg0cSXw6rf5Lqb3dj2Qs%3D',
          }}
        />,
      );
    }
    return images;
  }

  return (
    <View
      style={{
        height: 215,
        backgroundColor: 'yellow',
        padding: 20,
      }}
    >
      <Text>This is the part for visualization</Text>
      <Text>Balance: {balanceUsed}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {DrawMoney()}
      </View>
    </View>
  );
};

export default WalletVisualization;
