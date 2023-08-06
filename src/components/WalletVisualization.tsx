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
              'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          }}
        />,
      );
    }
    return images;
  }

  return (
    <View
      style={{
        height: 300,
        backgroundColor: 'yellow',
        padding: 10,
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
