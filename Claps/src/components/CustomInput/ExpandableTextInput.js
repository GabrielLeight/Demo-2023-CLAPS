import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';

const ExpandableTextInput = ({ placeholder, value, setValue, secureTextEntry, bgColor, ml = 10, mr = 10, marginb = 10 }) => {
  const [isScrolling, setScrolling] = useState(false);
  const maxVisibleLines = 5;

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    // Check if the content exceeds the visible area
    const isScrollable = contentHeight > maxVisibleLines * 20; // Assuming 20 is the height of one line
    setScrolling(isScrollable);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, { marginLeft: ml }, { marginRight: mr }, { marginBottom: marginb }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={16}
      >
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value.toString()}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
          multiline
          numberOfLines={maxVisibleLines}
          scrollEnabled={isScrolling}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden', // Clip overflow content
  },
  input: {
    color: 'black',
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
});

export default ExpandableTextInput;