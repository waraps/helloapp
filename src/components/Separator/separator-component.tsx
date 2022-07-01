import React from 'react';
import {View} from 'react-native';

interface ISeparatorComponent {
  space?: number;
}

export const SeparatorComponent = ({
  space = 10,
}: ISeparatorComponent): JSX.Element => <View style={{marginTop: space}} />;
