import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { StateType } from '../../../../state/reducer';
import { getGenericReadableMessageSelectorProps } from '../../../../state/selectors/conversations';
import { THUMBNAIL_SIDE } from '../../../../types/attachments/VisualAttachment';
import { GenericReadableMessage } from './GenericReadableMessage';

// Same as MIN_WIDTH in ImageGrid.tsx
export const MINIMUM_LINK_PREVIEW_IMAGE_WIDTH = THUMBNAIL_SIDE;

/** when the message info panel is displayed for a message, we disable onClick and make some other minor UI changes */
export type hasDetailView = { isDetailView?: boolean };

type Props = hasDetailView & {
  messageId: string;
};

export const Message = (props: Props) => {
  const msgProps = useSelector((state: StateType) =>
    getGenericReadableMessageSelectorProps(state, props.messageId)
  );

  const ctxMenuID = `ctx-menu-message-${uuidv4()}`;

  if (msgProps?.isDeleted && msgProps.direction === 'outgoing') {
    return null;
  }

  return (
    <GenericReadableMessage
      ctxMenuID={ctxMenuID}
      messageId={props.messageId}
      isDetailView={props.isDetailView}
    />
  );
};
