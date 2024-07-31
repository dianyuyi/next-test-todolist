'use client';
import tw, { styled } from 'twin.macro';

export const StyledSVG = styled.svg`
  ${tw`text-gray-700`}
`;

const DefaultIcon = ({
  children,
  viewBox,
  ...rest
}: {
  children: React.ReactNode;
  viewBox: string;
}) => (
  <StyledSVG
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox={viewBox}
    {...rest}
  >
    {children}
  </StyledSVG>
);

export const CloseIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.7304 4.33014C21.0233 4.03724 21.0233 3.56237 20.7304 3.26947C20.4375 2.97658 19.9626 2.97658 19.6697 3.26947L12.0001 10.9391L4.33038 3.26947C4.03749 2.97658 3.56261 2.97658 3.26972 3.26947C2.97683 3.56237 2.97683 4.03724 3.26972 4.33014L10.9394 11.9998L3.26972 19.6695C2.97683 19.9624 2.97683 20.4372 3.26972 20.7301C3.56261 21.023 4.03749 21.023 4.33038 20.7301L12.0001 13.0605L19.6697 20.7301C19.9626 21.023 20.4375 21.023 20.7304 20.7301C21.0233 20.4372 21.0233 19.9624 20.7304 19.6695L13.0607 11.9998L20.7304 4.33014Z"
    />
  </DefaultIcon>
);

export const CheckedIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </DefaultIcon>
);
export const UncheckedIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
  </DefaultIcon>
);

export const TrashIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
  </DefaultIcon>
);

export const AddIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
  </DefaultIcon>
);

export const SearchIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </DefaultIcon>
);
export const LoadingIcon = ({ ...rest }) => (
  <DefaultIcon {...rest} viewBox="0 0 100 100">
    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </path>
  </DefaultIcon>
);
