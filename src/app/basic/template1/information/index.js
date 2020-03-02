import React from 'react';
import styled from 'styled-components';

const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  background: ${props => props.background};
  padding: .5in .5in .5in .9in;
`;

const LeftContainer = styled.div`
  width: 34%;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
`;

const ItemContainer = styled.div`
  display: 'inline-block';
  line-height: 2.2
`;

export default function Information(props) {
  const { theme, image, phone, email, address, birthday, gender } = props;
  return (
    <InformationContainer background={theme.background}>
      <LeftContainer>
        <ImageContainer>
          <img src={`${image}`} alt="avatar" style={{ width: '100%', borderRadius: '50%', padding: '' }} />
        </ImageContainer>
      </LeftContainer>
      <div>
        <div>
          {
            phone && (
              <ItemContainer>
                <i className="fa fa-phone" style={{ color: theme.color, fontSize: 20 }} />
                <span style={{ paddingLeft: 20 }}>{phone}</span>
              </ItemContainer>
            )
          }
        </div>
        <div>
          {
            email && (
              <ItemContainer>
                <i className="fa fa-envelope" style={{ color: theme.color, fontSize: 20 }}></i>
                <span style={{ paddingLeft: 20 }}>{email}</span>
              </ItemContainer>
            )
          }
        </div>
        <div>
          {
            birthday && (
              <ItemContainer>
                <i className="fa fa-birthday-cake" style={{ color: theme.color, fontSize: 20 }} />
                <span style={{ paddingLeft: 20 }}>{birthday}</span>
              </ItemContainer>
            )
          }
        </div>
        <div>
          {
            gender && (
              <ItemContainer>
                <i className="fa fa-transgender" style={{ color: theme.color, fontSize: 20 }} />
                <span style={{ paddingLeft: 20 }}>{gender}</span>
              </ItemContainer>
            )
          }
        </div>
        <div>
          {
            address && (
              <ItemContainer>
                <i className="fa fa-map-marker " style={{ color: theme.color, fontSize: 20 }}></i>
                <span style={{ paddingLeft: 20 }}>{address}</span>
              </ItemContainer>
            )
          }
        </div>
      </div>

    </InformationContainer>
  )
}