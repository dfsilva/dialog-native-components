/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import data from '../fixtures/ProfileData.json';
import Profile from '../components/Profile/Profile';

class ContactsPreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        value: [],
        pending: true,
        error: null
      }
    };

    setTimeout(() => {
      this.setState({
        data: {
          value: data,
          pending: false,
          error: false
        }
      });
    }, 1000);
  }

  handleNotificationChange = value => {
    this.setState({
      data: {
        value: {
          ...data,
          isNotificationsEnabled: value
        },
        pending: false,
        error: false
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Profile
          data={this.state.data}
          onNotificationsChange={this.handleNotificationChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default ContactsPreview;
