import React from 'react';
import { Text } from 'react-native';
import styled from '@stream-io/styled-components';
import { emojiData } from '../utils';

import leftTail from '../images/reactionlist/left-tail.png';
import leftCenter from '../images/reactionlist/left-center.png';
import leftEnd from '../images/reactionlist/left-end.png';

import rightTail from '../images/reactionlist/right-tail.png';
import rightCenter from '../images/reactionlist/right-center.png';
import rightEnd from '../images/reactionlist/right-end.png';

const TouchableWrapper = styled.TouchableOpacity`
  position: relative;
  ${(props) => (props.position === 'left' ? 'left: -10px;' : 'right: -10px;')}
  height: 28px;
  z-index: 10;
`;

const Container = styled.View`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: 10;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  ${({ theme }) => theme.message.reactionList.container.css}
`;

const ReactionCount = styled.Text`
  color: white;
  font-size: 12;
  ${({ reactionCounts }) => (reactionCounts < 10 ? null : 'min-width: 20px;')}
  ${({ theme }) => theme.message.reactionList.reactionCount.css}
`;

const ImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  top: -23px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const LeftTail = styled.Image`
  width: 25px;
  height: 33px;
`;

const LeftCenter = styled.Image`
  height: 33;
  flex: 1;
`;

const LeftEnd = styled.Image`
  width: 14px;
  height: 33px;
`;

const RightTail = styled.Image`
  width: 25px;
  height: 33px;
`;

const RightCenter = styled.Image`
  height: 33;
  flex: 1;
`;

const RightEnd = styled.Image`
  width: 14px;
  height: 33px;
`;

const Reactions = styled.View`
  flex-direction: row;
`;

export class ReactionList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderReactions = (reactions) => {
    const reactionsByType = {};
    reactions.map((item) => {
      if (reactions[item.type] === undefined) {
        return (reactionsByType[item.type] = [item]);
      } else {
        return (reactionsByType[item.type] = [
          ...reactionsByType[item.type],
          item,
        ]);
      }
    });

    const emojiDataByType = {};
    emojiData.forEach((e) => (emojiDataByType[e.id] = e));

    const reactionTypes = emojiData.map((e) => e.id);
    return Object.keys(reactionsByType).map((type) =>
      reactionTypes.indexOf(type) > -1 ? (
        <Text key={type}>{emojiDataByType[type].icon}</Text>
      ) : null,
    );
  };

  _getReactionCount = (reactionCounts) => {
    let count = null;
    if (
      reactionCounts !== null &&
      reactionCounts !== undefined &&
      Object.keys(reactionCounts).length > 0
    ) {
      count = 0;
      Object.keys(reactionCounts).map((key) => (count += reactionCounts[key]));
    }
    return count;
  };

  render() {
    const {
      latestReactions,
      openReactionSelector,
      reactionCounts,
      visible,
      position,
    } = this.props;
    return (
      <TouchableWrapper
        position={position}
        onPress={openReactionSelector}
        activeOpacity={1}
      >
        <Container visible={visible}>
          <Reactions>{this._renderReactions(latestReactions)}</Reactions>
          <ReactionCount
            reactionCounts={this._getReactionCount(reactionCounts)}
          >
            {this._getReactionCount(reactionCounts)}
          </ReactionCount>
        </Container>
        <ImageWrapper visible={visible}>
          {position === 'left' ? (
            <React.Fragment>
              <LeftTail source={leftTail} />
              <LeftCenter source={leftCenter} resizeMode="stretch" />
              <LeftEnd source={leftEnd} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RightEnd source={rightEnd} />
              <RightCenter source={rightCenter} resizeMode="stretch" />
              <RightTail source={rightTail} />
            </React.Fragment>
          )}
        </ImageWrapper>
      </TouchableWrapper>
    );
  }
}
