import React from 'react';
import styled from 'styled-components';
import Information from './information';

const TemplateContainer = styled.div`
  width: 220mm;
  height: 297mm;
  margin: auto;
`;

export default function Template1(props) {
  const theme = {
    background: '#f3f9fb',
    color: '#466370'
  }

  return (
    <TemplateContainer id="divToPrint">
      {
        props.infor !== undefined && (
          <Information {...props.infor} theme={theme} />
        )
      }
    </TemplateContainer>
  )
}