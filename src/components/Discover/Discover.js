/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DiscoverCard as Card } from '../../types';
import type { Props as Context } from '../ContextProvider/ContextProvider';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, VirtualizedList, ActivityIndicator } from 'react-native';
import DiscoverCard from '../DiscoverCard/DiscoverCard';
import Icon from '../Icon/Icon';
import getStyles from './styles';
import { Color } from '../../styles';

type Props = {
  data: {
    value: ?(Card[]),
    pending: boolean,
    error: ?string
  },
  onGoToCard: (card: Card) => mixed
};

class Discover extends PureComponent<Props> {
  styles: Object;

  static contextTypes = {
    theme: PropTypes.object,
    style: PropTypes.object
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.styles = getStyles(context.theme, context.style.Discover);
  }

  getItem = (data: any, index: number) => data[index];
  getItemKey = (card: any, index: number) =>
    `${card.peer.type}_${card.peer.id}}`;
  getItemCount = (data: any) => data.length;

  renderCard = ({ item, index }: { item: Card, index: number }) => {
    return (
      <DiscoverCard
        card={item}
        onGoToCard={this.props.onGoToCard}
        style={[this.styles.card, index === 0 ? this.styles.firstCard : null]}
      />
    );
  };

  renderError() {
    return (
      <View style={this.styles.errorWrapper}>
        <Icon
          glyph="error"
          style={this.styles.errorIcon}
          width={64}
          height={64}
        />
        <Text style={this.styles.errorText}>{this.props.data.error}</Text>
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

  renderEmpty() {
    return (
      <View style={[this.styles.fill, { height: 100 }]}>
        <Text style={this.styles.textHeading}>Oops!</Text>
        <Text style={this.styles.text}>
          It looks like we haven't added any cards yet.
        </Text>
      </View>
    );
  }

  renderCards() {
    const { data } = this.props;

    if (data.error) {
      return this.renderError();
    }

    if (data.pending) {
      return this.renderPending();
    }

    return (
      <VirtualizedList
        renderItem={this.renderCard}
        data={data.value}
        getItem={this.getItem}
        getItemCount={this.getItemCount}
        keyExtractor={this.getItemKey}
        ListEmptyComponent={this.renderEmpty()}
      />
    );
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.cards}>{this.renderCards()}</View>
      </View>
    );
  }
}

export default Discover;
