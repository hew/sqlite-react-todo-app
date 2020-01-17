import React, {useState} from 'react';

export const currentTime = () => {
  const date = new Date();
  return [date.getFullYear(), date.getMonth(), date.getDate()];
};

export const tomorrowTime = () => {
  const date = new Date();
  console.log(date.getDate() + 1)
  debugger
  return [date.getFullYear(), date.getMonth(), date.getDate() + 1];
};

export const nextWeekTime = () => {
  const date = new Date();
  return [date.getFullYear(), date.getMonth(), date.getDate() + 7];
};

export const formatDate = (str) => {
  switch (str) {
    case 'today':
      return currentTime();
    case 'tomorrow':
      return tomorrowTime();
    case 'next-week':
      return nextWeekTime();
  }
};

export const downArrow =
  'data:image/png;base64,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';
