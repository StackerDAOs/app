import React from 'react';

export const upvote = React.useCallback(async (status, authCallback) => {
  if (status !== 'authenticated') {
    authCallback();
  }
  fetch('/api/upvote', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 1 }),
  }).then((res) => res.json().then((data) => console.log({ data })));
}, []);

export const downvote = React.useCallback(async (status, authCallback) => {
  if (status !== 'authenticated') {
    authCallback();
  }
  fetch('/api/downvote', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 1 }),
  }).then((res) => res.json().then((data) => console.log({ data })));
}, []);
