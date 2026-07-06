import { View, Text } from 'react-native'
import { StackNavigationProp } from "@react-navigation/stack";
import { ProviderTabParamList } from '../../navigation/types';

type ProviderNavigatorProps = StackNavigationProp<ProviderTabParamList, 'ServicesTab'> 

type Prop = {
    navigation:ProviderNavigatorProps
}

export default function MyServices({navigation}:Prop) {
  return (
    <View>
      <Text>MyServices</Text>
    </View>
  )
}