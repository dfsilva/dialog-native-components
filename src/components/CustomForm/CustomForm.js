/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props as Context } from '../ContextProvider/ContextProvider';
import type { JSONSchema, JSONValue } from '../../utils/JSONSchema';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import Block from '../Block/Block';
import BlockText from '../BlockText/BlockText';
import CustomFormString from './CustomFormString/CustomFormString';
import CustomFormBoolean from './CustomFormBoolean/CustomFormBoolean';
import getStyles from './styles';
import { Color } from '../../styles';

type Props = {
  schema: JSONSchema,
  value: JSONValue,
  onChange: (value: JSONValue) => mixed
};

class CustomForm extends PureComponent<Props> {
  styles: Object;

  static contextTypes = {
    theme: PropTypes.object,
    style: PropTypes.object
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.styles = getStyles(context.theme, context.style.CustomForm);
  }

  handleChange = (key: string, value: mixed): void => {
    this.props.onChange({
      ...this.props.value,
      [key]: value
    });
  };

  renderProperties() {
    const { value, schema } = this.props;

    return Object.keys(schema.properties).map((propName, index, array) => {
      const propValue = value && value[propName] ? value[propName] : null;
      const { type, title } = schema.properties[propName];

      const borderless = array.length - 1 === index;

      switch (type) {
        case 'boolean':
          return (
            <CustomFormBoolean
              key={propName}
              id={propName}
              title={title}
              borderless={borderless}
              value={Boolean(propValue)}
              onChange={this.handleChange}
            />
          );

        case 'number':
        case 'integer':
          return (
            <CustomFormString
              key={propName}
              id={propName}
              title={title}
              borderless={borderless}
              value={String(propValue || '')}
              keyboardType="numeric"
              onChange={this.handleChange}
            />
          );

        case 'string':
          return (
            <CustomFormString
              key={propName}
              id={propName}
              title={title}
              borderless={borderless}
              value={String(propValue || '')}
              onChange={this.handleChange}
            />
          );

        default:
          return <Text key={propName}>{`Unsupported type ${type}`}</Text>;
      }
    });
  }

  render() {
    return (
      <Block style={this.styles.container}>{this.renderProperties()}</Block>
    );
  }
}

export default CustomForm;
