import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';

interface IProps {
  onSelect: (sale: number) => void;
  value?: number | null;
}

export default function Severage({onSelect, value = null}: IProps) {
  const severageScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selected, setSelected] = React.useState<number | null>(value);

  return (
    <Flex.Column style={{height: 110}}>
      <Text size="l" bold={true} center={true}>
        How severe is it?
      </Text>
      {!value && (
        <Text size="s" color="grey" center={true}>
          You can fill or edit this later.
        </Text>
      )}
      <Flex.Row
        flex={1}
        justify="space-evenly"
        marginVertical="m"
        height={40}
        style={{minHeight: 40}}>
        {severageScale.map(scale => (
          <Item
            onPress={() => {
              setSelected(scale === selected ? null : scale);
              onSelect(scale);
            }}
            selected={selected}
            scale={scale}
            key={scale}
          />
        ))}
      </Flex.Row>
    </Flex.Column>
  );
}

interface IITemProps {
  selected: number | null;
  scale: number;
  onPress: () => void;
}

function Item({selected, scale, onPress}: IITemProps) {
  const isSelected = selected === scale;
  const backgroundColor = useColor(isSelected ? 'black' : 'white');
  const textColor = isSelected ? 'white' : 'black';
  const borderColor = useColor('lightGrey');

  return (
    <Pressable
      key={scale}
      style={[styles.range, {backgroundColor, borderColor}]}
      onPress={onPress}>
      <Text center={true} color={textColor} bold={true}>
        {scale}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  range: {
    paddingVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    width: 30,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
