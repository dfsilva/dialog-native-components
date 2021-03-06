/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  ScheduleProps as Props,
  ScheduleDay as ScheduleDayType
} from '../../types';
import type { Props as Context } from '../ContextProvider/ContextProvider';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import ScheduleDay from '../ScheduleDay/ScheduleDay';
import getStyles from './styles';
import { Color } from '../../styles';

class Schedule extends PureComponent<Props> {
  styles: Object;

  static defaultProps = {
    hidePastSchedule: true
  };

  static contextTypes = {
    theme: PropTypes.object,
    style: PropTypes.object
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.styles = getStyles(context.theme, context.style.Schedule);
  }

  getKey = (item: ScheduleDayType, index: number): string =>
    `schedule_day_${index}`;

  getData = (): ScheduleDayType[] => {
    if (!this.props.hidePastSchedule) {
      return this.props.data.value;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const data = this.props.data.value.filter(day => {
      return new Date(day.date).getTime() >= today;
    });

    return data.length
      ? data
      : [this.props.data.value[this.props.data.value.length - 1]];
  };

  renderItem = ({ item }: { item: ScheduleDayType }) => {
    return <ScheduleDay {...item} onNavRequest={this.props.onNavRequest} />;
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
        <ActivityIndicator
          size="large"
          color={this.context.theme.color.primary || Color.primary}
        />
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
        data={this.getData()}
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
