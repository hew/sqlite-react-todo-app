/** @jsx jsx */
import {jsx, Styled as s} from 'theme-ui';
import {useState} from 'react';
import check from '../assets/checkmark.svg';

const CircleSVG = () => (
  <svg viewBox="0 0 52 52" sx={{variant: 'checkmark'}}>
    <circle sx={{variant: 'checkmark.inner'}} cx="26" cy="26" r="25" fill="none" />
    <path sx={{variant: 'checkmark.check'}} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg>
);

const Circle = ({isFilled = false}) => {
  return isFilled ? <CircleSVG /> : <div sx={{variant: 'circle'}} />;
};

export default ({id, description, dateDue, state, edit, del}) => {
  const [isHovered, setIsHovered] = useState(false);
  // state, due date
  return (
    <article
      sx={{variant: 'card'}}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => edit({id, description, dateDue, state: state === 'DONE' ? 'TODO' : 'DONE'})}>
      <Circle isFilled={state === 'DONE'} />
      <s.h1 sx={{margin: 0, px: 2}}>{description}</s.h1>
      <s.p
        onClick={(event) => {
          event.stopPropagation();

          del(id);
        }}
        sx={{variant: 'card.remove', visibility: isHovered ? 'visible' : 'hidden'}}>
        clear
      </s.p>
    </article>
  );
};
