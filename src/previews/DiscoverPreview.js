/**
 * @flow
 */

import type { Peer } from "@dlghq/dialog-types";
import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { group, user, channel, bot } from "../fixtures/peerInfo";
import Discover from "../components/Discover/Discover";

class DiscoverPreview extends PureComponent {
  handleCardTap = (peer: Peer) => {
    Alert.alert(`Tap to card with peer id: ${peer.id.toString()}`);
  };

  render() {
    const items = [];

    for (let i = 0; i < 4; i++) {
      items.push({
        ...group,
        description: group.about,
        members: 23,
        creator: user.title
      });
      items.push({
        ...channel,
        description: channel.about,
        shortname: channel.userName,
        members: 420,
        avatar: null
      });
      items.push({
        ...user,
        description: user.about,
        shortname: user.userName
      });
      items.push({
        ...bot,
        description: bot.about,
        shortname: bot.userName
      });
    }

    return (
      <View style={styles.container}>
        <Discover
          data={items}
          onCardTap={this.handleCardTap}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default DiscoverPreview;
