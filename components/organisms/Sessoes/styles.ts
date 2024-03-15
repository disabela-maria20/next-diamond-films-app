'use client'

import styled from 'styled-components'

export const LinkHora = styled.a.attrs<{ $color?: string }>((props) => ({
  type: 'text',
  $color: props.$color || '#000'
}))`
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  color: #000;
  border: 2px solid ${(props) => props.$color};

  &:hover {
    background-color: ${(props) => props.$color};
  }
`
