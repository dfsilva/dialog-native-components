/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  ScheduleProps,
  ScheduleDay as ScheduleDayType
} from '../../types';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import ScheduleDay from '../ScheduleDay/ScheduleDay';
import getStyles from './styles';
import { Color } from '../../styles';

class Schedule extends PureComponent {
  props: ScheduleProps;
  styles: Object;

  static contextTypes = {
    theme: PropTypes.object,
    style: PropTypes.object,
    locale: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);

    this.styles = getStyles(context.theme, context.style.Schedule);
  }

  getKey = (item: ScheduleDay, index: number): string => `schedule_day_${index}`;

  renderItem = ({ item }) => {
    return (
      <ScheduleDay
        {...item}
        locale={this.context.locale}
        onNavRequest={this.props.onNavRequest}
      />
    );
  };

  renderError() {
    return (
      <View style={this.styles.fill}>
        <Text>{this.props.data.error}</Text>
      </View>
    );
  }

  renderPending() {
    return (
      <View style={this.styles.fill}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  renderSchedule() {
    const { data } = this.props;

    if (data.error) {
      return this.renderError();
    }

    if (data.pending) {
      return this.renderPending();
    }

    return (
      <FlatList
        data={this.props.data.value}
        keyExtractor={this.getKey}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    return <View style={this.styles.container}>{this.renderSchedule()}</View>;
  }
}

export default Schedule;