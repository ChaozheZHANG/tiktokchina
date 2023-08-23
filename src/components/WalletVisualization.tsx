import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { useWalletStore } from '../stores';

const WalletVisualization: React.FC = ({ balance }: { balance?: number }) => {
  const { virtualBalance } = useWalletStore();

  const balanceUsed = balance || virtualBalance;

  function DrawMoney(): JSX.Element[] {
    const images: JSX.Element[] = [];
    for (let i = 0; i < balanceUsed / 50; i += 1) {
      images.push(
        <Image
          key={i}
          style={{
            width: 30,
            height: 30,
          }}
          source={{
            uri:
              'https://outin-8ae065dd40a411ee964800163e12ac16.oss-cn-shenzhen.aliyuncs.com/image/default/0FC95E3B0F974631BEAD3DB3929E4820-6-2.jpeg?Expires=1692707373&OSSAccessKeyId=LTAI5tGo8c8H9HqS5BEfcU3U&Signature=PkScxc%2BfqpR%2Bgtt5CDon3fyKFbM%3D',
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
