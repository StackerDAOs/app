import React from 'react';
import { Icon, IconProps, useClipboard } from 'ui';
import { CheckCircle, CopyClipboard } from 'ui/components/icons';

interface ClipboardProps extends IconProps {
  content: string;
}

export const Clipboard = (props: ClipboardProps) => {
  const { content } = props;
  const { hasCopied, onCopy } = useClipboard(content);
  if (hasCopied) {
    return <Icon aria-hidden as={CheckCircle} {...props} />;
  }
  return <Icon onClick={onCopy} aria-hidden as={CopyClipboard} {...props} />;
};
